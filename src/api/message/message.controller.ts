import { Request, RequestHandler, Response } from 'express';
import { MessageService } from './message.service.js';

class MessageController {
  private messageService;
  constructor() {
    this.messageService = new MessageService();
  }

  getPublicMessages: RequestHandler = async (req: Request, res: Response) => {
    try {
      const parametar = { id: parseInt(req.params.id_r) };
      if (isNaN(parametar.id)) {
        throw new Error('You entered wrong parameters!');
      }
      const messages = await this.messageService.getPublicMessages(parametar.id);
      res.status(200).json(
        messages
      );
    }
    catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[message.controller][getPublicMessages][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }

  getPrivateMessages: RequestHandler = async (req: Request, res: Response) => {
    try {
      const canIadd = await this.messageService.hasRightToPost({
        id_u: req.body.id_u,
        id_r: req.body.id_r,
      });

      if (canIadd === false)
        throw new Error('You have not rights to post the message in that chat room!');

      const messages = await this.messageService.getPrivateMessages(req.body.id_r);
      res.status(200).json(
        messages
      );
    }
    catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[message.controller][getPrivateMessages][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }

  getPersonalMessages: RequestHandler = async (req: Request, res: Response) => {
    try {
      const canIadd = await this.messageService.hasRightToPost({
        id_u: req.body.id_u,
        id_r: req.body.id_r,
      });

      if (canIadd === false)
        throw new Error('You have not rights to post the message in that chat room!');

      const messages = await this.messageService.getPrivateMessages(req.body.id_r);
      res.status(200).json(
        messages
      );
    }
    catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[message.controller][getPersonalMessages][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }

  addMessage: RequestHandler = async (req: Request, res: Response) => {
    try {
      const canIadd = await this.messageService.hasRightToPost({
        id_u: req.body.id_u,
        id_r: req.body.id_r,
      });

      if (canIadd === false)
        throw new Error('You have not rights to post the message in that chat room!');

      const message = await this.messageService.addMessage({
        id_u: req.body.id_u,
        id_r: req.body.id_r,
        content: req.body.content
      })

      res.status(200).json({
        message
      });
    }
    catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[message.controller][addMessage][Error] ', message);
      res.status(500).json({
        error: message
      });
    }

  }
}

export default new MessageController();