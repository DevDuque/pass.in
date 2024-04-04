/*
    File to handle the creation of events (POST) using zod to handle the autentication of the RequestBody
 */

// Dependencies
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { z } from 'zod';


// MyUtils
import { prisma } from '../lib/prisma';
import { generateSlug } from '../utils/generate_slug';
import { BadRequest } from './_errors/bad-request';

export async function createEvent(app: FastifyInstance) {
    // Route to handle POST requests to create events
    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/events', {
        schema: {
            summary: "Create an event",
            tags: ["events"],
            body: z.object({
                title: z.string().min(4),
                details: z.string().nullable(),
                maximumAttendees: z.number().int().positive().nullable(),
            }),

        response: {
            201: z.object({
                eventId: z.string().uuid(),
            })
        }
        },
    }, async (request, reply) => {
        
        // Destructuring request body
        const {
            title,
            details, 
            maximumAttendees
        } = (request.body);

        // Generating slug from the title
        const slug = generateSlug(title);

        // Checking if the slug already exists in the database
        const eventWithSameSlug = await prisma.event.findUnique({
            where: {
                slug,
            }
        });

        // Throwing an error if an event with the same slug already exists
        if (eventWithSameSlug !== null) {
            throw new BadRequest("Attention! Another event with the same title already exists");
        };

        // Creating a new event in the database using Prisma
        const createdEvent = await prisma.event.create({
            data: {
                title,
                details,
                maximumAttendees,
                slug,
            }
        });

        // Returning 201 (Created) if successful
        return reply.status(201).send({eventId: createdEvent.id});
    });
};