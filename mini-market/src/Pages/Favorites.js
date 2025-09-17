import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";  // Keep this for redirect
import DataFetcher from "../api/DataFetcher";
import { endpoints } from "../api/api";
import ProductCard from "../api/ProductCard";
// Removed unused: import { Link } from "react-router-dom";

function Favorites() {
  const { favorites, user, removeFromFavorites } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    // Auto-redirect to login on access (e.g., via navbar click)
    navigate("/login");
    return null;  // Or a loading spinner if needed
  }

  if (favorites.length === 0) {
    return (
      <p className="p-4 text-center text-gray-600 dark:text-gray-300">
        Your favorites list is empty.
      </p>
    );
  }

  return (
    <DataFetcher
      url={endpoints.products}
      render={(allProducts) => {
        const favoriteProducts = allProducts.filter((p) => favorites.includes(p.id));

        return (
          <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Your Favorites</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoriteProducts.map((p) => (
                <div key={p.id} className="relative">
                  <ProductCard product={p} />
                  <button
                    onClick={() => removeFromFavorites(p.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
}

export default Favorites;
