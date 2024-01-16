import { Router } from "express";
import { TurnoRoutes } from "./turno/routes";
import { AuthRoutes } from "./auth/routes";
import { PingRoutes } from "./ping/routes";
import { SerenoRoutes } from "./sereno/routes";
import { DelitoRoutes } from "./delito/routes";
import { DenunciaRoutes } from "./denuncia/routes";
import { UsuarioRoutes } from "./usuario/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/ping", PingRoutes.routes);
    router.use("/api/turnos", TurnoRoutes.routes);
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/serenos", SerenoRoutes.routes);
    router.use("/api/delito", DelitoRoutes.routes);
    router.use("/api/denuncia", DenunciaRoutes.routes);
    router.use("/api/usuarios", UsuarioRoutes.routes);

    return router;
  }
}
