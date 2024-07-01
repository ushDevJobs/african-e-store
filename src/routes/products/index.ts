import { Router } from "express";
import { sellerRoleCheck } from "../../middlewares/roles";
import { rootErrorHandler } from "../../root-error-handler";
import {
  getProductById,
  updateProduct,
  addProduct,
  deleteProductById,
} from "../../controllers/products";
import { uploadProductImage } from "../../config/configOptions";

const router = Router();

router
  .route("/product/:id")
  .get(rootErrorHandler(getProductById))
  .patch([sellerRoleCheck], rootErrorHandler(updateProduct))
  .delete([sellerRoleCheck], rootErrorHandler(deleteProductById))

router.post(
  "/product",
  [sellerRoleCheck, uploadProductImage.array("images")],
  rootErrorHandler(addProduct)
);
export { router as productRoutes };
