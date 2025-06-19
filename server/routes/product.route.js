import express from "express";
const router = express.Router();
import { pagination,categories,fakestoreapi, getProductById } from "../controller/products.js";


router.get ("/products", pagination );
router.get("/categories",categories);
router.get("/sync-fakestore", fakestoreapi);
router.get("/products/:id", getProductById);
export default router;