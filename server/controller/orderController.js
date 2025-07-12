import Order from "../model/order.js";

// Create order manually (optional, for admin/testing)
export const createOrder = async (req, res) => {
  try {
    const { user, items, amount, paystackReference, email, billingDetails } =
      req.body;

    if (
      !user ||
      !items ||
      !amount ||
      !paystackReference ||
      !email ||
      !billingDetails
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const order = new Order({
      user,
      items,
      amount,
      paystackReference,
      email,
      billingDetails,
      status: "pending",
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all orders (for admin/testing)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
