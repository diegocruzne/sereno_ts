import mysql, { ConnectionOptions } from "mysql2/promise";
import { envs } from "../../config/envs";

export class ConnectionMysql {
  public data: ConnectionOptions = {
    host: envs.DB_HOST,
    user: envs.DB_USER,
    password: envs.DB_PASSWORD,
    port: envs.DB_PORT,
    database: envs.DB_DATABASE,
  };

  public async connection() {
    try {
      const conn = await mysql.createConnection(this.data);
      return conn;
    } catch (error) {
      console.error("Error connecting to MySQL: ", error); 
      throw error;
    }
  }
}
