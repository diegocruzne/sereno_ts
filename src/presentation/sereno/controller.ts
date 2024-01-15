import { Request, Response } from "express";

import { ConnectionMysql } from "../../data";
import { serenoQuery } from "../../data/mysql/queries/sereno.query";

export class SerenoController {
  private readonly connectionMysql = new ConnectionMysql();
  constructor() {}

  getSerenos = async (req: Request, res: Response) => {
    try {
      const conn = await this.connectionMysql.connection();

      const [response] = await conn.query(serenoQuery.getAllSerenos);
      res.json(response);

      await conn.end();
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: "Error interno del servidor",
      });
    }
  };

  createSereno = async (req: Request, res: Response) => {
    const {
      dni,
      nombre,
      apellidos,
      genero,
      celular,
      correo,
      direccion,
      nacimiento,
    } = req.body;

    const conn = await this.connectionMysql.connection();

    const [response] = await conn.query(serenoQuery.createSereno, [
      dni,
      nombre,
      apellidos,
      genero,
      celular,
      correo,
      direccion,
      nacimiento,
    ]);

    res.json({
      dni,
      nombre,
      apellidos,
      genero,
      celular,
      correo,
      direccion,
      nacimiento,
    });
  };

  getSerenoById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const conn = await this.connectionMysql.connection();

    const [response] = (await conn.query(
      serenoQuery.getSerenoById,
      id
    )) as Array<any>;

    res.json(response[0]);
  };

  updateSerenoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      dni,
      nombre,
      apellidos,
      genero,
      celular,
      correo,
      direccion,
      nacimiento,
    } = req.body;

    const conn = await this.connectionMysql.connection();

    const [response] = await conn.query(serenoQuery.updateSerenoById, [
      dni,
      nombre,
      apellidos,
      genero,
      celular,
      correo,
      direccion,
      nacimiento,
      id,
    ]);

    res.json({
      dni,
      nombre,
      apellidos,
      genero,
      celular,
      correo,
      direccion,
      nacimiento,
    });
  };

  deleteSereno = async (req: Request, res: Response) => {
    res.json("deleteSereno");
  };

  updateSerenoFkPatrullaje = async (req: Request, res: Response) => {
    const { id_sereno, fk_patrullaje } = req.body;

    const conn = await this.connectionMysql.connection();

    const [response] = await conn.query(serenoQuery.updateSerenoFkPatrullaje, [
      fk_patrullaje,
      id_sereno,
    ]);

    res.status(200).json({
      ok: true,
      msg: "Sereno actualizado",
    });
  };

  deleteSerenoById = async (req: Request, res: Response) => {
    res.json("deleteSerenoById");
  };
}
