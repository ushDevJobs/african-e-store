import { Router } from "express";
import {
  getAmount,
  handlePaymentSuccess,
  paymentIntent,
} from "../../controllers/payment";
import { rootErrorHandler } from "../../root-error-handler";

const router = Router();
router.post("/pay", rootErrorHandler(paymentIntent));
router.post("/amount", rootErrorHandler(getAmount));
router.get("/success", rootErrorHandler(handlePaymentSuccess));
export { router as paymentRoutes };
