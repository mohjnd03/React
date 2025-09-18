// src/api/ProductCard.js (updated with full i18n translations integrated into the original code)
import React from "react";
import { Link, useNavigate } from "react-router-dom";  // Added useNavigate
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

function ProductCard({ product }) {
  const navigate = useNavigate();  // Added
  const { addItem } = useCart();
  const { user, addToWishlist, removeFromWishlist, wishlist, addToFavorites, removeFromFavorites, favorites } = useAuth();
  const { t } = useTranslation();
  const isInWishlist = wishlist.some((id) => id === product.id);
  const isInFavorites = favorites.some((id) => id === product.id);

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
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col hover:shadow-lg transition dark:bg-gray-800">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-40 object-contain mb-4"
        />
        <h2 className="font-semibold text-sm mb-2 line-clamp-2 dark:text-white">{product.title}</h2>
      </Link>
      <p className="text-gray-500 text-xs mb-2 dark:text-gray-400">{product.category}</p>
      <p className="text-lg font-bold text-blue-600 mb-4 dark:text-blue-400">${product.price}</p>
      
      {/* Favorites Button (Heart) - Always shown */}
      <button
        onClick={handleFavoritesToggle}
        className={`mb-2 p-2 rounded-full transition ${
          isInFavorites
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-200 text-gray-600 hover:bg-red-200 dark:bg-gray-700 dark:text-gray-400"
        }`}
        title={t(isInFavorites ? "product_card.remove_from_favorites" : "product_card.add_to_favorites")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isInFavorites ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
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
        className={`mb-2 py-2 px-3 rounded-lg text-center transition ${
          isInWishlist
            ? "bg-yellow-500 text-white hover:bg-yellow-600"
            : "bg-gray-200 text-gray-600 hover:bg-yellow-200 dark:bg-gray-700 dark:text-gray-400"
        }`}
      >
        {t(isInWishlist ? "product_card.remove_from_wishlist" : "product_card.add_to_wishlist")}
      </button>
      
      <button
        onClick={() => addItem(product)}
        className="bg-green-500 text-white text-center py-2 px-3 rounded-lg hover:bg-green-600 mb-2"
      >
        {t("product_card.add_to_cart")}
      </button>
      <Link
        to={`/product/${product.id}`}
        className="bg-blue-500 text-white text-center py-2 px-3 rounded-lg hover:bg-blue-600"
      >
        {t("product_card.view_details")}
      </Link>
    </div>
  );
}

export default ProductCard;