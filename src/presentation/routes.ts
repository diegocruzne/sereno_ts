import { Router } from "express";
import { TurnoRoutes } from "./turno/routes";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/turnos", TurnoRoutes.routes);
    router.use("/api/auth", AuthRoutes.routes);

    return router;
  }
}
