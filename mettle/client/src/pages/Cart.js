import React from 'react';
import { Button, Typography } from '@mui/material';

const Cart = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5">Shopping Cart</Typography>
      {cart.map((item, index) => (
        <div key={index}>
          <Typography>{item.name} - ${item.price}</Typography>
          <Button onClick={() => removeFromCart(item._id)}>Remove</Button>
        </div>
      ))}
      <Typography>Total: ${total}</Typography>
    </div>
  );
};

export default Cart;
