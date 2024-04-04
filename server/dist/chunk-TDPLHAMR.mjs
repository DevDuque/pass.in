import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  z
} from "./chunk-AG67VYHJ.mjs";
import {
  prisma
} from "./chunk-YVGXYLIE.mjs";

// src/routes/register-for-event.ts
async function registerForEvent(app) {
  app.withTypeProvider().post("/events/:eventId/attendees", {
    schema: {
      summary: "Register an attendee to an event",
      tags: ["attendees"],
      body: z.object({
        name: z.string().min(3),
        email: z.string().email()
      }),
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        201: z.object({
          attendeeId: z.number()
        })
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const { name, email } = request.body;
    const attendeeFromEmail = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          email,
          eventId
        }
      }
    });
    if (attendeeFromEmail) {
      throw new BadRequest("This e-email is already registered for this event.");
    }
    ;
    const [event, amountOfAttendeesForEvent] = await Promise.all([
      prisma.event.findUnique({
        where: {
          id: eventId
        }
      }),
      prisma.attendee.count({
        where: {
          eventId
        }
      })
    ]);
    if (event?.maximumAttendees && amountOfAttendeesForEvent >= event.maximumAttendees) {
      throw new BadRequest("Attention: We've reached maximum capacity for this event.");
    }
    const createdAttendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId
      }
    });
    return reply.status(201).send({ attendeeId: createdAttendee.id });
  });
}

export {
  registerForEvent
};
