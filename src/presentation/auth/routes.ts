import { Router } from "express";
import { AuthController } from "./controller";
import { ValidateJwtMiddleware } from "../middlewares/validate-jwt.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AuthController();
    const verifyToken = new ValidateJwtMiddleware();

    router.post("/", controller.login);
    router.get("/", [verifyToken.validateJwt], controller.renewToken);

    return router;
  }
}
