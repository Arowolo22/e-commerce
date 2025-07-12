import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, // or ObjectId if you have users
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Made optional for testing
        name: String,
        price: Number,
        imageUrl: String,
        selectedSize: String,
        quantity: Number,
      },
    ],
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paystackReference: { type: String, required: true },
    email: { type: String, required: true },

    // Billing Details
    billingDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true, default: "Nigeria" },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
