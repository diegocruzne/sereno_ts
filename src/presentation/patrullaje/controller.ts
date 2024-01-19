import { Request, Response } from "express";

import { ConnectionMysql } from "../../data";
import { patrullajeQuery } from "../../data/mysql/queries/patrullaje.query";

export class PatrullajeController {
  private readonly connectionMysql = new ConnectionMysql();
  constructor() {}

  newPatrullaje = async (req: Request, res: Response) => {
    const { desc, turno, unidad } = req.body;

    const conn = await this.connectionMysql.connection();

    // Verificar si la unidad ya está asignada a un turno
    const [result] = (await conn.query(patrullajeQuery.getPatrullajes, [
      turno,
      unidad,
    ])) as Array<any>;

    if (result.length >= 1) {
      return res.status(400).json({
        ok: false,
        msg: "Unidad no disponible en este turno",
      });
    }

    const [response] = await conn.query(patrullajeQuery.newPatrullaje, [
      desc,
      turno,
      unidad,
    ]);

    res.json({
      ok: true,
      msg: "Patrullaje creado!",
    });

    await conn.end();
  };

  getPatrullajePorId = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const conn = await this.connectionMysql.connection();

      const [result] = (await conn.query(
        patrullajeQuery.getDetailsPatrullaje,
        id
      )) as Array<any>;

      res.send(result[0]);

      await conn.end();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Hubo un error",
      });
    }
  };

  details = async (req: Request, res: Response) => {
    try {
      const conn = await this.connectionMysql.connection();

      const [result] = await conn.query(patrullajeQuery.getDetailsPatrullaje2);

      res.send(result);

      await conn.end();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Hubo un error",
      });
    }
  };

  getPatrullajes = async (req: Request, res: Response) => {
    try {
      const conn = await this.connectionMysql.connection();

      const [result] = await conn.query(patrullajeQuery.getDetailsPatrullaje3);

      res.send(result);

      await conn.end();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Hubo un error",
      });
    }
  };
}
