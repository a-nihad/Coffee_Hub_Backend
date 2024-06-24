import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createOrder = catchAsync(async (req, res, next) => {
  const { products } = req.body;

  if (!products)
    return next(new AppError("Please provide all required field", 400));

  // Check the product availability
  for (let product of products) {
    if (product.availability < product.quantity)
      return next(new AppError(`${product.name} is out of stock`, 400));
  }

  // Update the product availability
  for (let product of products) {
    await Product.findByIdAndUpdate(
      product.product,
      {
        $inc: { availability: -product.quantity },
      },
      { new: true }
    );
  }

  // Create Order
  const newOrder = await Order.create({
    customerId: req.user._id,
    customer: req.user.userName,
    products,
  });

  res.status(201).json({
    status: "success",
    message: "Successfully created new order",
    order: newOrder,
  });
});

export const getOrders = catchAsync(async (req, res, next) => {
  // Search Order
  let search = "";
  if (req.query.search) {
    search = req.query.search;
  }

  const queryObject = {
    $or: [
      { customer: { $regex: search, $options: "i" } },
      { orderStatus: { $regex: search, $options: "i" } },
    ],
  };

  const orders = await Order.find(queryObject);

  res.status(200).json({
    status: "success",
    message: "All orders",
    orders,
  });
});

export const updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new AppError("No document found with that ID", 400));

  // Update the product availability
  if (req.body.orderStatus === "cancelled") {
    for (let product of order.products) {
      await Product.findByIdAndUpdate(
        product.product,
        {
          $inc: { availability: product.quantity },
        },
        { new: true }
      );
    }
  }

  await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: "Order successfully updated",
    order,
  });
});

export const deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new AppError("No document found with that ID", 400));

  // Update the product availability
  if (order.orderStatus !== "cancelled") {
    for (let product of order.products) {
      await Product.findByIdAndUpdate(
        product.product,
        {
          $inc: { availability: product.quantity },
        },
        { new: true }
      );
    }
  }

  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Order successfully deleted",
    order: null,
  });
});

export const viewOrder = catchAsync(async (req, res, next) => {
  const order = await Order.find({ customerId: req.user._id });

  res.status(200).json({
    status: "success",
    message: "View user orders",
    order,
  });
});
