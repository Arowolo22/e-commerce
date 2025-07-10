import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useCart } from "../CartContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { fetchCartCount } = useCart();

  // Fetch cart items
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/cart");
      setCartItems(res.data.cartItems);
      setTotal(res.data.total);
      await fetchCartCount();
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity
  const updateQuantity = async (id, quantity, selectedSize) => {
    if (quantity < 1) return;
    try {
      await axios.put(`http://localhost:5000/api/cart/update/${id}`, {
        quantity,
        selectedSize,
      });
      fetchCart();
      await fetchCartCount();
    } catch (err) {
      console.error("Failed to update cart item:", err);
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/delete/${id}`);
      fetchCart();
      await fetchCartCount();
    } catch (err) {
      console.error("Failed to delete cart item:", err);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await axios.post("http://localhost:5000/api/cart/clear");
      fetchCart();
      await fetchCartCount();
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-6 gap-8">
        {/* Cart Items */}
        <div className="flex-1 bg-white rounded-lg p-6 shadow">
          <h2 className="text-2xl font-semibold mb-6">
            Shopping Cart{" "}
            <span className="text-gray-400">( {cartItems.length} items )</span>
          </h2>
          {cartItems.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center border-b py-6 gap-6"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-bold text-lg mb-1">{item.name}</div>
                  <div className="text-gray-500 text-sm mb-2">
                    {item.selectedSize && (
                      <span>Size: {item.selectedSize}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="border px-2 py-1 rounded"
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.quantity - 1,
                          item.selectedSize
                        )
                      }
                    >
                      
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      className="border px-2 py-1 rounded"
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.quantity + 1,
                          item.selectedSize
                        )
                      }
                    >
                      +
                    </button>
                
                    <button
                      className="ml-4 text-red-500 hover:text-red-700"
                      onClick={() => deleteItem(item._id)}
                    >
                      <span role="img"  aria-label="delete">
                        🗑️
                      </span>
                    </button>
                  </div>
                </div>
                <div className="text-right min-w-[120px]">
                  <div className="text-lg font-semibold">
                    ₦{item.price.toLocaleString()}
                  </div>
                  <div className="text-gray-500 text-sm">
                    Total: ₦{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Order Summary */}
        <div className="w-full md:w-1/3 bg-white rounded-lg p-6 shadow h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg">Subtotal →</span>
            <span className="text-xl font-bold">${total.toLocaleString()}</span>
          </div>
          <div className="text-gray-500 text-sm mb-6">
            Shipping will be calculated at checkout
          </div>
          <button className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold mb-4 hover:bg-gray-800 transition">
            Check Out
          </button>
          <button
            className="text-gray-500 hover:text-red-600 text-sm float-right"
            onClick={clearCart}
          >
            Clear Cart ?
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
