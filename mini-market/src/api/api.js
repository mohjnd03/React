// src/api/api.js
const API_BASE = "https://fakestoreapi.com";
const USER_BASE = "http://localhost:3001/users";

export const endpoints = {
  products: `${API_BASE}/products`,
  categories: `${API_BASE}/products/categories`,
  byCategory: (category) => `${API_BASE}/products/category/${category}`,
  productById: (id) => `${API_BASE}/products/${id}`,
  users: USER_BASE,
  userByEmail: (email) => `${USER_BASE}?q[email]=${encodeURIComponent(email)}`,
  userById: (id) => `${USER_BASE}/${id}`,
};