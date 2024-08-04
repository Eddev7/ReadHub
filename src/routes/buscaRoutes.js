import { Router } from "express";
import downloadRequired from "../middlewares/downloadRequired";
import BuscaController from "../controllers/BuscaController";

const router = new Router();

router.get('/', downloadRequired, BuscaController.busca);

export default router;