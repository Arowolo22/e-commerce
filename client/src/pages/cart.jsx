import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { fetchCartCount } = useCart();
  const navigate = useNavigate();

  // Fetch cart items
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/cart");
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
      await api.put(`/api/cart/update/${id}`, {
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
      await api.delete(`/api/cart/delete/${id}`);
      fetchCart();
      await fetchCartCount();
    } catch (err) {
      console.error("Failed to delete cart item:", err);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await api.post("/api/cart/clear");
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
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-3 sm:p-4 md:p-6 gap-4 sm:gap-6">
        {/* Cart Items */}
        <div className="flex-1 bg-white rounded-lg p-3 sm:p-4 md:p-6 shadow">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
            Shopping Cart{" "}
            <span className="text-gray-400">( {cartItems.length} items )</span>
          </h2>
          {cartItems.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center border-b py-4 md:py-6 gap-3 sm:gap-4 overflow-hidden"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0 w-full">
                  <div className="font-bold text-sm sm:text-base md:text-lg mb-1 truncate">
                    {item.name}
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
                    {item.selectedSize && (
                      <span>Men / {item.selectedSize} / grey</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
                    <div className="flex items-center border rounded">
                      <button
                        className="px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base md:text-lg min-w-[36px] sm:min-w-[40px] min-h-[36px] sm:min-h-[40px] flex items-center justify-center touch-manipulation hover:bg-gray-100"
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity - 1,
                            item.selectedSize
                          )
                        }
                      >
                        -
                      </button>
                      <span className="px-2 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base md:text-lg font-medium ">
                        {item.quantity}
                      </span>
                      <button
                        className="px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base md:text-lg min-w-[36px] sm:min-w-[40px] min-h-[36px] sm:min-h-[40px] flex items-center justify-center touch-manipulation hover:bg-gray-100"
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
                    </div>

                    <button
                      className="text-red-500 hover:text-red-700 p-1.5 sm:p-2 min-w-[36px] sm:min-w-[40px] min-h-[36px] sm:min-h-[40px] flex items-center justify-center touch-manipulation"
                      onClick={() => deleteItem(item._id)}
                    >
                      <span
                        role="img"
                        aria-label="delete"
                        className="text-base text-black hover:text-red-700 sm:text-lg md:text-xl"
                      >
                       
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6l-1 14H6L5 6"></path>
                          <path d="M10 11v6"></path>
                          <path d="M14 11v6"></path>
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="  block text-right min-w-[60px] sm:min-w-[80px] md:min-w-[100px] flex-shrink-0 self-end sm:self-center">
                  <div className="text-sm sm:text-base md:text-lg font-semibold">
                    ${item.price.toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Order Summary */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg p-3 sm:p-4 md:p-6 shadow h-fit">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Order Summary
          </h3>
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <span className="text-base sm:text-lg">Subtotal →</span>
            <span className="text-lg sm:text-xl font-bold">
              ${total.toLocaleString()}
            </span>
          </div>
          <div className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
            Shipping will be calculated at checkout
          </div>
          <button
            className="w-full bg-black text-white py-2.5 sm:py-3 md:py-4 rounded-lg text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 transition min-h-[44px] sm:min-h-[48px] md:min-h-[56px] touch-manipulation"
            onClick={() => navigate("/checkout")}
          >
            Check Out
          </button>
          <button
            className="text-gray-500 hover:text-red-600 text-xs sm:text-sm float-right touch-manipulation"
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
