import { Request, RequestHandler, Response } from 'express';
import { AuthService } from './auth.service.js';

class AuthController {
  private authService;
  constructor() {
    this.authService = new AuthService();
  }

  createNewUser: RequestHandler = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.create({
        name: req.body.name,
        pass: req.body.pass,
      });

      res.status(200).json({
        user
      });
    } catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[auth.controller][createNewUser][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }

  loginUser: RequestHandler = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.get(req.body.name);

      // @ts-ignore - user is User here
      if (user.pass !== req.body.pass) {
        throw new Error("Wrong password.");
      } else {
        res.status(200).json({
          user
        });
      }
    } catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[auth.controller][loginUser][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }
}

export default new AuthController();