import React from "react";
import { useParams, useNavigate } from "react-router-dom";  // Added useNavigate
import { endpoints } from "../api/api";
import DataFetcher from "../api/DataFetcher";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();  // Added
  const { items, addItem, removeItem } = useCart();
  const { user, addToWishlist, removeFromWishlist, wishlist, addToFavorites, removeFromFavorites, favorites } = useAuth();

  return (
    <DataFetcher
      url={endpoints.productById(id)}
      render={(product) => {
        const inCart = items.find((item) => item.id === product.id);
        const isInWishlist = user && wishlist.some((wid) => wid === product.id);
        const isInFavorites = user && favorites.some((fid) => fid === product.id);
        const handleAdd = () => addItem(product);
        const handleRemove = () => removeItem(product.id);
        const handleWishlistToggle = () => {
          if (!user) {
            navigate("/login");  // Redirect to login if not logged in
            return;
          }
          if (isInWishlist) {
            removeFromWishlist(product.id);
          } else {
            addToWishlist(product.id);
          }
        };
        const handleFavoritesToggle = () => {
          if (!user) {
            navigate("/login");  // Redirect to login if not logged in
            return;
          }
          if (isInFavorites) {
            removeFromFavorites(product.id);
          } else {
            addToFavorites(product.id);
          }
        };

        return (
          <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row gap-6 dark:bg-gray-800 dark:text-white">
              <img
                src={product.image}
                alt={product.title}
                className="w-64 h-64 object-contain mx-auto"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                <p className="text-gray-600 mb-4 dark:text-gray-300">{product.description}</p>
                <p className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">${product.price}</p>

                {/* Favorites Button (Heart) - Always shown */}
                <button
                  onClick={handleFavoritesToggle}
                  className={`mb-4 p-2 rounded-full transition ${
                    isInFavorites
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-200 text-gray-600 hover:bg-red-200 dark:bg-gray-700 dark:text-gray-400"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isInFavorites ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>

                {/* Wishlist Button - Always shown */}
                <button
                  onClick={handleWishlistToggle}
                  className={`mb-4 py-2 px-4 rounded-lg transition ${
                    isInWishlist
                      ? "bg-yellow-500 text-white hover:bg-yellow-600"
                      : "bg-gray-200 text-gray-600 hover:bg-yellow-200 dark:bg-gray-700 dark:text-gray-400"
                  }`}
                >
                  {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>

                <div className="flex gap-4">
                  {!inCart ? (
                    <button
                      onClick={handleAdd}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleRemove}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        -
                      </button>
                      <span className="font-medium">{inCart.quantity}</span>
                      <button
                        onClick={handleAdd}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}

export default ProductDetails;
