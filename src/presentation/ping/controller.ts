import { Request, Response } from "express";

import { ConnectionMysql } from "../../data";
import { envs } from "../../config/envs";

export class PingController {
  private readonly connectionMysql = new ConnectionMysql();
  constructor() {}

  ping = async (req: Request, res: Response) => {
    try {
      const conn = await this.connectionMysql.connection();

      const [response] = await conn.query(
        // `SELECT VERSION();`
        `SELECT table_schema '${envs.DB_DATABASE}', 
        ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Tamaño en MB' 
        FROM information_schema.tables 
        GROUP BY table_schema;`
      );
      res.json(response);

      await conn.end();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        message: "Error interno del servidor",
      });
    }
  };
}
