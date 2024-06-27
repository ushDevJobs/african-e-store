import { Router } from "express";
import { adminRoleCheck, sellerRoleCheck } from "../../middlewares/roles";
import { rootErrorHandler } from "../../root-error-handler";
import { getProductById, updateProduct, addProduct } from "../../controllers/products";
import {upload} from "../../config/configOptions"

const router = Router();

router
  .route("/product/:id")
  .get(rootErrorHandler(getProductById))
   .post([sellerRoleCheck, adminRoleCheck,upload.array("images")], rootErrorHandler(addProduct))
  .patch([sellerRoleCheck, adminRoleCheck], rootErrorHandler(updateProduct));
export { router as productRoutes };
