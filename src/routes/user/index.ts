import { Router } from "express";
import { getLoggedusersAddress } from "../../controllers/user";

const router = Router();
router.route("/address").get(getLoggedusersAddress).post();
export { router as userRoutes };
