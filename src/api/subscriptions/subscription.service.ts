import { PrismaClient } from '@prisma/client';
import { Sub_Priv as SubPrivModel, Sub_Pers as SubPersModel, User as UserModel, Room as RoomModel } from "@prisma/client";
import { IPrivCreate } from './subscription.model.js';

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
};