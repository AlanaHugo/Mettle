// Core React and routing imports
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Global context for managing search state
import { SearchContext } from "../../context/SearchContext";

// Material UI components for layout and interactivity
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";

// MUI icons used in the navbar
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";

// Local styles
import "./Navbar.css";

// Styled MUI input for the search field with custom layout and transition
const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "#502419",
  border: "1px solid #ccc",
  borderRadius: 4,
  padding: "2px 8px",
  marginLeft: theme.spacing(1),
  width: "200px",
  transition: "width 0.3s ease",
}));

// Component for toggling and executing search functionality
const SearchBarToggle = () => {
  const { setSearchQuery } = useContext(SearchContext); // Access context to set global search query
  const [input, setInput] = useState(""); // Local state to track input value
  const navigate = useNavigate(); // React Router hook for programmatic navigation

  // Trigger search: updates global context and navigates to search results page
  const handleSearch = () => {
    if (input.trim()) {
      setSearchQuery(input.trim());
      navigate(`/search?q=${encodeURIComponent(input.trim())}`);
    }
  };

  return (
    <SearchInput
      placeholder="Search..."
      value={input}
      onChange={(e) => setInput(e.target.value)} // Update state on input change
      onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Run search on Enter key
      autoFocus
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={handleSearch} size="small">
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

// Main Navbar component: renders top navigation bar with routing, icons, and search
const Navbar = ({ user }) => {
  const [showSearch, setShowSearch] = useState(false); // Controls visibility of the search input
  const toggleSearch = () => setShowSearch((prev) => !prev); // Toggles search input visibility
  const location = useLocation(); // Provides current route info

  // Returns true if the current route matches the given path
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar className="AppBar" position="static">
      <Toolbar className="ToolBar">
        {/* Site logo button that routes to the homepage */}
        <div className="logoDiv">
          <Button className="Logo" component={Link} to="/">
            Mettle
          </Button>
        </div>

        {/* Main navigation links for product and article pages */}
        <div className="navButtons">
          <Button
            className={isActive("/products") ? "Products active" : "Products"}
            component={Link}
            to="/products"
          >
            Gift Shop
          </Button>

          <Button
            className={isActive("/articles") ? "Articles active" : "Articles"}
            component={Link}
            to="/articles"
          >
            Community
          </Button>

          {/* Conditionally render Submit Article button if user is authenticated */}
          {user && (
            <Button
              className={isActive("/submit") ? "Submit active" : "Submit"}
              component={Link}
              to="/submit"
            >
              Submit Article
            </Button>
          )}
        </div>

        {/* Icon section: includes search toggle, login, and cart buttons */}
        <div className="icons">
          {/* Toggles the visibility of the search input */}
          <IconButton
            onClick={toggleSearch}
            style={{
              backgroundColor: "#fff",
              color: "#502419",
              transition: "0.2s ease",
              paddingRight: "12px",
            }}
            aria-label="toggle search"
          >
            <SearchIcon />
          </IconButton>

          {/* Conditionally render search input when toggled on */}
          {showSearch && <SearchBarToggle />}

          {/* Link to login/profile page */}
          <Button
            className={isActive("/login") ? "Login active" : "Login"}
            component={Link}
            to="/login"
          >
            <PersonOutlineOutlinedIcon className="icon" />
          </Button>

          {/* Link to shopping cart */}
          <Button
            className={isActive("/cart") ? "Cart active" : "Cart"}
            component={Link}
            to="/cart"
          >
            <ShoppingCartOutlinedIcon className="icon" />
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
