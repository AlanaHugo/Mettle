// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"; // Global CSS styles

// Pages
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/Products/ProductDetail";
import Articles from "./pages/Articles/Articles";
import SubmitArticle from "./pages/Articles/SubmitArticle";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import SearchResults from "./pages/SearchResults/SearchResultsPage";
import ArticleDetail from "./pages/Articles/ArticleDetail";

// Shared UI components
import NavBar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";

// Context Providers
import { CartProvider } from "./context/cartContext";        // Provides cart state globally
import { SearchProvider } from "./context/SearchContext";    // Provides search state globally
import { UserProvider } from "./context/userContext";        // Provides user auth state globally

/**
 * App Component
 * -------------
 * This is the root component of the application.
 * It wraps all pages in their respective context providers
 * and defines client-side routing with React Router.
 */
function App() {
  return (
    // Provides cart state and functions (add/remove) across the entire app
    <CartProvider>
      {/* Provides user authentication state */}
      <UserProvider>
        {/* Provides global search term state */}
        <SearchProvider>
          {/* Sets up routing */}
          <Router>
            {/* Navbar appears on every page */}
            <NavBar />

            {/* Define all routes (pages) */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
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
    </CartProvider>
  );
}

export default App;
