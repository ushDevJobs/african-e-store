"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const passport_1 = __importDefault(require("passport"));
const root_error_handler_1 = require("../../root-error-handler");
const auth_2 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
exports.authRoute = router;
router.post("/login", passport_1.default.authenticate("local", {
    failureRedirect: "login/error",
    failureFlash: true,
}), (req, res) => res
    .status(200)
    .json({ status: true, message: "Login Successful", data: req.user }));
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "google/error",
    failureFlash: true,
}), (req, res) => {
    res.redirect(`http://localhost:2500${req.user.accountType === "SELLER" ? "/seller" : "/"}`);
});
router.get("/login/error", (0, root_error_handler_1.rootErrorHandler)(auth_1.loginAuthError));
router.get("/google/error", (0, root_error_handler_1.rootErrorHandler)(auth_1.googleAuthError));
router.post("/register", (0, root_error_handler_1.rootErrorHandler)(auth_1.register));
router.post("/register/seller", (0, root_error_handler_1.rootErrorHandler)(auth_1.registerSeller));
router.post("/verify", (0, root_error_handler_1.rootErrorHandler)(auth_1.verifyOTP));
router.get("/resend", (0, root_error_handler_1.rootErrorHandler)(auth_1.resendOTP));
router.get("/account/status", auth_2.checkAuth, (0, root_error_handler_1.rootErrorHandler)(auth_1.accountStatus));
router.get("/logout", auth_2.checkAuth, auth_1.logout);
