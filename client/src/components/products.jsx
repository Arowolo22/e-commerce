import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    axios.get(`${API_URL}/categories`).then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/products`, {
        params: { page, search, category },
      })
      .then((res) => {
        setProducts(res.data.products);
        setPages(res.data.pages);
      });
  }, [page, search, category]);

  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded px-3 py-2 mb-2 md:mb-0"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border rounded px-3 py-2"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded shadow p-4">
            <img
              src={product.image ? product.image : fallbackImage}
              alt={product.title}
              className="h-40 w-full object-cover rounded mb-2"
            />
            <h3 className="font-bold text-lg mb-1">{product.title}</h3>
            <p className="text-gray-700 font-semibold mb-1">${product.price}</p>
            <p className="text-xs text-gray-500 mb-2">{product.category}</p>
            <p className="text-xs text-gray-600 line-clamp-2">
              {product.description}
            </p>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
