import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

const VITE_PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;


const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Nigeria (NIG)",
    email: "",
    phone: "",
    address: "",
  });
  const [shippingFee] = useState(1000); // Fixed shipping fee

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
      !billing.phone ||
      !billing.address ||
      !billing.city ||
      !billing.state ||
      !billing.zipCode ||
      !billing.country
    ) {
      toast.error("Please fill in all details.");
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
          key: VITE_PAYSTACK_PUBLIC_KEY,
          email: billing.email,
          amount: total * 100, // kobo
          currency: "NGN",
          ref: String(Date.now()),
          metadata: {
            custom_fields: [
              {
                display_name: "Full Name",
                variable_name: "full_name",
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
            toast.success("Payment complete! Reference: " + response.reference);
            // Optionally, redirect or clear cart here
          },
          onClose: function () {
            toast.error("Payment window closed");
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
        {/* Delivery details */}
        <div className="flex-1 bg-white rounded-lg p-8 shadow mb-8 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Delivery details</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Expect delivery 2 - 3 days after you make your order.
          </p>
          <form onSubmit={handlePayNow} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                name="firstName"
                value={billing.firstName}
                onChange={handleChange}
                className="w-full md:w-[49%] border rounded p-2 mb-2 md:mr-2  border-gray-300 placeholder-gray-500"
                placeholder="Enter firstname"
                required
              />
              <input
                type="text"
                name="lastName"
                value={billing.lastName}
                onChange={handleChange}
                className="w-full md:w-[49%] border rounded p-2 mb-2 md:ml-2  border-gray-300 placeholder-gray-500"
                placeholder="Enter lastname"
                required
              />
            </div>

            <div className="mt-6">
              <div className="flex items-center border rounded p-2 justify-between  border-gray-300 placeholder-gray-500">
                <span>🇳🇬 Nigeria (NIG)</span>
              </div>
            </div>

            <div>
              <input
                type="text"
                name="address"
                value={billing.address}
                onChange={handleChange}
                className="w-full border rounded p-2 mb-2  border-gray-300 placeholder-gray-500"
                placeholder="Enter address"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                name="city"
                value={billing.city}
                onChange={handleChange}
                className="w-full md:w-1/3 border rounded p-2  border-gray-300 placeholder-gray-500"
                placeholder="Enter city"
                required
              />
              <input
                type="text"
                name="zipCode"
                value={billing.zipCode}
                onChange={handleChange}
                className="w-full md:w-1/3 border rounded p-2  border-gray-300 placeholder-gray-500"
                placeholder="Enter postalCode"
                required
              />
              <select
                name="state"
                value={billing.state}
                onChange={handleChange}
                className="w-full md:w-1/3 border rounded p-2  border-gray-300 placeholder-gray-500"
                required
              >
                <option value="">Select a state</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
                {/* Add more states as needed */}
              </select>
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                value={billing.phone}
                onChange={handleChange}
                className="w-full border rounded p-2 mb-2  border-gray-300 placeholder-gray-500"
                placeholder="Enter phone number"
                required
              />
            </div>
            {/* Shipping method */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Shipping method</h3>
              <div className="flex items-center border rounded p-2 justify-between  border-gray-300 placeholder-gray-500">
                <span>Standard Shipping</span>
                <span className="font-semibold">
                  ₦{shippingFee.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold mt-4 hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay now"}
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">
              After clicking "Pay now", you will be redirected to Paystack to
              complete your purchase securely.
            </p>
          </form>
        </div>
        {/* Order Summary */}
        <div className="w-full md:w-1/2 bg-white rounded-lg p-8 shadow h-fit">
          {cartItems.length > 0 && (
            <>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={cartItems[0].imageUrl}
                  alt={cartItems[0].name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <div className="font-bold">{cartItems[0].name}</div>
                  <div className="text-gray-500 text-sm">
                    Men /{" "}
                    {cartItems[0].selectedSize
                      ? ` ${cartItems[0].selectedSize}`
                      : "-"}{" "}
                    / grey
                  </div>
                  <div className="text-gray-500 text-sm">
                    QTY - {cartItems[0].quantity}
                  </div>
                </div>
                <div className="ml-auto font-semibold text-lg">
                  ₦{cartItems[0].price.toLocaleString()}
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping fee</span>
                  <span>₦{shippingFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl">
                    ₦{(total + shippingFee).toLocaleString()}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
