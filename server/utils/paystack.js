// import axios from "axios";
// const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
// const PAYSTACK_BASE_URL = "https://api.paystack.co";

// export const initializePayment = async ({
//   amount,
//   email,
//   reference,
//   callback_url,
// }) => {
//   const response = await axios.post(
//     `${PAYSTACK_BASE_URL}/transaction/initialize`,
//     { amount, email, reference, callback_url },
//     { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
//   );
//   return response.data.data;
// };

// export const verifyPayment = async (reference) => {
//   const response = await axios.get(
//     `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
//     { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
//   );
//   return response.data.data;
// };
