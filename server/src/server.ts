/*
    This file creates a Fastify server to handle HTTP methods.
    It uses Zod for request body validation and Prisma for database operations.
 */

import fastify from 'fastify';

import { z } from 'zod';

import { PrismaClient } from '@prisma/client';

const app =  fastify();

// Initialize Prisma Client with query logging enabled
const prisma = new PrismaClient;

// Route to handle POST requests to create events
app.post('/events', async (request, reply) => {
    // Define schema for event creation data validation using Zod
    const createEventSchema = z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable(),
    })
    
    // Parse and validate request body against the defined schema
    const data = createEventSchema.parse(request.body)

    // Create a new event in the database using Prisma
    const createdEvent = await prisma.event.create({
        data: {
            title: data.title,
            details: data.details,
            maximumAttendees: data.maximumAttendees,
            slug : new Date().toISOString(),
        }
    })

    // Return the CreatedSuccessfully HTTP Code
    return reply.status(201).send();
});

app.listen({
    port: 3333
}).then(() => {
    console.log("Server is running on port 3333 🚀🚀")
});