import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import "./Navbar.css";

// Styled Search Input
const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "#502419",
  border: "1px solid #ccc",
  borderRadius: 4,
  padding: "2px 8px",
  marginLeft: theme.spacing(1),
  width: "200px",
  transition: "width 0.3s ease",
}));

// SearchBar component 
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

// Main Navbar component
const Navbar = ({ user }) => {
  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = () => setShowSearch((prev) => !prev);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar className="AppBar" position="static">
      <Toolbar className="ToolBar">
        <div className="logoDiv">
          <Button className="Logo" component={Link} to="/">
            Mettle
          </Button>
        </div>

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

        <div className="icons">
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

          <Button
            className={isActive("/login") ? "Login active" : "Login"}
            component={Link}
            to="/login"
          >
            <PersonOutlineOutlinedIcon className="icon" />
          </Button>

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
