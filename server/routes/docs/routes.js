"use strict";

module.exports = async (fastify, opts) => {
  // @ts-ignore
  fastify.register(require("fastify-websocket"), {
    options: { clientTracking: true },
  });

  fastify.get("/", async (request, reply) => {
    return { all: true };
  });

  fastify.post("/save", async (request, reply) => {
    return { save: true };
  });

  fastify.post("/delete", async (request, reply) => {
    return { delete: true };
  });
  fastify.post("/new", async (request, reply) => {
    return { new: true };
  });

  fastify.get("/i/:docId", async (request, reply) => {
    return { share: true };
  });

  fastify.get(
    "/share/:docId",
    { websocket: true },
    async (conn, req, params) => {
      const socket = fastify.websocketServer;
      const cursors = [];

      conn.socket.on("message", async (message) => {
        console.log(message);
        socket.clients.forEach((client) => {
          if ((client !== conn.socket && client.readyState) === 1) {
            client.send(message);
          }
        });
      });
    }
  );
};
