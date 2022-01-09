import {
  ICreateDoc,
  IDocIdParams,
  IDocSlugParams,
  IDocUserParams,
  ISaveDoc,
} from "./../../interfaces";
import { PrismaClient } from "@prisma/client";
import { FastifyPluginAsync, FastifyRequest } from "fastify";
import websocketPlugin, { SocketStream } from "fastify-websocket";
import * as crypto from "crypto";

const prisma = new PrismaClient();
const docRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(websocketPlugin);

  fastify.get("/", async function (request, reply) {
    const documents = await prisma.document.findMany();

    if (!documents) return { msg: "document creation failed" };

    reply.send(documents);
  });

  fastify.get<{ Querystring: IDocUserParams }>(
    "/user/",
    async function (request, reply) {
      const { id, email } = request.query;
      let documents;
      if (!id && !email)
        return reply.code(401).send({ msg: "sorry you need to log in" });

      if (id && email) {
        const data = await prisma.document.findMany({
          where: {
            OR: [{ id: Number(id) }, { owner: { email } }],
          },
        });

        if (!data) return reply.code(404).send({ msg: "nothing found" });

        documents = data;
      } else if (id && !email) {
        const data = await prisma.document.findMany({
          where: { id: Number(id) },
        });

        if (!data) return reply.code(404).send({ msg: "nothing found" });

        documents = data;
      } else if (!id && email) {
        const data = await prisma.document.findMany({
          where: { owner: { email } },
        });

        if (!data) return reply.code(404).send({ msg: "nothing found" });

        documents = data;
      }

      reply.send(documents);
    }
  );

  fastify.post<{ Body: ICreateDoc }>(
    "/create",
    async function (request, reply) {
      const { title, email } = request.body;
      const slug = `${crypto.randomBytes(12).toString("hex")}${Math.floor(
        Math.random() * 145555
      ).toString(16)}`;

      const document = await prisma.document.create({
        data: {
          title,
          slug,
          owner: { connect: { email: email } },
        },
      });
      if (!document) return { msg: "document creation failed" };

      reply.code(201).send(document);
    }
  );

  fastify.post<{ Body: IDocIdParams }>(
    "/delete",
    async function (request, reply) {
      const { docId } = request.body;

      const document = await prisma.document.delete({
        where: {
          id: docId,
        },
      });

      reply.send(document);
    }
  );

  fastify.get<{ Params: IDocSlugParams }>(
    "/s/:slug",
    async function (request, reply) {
      const { slug } = request.params;

      const document = await prisma.document.findUnique({
        where: {
          slug,
        },
      });
      if (!document) return { msg: "document creation failed" };

      reply.send(document);
    }
  );

  fastify.get<{ Params: IDocIdParams }>(
    "/i/:docId",
    async function (request, reply) {
      const { docId } = request.params;

      const document = await prisma.document.findUnique({
        where: {
          id: Number(docId),
        },
      });
      if (!document) return { msg: "document creation failed" };

      reply.send(document);
    }
  );

  fastify.post<{ Body: ISaveDoc; Params: IDocSlugParams }>(
    "/update/:slug",
    async function (request, reply) {
      const { content } = request.body;
      const { slug } = request.params;

      const document = await prisma.document.update({
        where: {
          slug,
        },
        data: {
          content,
        },
      });
      if (!document)
        return reply.code(404).send({ msg: "document creation failed" });

      reply.send(document);
    }
  );

  fastify.get<{ Params: IDocSlugParams }>(
    "/share/:slug",
    { websocket: true },
    (conn: SocketStream, request: FastifyRequest) => {
      const socket = fastify.websocketServer;

      conn.socket.on("message", (message) => {
        const json = message.toString();
        const { type, data } = JSON.parse(json);

        if (type === "update") {
          socket.clients.forEach((client) => {
            if (client !== conn.socket && client.readyState === 1) {
              client.send(data);
            }
          });
        } else if (type === "save") {
          const { slug, content } = JSON.parse(data);

          prisma.document.update({
            where: {
              slug,
            },
            data: {
              content,
            },
          });
        }
      });
    }
  );

  // const save = (slug: string, content: string) => {
  //   const doc = prisma.document.update({
  //     where: {
  //       slug,
  //     },
  //     data: {
  //       content,
  //     },
  //   });
  //   return doc;
  // };
};

export default docRoute;
