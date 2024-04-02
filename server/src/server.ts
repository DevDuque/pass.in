// Dependencies
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { createEvent } from './routes/create-event';

// Initializing Fastify app
const app = fastify();

24:44

// Setting up schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Registering route handler for creating events
app.register(createEvent);

app.listen({
    port: 3333
}).then(() => {
    console.log("Server is running on port 3333 🚀🚀")
});