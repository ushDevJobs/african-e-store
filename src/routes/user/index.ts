import { Router } from "express";
import {
  getLoggedusersAddress,
  messageSeller,
  messageSellerForProduct,
  updateuserAddress,
} from "../../controllers/user";
import { rootErrorHandler } from "../../root-error-handler";
import { checkId } from "../../middlewares/roles";

const router = Router();
router
  .route("/address")
  .get(rootErrorHandler(getLoggedusersAddress))
  .post(rootErrorHandler(updateuserAddress));
router.post("/message/:id", checkId, rootErrorHandler(messageSeller));
router.post(
  "/message/product/:id",
  checkId,
  rootErrorHandler(messageSellerForProduct)
);
export { router as userRoutes };
