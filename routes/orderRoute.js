import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrder,
  viewOrder,
} from "../controllers/orderController.js";
import { protect, restictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getOrders).post(protect, createOrder);
router.route("/view").get(protect, viewOrder);

router
  .route("/:id")
  .put(protect, restictTo("admin"), updateOrder)
  .delete(protect, restictTo("admin"), deleteOrder);

export default router;
