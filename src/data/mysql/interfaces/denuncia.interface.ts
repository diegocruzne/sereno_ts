import { RowDataPacket } from "mysql2";

export interface DenunciaDetail extends RowDataPacket {
  id_denuncia: number;
  fecha: string;
  hora: string;
  delito: string;
  dni: string;
}

export interface totalDenuncias extends RowDataPacket {
  total: number;
}
