import routerx from "express-promise-router";
import ProductoRouter from "./productos.routes";
import PersonaRouter from "./personas.routes";

const router=routerx();

router.use('/producto',ProductoRouter);
router.use('/persona',PersonaRouter);

export default router;