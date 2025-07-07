import Cart from "../model/cart.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { product, name, price, imageUrl, selectedSize, quantity } = req.body;
    if (
      !product ||
      !name ||
      !price ||
      !imageUrl ||
      !selectedSize ||
      !quantity
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Check if item already exists (same product and size)
    const existingItem = await Cart.findOne({ product, selectedSize });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }
    const newItem = new Cart({
      product,
      name,
      price,
      imageUrl,
      selectedSize,
      quantity,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all cart items
export const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    // Calculate total price
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    res.status(200).json({ cartItems, total });
  } catch (error) {
    console.error("Fetch cart error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update cart item
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, selectedSize } = req.body;
    const updatedItem = await Cart.findByIdAndUpdate(
      id,
      { quantity, selectedSize },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete cart item
export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.status(200).json({ message: "Cart item deleted" });
  } catch (error) {
    console.error("Delete cart error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Clear all cart items
export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
