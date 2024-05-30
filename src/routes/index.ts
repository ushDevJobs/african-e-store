import { Router } from "express";
import { authRoute } from "./auth";
import { productRoutes } from "./products";
import { checkAuth } from "../middlewares/auth";
import { storeRoutes } from "./store";
import { categoryRouter } from "./categories";
const router = Router();
router.use("/auth", authRoute);
router.use("/stores", checkAuth, storeRoutes);
router.use("/products", checkAuth, productRoutes);
router.use("/categories", categoryRouter);

export default router;
