import { prisma } from '../src/lib/prisma';

async function seed() {
    await prisma.event.create({
        data: {
            id: '6e5063ac-abd2-482f-bda4-c6743aad2b37',
            title: "Event Example",
            slug: 'event-example',
            details: 'Event example to seed',
            maximumAttendees: 120,
        }
    })
};

seed().then(() => {
    console.log("Databese seeded! 🚀🚀");

    prisma.$disconnect();
})