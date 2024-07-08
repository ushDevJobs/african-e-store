import { Router } from "express";
import { checkout } from "../../controllers/payment";

const router = Router();
router.post("/checkout", checkout);
export { router as paymentRoutes };
