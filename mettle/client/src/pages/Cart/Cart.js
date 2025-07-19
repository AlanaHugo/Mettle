import React from 'react';
import { Button, Typography } from '@mui/material';
import { useCart } from '../../context/cartContext.js'; // Access cart state and actions
import "./Cart.css";


/**
 * Cart Component
 * --------------
 * Displays cart items with images, name, price, and allows removal of items.
 * Also calculates and displays total price.
 */
const Cart = () => {
  // Get cart items and remove function from context
  const { cartItems, removeFromCart } = useCart();

  // Calculate total price of items in cart
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className = "CartContainer" >

      <h2 className = "CartHdr">Your Cart</h2>
      
      {/* Show message if cart is empty */}
      {cartItems.length === 0 && <Typography>Your cart is empty.</Typography>}

      {/* List all cart items */}
      {cartItems.map((item, index) => (
        <div className="CartGrid"
          key={index}
        >
          {/* Product image */}
          <div className="ImageDescrContainer">
          <div className="imageContainer">
          <img className = "CartImg" src={item.imageUrl} // Ensure this matches your data key
            alt={item.name}
          />
          </div>

          {/* Product name and price */}
          <Typography>
            {item.name}<br/>
            ${item.price.toFixed(2)}
          </Typography>

          {/* Remove button */}
          <Button
            variant="outlined"
            color="error"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </Button>
          </div>
        </div>
      ))}

      {/* Total price */}
      {cartItems.length > 0 && (
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
      )}
    </div>
  );
};

export default Cart;
