import React, { useEffect, useState } from "react";
import { useParams, } from "react-router-dom"; // to get the product ID from the URL
import axios from "axios"; // for API requests
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../CartContext";
import toast from "react-hot-toast"

const ProductDetails = () => {
  const { id } = useParams(); // extract product ID from URL
 
  const [product, setProduct] = useState(null); // state to hold fetched product
  const [loading, setLoading] = useState(true); // loading state
  const [selectedSize, setSelectedSize] = useState(""); // selected size from dropdown
  const [quantity, setQuantity] = useState(1); // selected quantity
  const { fetchCartCount } = useCart();

  useEffect(() => {
    // function to fetch product data from API
    const fetchProduct = async () => {
      try {
        // send GET request to fetch product by ID
        const res = await axios.get(`http://localhost:5000/api/products/${id}`); // replace with your backend URL
        setProduct(res.data); // set product in state
        setLoading(false); // turn off loading
      } catch (error) {
        console.error("Failed to fetch product:", error); // log error
        setLoading(false); // even on error, stop loading
      }
    };

    fetchProduct(); // call the fetch function when component mounts
  }, [id]); // run again if id changes

  // function to add product to cart
  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }
    try {
      const cartItem = {
        product: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        selectedSize,
        quantity,
      };
      await axios.post("http://localhost:5000/api/cart/add", cartItem);
      await fetchCartCount();
      // Optionally show a confirmation message
      
      toast.success("Product added to cart")
      // Do NOT navigate to cart page
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error(error);
    }
  };

  // show loading or error messages
  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl  mx-auto p-6">
        {/* flex container: image on left, details on right */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* left column: product image */}
          <div className="md:w-1/2  w-full">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-[720px] object-cover rounded-xl"
            />
          </div>

          {/* right column: product details */}
          <div className="md:w-1/2 w-full">
            {/* product name */}
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>

            {/* product description */}
            <p className="text-gray-700 mb-4">{product.description}</p>

            {/* product price */}
            <p className="text-2xl font-semibold text-black mb-4">
              ${product.price.toLocaleString()}
            </p>

            {/* size selection dropdown */}
            {product.size && (
              <div className="mb-4">
                <label className="block font-medium mb-1">Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Size</option>
                  {/* handles both array or string size format */}
                  {(Array.isArray(product.size)
                    ? product.size
                    : product.size.split(",")
                  ).map((size) => (
                    <option key={size.trim()} value={size.trim()}>
                      {size.trim()}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* quantity input field */}
            <div className="mb-6">
              <label className="block font-medium mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-24 p-2 border rounded"
              />
            </div>

            {/* add to cart button */}
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 w-full  py-3 rounded-lg  transition duration-300"
            >
              Add to Cart
              
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
