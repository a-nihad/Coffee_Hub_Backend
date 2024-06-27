import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
  price: {
    type: Number,
    required: [true, "Price is required!"],
  },
  category: {
    type: String,
    required: [true, "Category is required!"],
  },
  availability: {
    type: Number,
    required: [true, "Availability is required!"],
    default: 1,
  },
  image: {
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
