import { Router } from "express";
import { adminRoleCheck, sellerRoleCheck } from "../../middlewares/roles";
import { rootErrorHandler } from "../../root-error-handler";
import { updateProduct } from "../../controllers/products";

const router = Router();

router
  .route("/product/:id")
  .patch([sellerRoleCheck, adminRoleCheck], rootErrorHandler(updateProduct));
export { router as productRoutes };
