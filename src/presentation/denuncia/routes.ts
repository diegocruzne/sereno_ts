import { Router } from "express";
import { DenunciaController } from "./controller";
import { ValidateJwtMiddleware } from "../middlewares/validate-jwt.middleware";

export class DenunciaRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new DenunciaController();
    const token = new ValidateJwtMiddleware();

    router.get("/", token.validateJwt, controller.listarDenuncias);
    router.get(
      "/buscar_by_date",
      token.validateJwt,
      controller.buscarDenunciasPorFecha
    );
    router.post("/", token.validateJwt, controller.registrarDenuncia);

    return router;
  }
}
