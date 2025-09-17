import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import { useTranslation } from "react-i18next";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

function Navbar({ setSearchQuery }) {
  const { count } = useCart();
  const { user, wishlist, favorites, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = debounce((value) => {
    setSearchQuery(value);
    if (location.pathname !== "/") navigate("/");
  }, 300);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Added: Handler for Wishlist click
  const handleWishlistClick = (e) => {
    if (!user) {
      alert("you need to have account");  // Popup
      navigate("/login");
      return;
    }
    // If logged in, do nothing (Link handles navigation)
  };

  // Added: Handler for Favorites click
  const handleFavoritesClick = (e) => {
    if (!user) {
      alert("you need to have account");  // Popup
      navigate("/login");
      return;
    }
    // If logged in, do nothing (Link handles navigation)
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="font-bold text-lg text-gray-800 dark:text-white"
        >
          {t('navbar.home')}
        </Link>
        <Link
          to="/cart"
          className="relative text-gray-800 dark:text-white font-semibold"
        >
          {t('navbar.cart')}
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
        {/* Always show Wishlist link with onClick handler */}
        <Link
          to="/wishlist"
          onClick={handleWishlistClick}  // Added onClick
          className="relative text-gray-800 dark:text-white font-semibold"
        >
          {t('navbar.wishlist')}
          {wishlist.length > 0 && (  // Badge only if logged in and has items
            <span className="absolute -top-2 -right-3 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </Link>
        {/* Always show Favorites link with onClick handler */}
        <Link
          to="/favorites"
          onClick={handleFavoritesClick}  // Added onClick
          className="relative text-gray-800 dark:text-white font-semibold"
        >
          {t('navbar.favorites')}
          {favorites.length > 0 && (  // Badge only if logged in and has items
            <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </Link>
      </div>

      <input
        type="text"
        placeholder={t('navbar.search_placeholder')}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearchChange(e.target.value);
        }}
        className="border rounded px-3 py-1 w-full md:w-64 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-600 dark:text-gray-300">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              {t('navbar.logout')}
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              {t('navbar.login')}
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              {t('navbar.register')}
            </Link>
          </>
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          {darkMode ? t('navbar.light_mode') : t('navbar.dark_mode')}
        </button>
        <button
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
          className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          {t('navbar.language')}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
