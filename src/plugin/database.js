const fp = require("fastify-plugin");
const pgp = require("pg-promise")();
const applyMigration = require("./helper/migration");
const config = require("../config");

// plugins are functions which have 3 parts - fastify instance, options and next/done callback
const db = async (fastify, options) => {
  const dbConnection = pgp(config.database_uri); // connect to db using pg-promise and connection string from env variable

  // register db as a decorator to provide globally
  //  when we refer to fastify.db, it will refer to dbConnection
  fastify.decorate("db", dbConnection);

  fastify.log.info("Migrating database...");

  const migrationCount = await applyMigration();

  fastify.log.info(`Applied ${migrationCount} migrations successfully!`);
};

module.exports = fp(db); // wrap plugin with fastify-plugin to avoid multiple registrations
