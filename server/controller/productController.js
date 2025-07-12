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
    const { category } = req.query;
    let query = {};
    // If category is specified, filter by category
    if (category && category !== "all") {
      query.category = category;
    }
    // Find products based on the query
    const products = await Product.find(query);
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

// Search products by name or description
export const searchProducts = async (req, res) => {
  try {
    const q = req.query.q || "";
    // Search by name or description, case-insensitive, partial match
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    });
    res.json(products); // Return array of matching products
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create test products for practice
export const createTestProducts = async (req, res) => {
  try {
    const testProducts = [
      {
        name: "Test T-Shirt",
        description: "A comfortable cotton t-shirt for testing",
        price: 2500,
        category: "clothing",
        imageUrl: "https://via.placeholder.com/300x300?text=Test+T-Shirt",
        stockQuantity: 50,
        size: ["S", "M", "L", "XL"],
        color: ["Red", "Blue", "Black", "White"],
      },
      {
        name: "Test Jeans",
        description: "Classic blue jeans for testing",
        price: 5000,
        category: "clothing",
        imageUrl: "https://via.placeholder.com/300x300?text=Test+Jeans",
        stockQuantity: 30,
        size: ["30", "32", "34", "36"],
        color: ["Blue", "Black"],
      },
      {
        name: "Test Sneakers",
        description: "Comfortable sneakers for testing",
        price: 8000,
        category: "footwear",
        imageUrl: "https://via.placeholder.com/300x300?text=Test+Sneakers",
        stockQuantity: 25,
        size: ["7", "8", "9", "10", "11"],
        color: ["White", "Black", "Red"],
      },
    ];

    const createdProducts = [];
    for (const productData of testProducts) {
      const product = new Product(productData);
      await product.save();
      createdProducts.push(product);
    }

    res.status(201).json({
      message: "Test products created successfully",
      products: createdProducts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
