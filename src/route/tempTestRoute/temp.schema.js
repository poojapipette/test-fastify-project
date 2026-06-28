const postRequestbody = {
  type: "object",
  required: ["title"],
  properties: {
    title: {
      type: "string",
      minLength: 10,
      description: "Title of the object",
    },
  },
};

const postResponse = {
  201: {
    type: "object",
    required: ["id", "title"],
    properties: {
      id: { type: "string" },
      title: { type: "string" },
    },
  },
};

const tests = {
  type: "array",
  items: {
    ...postResponse[201],
  },
};

const getResponseBody = {
  200: {
    type: "object",
    required: ["tests"],
    properties: {
      tests: tests,
    },
  },
};

module.exports = { postRequestbody, postResponse, getResponseBody };
