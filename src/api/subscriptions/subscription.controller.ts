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
}

export default new SubscriptionController();