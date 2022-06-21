import { Request, RequestHandler, Response } from 'express';
import { SubscriptionService } from './subscription.service.js';

class SubscriptionController {
  private subscriptionService;
  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  joinPrivate: RequestHandler = async (req: Request, res: Response) => {
    try {
      const subs = await this.subscriptionService.createPrivate({
        id: req.body.id,
        pass: req.body.pass,
        idRoom: req.body.idRoom,
        idAdd: req.body.idAdd,
      });

      res.status(200).json({
        subs
      });
    } catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[subscription.controller][joinPrivate][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }

  createPersonal: RequestHandler = async (req: Request, res: Response) => {
    try {
      const subs = await this.subscriptionService.createPersonal({
        id_u1: req.body.id_u1,
        pass: req.body.pass,
        id_u2: req.body.id_u2,
      });

      res.status(200).json({
        subs
      });
    } catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[subscription.controller][createPersonal][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }

  getAllPrivate: RequestHandler = async (req: Request, res: Response) => {
    try {
      const parametar = { name: req.params.name };

      const privateRooms = await this.subscriptionService.getAllPrivate(parametar);
      res.status(200).json(
        privateRooms
      );
    } catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[subscription.controller][getAllPrivate][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }

  getAllPersonal: RequestHandler = async (req: Request, res: Response) => {
    try {
      const parametar = { name: req.params.name };

      const personalRooms = await this.subscriptionService.getAllPersonal(parametar);
      res.status(200).json(
        personalRooms
      );
    } catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[subscription.controller][getAllPersonal][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }
}

export default new SubscriptionController();