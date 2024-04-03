// Dependencies
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { createEvent } from './routes/create-event';
import { registerForEvent } from './routes/register-for-event';
import { getEvent } from './routes/get-event';
import { getAttendeeBadge } from './routes/get-attendee-badge';

// Initializing Fastify app
const app = fastify();

// Setting up schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Registering routes handler
app.register(createEvent);
app.register(registerForEvent);

app.register(getEvent);
app.register(getAttendeeBadge);

app.listen({
    port: 3333
}).then(() => {
    console.log("Server is running on port 3333 🚀🚀")
});