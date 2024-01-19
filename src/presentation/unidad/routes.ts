import { Router } from "express";
import { UnidadController } from "./controller";

export class UnidadRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new UnidadController();

    router.get("/", controller.getUnidades);
    router.get("/:id", controller.getUnidadPorId);
    router.get("/availables/:id_turno", controller.unidadesAvailables);
    router.post("/", controller.crearUnidad);
    router.put("/:id", controller.actualizarUnidad);

    return router;
  }
}
