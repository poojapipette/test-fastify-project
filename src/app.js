const fastify = require("fastify");
const db = require("./plugin/database");
const testRoute = require("./route/tempTestRoute");

const build = (opts = {}) => {
  const app = fastify(opts);

  // register plugins
  app.register(db);
  // register routes
  app.register(testRoute, { prefix: "api/v1/test" });

  app.get("/", async (request, reply) => {
    reply.send({ hello: "world" });
  });
  return app;
};

module.exports = build;
