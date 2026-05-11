import express from "express"
import estudiantesController from "../controllers/estudiantes.js"

const router = express.Router()

router.route("/").get(estudiantesController.getEstudiantes);

router.route("/:id").put(estudiantesController.putEstudiantes);

router.route("/:id").delete(estudiantesController.deleteEstudiante);

export default router;