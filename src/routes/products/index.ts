import { Router } from "express";
import { adminRoleCheck, sellerRoleCheck } from "../../middlewares/roles";
import { rootErrorHandler } from "../../root-error-handler";
import {
  getProductById,
  updateProduct,
  addProduct,
} from "../../controllers/products";
import { uploadProductImage } from "../../config/configOptions";

const router = Router();

router
  .route("/product/:id")
  .get(rootErrorHandler(getProductById))
  .patch([sellerRoleCheck, adminRoleCheck], rootErrorHandler(updateProduct));

router.post(
  "/product",
  [sellerRoleCheck, adminRoleCheck, uploadProductImage.array("images")],
  rootErrorHandler(addProduct)
);
export { router as productRoutes };
