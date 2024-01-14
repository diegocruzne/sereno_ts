import { NextFunction, Response } from "express";
import { CustomRequest } from "../../data/mysql/interfaces/custom-request.interface";
import jwt from "jsonwebtoken";
import { envs } from "../../config/envs";

interface payload {
  id: number;
  iat: number;
  exp: number;
}

export class ValidateJwtMiddleware {
  public validateJwt = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No hay token en la petición",
      });
    }

    try {
      const { id } = jwt.verify(token, envs.JWT_SECRET) as payload;
      req.id = id;

      next();
    } catch (err) {
      return res.status(401).json({
        ok: false,
        msg: "Token no válido o vencido",
      });
    }
  };
}
