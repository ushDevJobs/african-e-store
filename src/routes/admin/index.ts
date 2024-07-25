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
export { router as adminRoute };
