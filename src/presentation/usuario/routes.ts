import { Router } from "express";
import { UsuarioController } from "./controller";
import { ValidateJwtMiddleware } from "../middlewares/validate-jwt.middleware";

export class UsuarioRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new UsuarioController();
    const token = new ValidateJwtMiddleware();

    router.put("/:id", token.validateJwt, controller.updateMyUser);

    return router;
  }
}
