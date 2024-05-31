import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
} from "../../controllers/categories";
import { rootErrorHandler } from "../../root-error-handler";

const router = Router();

router.get("/", rootErrorHandler(getAllCategories));
router.get("/category/:id", rootErrorHandler(getCategoryById));

export { router as categoryRouter };
