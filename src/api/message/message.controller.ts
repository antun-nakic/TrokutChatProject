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
      if (isNaN(parametar.id))
      {
        throw new Error('You entered wrong parameters!');
      }
      const messages = await this.messageService.getPublicMessages(parametar);
      res.status(200).json(
        messages
      );
    } 
    catch (error) 
    {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[message.controller][getPublicMessages][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }

  getPrivateMessages: RequestHandler = async (req: Request, res: Response) => {
    try 
    {
        const parametar = { id_r: parseInt(req.params.id_r),id_u:parseInt(req.params.id_u)  };
      if (isNaN(parametar.id_r) || isNaN(parametar.id_u))
      {
        throw new Error('You entered wrong parameters!');
      }
        const messages = await this.messageService.getPrivateMessages(parametar);
        res.status(200).json(
            messages
        );
    } 
    catch (error) 
    {
        let message = (error instanceof Error) ? error.message : 'Unknown Error';
        console.error('[message.controller][getPrivateMessages][Error] ', message);
        res.status(500).json({
            error: message
        });
    }
  }

  getPersonalMessages: RequestHandler = async (req: Request, res: Response) => {
    try 
    {
        const parametar = { id_r: parseInt(req.params.id_r),id_u1:parseInt(req.params.id_u1),id_u2:parseInt(req.params.id_u2)  };
      if (isNaN(parametar.id_r) || isNaN(parametar.id_u1) || isNaN(parametar.id_u2))
      {
        throw new Error('You entered wrong parameters!');
      }
        const messages = await this.messageService.getPersonalMessages(parametar);
        res.status(200).json(
          messages
        );
    } 
    catch (error) 
    {
    let message = (error instanceof Error) ? error.message : 'Unknown Error';
    console.error('[message.controller][getPersonalMessages][Error] ', message);
    res.status(500).json({
        error: message
    });
    }
  }

  addMessage: RequestHandler = async (req: Request, res: Response) => {
    const message = await this.messageService.addMessage({
        id: req.body.id,
        id_u: req.body.id_u,
        id_r: req.body.id_r,
        content: req.body.content,
        created_at: req.body.created_at //treba vući sa računala
    })
  }
}

export default new MessageController();