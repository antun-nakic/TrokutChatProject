import { PrismaClient } from '@prisma/client';
import { User as UserModel } from "@prisma/client";
import { IUserModify } from './user.model.js';

export class UserService {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll(): Promise<UserModel[] | Error> {
    try {
      const users: UserModel[] = await this.prisma.user.findMany();

      return users;
    }
    catch (error) {
      console.error('[user.service][getAll][Error]: ', error);
      throw new Error('Database query error.');
    }
  }

  async getOne(parametar: object): Promise<UserModel | Error> {
    try {
      const user: UserModel | null = await this.prisma.user.findUnique({
        where: parametar
      });

      if (user === null)
        throw new Error("User does not exist.");

      return user;
    }
    catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[user.service][getOne][Error]: ', message);
      throw new Error(message);
    }
  }

  // @ts-ignore
  async modify(newData: IUserModify): Promise<UserModel | Error> {
    try {
      const user: UserModel | null = await this.prisma.user.findUnique({
        where: {
          id: newData.id
        },
      });
      if (user === null)
        throw new Error("User does not exist.");
      else if (user.pass !== newData.currentPass)
        throw new Error("Wrong password provided");

      const updateUser = await this.prisma.user.update({
        where: {
          id: newData.id,
        },
        data: {
          pass: newData.pass || user.pass,
          avatar: newData.avatar || user.avatar,
        },
      })

      if (typeof (updateUser) === "undefined")
        throw new Error("Failed to modify user");

      return updateUser;
    }
    catch (error) {
      console.error('[user.service][modify][Error]: ', error);
      throw new Error('Failed to modify user. Database query error.');

    }
  }
};