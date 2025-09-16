// src/Pages/Cart.js
import React from "react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { items: cart, addItem, removeItem, clearCart, totalPrice } = useCart();

  if (cart.length === 0)
    return (
      <p className="p-4 text-center text-gray-600 dark:text-gray-300">
        Your cart is empty.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-contain"
            />
            <div className="flex-1 px-4">
              <h2 className="font-semibold dark:text-white">{item.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                -
              </button>
              <span className="font-medium">{item.quantity}</span>
              <button
                onClick={() => addItem({ ...item, price: item.price.toString() })} // Ensure price as string for addItem compatibility
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-semibold dark:text-white">
          Total: ${totalPrice.toFixed(2)}
        </p>
        <button
          onClick={clearCart}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;