import { PrismaClient} from '@prisma/client';
import { Room as RoomModel, 
        User as UserModel, 
        Message as MessageModel, 
        Sub_Priv as SubPrivModel,
        Sub_Pers as SubPersModel } from "@prisma/client";
import { IMessageCreate } from './message.model.js';

export class MessageService {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getPublicMessages(room: number): Promise<MessageModel[] | Error> 
  {
    try 
    {
        const messages: MessageModel[] = await this.prisma.message.findMany({
            where: {
                id_r: room,
                type: "PUBLIC"
            }
        })

        return messages;
    } 
    catch (error) {
        console.error('[message.service][getPublicMessages][Error]: ', error);
        throw new Error('Database query error.');
      }
  }

  async getPrivateMessages(room: number, user: number): Promise<MessageModel[] | Error>
  {
    try 
    {
        const subPrivate: SubPrivModel | null = await this.prisma.Sub_Priv.findUnique({
            where: {
                id_u: user,
                id_r: room
            }
        })
        if (subPrivate !== null) 
        {
            const messages: MessageModel[] = await this.prisma.message.findMany({
                where: {
                    id_r: room,
                    type: "PRIVATE"
                }
            })
            return messages;
        }
        else
        {
            throw new Error("This room does not exist");
        }
    } 
    catch (error) {
        console.error('[message.service][getPrivateMessages][Error]: ', error);
        throw new Error('Database query error.');
      }
  }

  async getPersonalMessages(room: number, user1: number, user2: number): Promise<MessageModel[] | Error>
  {
    try 
    {
        const subPers: SubPersModel | null = await this.prisma.Sub_Pers.findUnique({
            where: {
                id_u1: user1,
                id_u2: user2,
                id_r: room
            }
        })
        if (subPers !== null) 
        {
            const messages: MessageModel[] = await this.prisma.message.findMany({
                where: {
                    id_r: room,
                    type: "PERSONAL"
                }
            })
            return messages;
        }
        else
        {
            throw new Error("This conversation does not exist");
        }
    } 
    catch (error) {
        console.error('[message.service][getPersonalMessages][Error]: ', error);
        throw new Error('Database query error.');
      }
  }

  // @ts-ignore
  async addMessage(input: IMessageCreate): Promise<MessageModel | Error> {
    try 
    {
        const user: UserModel | null = await this.prisma.user.findUnique({
            where:
            {
                id: input.id_u
            }
        })
        const room: RoomModel | null = await this.prisma.user.findUnique({
            where:
            {
                id: input.id_r
            }
        })

        if ((user === null) && (room === null)) 
        {
            throw new Error("uh");
        }

        const message: MessageModel = this.prisma.message.create({
            data:
            {
                id_u: input.id_u,
                id_r: input.id_r,
                content: input.content,
                created_at: Date.now(),
            }
        })
        return message;
    } 
    catch (error) {
        let message = (error instanceof Error) ? error.message : 'Unknown Error';
        console.error('[message.service][addMessage][Error]: ', message);
        throw new Error(message);
      }
  }
};