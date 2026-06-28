const fp = require("fastify-plugin");
const swagger = require("@fastify/swagger");
const swaggerUi = require("@fastify/swagger-ui");

module.exports = fp(async (fastify) => {
  fastify.register(swagger, {
    openapi: {
      info: {
        title: "Fastify Project",
        description: "Fastify swagger API",
        version: "0.1.0",
      },
      servers: [
        {
          url: "http://localhost:5000",
          description: "Development server",
        },
      ],
      tags: [
        {
          name: "test",
          description: "Test related endpoints",
        },
      ],
    },
  });

  fastify.register(swaggerUi, {
    routePrefix: "/documentation",
  });
});
