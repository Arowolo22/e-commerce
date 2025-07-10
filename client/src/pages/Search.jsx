// import React, { useState } from "react";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/products?search=${query}`
//       );
//       setResults(res.data.products || []);
//     } catch (err) {
//       console.error("Search failed:", err);
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-1 flex flex-col items-center justify-center p-8">
//         <form onSubmit={handleSearch} className="mb-6 flex">
//           <input
//             type="text"
//             placeholder="Search by product name or description..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="border px-4 py-2 rounded-l w-72"
//           />
//           <button
//             type="submit"
//             className="bg-black text-white px-4 py-2 rounded-r"
//           >
//             Search
//           </button>
//         </form>

//         <div className="w-full max-w-2xl">
//           {loading && <p className="text-center text-gray-500">Loading...</p>}

//           {!loading && query && results.length === 0 && (
//             <p className="text-center text-red-500">No products found.</p>
//           )}

//           {!loading &&
//             results.map((product) => (
//               <Link
//                 to={`/product/${product._id}`}
//                 key={product._id}
//                 className="block border-b py-4 hover:bg-gray-100 px-4 rounded transition"
//               >
//                 <div className="font-bold text-lg">{product.name}</div>
//                 <div className="text-gray-600 text-sm">
//                   {product.description}
//                 </div>
//                 <div className="text-black font-semibold mt-1">
//                   ₦{product.price.toLocaleString()}
//                 </div>
//               </Link>
//             ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Search;

import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import axios from "axios"; // ✅ Import axios

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Search products function using Axios
  const searchProducts = async () => {
    if (!searchQuery.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`/api/products/search`, {
        params: { q: searchQuery },
      });

      setProducts(response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Search failed");
      } else {
        setError("Network error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    searchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Search Products
          </h1>

          {/* Search Input */}
          <div className="relative mb-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {products.length > 0 && (
            <div className="text-sm text-gray-600 mb-4">
              {products.length} products found
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching products...</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.imageUrl || "/api/placeholder/300/200"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-green-600">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500 capitalize">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <SearchIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">Try different search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
