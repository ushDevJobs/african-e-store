import { Router } from "express";
import { authRoute } from "./auth";
import { productRoutes } from "./products";
import { checkAuth } from "../middlewares/auth";
import { storeRoutes } from "./store";
import { categoryRoutes } from "./categories";
import { cartRoutes } from "./cart";
import { orderRoutes } from "./orders";
const router = Router();
router.use("/auth", authRoute);
router.use("/stores", checkAuth, storeRoutes);
router.use("/products", checkAuth, productRoutes);
router.use("/categories", categoryRoutes);
router.use("/cart", checkAuth, cartRoutes);
router.use("/orders", checkAuth, orderRoutes);

export default router;
