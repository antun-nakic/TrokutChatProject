import { Room as RoomModel } from "@prisma/client";

export interface IRoomCreate {
  id: number;
  pass: string;
  title: string;
  desc: string;
  type: RoomModel["type"],
  participants?: Array<number>
}