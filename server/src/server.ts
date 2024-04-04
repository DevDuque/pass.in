// Dependencies
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';

// Routes
import { createEvent } from './routes/create-event';
import { registerForEvent } from './routes/register-for-event';
import { getEvent } from './routes/get-event';
import { getAttendeeBadge } from './routes/get-attendee-badge';
import { checkIn } from './routes/check-in';
import { getEventAttendees } from './routes/get-event-attendees';
import { errorHandler } from './utils/error-handler';
import fastifyCors from '@fastify/cors';

// Initializing Fastify app
const app = fastify();

// Setting up schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
    origin: '*' 
});

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'pass.in',
            description: 'Uma aplicação NodeJS projetada para simplificar a gestão de participantes em eventos presenciais. Com Pass.in, organizadores de eventos podem criar e gerenciar eventos com facilidade, permitindo aos participantes se inscreverem online e emitirem credenciais para acesso rápido e seguro no dia do evento.',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform
});

app.register(fastifySwaggerUI, {
    routePrefix: '/docs'
});

// Registering routes handler
app.register(createEvent);
app.register(registerForEvent);

app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);

app.setErrorHandler(errorHandler);

app.listen({
    port: 3333, host: '0.0.0.0'
}).then(() => {
    console.log("Server is running on port 3333 🚀🚀")
});