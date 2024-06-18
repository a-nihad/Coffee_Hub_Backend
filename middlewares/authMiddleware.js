import jwt from "jsonwebtoken";
import { promisify } from "util";
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";

//! Protect routes
export const protect = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return next(
        new AppError("You are not logged in! please login to get access.", 400)
      );

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser)
      return next(
        new AppError(
          "The user beloging to this token does no longer exist.",
          400
        )
      );

    // Grant access to protected route
    req.user = currentUser;

    next();
  } catch (err) {
    console.log(err);
  }
};

//! Restict routes
export const restictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You do not have permission to perform this action", 400)
      );

    next();
  };
};
