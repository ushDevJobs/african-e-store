import { Router } from "express";
import { deleteItemFromCart, getCartItems } from "../../controllers/cart";
import { rootErrorHandler } from "../../root-error-handler";
import { checkUserAccessibility } from "../../middlewares/roles";

const router = Router();

router
  .route("/")
  .get(rootErrorHandler(getCartItems))
  .delete(checkUserAccessibility, rootErrorHandler(deleteItemFromCart));
export { router as cartRoutes };
