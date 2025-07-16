import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const Navbar = ({ user }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/products">Products</Button>
        <Button color="inherit" component={Link} to="/articles">Articles</Button>
        <Button color="inherit" component={Link} to="/cart">Cart</Button>

        {user ? (
          <>
            <Button color="inherit" component={Link} to="/submit">Submit Article</Button>
            <span style={{ marginLeft: 'auto' }}>Welcome, {user.username}</span>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
