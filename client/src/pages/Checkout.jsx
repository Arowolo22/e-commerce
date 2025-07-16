import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

const PAYSTACK_PUBLIC_KEY = "sk_test_30b893efe7b678d45b43df1752eb20b66f0a8e22"; 

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    city:"",
    state: "",
    zipCode:"",
    country: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch cart items and total
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/cart");
      setCartItems(res.data.cartItems);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Handle billing input change
  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  // Handle Pay Now
  const handlePayNow = (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !billing.firstName ||
      !billing.lastName ||
      !billing.email ||
      !billing.phone ||
      !billing.address ||
      !billing.city ||
      !billing.state ||
      !billing.zipCode ||
      !billing.country||
     ) {
      alert("Please fill in all billing details.");
      return;
    }
    // Paystack inline payment
    const handler =
      window.PaystackPop && window.PaystackPop.setup
        ? window.PaystackPop
        : window.Paystack;
    if (handler && handler.setup) {
      handler
        .setup({
          key: PAYSTACK_PUBLIC_KEY,
          email: billing.email,
          amount: total * 100, // kobo
          currency: "NGN",
          ref: String(Date.now()),
          metadata: {
            custom_fields: [
              {
                display_name: "Name",
                variable_name: "name",
                value: billing.firstName + " " + billing.lastName,
              },
              {
                display_name: "Phone",
                variable_name: "phone",
                value: billing.phone,
              },
              {
                display_name: "Address",
                variable_name: "address",
                value: billing.address,
              },
            ],
          },
          callback: function (response) {
            alert("Payment complete! Reference: " + response.reference);
            // Optionally, redirect or clear cart here
          },
          onClose: function () {
            alert("Payment window closed");
          },
        })
        .openIframe();
    } else {
      // fallback: redirect to paystack payment page
      const paystackUrl = `https://paystack.com/pay/YOUR_SLUG?amount=${
        total * 100
      }&email=${encodeURIComponent(billing.email)}`;
      window.location.href = paystackUrl;
    }
  };

  // Load Paystack script
  useEffect(() => {
    if (!window.PaystackPop && !document.getElementById("paystack-script")) {
      const script = document.createElement("script");
      script.id = "paystack-script";
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-8 min-h-[70vh]">
        {/* Billing Details */}
        <div className="flex-1 bg-white rounded-lg p-8 shadow mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
          <form onSubmit={handlePayNow} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={billing.name}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={billing.email}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={billing.phone}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Address</label>
              <textarea
                name="address"
                value={billing.address}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold mt-4 hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
        {/* Order Summary */}
        <div className="w-full md:w-1/2 bg-white rounded-lg p-8 shadow h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          {loading ? (
            <div>Loading...</div>
          ) : cartItems.length === 0 ? (
            <div className="text-gray-500">No items in cart.</div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-bold">{item.name}</div>
                    {item.selectedSize && (
                      <div className="text-gray-500 text-sm">
                        Size: {item.selectedSize}
                      </div>
                    )}
                    <div className="text-gray-500 text-sm">
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <div className="font-semibold">
                      ₦{item.price.toLocaleString()}
                    </div>
                    <div className="text-gray-500 text-xs">
                      Total: ₦{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-xl font-bold">
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
