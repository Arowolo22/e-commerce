import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/product.js";

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Sample products data
const sampleProducts = [
  {
    name: "Men's Classic T-Shirt",
    description: "Comfortable cotton t-shirt for men",
    price: 29.99,
    category: "male",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    stockQuantity: 50,
    size: ["S", "M", "L", "XL"],
    color: ["Black", "White", "Blue"],
  },
  {
    name: "Men's Denim Jeans",
    description: "Classic blue denim jeans for men",
    price: 79.99,
    category: "male",
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    stockQuantity: 30,
    size: ["30", "32", "34", "36"],
    color: ["Blue", "Black"],
  },
  {
    name: "Men's Casual Shirt",
    description: "Stylish casual shirt for men",
    price: 59.99,
    category: "male",
    imageUrl:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
    stockQuantity: 25,
    size: ["S", "M", "L", "XL"],
    color: ["White", "Blue", "Red"],
  },
  {
    name: "Women's Summer Dress",
    description: "Elegant summer dress for women",
    price: 89.99,
    category: "female",
    imageUrl:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
    stockQuantity: 20,
    size: ["XS", "S", "M", "L"],
    color: ["Pink", "Blue", "White"],
  },
  {
    name: "Women's Blouse",
    description: "Professional blouse for women",
    price: 49.99,
    category: "female",
    imageUrl:
      "https://images.unsplash.com/photo-1564257631407-3deb25e9c8e0?w=400",
    stockQuantity: 35,
    size: ["XS", "S", "M", "L", "XL"],
    color: ["White", "Black", "Pink"],
  },
  {
    name: "Women's Skinny Jeans",
    description: "Trendy skinny jeans for women",
    price: 69.99,
    category: "female",
    imageUrl:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
    stockQuantity: 40,
    size: ["24", "26", "28", "30", "32"],
    color: ["Blue", "Black", "Gray"],
  },
  {
    name: "Unisex Hoodie",
    description: "Comfortable hoodie for everyone",
    price: 45.99,
    category: "unisex",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
    stockQuantity: 60,
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["Gray", "Black", "Navy"],
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully inserted ${insertedProducts.length} products`);

    // Display the products with their categories
    console.log("\nProducts in database:");
    const allProducts = await Product.find({});
    allProducts.forEach((product) => {
      console.log(`- ${product.name} (Category: ${product.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seeding
connectDB().then(() => {
  seedDatabase();
});
