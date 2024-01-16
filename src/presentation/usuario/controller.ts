import { Request, Response } from "express";

import { ConnectionMysql } from "../../data";
import { envs } from "../../config/envs";
import { CustomRequest } from "../../data/mysql/interfaces/custom-request.interface";
import { usuarioQuery } from "../../data/mysql/queries/usuario.query";

export class UsuarioController {
  private readonly connectionMysql = new ConnectionMysql();
  constructor() {}

  updateMyUser = async (req: CustomRequest, res: Response) => {
    const {
      nombre,
      apellidos,
      nacimiento,
      correo,
      direccion,
      telefono,
      sexo,
      dni,
    } = req.body;
    const { id } = req.params;

    const conn = await this.connectionMysql.connection();

    const result = await conn.query(usuarioQuery.updateMeUser, [
      dni,
      nombre,
      apellidos,
      nacimiento,
      correo,
      direccion,
      telefono,
      sexo,
      id,
    ]);

    res.json(result);
  };
}
