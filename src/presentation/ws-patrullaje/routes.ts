import { Router } from "express";
import { WsPatrullajeController } from "./controller";

export class WsPatrullajeRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new WsPatrullajeController();

    router.get("/test", controller.getPatrullajes);

    return router;
  }
}
