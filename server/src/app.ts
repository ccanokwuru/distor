import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "fastify-autoload";
import { FastifyPluginAsync } from "fastify";
import fastifyCors from "fastify-cors";
import { fastifyJwt } from "fastify-jwt";
import { fastifyCookie, FastifyCookieOptions } from "fastify-cookie";
import fastifyBcrypt from "fastify-bcrypt";

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!
  fastify.register(fastifyJwt, {
    secret: "distor",
  });

  fastify.register(fastifyCors, {
    origin: "*",
    allowedHeaders: ["Authorization", "Content-Type"],
  });

  fastify.register(fastifyCookie, {
    secret: "fastCookie",
    parseOptions: {},
  } as FastifyCookieOptions);

  fastify.register(fastifyBcrypt, {
    saltWorkFactor: 10,
  });
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
};

export default app;
export { app };
