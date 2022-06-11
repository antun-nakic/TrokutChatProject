import { Request, RequestHandler, Response } from 'express';
import {PrismaClient, User as UserModel} from "@prisma/client";

const prisma = new PrismaClient()

/**
 * Inserts(registers) new user into system
 *
 * @param req Express Request
 * @param res Express Response
 */
export const insertNewUser: RequestHandler = async (req: Request, res:Response)=>{
  const user: UserModel = await prisma.user.create({
    data: {
      name: req.body.name,
      pass: req.body.pass,
    }
  }
  );
  res.status(200).json({
    user
  });
}

/**
 * Login user into system
 *
 * @param req Express Request
 * @param res Express Response
 * 
 * @result user object
 */
 export const loginUser: RequestHandler = async (req: Request, res:Response)=>{
  let response: Object;
  const user: UserModel | null = await prisma.user.findUnique({
    where: {
      name: req.body.name
    },
  });
  if(user && (user.pass === req.body.pass)){
    response = user || {"poruka":"Krivi username ili password"};
  }else{
    response = {"poruka":"Krivi username ili password"}
  }
  res.status(200).json({
    response
  });
}