import { PrismaClient } from '@prisma/client';
import { Sub_Priv as SubPrivModel, User as UserModel } from "@prisma/client";
import { IPrivCreate, IPersCreate, IGet } from './subscription.model.js';

export class SubscriptionService {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  // @ts-ignore
  async createPrivate(input: IPrivCreate): Promise<object | Error> {
    try {
      //Provjeravamo jeli user taj za kojeg se predstavlja
      const user: UserModel | null = await this.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
      if (user === null)
        throw new Error("User does not exist.");
      else if (user.pass !== input.pass)
        throw new Error("Wrong password provided");

      //Provjeravamo dali soba postoji
      const room = await this.prisma.room.findUnique({
        where: { id: input.idRoom }
      })
      if (room === null)
        throw new Error("Room does not exist.");


      //Provjeravamo dali je taj user u toj privatnoj sobi, ako je onda može dodavati nove clanove
      const usersInRoom: SubPrivModel[] = await this.prisma.sub_Priv.findMany({
        where: {
          id_r: input.idRoom
        }
      });
      if (!(usersInRoom.length > 0 && usersInRoom.some(element => element.id_u === input.id)) && usersInRoom.length !== 0)
        throw new Error("You are not in that room and so You cannot add additional people in that room.");

      //adding new subscriptions to private room
      const preparedInserts = input.idAdd.map(element => {
        return { id_u: element, id_r: input.idRoom }
      });
      const subs = await this.prisma.sub_Priv.createMany({
        data: preparedInserts,
        skipDuplicates: true,
      });
      if (subs instanceof Error)
        throw new Error("Error occured while adding participants to private room");

      return subs;
    }
    catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[subscription.service][createPrivate][Error]: ', message);
      throw new Error(message);
    }
  }

  // @ts-ignore
  async createPersonal(input: IPersCreate): Promise<object | Error> {
    try {
      //Provjeravamo jeli user taj za kojeg se predstavlja
      const user: UserModel | null = await this.prisma.user.findUnique({
        where: {
          id: input.id_u1,
        },
      });
      if (user === null)
        throw new Error("User does not exist.");
      else if (user.pass !== input.pass)
        throw new Error("Wrong password provided");

      //Provjeravamo dali personalna soba postoji
      const subscription = await this.prisma.sub_Pers.findUnique({
        where: {
          id_u1_id_u2: {
            id_u1: input.id_u1,
            id_u2: input.id_u2
          }
        }
      })
      if (subscription !== null)
        return subscription

      //otvaramo novu sobu
      const room = await this.prisma.room.create({
        data: {
          desc: "Personalna soba",
          type: 'PERSONAL'
        }
      })

      //adding new subscriptions to personal room
      const preparedInserts = [{ id_u1: input.id_u1, id_u2: input.id_u2, id_r: room.id }, { id_u1: input.id_u2, id_u2: input.id_u1, id_r: room.id }];
      const subs = await this.prisma.sub_Pers.createMany({
        data: preparedInserts,
        skipDuplicates: true,
      });
      if (subs instanceof Error)
        throw new Error("Error occured while adding participants to personal room");

      return subs;
    }
    catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[subscription.service][createPersonal][Error]: ', message);
      throw new Error(message);
    }
  }

  // @ts-ignore
  async getAllPrivate(parametar: IGet): Promise<object | Error> {
    try {
      const data = await this.prisma.user.findUnique({
        where: {
          name: parametar.name
        },
        select: {
          sub_priv: {
            select: {
              room: true
            }
          }
        }
      })

      const preparedAnswer = data?.sub_priv.map(element => {
        return element.room;
      })

      // @ts-ignore
      return preparedAnswer;
    }
    catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[subscription.service][createPersonal][Error]: ', message);
      throw new Error(message);
    }
  }

  // @ts-ignore
  async getAllPersonal(parametar: IGet): Promise<object | Error> {
    try {
      const data = await this.prisma.user.findUnique({
        where: {
          name: parametar.name
        },
        select: {
          sub_pers1: {
            select: {
              id_r: true,
              id_u2: true,
              user2: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      })

      const preparedAnswer = data?.sub_pers1.map(element => {
        return { id_friend: element.id_u2, name_friend: element.user2.name, id_room: element.id_r };
      })

      // @ts-ignore
      return preparedAnswer;
    }
    catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[subscription.service][createPersonal][Error]: ', message);
      throw new Error(message);
    }
  }
};