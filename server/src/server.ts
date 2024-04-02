import fastify from 'fastify';

const app =  fastify();

app.get('/', () => {
    return 'Putz'
});

app.listen({
    port: 3333
}).then(() => {
    console.log("Server is running on port 3333 🚀🚀")
});