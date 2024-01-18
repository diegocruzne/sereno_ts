import { Request, Response } from "express";

import { ConnectionMysql } from "../../data";
import { CustomRequest } from "../../data/mysql/interfaces/custom-request.interface";
import { usuarioQuery } from "../../data/mysql/queries/usuario.query";
import { ResultSetHeader } from "mysql2";
import { BcryptAdapter } from "../../config/bcrypt.adapter";
import {
  UsuarioData,
  CheckUser,
} from "../../data/mysql/interfaces/usuario.interface";
import { JwtAdapter } from "../../config/jwt.adapter";

interface payload {
  id: number;
  iat: number;
  exp: number;
}

export class UsuarioController {
  private readonly connectionMysql = new ConnectionMysql();
  constructor() {}

  updateMyUser = async (req: CustomRequest, res: Response) => {
    try {
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

      const [result] = await conn.query<ResultSetHeader>(
        usuarioQuery.updateMeUser,
        [
          dni,
          nombre,
          apellidos,
          nacimiento,
          correo,
          direccion,
          telefono,
          sexo,
          id,
        ]
      );

      if (result.affectedRows === 1) {  
        await conn.end();
        return res.json({
          ok: true,
          msg: "Usuario actualizado!",
        });
      } else {
        throw new Error("Hubo un conflicto al actualizar el usuario");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: "Error inesperado",
      });
    }
  };

  updateUserFromRoot = async (req: CustomRequest, res: Response) => {
    const {
      dni,
      nombre,
      apellidos,
      correo,
      nacimiento,
      direccion,
      telefono,
      sexo,
      contrasena,
      fk_tipo_us,
    } = req.body;
    const { id } = req.params;

    const passEncri = contrasena ? BcryptAdapter.encrypt(contrasena) : null;

    try {
      const conn = await this.connectionMysql.connection();

      const [result] = await conn.query<ResultSetHeader>(
        usuarioQuery.updateUserFromRoot,
        [
          dni,
          nombre,
          apellidos,
          nacimiento,
          correo,
          direccion,
          telefono,
          sexo,
          passEncri,
          fk_tipo_us,
          id,
        ]
      );

      if (result.affectedRows === 1) {
        await conn.end();
        return res.json({
          ok: true,
          msg: "Usuario actualizado!",
        });
      } else {
        throw new Error("Error al actualizar el usuario");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: "Error inesperado",
      });
    }
  };

  changeMyPassword = async (req: CustomRequest, res: Response) => {
    try {
      const { oldPass, newPass, confirmPass } = req.body;
      const token = req.header("x-token") || "";
      const { id } = (await JwtAdapter.verifyToken(token)) as payload;

      const conn = await this.connectionMysql.connection();

      const [result] = await conn.query<CheckUser[]>(usuarioQuery.getUserById, [
        id,
      ]);

      // Verificar si la contraseña actual es correcta
      const passOldUserDb = result[0].contrasena;
      const missingMatch: boolean = BcryptAdapter.compare(
        oldPass,
        passOldUserDb
      );

      if (!missingMatch) {
        return res.status(400).json({
          ok: false,
          msg: "Verifique su contraseña",
        });
      }

      const newPassEncri = BcryptAdapter.encrypt(newPass);

      const [resultUpdate] = await conn.query<ResultSetHeader>(
        usuarioQuery.updatePass,
        [newPassEncri, id]
      );

      if (resultUpdate.affectedRows === 1) {
        await conn.end();
        return res.json({
          ok: true,
          msg: "Contraseña actualizada",
        });
      } else {
        throw new Error("Error al actualizar la contraseña");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error inesperado",
      });
    }
  };

  createUser = async (req: CustomRequest, res: Response) => {
    try {
      const {
        dni,
        nombre,
        apellido,
        nacimiento,
        contrasena,
        correo,
        direccion,
        telefono,
        sexo,
        adicional,
      } = req.body;

      const conn = await this.connectionMysql.connection();

      const [verifyDate] = await conn.query<UsuarioData[]>(
        usuarioQuery.verifyExistDataUser,
        [dni, correo, telefono]
      );

      if (verifyDate.length > 0) {
        await conn.end();
        return res.status(400).json({
          ok: false,
          msg: "Dni, correo o celular ya existen",
        });
      }

      const passEncri = BcryptAdapter.encrypt(contrasena);

      const [result] = await conn.query<ResultSetHeader>(
        usuarioQuery.createUser,
        [
          dni,
          nombre,
          apellido,
          nacimiento,
          passEncri,
          correo,
          direccion,
          telefono,
          sexo,
          adicional,
        ]
      );

      if (result.affectedRows === 1) {
        return res.json({
          ok: true,
          msg: "Usuario añadido correctamente",
        });
      } else {
        throw new Error("Error al crear el usuario");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error inesperado",
      });
    }
  };

  getUsers = async (req: CustomRequest, res: Response) => {
    try {
      const conn = await this.connectionMysql.connection();

      const [result] = await conn.query(usuarioQuery.getAllUsers);

      res.json(result);
      await conn.end();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error inesperado",
      });
    }
  };

  getUserById = async (req: CustomRequest, res: Response) => {
    try {
      const { id } = req.params;

      const conn = await this.connectionMysql.connection();

      const [result] = (await conn.query(usuarioQuery.getUserById2, id)) as any;

      res.json(result[0]);
      await conn.end();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error inesperado",
      });
    }
  };

  getUserByDni = async (req: CustomRequest, res: Response) => {
    try {
      const { dni } = req.params;

      const conn = await this.connectionMysql.connection();

      const [result] = (await conn.query(
        usuarioQuery.getUserByDni,
        dni
      )) as Array<any>;

      if (result.length === 0) {
        await conn.end();
        return res.status(200).json({
          ok: false,
          msg: "Usuario no encontrado",
        });
      }

      res.json({
        ok: true,
        msg: "Usuario encontrado",  
        usuario: result[0],
      });
      await conn.end();
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: "Ocurrió un error",
      });
    }
  };
}
