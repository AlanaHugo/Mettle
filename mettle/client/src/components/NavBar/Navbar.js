// Core React and routing imports
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Contexts and services
import { useUser } from "../../context/userContext.js"; // User auth context
import { SearchContext } from "../../context/SearchContext.js"; // Global search context
import { useCart } from "../../context/cartContext.js";

// Material UI components
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/system";

// MUI icons
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";

// Local styles
import "./Navbar.css";

// Styled MUI search input
const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "#502419",
  border: "1px solid #ccc",
  borderRadius: 4,
  padding: "2px 8px",
  marginLeft: theme.spacing(1),
  width: "200px",
  transition: "width 0.3s ease",
}));

/**
 * SearchBarToggle Component
 * ---------------------------------
 * Renders an animated search input tied to global search context.
 */
const SearchBarToggle = () => {
  const { setSearchQuery } = useContext(SearchContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

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
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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

/**
 * Navbar Component
 * ---------------------------------
 * Renders the Mettle top navigation bar with links, search, and user/logout handling.
 */
const Navbar = () => {
  const { user, logout } = useUser(); // Use logout from context
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = () => setShowSearch((prev) => !prev);
  const { cartItems } = useCart();

  // Logout menu control
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Logout function
  const handleLogout = () => {
    logout(); // Use context logout
    handleClose(); // Close dropdown
    navigate("/login", {
      state: {
        message:
          "Thanks for visiting Mettle. You are now logged out of your account.",
      },
    });
  };

  // Highlight active nav link
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar className="AppBar" position="static">
      <Toolbar className="ToolBar">
        {/* Site logo */}
        <div className="logoDiv">
          <Button className="Logo" component={Link} to="/">
            Mettle
          </Button>
        </div>

        {/* Navigation links */}
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

        {/* Search, Profile/Logout, and Cart icons */}
        <div className="icons">
          {/* Search icon toggle */}
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

          {showSearch && <SearchBarToggle />}

          {/* Auth icon: login or logout dropdown */}
          {user ? (
            <>
              <IconButton
                onClick={handleMenu}
                style={{ backgroundColor: "#fff", color: "#502419" }}
              >
                <PersonOutlineOutlinedIcon className="icon" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={() => {
  console.log("Manage Articles clicked");
  navigate("/my-articles");
  handleClose();
}}>
  Manage Articles
</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              className={isActive("/login") ? "Login active" : "Login"}
              component={Link}
              to="/login"
            >
              <PersonOutlineOutlinedIcon className="icon" />
            </Button>
          )}

          {/* Shopping cart with badge for items added */}
          <Button
            className={isActive("/cart") ? "Cart active" : "Cart"}
            component={Link}
            to="/cart"
          >
            <Badge
              badgeContent={cartItems.length}
              color="error"
              overlap="rectangular"
              invisible={cartItems.length === 0}
            >
              <ShoppingCartOutlinedIcon className="icon" />
            </Badge>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
