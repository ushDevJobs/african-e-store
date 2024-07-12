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
} from "../../controllers/auth";
import passport from "passport";
import { rootErrorHandler } from "../../root-error-handler";
import { checkAuth } from "../../middlewares/auth";
import { RequestUser } from "../../types";

const router = Router();

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "login/error",
    failureFlash: true,
  }),
  (req: Request, res: Response) =>
    res
      .status(200)
      .json({ status: true, message: "Login Successful", data: req.user })
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
  (req, res) => {
    res.redirect(
      `${process.env.CLIENT_URL}${
        (req.user as RequestUser).accountType === "SELLER" ? "/seller" : "/"
      }`
    );
  }
);
router.get("/login/error", rootErrorHandler(loginAuthError));
router.get("/google/error", rootErrorHandler(googleAuthError));
router.post("/register", rootErrorHandler(register));
router.post("/register/seller", rootErrorHandler(registerSeller));
router.post("/verify", rootErrorHandler(verifyOTP));
router.get("/resend", rootErrorHandler(resendOTP));
router.get("/account/status", checkAuth, rootErrorHandler(accountStatus));
router.get("/logout", checkAuth, logout);
export { router as authRoute };
