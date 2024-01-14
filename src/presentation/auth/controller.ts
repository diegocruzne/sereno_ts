import { Request, Response } from "express";
import { CustomRequest } from "../../data/mysql/interfaces/custom-request.interface";
import { ConnectionMysql } from "../../data";
import { AuthUser } from "../../data/mysql/interfaces/auth.interface";
import { authQuery } from "../../data/mysql/queries/auth.query";
import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";

export class AuthController {
  private readonly connectionMysql = new ConnectionMysql();

  login = async (req: Request, res: Response) => {
    const { dni, password } = req.body;

    try {
      const conn = await this.connectionMysql.connection();

      const [response] = await conn.query<AuthUser[]>(
        authQuery.findUserByDni,
        dni
      );

      if (response.length === 0)
        return res.status(400).json({
          ok: false,
          msg: "Dni no existe",
        });

      const passBd = response[0].contrasena;
      const idUserBd = response[0].id_usuario;

      const missingMatch: boolean = BcryptAdapter.compare(password, passBd);

      if (!missingMatch)
        return res.status(400).json({
          ok: false,
          msg: "Contraseña incorrecta",
        });

      const token = await JwtAdapter.generateToken({ id: idUserBd }, "24h");

      if (!token)
        return res.status(500).json({
          ok: false,
          msg: "Error al generar token",
        });

      res.json({
        ok: true,
        token,
      });

      await conn.end();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        message: "Error interno del servidor",
      });
    }
  };

  renewToken = async (req: CustomRequest, res: Response) => {
    if (!req.id) {
      return res.status(400).json({
        ok: false,
        msg: "No se pudo obtener el id del usuario",
      });
    }

    try {
      const token = await JwtAdapter.generateToken({ id: req.id }, "24h");

      const conn = await this.connectionMysql.connection();

      const [usuario] = await conn.query<AuthUser[]>(
        authQuery.findUserById,
        req.id
      );

      res.json({
        ok: true,
        token,
        usuario: usuario[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        message: "Error interno del servidor",
      });
    }
  };
}
