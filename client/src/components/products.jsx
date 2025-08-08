import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

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
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch products from backend with optional category filter
  const fetchProducts = async (category = "all") => {
    // setLoading(true);

    try {
      const mapped = mapCategory[category.toLowerCase()] || "all"; // Fixed: was "a", now "all"
      let url = "https://e-commerce-1-aiq5.onrender.com/api/products";

      if (mapped !== "all") {
        url += `?category=${mapped}`;
      }

      console.log(`Fetching products for category: ${mapped} (${category})`);
      console.log("Fetching products from:", url);

      // Using api utility for better mobile handling
      const response = await api.get(
        url.replace("https://e-commerce-1-aiq5.onrender.com", "")
      );
      const data = response.data;

      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center p-8">
  //       <p className="text-lg font-medium">Loading products...</p>
  //     </div>
  //   );
  // }

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
    <div className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white shadow-md rounded overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-120 object-cover"
          />
          <div className="px-4 py-3">
            <h2 className="text-base font-medium text-black mb-1">
              {product.name}
            </h2>
            <p className="text-lg font-bold text-orange-900">
              ${product.price.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
