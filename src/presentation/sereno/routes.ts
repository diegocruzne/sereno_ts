import { Router } from "express";
import { SerenoController } from "./controller";

export class SerenoRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new SerenoController();

    router.get("/", controller.getSerenos);
    router.post("/", controller.createSereno);
    router.get("/:id", controller.getSerenoById);
    router.put("/:id", controller.updateSerenoById);
    //router.get("/", controller.deleteSereno);
    router.put("/patrullaje", controller.updateSerenoFkPatrullaje);
    //router.get("/", controller.deleteSerenoById);

    return router;
  }
}
