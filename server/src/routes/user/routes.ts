import { Prisma, PrismaClient } from "@prisma/client";
import { FastifyPluginAsync } from "fastify";
import { ISignin, ISignup, IUser } from "../../interfaces";

const prisma = new PrismaClient();
const userRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{ Body: ISignup }>("/register", async function (request, reply) {
    const { email, password, name, documents, confirm } = request.body;
    if (!email.length && !password.length && !confirm.length)
      return reply.code(401).send({ msg: "missing fields" });
    if (password !== confirm)
      return reply.code(401).send({ msg: "passwords do not match" });

    const hash = await fastify.bcrypt.hash(password);

    const docData = documents?.map((document: Prisma.DocumentCreateInput) => {
      return {
        title: document?.title,
        content: document?.content,
        slug: document?.slug,
      };
    });

    const result = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        documents: {
          create: docData,
        },
      },
    });

    if (!result) return reply.code(409).send({ msg: "user already exits" });

    const userInfo = {
      name: result.name,
      email: result.email,
    };

    const token = fastify.jwt.sign(userInfo);
    reply.code(201).setCookie("token", token, {
      httpOnly: true,
      path: "/",
      signed: true,
    });
    return {
      user: userInfo,
    };
  });

  fastify.post<{ Body: ISignin }>("/login", async function (request, reply) {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return reply.code(401).send({ msg: "user not found" });

    const match = await fastify.bcrypt.compare(password, user?.password);

    if (!match) {
      return reply.code(401).send({ msg: "email or password is wrong" });
    }
    const userInfo = {
      name: user.name,
      email: user.email,
    };
    const token = fastify.jwt.sign(userInfo);

    reply.code(200).setCookie("token", token, {
      httpOnly: true,
      signed: true,
    });

    return {
      user: userInfo,
    };
  });

  fastify.post("/logout", async function (request, reply) {
    reply.clearCookie("token");

    return {
      msg: "Logout Successful",
    };
  });

  fastify.get("/", async function (request, reply) {
    const users = await prisma.user.findMany();

    if (!users) return reply.code(404).send({ msg: "users not found" });

    let allUsers: {
      id: number;
      name: string | null;
      email: string;
    }[] = [];

    users.forEach((user) => {
      const userInfo = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      allUsers.push(userInfo);
    });

    return reply.send(allUsers);
  });

  fastify.get<{ Params: IUser }>("/:id", async function (request, reply) {
    const { uid } = request.params;

    const user = await prisma.user.findUnique({
      where: {
        id: uid,
      },
    });

    if (!user) return reply.code(404).send({ msg: "user not found" });

    return reply.send(user);
  });
};

export default userRoute;
