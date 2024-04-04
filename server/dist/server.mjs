import {
  errorHandler
} from "./chunk-WLCWEKFX.mjs";
import {
  checkIn
} from "./chunk-THEAPZQR.mjs";
import {
  createEvent
} from "./chunk-F5ZXJFKK.mjs";
import "./chunk-3VNS3LNG.mjs";
import {
  getAttendeeBadge
} from "./chunk-2JK7HW7O.mjs";
import {
  getEventAttendees
} from "./chunk-PCDT4WO5.mjs";
import {
  getEvent
} from "./chunk-LMQ7BOD5.mjs";
import {
  registerForEvent
} from "./chunk-TDPLHAMR.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-AG67VYHJ.mjs";
import "./chunk-YVGXYLIE.mjs";

// src/server.ts
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
var app = fastify();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Uma aplica\xE7\xE3o NodeJS projetada para simplificar a gest\xE3o de participantes em eventos presenciais. Com Pass.in, organizadores de eventos podem criar e gerenciar eventos com facilidade, permitindo aos participantes se inscreverem online e emitirem credenciais para acesso r\xE1pido e seguro no dia do evento.",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({
  port: 3333,
  host: "0.0.0.0"
}).then(() => {
  console.log("Server is running on port 3333 \u{1F680}\u{1F680}");
});
