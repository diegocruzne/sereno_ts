import { Router } from "express";
import { PingController } from "./controller";

export class PingRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new PingController();

    router.get("/", controller.ping);

    return router;
  }
}
