import { Router } from "express";
import { TurnoController } from "./controller";

export class TurnoRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new TurnoController();

    router.get("/", controller.getTurno);

    return router;
  }
}
