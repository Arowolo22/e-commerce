import axios from "axios";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

// Debug logging
console.log("Paystack Config Check:");
console.log("Secret Key exists:", !!PAYSTACK_SECRET_KEY);
console.log(
  "Secret Key starts with:",
  PAYSTACK_SECRET_KEY ? PAYSTACK_SECRET_KEY.substring(0, 10) + "..." : "NOT SET"
);
console.log("Base URL:", PAYSTACK_BASE_URL);

export const initializePayment = async ({
  amount,
  email,
  reference,
  callback_url,
}) => {
  try {
    console.log(" Initializing payment with:", {
      amount,
      email,
      reference,
      callback_url,
    });

    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      { amount, email, reference, callback_url },
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
    );

    console.log(" Paystack response:", response.data);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data)
    console.error("Paystack API Error Details:");
    console.error("Status:", error.response?.status);
    console.error("Status Text:", error.response?.statusText);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
    throw new Error("Payment initialization failed");
  }
};

export const verifyPayment = async (reference) => {
  try {
    console.log(" Verifying payment for reference:", reference);

    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
    );

    console.log("Verification response:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Verification Error Details:");
    console.error("Status:", error.response?.status);
    console.error("Status Text:", error.response?.statusText);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
    throw new Error("Payment verification failed");
  }
};
