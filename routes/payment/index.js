"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const payment_1 = require("../../controllers/payment");
const router = (0, express_1.Router)();
exports.paymentRoutes = router;
router.post("/checkout", payment_1.checkout);
