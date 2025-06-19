import axios from "axios";
import Product from "../model/product.js";
// Sync products from FakeStore API
export const fakestoreapi = async (req, res) => {
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
};


// Get products with pagination and search
export const pagination = async (req, res) => {
  const { page = 1, limit = 16, search = "", category = "" } = req.query;
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
};


// Get all categories
export const categories =  async (req, res) => {
  const categories = await Product.distinct("category");
  res.json(categories);
};


// In controller
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
};
