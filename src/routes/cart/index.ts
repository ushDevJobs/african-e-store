import { Router } from "express";
import { getCartDetails } from "../../controllers/cart";
import { rootErrorHandler } from "../../root-error-handler";

const router = Router();

router.get("/", rootErrorHandler(getCartDetails));
export { router as cartRoutes };
