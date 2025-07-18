/**
 * CartContext
 * -----------
 * Provides a global state for managing the shopping cart across the app.
 * This context stores the list of products added to the cart and exposes
 * functions to update that list, such as adding new products.
 *
 * Wrapping the app with CartProvider enables any component to access the cart
 * items and modify the cart via the useCart() hook, avoiding prop drilling.
 */

import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  //   add to cart
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  // remove from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      // Find the index of the first matching item
      const index = prevItems.findIndex((item) => item._id === id);
      if (index === -1) return prevItems; // If not found, return unchanged

      // Create a copy of the cart items
      const newItems = [...prevItems];
      // Remove the one item at the found index
      newItems.splice(index, 1);
      return newItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
