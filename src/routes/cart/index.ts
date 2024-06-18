import { Router } from "express";
import {
  addItemToCart,
  deleteItemFromCart,
  getCartItems,
} from "../../controllers/cart";
import { rootErrorHandler } from "../../root-error-handler";
import { checkUserAccessibility } from "../../middlewares/roles";

const router = Router();

router
  .route("/")
  .get(rootErrorHandler(getCartItems))
  .post(rootErrorHandler(addItemToCart))
  .delete(checkUserAccessibility, rootErrorHandler(deleteItemFromCart));
export { router as cartRoutes };
