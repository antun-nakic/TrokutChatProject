import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service.js';

class UserController {
  private userService;
  constructor() {
    this.userService = new UserService();
  }

  setAvatar: RequestHandler = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.modify({
        id: req.body.id,
        currentPass: req.body.currentPass,
        avatar: req.body.avatar,
      });

      res.status(200).json({
        user
      });
    } catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[user.controller][setAvatar][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }

  setPassword: RequestHandler = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.modify({
        id: req.body.id,
        currentPass: req.body.currentPass,
        pass: req.body.pass
      });

      res.status(200).json({
        user
      });
    } catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[user.controller][setPassword][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }
}

export default new UserController();