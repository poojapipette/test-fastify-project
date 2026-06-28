const build = require("../../src/app");
let app;

const mockDb = {
  query: jest.fn().mockResolvedValue([{ id: 1, title: "Test Title" }]),
  one: jest.fn().mockResolvedValue({ id: 1 }),
};

jest.mock("../../src/plugin/database", () => {
  const fp = require("fastify-plugin");
  return fp(async (fastify) => {
    fastify.decorate("db", mockDb);
  });
});

jest.mock("../../src/plugin/helper/migration", () => jest.fn().mockResolvedValue(0));

describe("Test temp test route", () => {
  beforeAll(async () => {
    app = build({ logger: false });
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should create a new test record", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/test",
      payload: {
        title: "Test Title",
      },
    });
    expect(response.statusCode).toBe(201);
    const responseData = JSON.parse(response.payload);
    expect(responseData).toHaveProperty("id");
    expect(responseData.title).toBe("Test Title");
  });

  it("should fetch all test records", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/test",
    });
    expect(response.statusCode).toBe(200);
    const { tests } = JSON.parse(response.payload);
    expect(Array.isArray(tests)).toBe(true);
    expect(tests.length).toBeGreaterThan(0);
  });
});
