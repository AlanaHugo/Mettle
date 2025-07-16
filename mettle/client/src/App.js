import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import './index.css'; // global styles

// Pages and components
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/Products/ProductDetail";
import Articles from "./pages/Articles/Articles";
import SubmitArticle from "./pages/SubmitArticle";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import ArticleDetail from "./pages/Articles/ArticleDetail";
import SearchResults from "./pages/SearchResults/SearchResultsPage";

// 🔍 Import SearchProvider
import { SearchProvider } from "./context/SearchContext";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (id) =>
    setCart(cart.filter((item) => item._id !== id));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.error("🔐 Auth error:", err);
          localStorage.removeItem("token");
        });
    }
  }, []);

  return (
    <SearchProvider>
      <Router>
        <NavBar user={user} />
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
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </SearchProvider>
  );
}

export default App;
