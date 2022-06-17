import { Request, RequestHandler, Response } from 'express';
import { RoomService } from './room.service.js';

class RoomController {
  private roomService;
  constructor() {
    this.roomService = new RoomService();
  }

  getAllPublic: RequestHandler = async (_: Request, res: Response) => {
    try {
      const rooms = await this.roomService.getAllPublic();
      res.status(200).json(
        rooms
      );
    } catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[room.controller][getAllPublic][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }

  createPublic: RequestHandler = async (req: Request, res: Response) => {
    try {
      const room = await this.roomService.create({
        id: req.body.id,
        pass: req.body.pass,
        title: req.body.title,
        desc: req.body.desc,
        type: 'PUBLIC',
      });

      res.status(200).json({
        room
      });
    } catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[room.controller][createPublic][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }
}

export default new RoomController();