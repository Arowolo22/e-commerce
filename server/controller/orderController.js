// import Order from "../model/order.js";
// import Cart from "../model/cart.js";
// import Product from "../model/product.js";
// import { initializePayment, verifyPayment } from "../utils/paystack.js";

// // Handle checkout: create order, calculate total, and initiate Paystack payment
// export const checkout = async (req, res) => {
//   const { userId, email } = req.body;
//   try {
//     // Find the user's cart and populate product details
//     const cart = await Cart.findOne({ userId }).populate("items.product");
//     if (!cart || cart.items.length === 0)
//       return res.status(400).json({ error: "Cart is empty" });
//     let totalPrice = 0;
//     // Calculate total price for all items in the cart
//     cart.items.forEach((item) => {
//       totalPrice += item.product.price * item.quantity;
//     });
//     // Create a new order with the cart items
//     const order = new Order({
//       userId,
//       items: cart.items.map((item) => ({
//         product: item.product._id,
//         quantity: item.quantity,
//       })),
//       totalPrice,
//       status: "pending",
//     });
//     await order.save();
//     // Prepare payment data for Paystack
//     const paymentData = {
//       amount: totalPrice * 100, // Paystack expects amount in kobo
//       email,
//       reference: order._id.toString(),
//       callback_url: `${process.env.BASE_URL}/api/orders/paystack/webhook`,
//     };
//     // Initialize payment with Paystack
//     const payment = await initializePayment(paymentData);
//     order.paymentReference = payment.reference; // Save payment reference
//     await order.save();
//     // Return the payment URL to the client
//     res.json({ paymentUrl: payment.authorization_url, orderId: order._id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Handle Paystack webhook to confirm payment and update order status
// export const handlePaystackWebhook = async (req, res) => {
//   try {
//     const event = req.body;
//     // Check if the event is a successful charge
//     if (event.event === "charge.success") {
//       const reference = event.data.reference;
//       // Find the order by payment reference
//       const order = await Order.findOne({ paymentReference: reference });
//       if (order && order.status !== "paid") {
//         order.status = "paid"; // Update order status to paid
//         await order.save();
//       }
//     }
//     res.sendStatus(200); // Respond to Paystack
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
