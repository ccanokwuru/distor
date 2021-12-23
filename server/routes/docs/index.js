"use strict";

const setupWSConnection = require("y-websocket/bin/utils.js").setupWSConnection;

module.exports = async (fastify, opts) => {
  // @ts-ignore
  fastify.register(require("fastify-websocket"));

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

  fastify.get("/share", async (request, reply) => {
    return { share: true };
  });

  fastify.get("/share/:docId", { websocket: true }, async (conn, req) => {
    conn.socket.on("connection", setupWSConnection);
  });
};
