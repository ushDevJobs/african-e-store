import { Router } from "express";
import { rootErrorHandler } from "../../root-error-handler";
import {
  getAllDeliveredOrders,
  getOrders,
  rateOrder,
} from "../../controllers/orders";
import { checkId } from "../../middlewares/roles";

const router = Router();

router.route("/").get(rootErrorHandler(getOrders));
router.get("/order/:id", rootErrorHandler(getOrders));
router.get("/delivered", rootErrorHandler(getAllDeliveredOrders));
router.post("/order/review/:id", checkId, rootErrorHandler(rateOrder));
export { router as orderRoutes };
