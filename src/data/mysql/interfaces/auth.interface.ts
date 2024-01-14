import { RowDataPacket } from "mysql2";

export interface AuthUser extends RowDataPacket {
  id_usuario: number;
  dni: string;
  contrasena: string;
  id_tipo_us: number;
}
