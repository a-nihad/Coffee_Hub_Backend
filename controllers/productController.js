import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createProduct = catchAsync(async (req, res, next) => {
  const { name, description, price, category, availability } = req.body;

  if (!name || !description || !price || !category || !availability)
    return next(new AppError("Please provide all required field", 400));

  // Create Product
  const newProduct = await Product.create({
    name,
    description,
    price,
    category,
    availability,
  });

  res.status(201).json({
    status: "success",
    message: "Product creation successfully",
    product: newProduct,
  });
});

export const getProducts = catchAsync(async (req, res, next) => {
  // Search Product
  let search = req.query.search ? req.query.search : "";

  const queryObject = {
    $or: [
      { name: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ],
  };

  const products = await Product.find(queryObject);

  res.status(200).json({
    status: "success",
    message: "All products",
    products,
  });
});

export const updateProducts = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product)
    return next(new AppError("No document found with that ID", 400));

  res.status(200).json({
    status: "success",
    message: "product successfully updated",
    product,
  });
});

export const deleteProducts = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product)
    return next(new AppError("No document found with that ID", 400));

  res.status(200).json({
    status: "success",
    message: "Product successfully deleted",
    product: null,
  });
});
