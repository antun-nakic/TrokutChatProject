import { PrismaClient } from '@prisma/client';
import { User as UserModel } from "@prisma/client";
import { IUserCreate } from "./auth.model.js";

export class AuthService {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(newUser: IUserCreate): Promise<UserModel | Error> {
    try {
      const user: UserModel = await this.prisma.user.create({
        data: {
          name: newUser.name,
          pass: newUser.pass,
        }
      }
      );
      return user;
    }
    catch (error) {
      console.error('[auth.service][create][Error]: ', error);
      throw new Error('Failed to create new user. Database query error.');
    }
  }

  async get(userName: string): Promise<UserModel | Error> {
    try {
      const user: UserModel | null = await this.prisma.user.findUnique({
        where: {
          name: userName
        },
      });
      if (user === null)
        throw new Error("User does not exist.");

      return user;
    }
    catch (error) {
      console.error('[auth.service][get][Error]: ', error);
      throw new Error('Failed to get user.');
    }
  }
};