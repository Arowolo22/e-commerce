import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      // backend search endpoint
      const res = await axios.get(
        `https://e-commerce-1-aiq5.onrender.com/api/products/search?q=${encodeURIComponent(
          query
        )}`
      );
      // The backend returns an array of products
      if (Array.isArray(res.data)) {
        setResults(res.data);
      } else if (Array.isArray(res.data.products)) {
        setResults(res.data.products);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.log(err);
      setError("Search failed. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:px-10 py-30">
         <h1 className="mb-15 text-2xl font-semibold">Search Our Store</h1>
        <form onSubmit={handleSearch} className="mb-6 flex w-full max-w-md">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border px-3 py-2 rounded-l w-full outline-none border-gray-300 border-lg h-12 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="bg-black text-white px-3 py-2 rounded-r h-12 text-sm sm:text-base whitespace-nowrap"
            disabled={loading || !query.trim()}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        <div className="w-full max-w-2xl px-4">
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}

          {!loading && query && results.length === 0 && !error && (
            <p className="text-center text-gray-500">No products found.</p>
          )}

          {!loading &&
            Array.isArray(results) &&
            results.length > 0 &&
            results.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="flex items-center gap-4 border-b py-4 hover:bg-gray-100 px-4 rounded transition"
              >
                <img
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.name}
                  className="w-16 h-20 object-cover rounded"
                />
                <div>
                  <div className="font-bold text-lg">{product.name}</div>
                  <div className="text-gray-600 text-sm">
                    {product.description}
                  </div>
                  <div className="text-black font-semibold mt-1">
                    ${product.price?.toLocaleString()}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
