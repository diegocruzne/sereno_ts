import { NextFunction, Request, Response } from "express";

import { ConnectionMysql } from "../../data";

export class TurnoController {
  private readonly connectionMysql = new ConnectionMysql();
  constructor() {}

  getTurno = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conn = await this.connectionMysql.connection();

      const [response] = await conn.query("SELECT * FROM turno");

      res.json(response);

      await conn.end();
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: "Error interno del servidor",
      });
    }
  };
}
