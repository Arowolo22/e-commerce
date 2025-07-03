import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../controller/cartController.js";

const router = express.Router();

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/update/:id", updateCartItem);
router.delete("/delete/:id", deleteCartItem);
router.post("/clear", clearCart);

export default router;
