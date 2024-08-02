import { Router } from "express";
import { getLoggedusersAddress } from "../../controllers/user";

const router = Router();
router.get("/address", getLoggedusersAddress);
export { router as userRoutes };
