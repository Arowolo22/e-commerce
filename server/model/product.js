import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    stockQuantity: { type: Number, required: true },
    size: [{ type: String, required: true }],
    color: [{ type: String, required: true }],
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
 