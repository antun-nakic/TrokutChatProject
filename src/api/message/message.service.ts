import { PrismaClient } from '@prisma/client';
import {
    Room as RoomModel,
    Message as MessageModel,
    Sub_Priv as SubPrivModel
} from "@prisma/client";
import { IMessageCreate, IMessageCheckRight } from './message.model.js';

export class MessageService {
    private prisma;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getPublicMessages(roomId: number): Promise<MessageModel[] | Error> {
        try {
            // @ts-ignore
            const room: RoomModel = await this.prisma.room.findMany({
                where: {
                    id: roomId,
                    type: 'PUBLIC'
                }
            })
            if (room !== null) {
                const messages: MessageModel[] = await this.prisma.message.findMany({
                    where: {
                        id_r: roomId,
                    }
                })
                return messages;
            }
            else {
                throw new Error("This room does not exist");
            }
        }
        catch (error) {
            console.error('[message.service][getPublicMessages][Error]: ', error);
            throw new Error('Database query error.');
        }
    }

    async getPrivateMessages(room: number, user: number): Promise<MessageModel[] | Error> {
        try {
            const subPrivate: SubPrivModel | null = await this.prisma.sub_Priv.findUnique({
                where: {
                    id_u_id_r: {
                        id_u: user,
                        id_r: room
                    }
                }
            })
            if (subPrivate !== null) {
                const messages: MessageModel[] = await this.prisma.message.findMany({
                    where: {
                        id_r: room,
                    }
                })
                return messages;
            }
            else {
                throw new Error("This room does not exist");
            }
        }
        catch (error) {
            console.error('[message.service][getPrivateMessages][Error]: ', error);
            throw new Error('Database query error.');
        }
    }

    async getPersonalMessages(room: number, user1: number, user2: number): Promise<MessageModel[] | Error> {
        try {
            //pronaći dali uopće postoji razgovor tih dvaju sugovornika
            const subPers = await this.prisma.sub_Pers.findUnique({
                where: {
                    id_u1_id_u2: {
                        id_u1: user1,
                        id_u2: user2
                    }
                }
            })

            //ako je sve ispravno dohvaćamo privatne poruke iz te personalne sobe
            if (subPers !== null && room === subPers.id_r) {
                const messages: MessageModel[] = await this.prisma.message.findMany({
                    where: {
                        id_r: room,
                    }
                })
                return messages;
            }
            else {
                throw new Error("Either the conversation doesent exists, or the room id You have provided is wrong.");
            }
        }
        catch (error) {
            console.error('[message.service][getPersonalMessages][Error]: ', error);
            throw new Error('Database query error.');
        }
    }

    async hasRightToPost(input: IMessageCheckRight): Promise<Boolean | Error> {
        try {
            const room: RoomModel | null = await this.prisma.room.findUnique({
                where:
                {
                    id: input.id_r
                }
            })

            if (room === null) {
                throw new Error("Room doesen't exists.");
            }

            let subscription;
            if (room.type === 'PUBLIC')
                return true;
            else if (room.type === 'PRIVATE') {
                subscription = await this.prisma.sub_Priv.findUnique({
                    where: {
                        id_u_id_r: {
                            id_u: input.id_u,
                            id_r: input.id_r
                        }
                    }
                })
            }
            else if (room.type === 'PERSONAL') {
                subscription = await this.prisma.sub_Pers.findFirst({
                    where: {
                        id_u1: input.id_u,
                        id_r: input.id_r
                    }
                })
            }

            if (subscription === null)
                return false
            else
                return true


        }
        catch (error) {
            let message = (error instanceof Error) ? error.message : 'Unknown Error';
            console.error('[message.service][hasRightToPost][Error]: ', message);
            throw new Error(message);
        }
    }

    async addMessage(input: IMessageCreate): Promise<MessageModel | Error> {
        try {
            const message: MessageModel = await this.prisma.message.create({
                data:
                {
                    id_u: input.id_u,
                    id_r: input.id_r,
                    content: input.content,
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