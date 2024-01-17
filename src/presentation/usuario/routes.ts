import { Router } from "express";
import { UsuarioController } from "./controller";
import { ValidateJwtMiddleware } from "../middlewares/validate-jwt.middleware";
import { usuarioValidator } from "../middlewares/validators/usuario.validator";

export class UsuarioRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new UsuarioController();
    const token = new ValidateJwtMiddleware();

    router.put("/:id", token.validateJwt, controller.updateMyUser);
    router.patch("/:id", token.validateJwt, controller.updateUserFromRoot);
    router.post(
      "/change_my_password",
      token.validateJwt,
      usuarioValidator.validateChangePass,
      controller.changeMyPassword
    );
    router.post("/", token.validateJwt, controller.createUser);
    router.get("/", token.validateJwt, controller.getUsers);
    router.get("/:id", token.validateJwt, controller.getUserById);
    router.get("/dni/:dni", token.validateJwt, controller.getUserByDni);

    return router;
  }
}
