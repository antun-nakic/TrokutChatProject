import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service.js';

class UserController {
  private userService;
  constructor() {
    this.userService = new UserService();
  }

  getAll: RequestHandler = async (_: Request, res: Response) => {
    try {
      const users = await this.userService.getAll();
      res.status(200).json(
        users
      );
    } catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[user.controller][getAll][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }

  getById: RequestHandler = async (req: Request, res: Response) => {
    try {
      const parametar = { id: parseInt(req.params.id) };
      if (isNaN(parametar.id))
        throw new Error('You entered wrong parameters!');

      const user = await this.userService.getOne(parametar);
      res.status(200).json(
        user
      );
    } catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[user.controller][getById][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
  }

  getByName: RequestHandler = async (req: Request, res: Response) => {
    try {
      const parametar = { name: req.params.name };

      const user = await this.userService.getOne(parametar);
      res.status(200).json(
        user
      );
    } catch (error) {
      let message = (error instanceof Error) ? error.message : 'Unknown Error';
      console.error('[user.controller][getByName][Error] ', message);
      res.status(500).json({
        error: message
      });
    }
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