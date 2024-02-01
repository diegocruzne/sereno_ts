import { Request, Response } from "express";

export class WsPatrullajeController {
  getPatrullajes = async (req: Request, res: Response) => {
    const ws = new WebSocket("ws://localhost:3000");

    res.json("getPatrullajes");
  };
}
