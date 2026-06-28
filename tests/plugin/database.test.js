const fastify = require("fastify");
const dbPlugin = require("../../src/plugin/database");
const applyMigration = require("../../src/plugin/helper/migration");

jest.mock("../../src/plugin/helper/migration");

describe("Database plugin", () => {

  beforeAll(async () => {
    applyMigration.mockImplementation(() => jest.fn());
  });

  it("should attach a bd decorator on fastify", async () => {
    const app = fastify();
    app.register(dbPlugin);

    await app.ready();
    expect(app.db).toBeDefined();
    await app.close();
  });
});
