import React, { createContext, useContext, useState, useEffect } from "react";
import api from "./utils/api";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count from backend
  const fetchCartCount = async () => {
    try {
      const res = await api.get("/api/cart");
      setCartCount(res.data.cartItems.length);
    } catch (err) {
      console.log(err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
