import { prisma } from '../src/lib/prisma';

async function seed() {
    await prisma.event.create({
        data: {
            id: '6e5063ac-abd2-482f-bda4-c6743aad2b37',
            title: "NLW Unite",
            slug: 'nlw-unite',
            details: 'An event for all developers in development',
            maximumAttendees: 120,
        }
    })
};

seed().then(() => {
    console.log("Databese seeded! 🚀🚀");

    prisma.$disconnect();
})