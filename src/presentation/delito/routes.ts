import { Router } from "express";
import { DelitoController } from "./controller";

export class DelitoRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new DelitoController();

    router.get("/", controller.getDelitoPorCategorias);

    return router;
  }
}
