// App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'; // Global styles

// Axios (used in UserContext instead of App now)
import axios from "axios";

// Pages and components
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/Products/ProductDetail";
import Articles from "./pages/Articles/Articles";
import SubmitArticle from "./pages/SubmitArticle";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import ArticleDetail from "./pages/Articles/ArticleDetail";
import SearchResults from "./pages/SearchResults/SearchResultsPage";

// Context providers
import { SearchProvider } from "./context/SearchContext"; // Handles search term state across the app
import { UserProvider } from "./context/userContext";     // Manages logged-in user state globally

/**
 * Main App component
 * -------------------
 * Sets up routing, shared state (cart), and wraps the app in context providers.
 * The UserProvider and SearchProvider make user/auth and search states accessible app-wide.
 */
function App() {
  // Local state to manage cart contents
  const [cart, setCart] = useState([]);

  /**
   * Adds a product to the cart.
   * @param {Object} product - Product to add
   */
  const addToCart = (product) => setCart([...cart, product]);

  /**
   * Removes a product from the cart by ID.
   * @param {string} id - Product ID to remove
   */
  const removeFromCart = (id) =>
    setCart(cart.filter((item) => item._id !== id));

  return (
    // UserProvider makes auth state available (user, setUser)
    <UserProvider>
      {/* SearchProvider shares search term/context across components */}
      <SearchProvider>
        {/* React Router handles page navigation */}
        <Router>
          {/* Navigation bar appears on every page */}
          <NavBar />

          {/* All route definitions */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/products/:id"
              element={<ProductDetail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} removeFromCart={removeFromCart} />}
            />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/submit" element={<SubmitArticle />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          {/* Footer appears on every page */}
          <Footer />
        </Router>
      </SearchProvider>
    </UserProvider>
  );
}

export default App;
