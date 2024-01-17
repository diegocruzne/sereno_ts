import { RowDataPacket } from "mysql2";

export interface UsuarioData extends RowDataPacket {
  id_usuario: number;
}

export interface CheckUser extends RowDataPacket {
  id_usuario: number;
  dni: string;
  contrasena: string;
  fk_tipo_us: number;
}
