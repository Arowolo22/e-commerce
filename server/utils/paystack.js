import axios from "axios";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

export const initializePayment = async ({
  amount,
  email,
  reference,
  callback_url,
}) => {
  try {
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      { amount, email, reference, callback_url },
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
    );
    return response.data.data;
  } catch (error) {
    console.error("Paystack API Error:", error.response?.data || error.message);
    throw new Error("Payment initialization failed");
  }
};

export const verifyPayment = async (reference) => {
  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
    );
    return response.data.data;
  } catch (error) {
    console.error("Paystack API Error:", error.response?.data || error.message);
    throw new Error("Payment verification failed");
  }
};
