import { Router } from "express";
import { deleteItemFromCart } from "../../controllers/cart";
import { rootErrorHandler } from "../../root-error-handler";
import { checkUserAccessibility } from "../../middlewares/roles";
import { getOrders } from "../../controllers/orders";

const router = Router();

router.route("/").get(rootErrorHandler(getOrders));
router.get("/order/:id", rootErrorHandler(getOrders));
export { router as orderRoutes };
