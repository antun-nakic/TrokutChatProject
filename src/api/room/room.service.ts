import { PrismaClient } from '@prisma/client';
import { Room as RoomModel, User as UserModel } from "@prisma/client";
import { IRoomCreate } from './room.model.js';

export class RoomService {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllPublic(): Promise<RoomModel[] | Error> {
    try {
      const rooms: RoomModel[] = await this.prisma.room.findMany({
        where: {
          type: 'PUBLIC'
        }
      });

      return rooms;
    }
    catch (error) {
      console.error('[room.service][getAllPublic][Error]: ', error);
      throw new Error('Database query error.');
    }
  }

  // @ts-ignore
  async create(input: IRoomCreate): Promise<RoomModel | Error> {
    try {
      const user: UserModel | null = await this.prisma.user.findUnique({
        where: {
          id: input.id
        },
      });
      if (user === null)
        throw new Error("User does not exist.");
      else if (user.pass !== input.pass)
        throw new Error("Wrong password provided");

      const room: RoomModel = await this.prisma.room.create({
        data: {
          title: input.title,
          desc: input.desc,
          type: input.type,
        }
      }
      );
      return room;
    }
    catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[room.service][create][Error]: ', message);
      throw new Error(message);
    }
  }
};