import routerx from "express-promise-router";
import personasController from "../controllers/personas.controller";

const router = routerx();

//rutas para el controlador producto
router.post('/guardarPersona', personasController.addPerson);
router.get("/consultarPersona", personasController.consultarPersona);
router.delete("/eliminarPersona/:id", personasController.eliminarPersona);
router.patch("/updatePersona/:id", personasController.updatePersona);
router.get("/onePersona/:id", personasController.consultarOnePerson);

export default router;