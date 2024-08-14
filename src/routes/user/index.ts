import { Router } from "express";
import {
  getLoggedusersAddress,
  updateuserAddress,
} from "../../controllers/user";
import { rootErrorHandler } from "../../root-error-handler";

const router = Router();
router
  .route("/address")
  .get(rootErrorHandler(getLoggedusersAddress))
  .post(rootErrorHandler(updateuserAddress));
export { router as userRoutes };
