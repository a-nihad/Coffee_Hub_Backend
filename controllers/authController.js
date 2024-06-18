import jwt from "jsonwebtoken";
import randomstring from "randomstring";

import User from "../models/userModel.js";
import Auth from "../models/authModel.js";
import AppError from "../utils/appError.js";
import { sendEmail } from "../utils/sendEmail.js";
import { catchAsync } from "../utils/catchAsync.js";

//! Create JWT token‚
const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

//! Generate OTP
const generateOTP = async (email, userName) => {
  const otp = randomstring.generate({
    length: 6,
    charset: "numeric",
  });

  // Send OTP to email
  sendEmail(email, userName, otp);

  const auth = await Auth.findOne({ email });

  if (auth) {
    await Auth.findByIdAndUpdate(auth._id, { otp }, { new: true });
  } else {
    await Auth.create({ email, otp });
  }
};

//! Register
export const register = catchAsync(async (req, res, next) => {
  const { userName, email, password } = req.body;

  // Create user
  const newUser = await User.create({
    userName,
    email,
    password,
  });

  generateOTP(email, userName);

  res.status(201).json({
    status: "success",
    message: "Sending email for OTP verification",
    user: newUser,
  });
});

//! Log In
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password axist
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  // 2) Check if user exists
  const user = await User.findOne({ email });
  if (!user)
    return next(new AppError("This user does not exist, please sign up", 400));

  // 3) Check Password is correct
  if (!(await user.checkPassword(password, user.password)))
    return next(new AppError("Incorrect email or password", 401));

  // 4) Check verify status. If false then resend OTP to mail
  if (user.isVerified === false) {
    generateOTP(email, user.userName);

    res.status(200).json({
      status: "pending",
      message:
        "Pending Email verification, Please check your email for OTP verification",
      user,
    });
  }

  const token = createToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    token,
    user,
  });
});

//! Verify OTP
export const verifyOtp = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  const auth = await Auth.findOne({ email });

  if (!auth) return next(new AppError("Time out, Try resend OTP", 400));

  if (auth.otp !== otp) return next(new AppError("Invalid Otp", 400));

  const user = await User.findOneAndUpdate(
    { email },
    { isVerified: true },
    { new: true }
  );
  const token = createToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Token verification is successfully",
    token,
    user,
  });
});

//! Resend OTP
export const resendOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new AppError("No user found ", 400));

  generateOTP(email, user.userName);

  res.status(200).json({
    status: "success",
    message: "Please check your email",
    user,
  });
});
