import {
  initializePayment as paystackInit,
  verifyPayment as paystackVerify,
} from "../utils/paystack.js";
import Order from "../model/order.js";

// Initialize Paystack payment
export const initializePayment = async (req, res) => {
  try {
    const { amount, email, items, user, billingDetails } = req.body;

    if (!amount || !email || !items || !user || !billingDetails) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const reference = `psk_${Date.now()}`;
    const callback_url = `${process.env.PAYSTACK_CALLBACK_URL}/api/payments/verify/${reference}`;

    // Create a pending order
    const order = new Order({
      user,
      items,
      amount,
      status: "pending",
      paystackReference: reference,
      email,
      billingDetails,
    });
    await order.save();

    // Initialize payment
    const paystackRes = await paystackInit({
      amount: amount * 100,
      email,
      reference,
      callback_url,
    });

    res.status(200).json({
      authorization_url: paystackRes.authorization_url,
      reference,
      orderId: order._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify Paystack payment
export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;
    const paystackRes = await paystackVerify(reference);
    if (paystackRes.status === "success") {
      // Update order status
      await Order.findOneAndUpdate(
        { paystackReference: reference },
        { status: "paid" }
      );
      return res.status(200).json({ status: "success", paystackRes });
    } else {
      await Order.findOneAndUpdate(
        { paystackReference: reference },
        { status: "failed" }
      );
      return res.status(400).json({ status: "failed", paystackRes });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
