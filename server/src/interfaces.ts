import { Prisma } from "@prisma/client";

export interface ISignup {
  email: string;
  name?: string;
  password: string;
  confirm: string;
  documents?: Prisma.DocumentCreateInput[];
}

export interface ISignin {
  email: string;
  password: string;
}

export interface IUser {
  uid: number;
}

export interface ICreateDoc {
  title: string;
  email: string;
}

export interface ISaveDoc {
  title?: string;
  content: string;
  ownerId?: number;
}

export interface IDocSlugParams {
  slug: string;
}

export interface IDocUserParams {
  email?: string;
  id?: string;
}

export interface IDocIdParams {
  docId: number;
}
