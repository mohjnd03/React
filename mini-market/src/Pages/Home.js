// src/Pages/Home.js (updated to display auth errors)
import React, { useState, useEffect } from "react";
import DataFetcher from "../api/DataFetcher";
import { endpoints } from "../api/api";
import ProductCard from "../api/ProductCard";
import { useAuth } from "../context/AuthContext";

function Home({ searchQuery }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("title-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { error } = useAuth();

  useEffect(() => {
    fetch(endpoints.categories)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then(setCategories)
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  const url = selectedCategory === "all" ? endpoints.products : endpoints.byCategory(selectedCategory);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">🛍️ Product Catalog</h1>
      {error && (
        <div className="mb-4 p-4 text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          ❌ Error: {error}
        </div>
      )}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="price-asc">Price Low to High</option>
          <option value="price-desc">Price High to Low</option>
        </select>
      </div>

      <DataFetcher
        url={url}
        render={(products) => {
          let filtered = products.filter((p) =>
            p.title.toLowerCase().includes((searchQuery || "").toLowerCase())
          );

          filtered.sort((a, b) => {
            if (sortBy === "price-asc") return a.price - b.price;
            if (sortBy === "price-desc") return b.price - a.price;
            if (sortBy === "title-desc") return b.title.localeCompare(a.title);
            return a.title.localeCompare(b.title);
          });

          const totalPages = Math.ceil(filtered.length / itemsPerPage);
          const paginated = filtered.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          );

          return (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginated.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded ${
                        page === currentPage
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          );
        }}
      />
    </div>
  );
}

export default Home;