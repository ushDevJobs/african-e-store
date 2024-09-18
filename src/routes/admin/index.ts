import { Router } from "express";
import { rootErrorHandler } from "../../root-error-handler";
import { adminGetOrders, approvePaymentByAdmin } from "../../controllers/admin";
import { checkId } from "../../middlewares/roles";

const router = Router();

router.post(
  "/approve-payment/:id",
  checkId,
  rootErrorHandler(approvePaymentByAdmin)
);
router.route("/orders/").get(rootErrorHandler(adminGetOrders));
router.get("/order/:id", rootErrorHandler(adminGetOrders));
export { router as adminRoute };
