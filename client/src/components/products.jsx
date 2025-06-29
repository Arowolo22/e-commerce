// Import React and necessary hooks
import React, { useEffect, useState } from "react";

// Define the ProductList component
const ProductList = ({ selectedCategory }) => {
  // State to store the list of products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch products with optional category filter
  const fetchProducts = async (category = null) => {
    setLoading(true);
    try {
      let url = "http://localhost:5000/api/products";

      // If category is specified, add it to the query
      if (category && category !== "all") {
        url += `?category=${category}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect runs when component mounts or selectedCategory changes
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  // Show no products found message
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg text-gray-500">
          {selectedCategory === "male"
            ? "No men's products found."
            : selectedCategory === "female"
            ? "No women's products found."
            : "No products found."}
        </div>
      </div>
    );
  }

  // Render the product grid
  return (
    // Grid container: 2 columns on mobile, more on larger screens
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {/* Map through the products array and render each product card */}
      {products.map((product) => (
        // Each product card
        <div
          key={product._id} // Unique key for React
          className="bg-white shadow-md rounded overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
        >
          {/* Product image at the top, with fixed height and rounded top corners */}
          <img
            src={product.imageUrl} // Image URL from product data
            alt={product.name} // Alt text for accessibility
            className="w-full h-64 md:h-120 object-cover" // Responsive height: smaller on mobile, taller on desktop
          />
          {/* Product details section */}
          <div className="px-4 py-3 flex flex-col items-start">
            {/* Product name, styled and spaced */}
            <h2 className="text-base font-medium text-black mb-1">
              {product.name}
            </h2>
            {/* Product price, bold and colored, formatted with $ and thousands separator */}
            <p className="text-lg font-bold text-orange-900">
              ${product.price.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Export the component so it can be used elsewhere
export default ProductList;
