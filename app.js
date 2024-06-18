import cors from "cors";
import express from "express";
import morgan from "morgan";

import authRoute from "./routes/authRoute.js";
import orderRoute from "./routes/orderRoute.js";
import productRoute from "./routes/productRoute.js";
import { globalErrorHandler } from "./controllers/errorController.js";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));

// ROUTES
app.use("/api", authRoute);
app.use("/api/orders", orderRoute);
app.use("/api/products", productRoute);

// Error Handling Unhandled Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

export default app;
