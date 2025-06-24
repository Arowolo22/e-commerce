// import mongoose from "mongoose";
// const orderItemSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product",
//     required: true,
//   },
//   quantity: { type: Number, required: true },
// });
// const orderSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true },
//     items: [orderItemSchema],
//     totalPrice: { type: Number, required: true },
//     status: {
//       type: String,
//       enum: ["pending", "paid", "failed"],
//       default: "pending",
//     },
//     paymentReference: { type: String },
//   },
//   { timestamps: true }
// );
// const Order = mongoose.model("Order", orderSchema);
// export default Order;
