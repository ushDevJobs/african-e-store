import { Router } from "express";
import { rootErrorHandler } from "../../root-error-handler";
import { approvePaymentByAdmin } from "../../controllers/admin";
import { checkId } from "../../middlewares/roles";

const router = Router();

router.post(
  "/approve-payment/:id",
  checkId,
  rootErrorHandler(approvePaymentByAdmin)
);
// router.route("/orders/").get(rootErrorHandler(getOrders));
// router.get("/order/:id", rootErrorHandler(getOrders));
export { router as adminRoute };
