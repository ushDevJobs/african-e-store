"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const roles_1 = require("../../middlewares/roles");
const root_error_handler_1 = require("../../root-error-handler");
const products_1 = require("../../controllers/products");
const configOptions_1 = require("../../config/configOptions");
const router = (0, express_1.Router)();
exports.productRoutes = router;
router
    .route("/product/:id")
    .get((0, root_error_handler_1.rootErrorHandler)(products_1.getProductById))
    .patch([roles_1.sellerRoleCheck], (0, root_error_handler_1.rootErrorHandler)(products_1.updateProduct))
    .delete([roles_1.sellerRoleCheck], (0, root_error_handler_1.rootErrorHandler)(products_1.deleteProductById));
router.post("/product", [roles_1.sellerRoleCheck, configOptions_1.uploadProductImage.array("images")], (0, root_error_handler_1.rootErrorHandler)(products_1.addProduct));
router
    .route("/favourite")
    .get((0, root_error_handler_1.rootErrorHandler)(products_1.getFavouriteProducts))
    .post((0, root_error_handler_1.rootErrorHandler)(products_1.addProductToFavourite));
router.delete("/favourite/:id", (0, root_error_handler_1.rootErrorHandler)(products_1.removeProductFromFavourite));
