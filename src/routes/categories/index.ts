import { Router } from "express";
import {
  getAllCategories,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../../controllers/categories";
import { rootErrorHandler } from "../../root-error-handler";
import { checkAuth } from "../../middlewares/auth";

const router = Router();

router.get("/", rootErrorHandler(getCategories));
router.get("/all", rootErrorHandler(getAllCategories));
router.get("/category/:id", rootErrorHandler(getCategoryById));
router.patch("/category/:id", checkAuth, rootErrorHandler(updateCategory));

export { router as categoryRoutes };
