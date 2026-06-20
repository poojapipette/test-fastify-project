const route = async (fastify) => {
  fastify.get("/", async (request, reply) => {
    const tests = await fastify.db.query("select * from test");
    reply.code(200).send(tests);
  });
  fastify.post("/", async (request, reply) => {
    fastify.log.info("Received request body: ", request.body);
    const { title } = request.body;
    const id = await fastify.db.one(
      "insert into test (title) values ($1) returning id",
      [title],
    );
    reply.code(201).send({ id: id.id, title });
  });
};

module.exports = route;
