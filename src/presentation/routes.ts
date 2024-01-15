import { Router } from "express";
import { TurnoRoutes } from "./turno/routes";
import { AuthRoutes } from "./auth/routes";
import { PingRoutes } from "./ping/routes";
import { SerenoRoutes } from "./sereno/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/ping", PingRoutes.routes);
    router.use("/api/turnos", TurnoRoutes.routes);
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/serenos", SerenoRoutes.routes);

    return router;
  }
}
