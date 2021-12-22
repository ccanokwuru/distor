'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { login: true }
  });
  
  fastify.get('/register', async function (request, reply) {
    return { register: true }
  });
}
