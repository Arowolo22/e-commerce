import Product from "../model/product.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    // Create a new product using the request body
    const product = new Product(req.body);
    await product.save(); // Save to database
    res.status(201).json(product); // Return the created product
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    // Find all products in the database
    const products = await Product.find();
    res.json(products); // Return the list of products
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single product by its ID
export const getProductById = async (req, res) => {
  try {
    // Find product by ID from the request params
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product); // Return the found product
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a product by its ID
export const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.imageUrl = req.file.path; // If a new image is uploaded, update the URL
    }
    // Find product by ID and update with new data
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // Return the updated document
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product); // Return the updated product
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a product by its ID
export const deleteProduct = async (req, res) => {
  try {
    // Find product by ID and delete it
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" }); // Confirm deletion
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
