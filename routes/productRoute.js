import express from "express";
import {
  createProduct,
  deleteProducts,
  getProducts,
  updateProducts,
} from "../controllers/productController.js";
import { protect, restictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, restictTo("admin"), createProduct);

router
  .route("/:id")
  .put(protect, restictTo("admin"), updateProducts)
  .delete(protect, restictTo("admin"), deleteProducts);
export default router;
