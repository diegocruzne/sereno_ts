import { Router } from "express";
import { PatrullajeController } from "./controller";
import { ValidateJwtMiddleware } from "../middlewares/validate-jwt.middleware";

export class PatrullajeRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new PatrullajeController();
    const token = new ValidateJwtMiddleware();

    router.get("/", controller.getPatrullajes);
    router.get("/detalles", controller.details);
    router.get("/:id", controller.getPatrullajePorId);
    router.post("/", token.validateJwt, controller.newPatrullaje);

    return router;
  }
}
