/*
    File to handle the return of event attendees (POST) using zod to handle the autentication of the QueryParams
 */

// Dependencies
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { z } from 'zod';

// MyUtils
import { prisma } from '../lib/prisma';

export async function getEventAttendees(app: FastifyInstance) {
    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/events/:eventId/attendees', {
        schema: {
            summary: "Return the event attendees",
            tags: ["events"],

            params: z.object({
                eventId: z.string().uuid()
            }), 
            querystring: z.object({
                query: z.string().nullish(),
                pageIndex: z.string().nullish().default("0").transform(Number)
            }), 
            response: {
                200: z.object({
                    attendees: z.array(
                        z.object({
                            id: z.coerce.number(),
                            name: z.string(),
                            email: z.string().email(),
                            createdAt: z.date(),
                            checkedInAt: z.date().nullable()
                        })
                    )
                }),
            },
        }
    }, async (request, reply) => {
        const { eventId } = request.params;
        const { pageIndex, query } = request.query;

        const attendees = await prisma.attendee.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,

                checkIn: {
                    select: {
                        createdAt: true,
                    }
                }
            },

            where: query ? {
                eventId,
                name: {
                    contains: query,
                }
            } : {
                eventId,
            },
            take: 10,
            skip: pageIndex * 10,

            orderBy: {
                createdAt: 'desc'
            }
        });

        // Formatting the return
        return reply.send({
            attendees: attendees.map(attendee => {
                return {
                    id: attendee.id,
                    name: attendee.name,
                    email: attendee.email,
                    createdAt: attendee.createdAt,
                    checkedInAt: attendee.checkIn?.createdAt ?? null,
                }
            }),
        })
    });
};