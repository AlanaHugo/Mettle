import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"; // Global CSS styles for the entire app

// Importing page components with explicit .js extensions for ES module compatibility
import Products from "./pages/Products/Products.js";
import ProductDetail from "./pages/Products/ProductDetail.js";
import Articles from "./pages/Articles/Articles.js";
import SubmitArticle from "./pages/Articles/SubmitArticle.js";
import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";
import Cart from "./pages/Cart/Cart.js";
import Home from "./pages/Home/Home.js";
import SearchResults from "./pages/SearchResults/SearchResultsPage.js";
import ArticleDetail from "./pages/Articles/ArticleDetail.js";

// Importing shared UI components with explicit .js extensions
import NavBar from "./components/NavBar/Navbar.js";
import Footer from "./components/Footer/Footer.js";

// Importing React Context providers with explicit .js extensions
import { CartProvider } from "./context/cartContext.js";        // Manages shopping cart state globally
import { SearchProvider } from "./context/SearchContext.js";    // Manages search state globally
import { UserProvider } from "./context/userContext.js";        // Manages user authentication state globally

/**
 * App Component
 * -------------
 * This is the root component of the application.
 * It wraps all pages inside global context providers for
 * cart, user, and search state management.
 * 
 * Uses React Router v6 for client-side routing between pages.
 */
function App() {
  return (
    // CartProvider: Makes cart data and actions available throughout the app
    <CartProvider>
      {/* UserProvider: Makes current user info and auth state available globally */}
      <UserProvider>
        {/* SearchProvider: Makes search term and results available globally */}
        <SearchProvider>
          {/* Router wraps the app and enables client-side route handling */}
          <Router>
            {/* NavBar component shown on all pages */}
            <NavBar />

            {/* Routes defines all URL routes in the app */}
            <Routes>
              {/* Route definitions: path and component to render */}
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

            {/* Footer component shown on all pages */}
            <Footer />
          </Router>
        </SearchProvider>
      </UserProvider>
    </CartProvider>
  );
}

export default App;
