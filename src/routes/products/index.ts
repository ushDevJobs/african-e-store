import { Router } from "express";
import { adminRoleCheck, sellerRoleCheck } from "../../middlewares/roles";
import { rootErrorHandler } from "../../root-error-handler";
import { getProductById, updateProduct } from "../../controllers/products";

const router = Router();

router
  .route("/product/:id")
  .get(rootErrorHandler(getProductById))
  .patch([sellerRoleCheck, adminRoleCheck], rootErrorHandler(updateProduct));
export { router as productRoutes };
