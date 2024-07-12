"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const express_1 = require("express");
const cart_1 = require("../../controllers/cart");
const root_error_handler_1 = require("../../root-error-handler");
const roles_1 = require("../../middlewares/roles");
const router = (0, express_1.Router)();
exports.cartRoutes = router;
router
    .route("/")
    .get((0, root_error_handler_1.rootErrorHandler)(cart_1.getCartItems))
    .post((0, root_error_handler_1.rootErrorHandler)(cart_1.addItemToCart))
    .delete(roles_1.checkUserAccessibility, (0, root_error_handler_1.rootErrorHandler)(cart_1.deleteItemFromCart));
