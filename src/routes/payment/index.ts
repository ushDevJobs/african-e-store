import { Router } from "express";
import { checkout, getAmount, paymentIntent } from "../../controllers/payment";
import { rootErrorHandler } from "../../root-error-handler";

const router = Router();
router.post("/checkout", checkout);
router.post("/pay", rootErrorHandler(paymentIntent));
router.post("/amount", rootErrorHandler(getAmount));
export { router as paymentRoutes };
