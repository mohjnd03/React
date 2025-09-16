// src/context/AuthContext.js (updated with detailed error logging)
import { createContext, useContext, useState, useEffect } from "react";
import { endpoints } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setWishlist(parsedUser.wishlist || []);
        setFavorites(parsedUser.favorites || []);
      }
    } catch (err) {
      setError("Failed to parse stored user data: " + err.message);
      localStorage.removeItem("user");
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(endpoints.userByEmail(email));
      if (!res.ok) {
        throw new Error(`Failed to fetch user data: ${res.status} ${res.statusText}`);
      }
      const users = await res.json();
      const foundUser = users.find((u) => u.email === email && u.password === password);
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }
      const userData = { ...foundUser, wishlist: foundUser.wishlist || [], favorites: foundUser.favorites || [] };
      setUser(userData);
      setWishlist(userData.wishlist);
      setFavorites(userData.favorites);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, error: err.message };
    }
  };

  const register = async (email, password) => {
    try {
      const res = await fetch(endpoints.users);
      if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
      }
      const users = await res.json();
      if (users.find((u) => u.email === email)) {
        throw new Error("Email already exists");
      }
      const newUser = { email, password, wishlist: [], favorites: [] };
      const createRes = await fetch(endpoints.users, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!createRes.ok) {
        throw new Error(`Failed to register: ${createRes.status} ${createRes.statusText}`);
      }
      const userData = await createRes.json();
      setUser(userData);
      setWishlist([]);
      setFavorites([]);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    } catch (err) {
      console.error("Register error:", err);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    setWishlist([]);
    setFavorites([]);
    localStorage.removeItem("user");
  };

  const addToWishlist = async (productId) => {
    if (!user) return;
    try {
      const updatedWishlist = [...wishlist, productId];
      setWishlist(updatedWishlist);
      const updatedUser = { ...user, wishlist: updatedWishlist };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      const res = await fetch(endpoints.userById(user.id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error(`Failed to update wishlist: ${res.status} ${res.statusText}`);
    } catch (err) {
      console.error("Wishlist update error:", err);
      setError(err.message);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;
    try {
      const updatedWishlist = wishlist.filter((id) => id !== productId);
      setWishlist(updatedWishlist);
      const updatedUser = { ...user, wishlist: updatedWishlist };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      const res = await fetch(endpoints.userById(user.id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error(`Failed to update wishlist: ${res.status} ${res.statusText}`);
    } catch (err) {
      console.error("Wishlist update error:", err);
      setError(err.message);
    }
  };

  const addToFavorites = async (productId) => {
    if (!user) return;
    try {
      const updatedFavorites = [...favorites, productId];
      setFavorites(updatedFavorites);
      const updatedUser = { ...user, favorites: updatedFavorites };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      const res = await fetch(endpoints.userById(user.id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error(`Failed to update favorites: ${res.status} ${res.statusText}`);
    } catch (err) {
      console.error("Favorites update error:", err);
      setError(err.message);
    }
  };

  const removeFromFavorites = async (productId) => {
    if (!user) return;
    try {
      const updatedFavorites = favorites.filter((id) => id !== productId);
      setFavorites(updatedFavorites);
      const updatedUser = { ...user, favorites: updatedFavorites };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      const res = await fetch(endpoints.userById(user.id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error(`Failed to update favorites: ${res.status} ${res.statusText}`);
    } catch (err) {
      console.error("Favorites update error:", err);
      setError(err.message);
    }
  };

  const value = {
    user,
    wishlist,
    favorites,
    login,
    register,
    logout,
    addToWishlist,
    removeFromWishlist,
    addToFavorites,
    removeFromFavorites,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);