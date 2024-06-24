import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Order must belong to a user"],
  },
  customer: {
    type: String,
    required: [true, "Customer Name is required!"],
  },
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Product is required!"],
      },
      quantity: {
        type: Number,
        default: 1,
        required: [true, "Quantity is required!"],
      },
    },
  ],
  orderStatus: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    required: [true, "Order Status is required!"],
    default: "pending",
  },
  totalPrice: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Modify the order controller to calculate totalPrice
orderSchema.pre("save", async function (next) {
  const order = this;

  let totalPrice = 0;
  for (const product of order.products) {
    const productDoc = await mongoose
      .model("Product")
      .findById(product.product);
    totalPrice += product.quantity * productDoc.price;
  }
  order.totalPrice = totalPrice;
  next();
});

// Populate
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products.product",
    select: "name price category availability createdAt",
  });

  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
