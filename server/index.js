const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://emmanuelolalekanarowolo:emmanuelolalekanarowolo@cluster0.tmicxqq.mongodb.net/"
  )
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Product Schema
const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});
const Product = mongoose.model("Product", productSchema);

// Sync products from FakeStore API
app.get("/api/sync-fakestore", async (req, res) => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    await Product.deleteMany({});
    await Product.insertMany(data);
    res.json({ message: "Products synced from FakeStore API!" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to sync products", details: err.message });
  }
});

// Get products with pagination and search
app.get("/api/products", async (req, res) => {
  const { page = 1, limit = 12, search = "", category = "" } = req.query;
  const query = {};
  if (search) query.title = { $regex: search, $options: "i" };
  if (category) query.category = category;

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await Product.countDocuments(query);

  res.json({
    products,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  });
});

// Get all categories
app.get("/api/categories", async (req, res) => {
  const categories = await Product.distinct("category");
  res.json(categories);
});
