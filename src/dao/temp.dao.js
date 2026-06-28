const dao = (fastify) => {
  const getAll = async () => await fastify.db.query("select * from test");

  const save = async (title) =>
    await fastify.db.one("insert into test (title) values ($1) returning id", [
      title,
    ]);

  return { getAll, save };
};

module.exports = dao;
