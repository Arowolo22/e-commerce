import express from "express";
import {
  initializePayment,
  verifyPayment,
} from "../controller/paymentController.js";
import { createOrder, getOrders } from "../controller/orderController.js";

const router = express.Router();

// Payment routes
router.post("/payments/init", initializePayment);
router.get("/payments/verify/:reference", verifyPayment);

// Order routes
router.post("/orders", createOrder); // optional/manual
router.get("/orders", getOrders); // admin/testing

export default router;
