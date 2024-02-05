import { Request, Response } from "express";

import { ConnectionMysql } from "../../data";
import { denunciaQuery } from "../../data/mysql/queries/denuncia.query";
import {
  DenunciaDetail,
  totalDenuncias,
} from "../../data/mysql/interfaces/denuncia.interface";
import { CustomRequest } from "../../data/mysql/interfaces/custom-request.interface";
import { ResultSetHeader } from "mysql2";

export class DenunciaController {
  private readonly connectionMysql = new ConnectionMysql();
  constructor() {}

  listarDenuncias = async (req: Request, res: Response) => {
    try {
      const { page, limit } = req.query;

      const pageNumber: number = Number(page) || 1;
      const limitNumber: number = Number(limit) || 10;
      const offset: number = (pageNumber - 1) * limitNumber;

      const conn = await this.connectionMysql.connection();

      const [detailDenuncias] = await conn.query<DenunciaDetail[]>(
        denunciaQuery.getDetalleDenuncias,
        [offset, limitNumber]
      );

      const [total] = await conn.query<totalDenuncias[]>(   
        denunciaQuery.getNumTotalDenuncias
      );

      res.json({
        total: total[0].total,
        denuncias: detailDenuncias,
      });
      await conn.end();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Hubo un error",
      });
    }
  };

  buscarDenunciasPorFecha = async (req: Request, res: Response) => {
    try {
      const { date } = req.query;

      const conn = await this.connectionMysql.connection();

      const [result] = await conn.query<DenunciaDetail[]>(
        denunciaQuery.getDetallesDelitoByFecha,
        date
      );

      const [total] = await conn.query<totalDenuncias[]>(
        denunciaQuery.totalDenunciasByDate,
        date
      );

      res.json({
        total: total[0].total,
        denuncias: result,
      });
      await conn.end();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Hubo un error",
      });
    }
  };

  registrarDenuncia = async (req: Request, res: Response) => {
    const { detalles, direccion, lat, lng, fecha, delito, denunciante, usuario, patrullaje } = req.body;

    try {
      const conn = await this.connectionMysql.connection();

      const [result] = await conn.query<ResultSetHeader>(
        denunciaQuery.registrarDenuncia, 
        [detalles, direccion, fecha, delito, denunciante, usuario, patrullaje, lat, lng]
      );

      if (result.affectedRows === 1) {
        res.json({
          ok: true,
          msg: "Denuncia registrada",
          idDenuncia: result.insertId,
        });
      } else throw new Error('Error al registar la denuncia') 

      await conn.end();
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: `Hubo un error: ${error}`
      });
    };
    
  };
}
