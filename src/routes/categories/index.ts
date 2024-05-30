import { Router } from "express";
import { getAllCategories } from "../../controllers/categories";
import { rootErrorHandler } from "../../root-error-handler";

const router = Router();

router.get('/', rootErrorHandler(getAllCategories))

export { router as categoryRouter };
