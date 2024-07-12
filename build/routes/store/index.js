"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRoutes = void 0;
const express_1 = require("express");
const store_1 = require("../../controllers/store");
const root_error_handler_1 = require("../../root-error-handler");
const roles_1 = require("../../middlewares/roles");
const configOptions_1 = require("../../config/configOptions");
const router = (0, express_1.Router)();
exports.storeRoutes = router;
router.get("/all", (0, root_error_handler_1.rootErrorHandler)(store_1.getAllStores));
router.get("/store/id/:id", roles_1.checkStoreId, (0, root_error_handler_1.rootErrorHandler)(store_1.getStoreById));
router.get("/store/id/:id/products", roles_1.checkStoreId, (0, root_error_handler_1.rootErrorHandler)(store_1.getProductsOfStoreById));
router.get("/store/id/:id/categories", roles_1.checkStoreId, (0, root_error_handler_1.rootErrorHandler)(store_1.getCategoriesfromStoreById));
router.get("/store/id/:id/reviews", roles_1.checkStoreId, (0, root_error_handler_1.rootErrorHandler)(store_1.getReviewsForStoreById));
router.get("/search", (0, root_error_handler_1.rootErrorHandler)(store_1.searchForStore));
router.get("/store/categories", [roles_1.sellerRoleCheck, roles_1.checkStore], (0, root_error_handler_1.rootErrorHandler)(store_1.getStoreCategories));
router.get("/store/reviews", [roles_1.sellerRoleCheck, roles_1.checkStore], (0, root_error_handler_1.rootErrorHandler)(store_1.getReviewsForLoggedInUser));
router
    .route("/favourite")
    .get((0, root_error_handler_1.rootErrorHandler)(store_1.getFavouriteStores))
    .post((0, root_error_handler_1.rootErrorHandler)(store_1.addStoreToFavourite));
router.delete("/favourite/:id", (0, root_error_handler_1.rootErrorHandler)(store_1.removeStoreFromFavourite));
router
    .route("/store")
    .get(roles_1.sellerRoleCheck, (0, root_error_handler_1.rootErrorHandler)(store_1.getStoreByUserLogged))
    .post(roles_1.sellerRoleCheck, (0, root_error_handler_1.rootErrorHandler)(store_1.createStore));
router.get("/store/products", [roles_1.sellerRoleCheck, roles_1.checkStore], (0, root_error_handler_1.rootErrorHandler)(store_1.getStoreProducts));
router.get("/store/products/draft", [roles_1.sellerRoleCheck, roles_1.checkStore], (0, root_error_handler_1.rootErrorHandler)(store_1.getStoreDraftProducts));
router.get("/store/search", [roles_1.sellerRoleCheck, roles_1.checkStore], (0, root_error_handler_1.rootErrorHandler)(store_1.searchStoreProducts));
router.patch("/store/description", [roles_1.sellerRoleCheck, roles_1.checkStore], (0, root_error_handler_1.rootErrorHandler)(store_1.updateStoreDescription));
router.patch("/store/profile", [roles_1.sellerRoleCheck, roles_1.checkStore, configOptions_1.uploadStoreImage.single("image")], (0, root_error_handler_1.rootErrorHandler)(store_1.updateStoreProfile));
