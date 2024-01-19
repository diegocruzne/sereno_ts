import { Request, Response } from "express";

import { ConnectionMysql } from "../../data";
import { unidadQuery } from "../../data/mysql/queries/unidad.query";

export class UnidadController {
  private readonly connectionMysql = new ConnectionMysql();
  constructor() {}

  getUnidades = async (req: Request, res: Response) => {
    try {
      const conn = await this.connectionMysql.connection();

      const [result] = await conn.query(unidadQuery.getUnidades);

      res.json(result);

      await conn.end();
    } catch (error) {}
  };

  getUnidadPorId = async (req: Request, res: Response) => {
    const { id } = req.params;

    const conn = await this.connectionMysql.connection();
    const [result] = await conn.query(unidadQuery.getUnidadPorId, [id]);

    res.json(result);

    await conn.end();
  };

  unidadesAvailables = async (req: Request, res: Response) => {
    const { id_turno } = req.params;

    try {
      const conn = await this.connectionMysql.connection();

      const [result] = (await conn.query(
        unidadQuery.unidadesAvailables
      )) as any;

      const dataFilter: any = result.filter((item: any) => {
        const patrullajes = item.patrullajes_pertenecientes;
        return !patrullajes || !patrullajes.includes(`${id_turno}`);
      });

      res.send(dataFilter);

      await conn.end();
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: "Error inesperado",
      });
    }
  };

  crearUnidad = async (req: Request, res: Response) => {
    const { placa, desc, estado, tipo_uni } = req.body;

    try {
      const conn = await this.connectionMysql.connection();

      const [result] = (await conn.query(
        "SELECT placa FROM unidad WHERE placa = TRIM(?)",
        placa
      )) as Array<any>;

      if (result[0]) {
        return res.status(400).json({
          ok: false,
          msg: "Placa ya existe",
        });
      }

      const rep = await conn.query(
        "INSERT INTO unidad (placa, descripcion, estado, fk_tipo_unidad) VALUES (?, ?, ?, ?)",
        [placa, desc, estado, tipo_uni]
      );

      res.json({
        ok: true,
        unidad: { placa, desc, estado, tipo_uni },
      });

      await conn.end();
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: "Error inesperado",
      });
    }
  };

  actualizarUnidad = async (req: Request, res: Response) => {
    const { placa, desc, estado, tipo_uni } = req.body;
    const { id } = req.params;

    try {
      const conn = await this.connectionMysql.connection();

      const [result] = await conn.query(
        "UPDATE unidad SET placa = ?, descripcion = ?, estado = ?, fk_tipo_unidad = ? WHERE id_unidad = ?",
        [placa, desc, estado, tipo_uni, id]
      );

      return res.json({
        ok: true,
        unidad: { placa, desc, estado, tipo_uni, id },
      });

      await conn.end();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Placa ya existe o error inesperado",
      });
    }
  };
}
