import {
  generateSlug
} from "./chunk-3VNS3LNG.mjs";
import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  z
} from "./chunk-AG67VYHJ.mjs";
import {
  prisma
} from "./chunk-YVGXYLIE.mjs";

// src/routes/create-event.ts
async function createEvent(app) {
  app.withTypeProvider().post("/events", {
    schema: {
      summary: "Create an event",
      tags: ["events"],
      body: z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable()
      }),
      response: {
        201: z.object({
          eventId: z.string().uuid()
        })
      }
    }
  }, async (request, reply) => {
    const {
      title,
      details,
      maximumAttendees
    } = request.body;
    const slug = generateSlug(title);
    const eventWithSameSlug = await prisma.event.findUnique({
      where: {
        slug
      }
    });
    if (eventWithSameSlug !== null) {
      throw new BadRequest("Attention! Another event with the same title already exists");
    }
    ;
    const createdEvent = await prisma.event.create({
      data: {
        title,
        details,
        maximumAttendees,
        slug
      }
    });
    return reply.status(201).send({ eventId: createdEvent.id });
  });
}

export {
  createEvent
};
