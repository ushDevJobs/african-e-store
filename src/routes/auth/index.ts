import { Router } from "express";
import {
  register,
  loginAuthError,
  googleAuthError,
  verifyOTP,
  accountStatus,
  logout,
  registerSeller,
} from "../../controllers/auth";
import passport from "passport";
import { rootErrorHandler } from "../../root-error-handler";
import { checkAuth } from "../../middlewares/auth";

const router = Router();

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "login/error",
  }),
  (_, res) =>
    res.status(200).json({ status: true, message: "Login Successful" })
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
    successRedirect: "/",
    failureRedirect: "google/error",
  })
);
router.post("/login/error", rootErrorHandler(loginAuthError));
router.get("/google/error", rootErrorHandler(googleAuthError));
router.post("/register", rootErrorHandler(register));
router.post("/register/seller", rootErrorHandler(registerSeller));
router.post("/verify", rootErrorHandler(verifyOTP));
router.get("/account/status", checkAuth, rootErrorHandler(accountStatus));
router.get("/logout", checkAuth, logout);
export { router as authRoute };
