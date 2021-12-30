"use strict";

// module.exports = async function (fastify, opts) {
//   fastify
//     .register(require("fastify-sequelize"), {
//       instance: "sequelize",
//       autoConnect: true,
//       dialect: "sqlite",
//       storage: "./db/database.db",
//     })
//     .ready();
// };

module.exports = async function (fastify, opts) {
  fastify.register(require("fastify-typeorm-plugin"));
};
