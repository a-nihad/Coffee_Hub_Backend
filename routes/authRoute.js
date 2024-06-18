import express from "express";
import {
  login,
  register,
  resendOtp,
  verifyOtp,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verifyOtp", verifyOtp);
router.post("/resendOtp", resendOtp);

export default router;
