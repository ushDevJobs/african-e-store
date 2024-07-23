import { Router } from "express";
import { rootErrorHandler } from "../../root-error-handler";
import { getOrders } from "../../controllers/orders";

const router = Router();

router.route("/").get(rootErrorHandler(getOrders));
router.get("/order/:id", rootErrorHandler(getOrders));
export { router as orderRoutes };
