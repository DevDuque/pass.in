import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  ZodError
} from "./chunk-AG67VYHJ.mjs";

// src/utils/error-handler.ts
var errorHandler = (error, request, reply) => {
  const { validation, validationContext } = error;
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "ERROR: Validation error",
      errors: error.flatten().fieldErrors
    });
  }
  ;
  if (error instanceof BadRequest) {
    return reply.status(400).send({ message: error.message });
  }
  return reply.status(500).send({ message: "ERROR: Internal server error!" });
};

export {
  errorHandler
};
