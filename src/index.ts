import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import authRouter from "./api/auth/auth.router.js";
import userRouter from "./api/user/user.router.js";
import roomRouter from "./api/room/room.router.js";
import subscriptionRouter from "./api/subscriptions/subscription.router.js";
import messageRouter from "./api/message/message.router.js";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT_BACKEND;

//middelwarei za dobiti body dio post zahtjeva, te za
// potrpati parametre iz GET metode također na req objekt
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ruteri
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);
app.use('/api/subscriptions', subscriptionRouter);
app.use('/api/message', messageRouter);

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});