const tempService = require("../../service/temp.service");
const {
  postRequestbody,
  postResponse,
  getResponseBody,
} = require("./temp.schema");

const route = async (fastify) => {
  const { getAll, save } = tempService(fastify);
  fastify.get(
    "/",
    { schema: { response: getResponseBody } },
    async (request, reply) => {
      const tests = await getAll();
      reply.code(200).send({ tests: tests });
    },
  );

  fastify.post(
    "/",
    { schema: { body: postRequestbody, response: postResponse } },
    async (request, reply) => {
      fastify.log.info("Received request body: ", request.body);
      const { title } = request.body;
      const id = await save(title);
      reply.code(201).send({ id: id.id, title });
    },
  );
};

module.exports = route;
