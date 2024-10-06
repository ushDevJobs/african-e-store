import { Router } from "express";
import { rootErrorHandler } from "../../root-error-handler";
import { adminGetOrders, adminGetUsers, approvePaymentByAdmin, fetchSEOPPC, generateBackdatedOrders, generateProducts, generateSEOPPC } from "../../controllers/admin";
import { checkId } from "../../middlewares/roles";
import { bulkCreateSellers } from "../../controllers/auth";



const router = Router();

router.post(
  "/approve-payment/:id",
  checkId,
  rootErrorHandler(approvePaymentByAdmin)
);



router.post("/generate-orders", rootErrorHandler(generateBackdatedOrders));
router.post("/generate-seoppc", rootErrorHandler(generateSEOPPC));
router.get("/fetch-seoppc", rootErrorHandler(fetchSEOPPC));
router.post("/generate-sellers", rootErrorHandler(bulkCreateSellers));
router.post("/generate-products", rootErrorHandler(generateProducts));
router.route("/orders/").get(rootErrorHandler(adminGetOrders));
router.route("/all-users/").get(rootErrorHandler(adminGetUsers));
router.get("/order/:id", rootErrorHandler(adminGetOrders));
export { router as adminRoute };
