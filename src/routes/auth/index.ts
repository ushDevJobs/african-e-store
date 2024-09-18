import { Request, Response, Router } from "express";
import {
  register,
  loginAuthError,
  googleAuthError,
  verifyOTP,
  accountStatus,
  logout,
  registerSeller,
  resendOTP,
  localLoginSuccess,
  googleLoginSuccess,
  registerAdmin,
} from "../../controllers/auth";
import passport from "passport";
import { rootErrorHandler } from "../../root-error-handler";
import { checkAuth } from "../../middlewares/auth";
import { RequestUser } from "../../types";
import { cache } from "../../middlewares/cache";
import { prisma } from "../../prisma";

const router = Router();

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "login/error",
    failureFlash: true,
  }),
  localLoginSuccess
);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "google/error",
    failureFlash: true,
  }),
  googleLoginSuccess
);
router.get("/login/error", rootErrorHandler(loginAuthError));
router.get("/google/error", rootErrorHandler(googleAuthError));
router.post("/register", rootErrorHandler(register));
router.post("/register/admin", rootErrorHandler(registerAdmin));
router.post("/register/seller", rootErrorHandler(registerSeller));
router.post("/verify", rootErrorHandler(verifyOTP));
router.get("/resend", rootErrorHandler(resendOTP));
router.get("/account/status", checkAuth, rootErrorHandler(accountStatus));
router.get("/logout", checkAuth, logout);
export { router as authRoute };
