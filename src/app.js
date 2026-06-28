const fastify = require("fastify");
const db = require("./plugin/database");
const testRoute = require("./route/tempTestRoute");
const swagger = require("./plugin/swagger");

const build = (opts = {}) => {
  const app = fastify(opts);
  // const app = fastify({
  //   ...opts,
  //   ajv: {
  //     customOptions: {
  //       coerceTypes: false,
  //       strict: true,
  //     },
  //   },
  // });

  // register plugins
  app.register(db);
  // register routes
  app.register(testRoute, { prefix: "api/v1/test" });

  // register swagger
  app.register(swagger);

  app.get("/", async (request, reply) => {
    reply.send({ hello: "world" });
  });
  return app;
};

module.exports = build;
