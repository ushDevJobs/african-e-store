import { Router } from "express";
import { rootErrorHandler } from "../../root-error-handler";
import { approvePaymentByAdmin } from "../../controllers/admin";

const router = Router();

router.post("/accept-payment/:id", rootErrorHandler(approvePaymentByAdmin));
export { router as adminRoute };
