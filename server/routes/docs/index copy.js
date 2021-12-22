"use strict";
// const setupWSConnection = require("y-websocket/bin/utils.js").setupWSConnection;

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

  fastify.register(require("fastify-websocket"));
  fastify.get("/share", { websocket: true }, async (conn, req) => {
    // fastify.socket.on("connection", setupWSConnection);

    // fastify.on("upgrade", (request, socket, head) => {
    //   // You may check auth of request here..
    //   /**
    //    * @param {any} ws
    //    */
    //   const handleAuth = (ws) => {
    //     fastify.socket.emit("connection", ws, request);
    //   };
    //   fastify.socket.handleUpgrade(request, socket, head, handleAuth);
    // });

    return { share: true };
  });
};
