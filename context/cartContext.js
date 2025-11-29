"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CartContext = createContext();

// Provide the context to the component tree
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart data from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add an item to the cart
  const addItemToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  // remove all items from cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (itemId) => {
    // alert the user before removing the item
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (!confirmRemove) {
      return;
    }

    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
