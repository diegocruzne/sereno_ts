import { Request, Response } from "express";

import { ConnectionMysql } from "../../data";
import { delitoQuery } from "../../data/mysql/queries/delito.query";

export class DelitoController {
  private readonly connectionMysql = new ConnectionMysql();
  constructor() {}

  getDelitoPorCategorias = async (req: Request, res: Response) => {
    const conn = await this.connectionMysql.connection();

    const [results] = (await conn.query(
      delitoQuery.getDelitoPorCategorias
    )) as any;

    const formattedData: any = this.formatData(results);

    res.send(formattedData);

    await conn.end();
  };

  formatData = (results: any) => {
    const formattedData: any = [];

    results.forEach((data: any) => {
      const existingType = formattedData.find(
        (item: any) => item.tipo_delito === data.tipo_delito
      );

      if (existingType) {
        existingType.delito.push({ id: data.id, nombre: data.nombre });
      } else {
        formattedData.push({
          tipo_delito: data.tipo_delito,
          delito: [{ id: data.id, nombre: data.nombre }],
        });
      }
    });

    return formattedData;
  };
}
