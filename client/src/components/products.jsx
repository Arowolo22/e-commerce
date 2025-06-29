import React, { useEffect, useState } from "react";
import axios from "axios"; // Added axios import

// Map frontend category (used in buttons/nav) to backend format
const mapCategory = {
  men: "Male",
  male: "Male",
  women: "Female", 
  female: "Female",
  all: "all",
};

const ProductList = ({ selectedCategory = "all" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend with optional category filter
  const fetchProducts = async (category = "all") => {
    setLoading(true);

    try {
      const mapped = mapCategory[category.toLowerCase()] || "all"; // Fixed: was "a", now "all"
      let url = "http://localhost:5000/api/products";

      if (mapped !== "all") {
        url += `?category=${mapped}`;
      }

      console.log(`Fetching products for category: ${mapped} (${category})`);
      console.log("Fetching products from:", url);

      // Using axios as mentioned in your description
      const response = await axios.get(url);
      const data = response.data;

      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-lg font-medium">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    let msg = "No products found.";
    const cat = selectedCategory?.toLowerCase();

    if (cat === "men") msg = "No men's products found.";
    else if (cat === "women") msg = "No women's products found.";

    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-lg text-gray-500">{msg}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white shadow-md rounded overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <div className="px-4 py-3">
            <h2 className="text-base font-medium text-black mb-1">
              {product.name}
            </h2>
            <p className="text-lg font-bold text-orange-900">
              ${product.price.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              {product.category}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;