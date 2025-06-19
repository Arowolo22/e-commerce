import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

const Products = () => {
   const [products, setProducts] = useState([]);
   const [categories, setCategories] = useState([]);
   const [search, setSearch] = useState("");
   const [category, setCategory] = useState("");
   const [page, setPage] = useState(1);
   const [pages, setPages] = useState(1);
   const [loading, setLoading] = useState(true);
 const fallbackImage = "https://placehold.co/300x200?text=No+Image";


   useEffect(() => {
      axios.get(`${API_URL}/categories`).then((res) => setCategories(res.data));
   }, []);

   useEffect(() => {
      setLoading(true);
      axios
         .get(`${API_URL}/products`, {
            params: { page, search, category },
         })
         .then((res) => {
            setProducts(res.data.products);
            setPages(res.data.pages);
            setLoading(false);
         });
   }, [page, search, category]);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [page]);

   return (
      <div className="p-4">
         {/* Search & Category Filter */}
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
               className="border rounded px-3 py-2 text-black"
               value={category}
               onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
               }}
            >
               <option value="">All Categories</option>
               {categories.map((catObj, i) => (
                  <option key={catObj.category || i} value={catObj.category}>
                     {catObj.category}
                  </option>
               ))}
            </select>
         </div>

         {/* Products */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? (
               <div className="col-span-full text-center">Loading products...</div>
            ) : products.length === 0 ? (
               <div className="col-span-full text-center">No products found</div>
            ) : (
               products.map((product) => (
                  <div key={String(product._id)} className="bg-white rounded shadow p-4">
                     <img
                        src={product.image || fallbackImage}
                        alt={product.title}
                        onError={(e) => {
                           e.target.onerror = null;
                           e.target.src = fallbackImage;
                        }}
                        className="h-40 w-full object-cover rounded mb-2"
                     />
                     <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                     <p className="text-gray-700 font-semibold mb-1">${product.price}</p>
                     <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                     <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                  </div>
               ))
            )}
         </div>

         {/* Pagination */}
         <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: pages }, (_, i) => (
               <button key={i} className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setPage(i + 1)}>
                  {i + 1}
               </button>
            ))}
         </div>
      </div>
   );
};

export default Products;
