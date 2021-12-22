"use strict";

// @ts-ignore

module.exports = async (fastify, opts) => {
  fastify.get("/", async (request, reply) => {
    return { all: true };
  });

  fastify.get("/save", async (request, reply) => {
    return { save: true };
  });

  fastify.get("/delete", async (request, reply) => {
    return { delete: true };
  });
  fastify.get("/new", async (request, reply) => {
    return { new: true };
  });

  // @ts-ignore
  fastify.register(require("fastify-websocket"));
  fastify.get("/share", { websocket: true }, async (conn, req) => {
    fastify.socket.on("connection", (conn, req) =>
      console.log({ conn: conn, req: req })
    );
    return { share: true };
  });
};
