const dao = require("../dao/temp.dao");

const tempService = (fastify) => {
  const tempDao = dao(fastify);
  const getAll = async () => await tempDao.getAll();

  const save = async (title) => await tempDao.save(title);

  return { getAll, save };
};

module.exports = tempService;
