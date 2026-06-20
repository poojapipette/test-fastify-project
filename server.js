require("dotenv").config(); // this adds the environment variables from .env file to process.env

const PORT = process.env.PORT || 5000;
const server = require("./src/app")({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  },
});

const start = async () => {
  try {
    await server.listen({ port: PORT, host: "0.0.0.0" });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
