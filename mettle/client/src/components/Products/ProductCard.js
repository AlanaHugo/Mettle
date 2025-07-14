import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../../pages/Products/Products.css"; 

export default function ProductCard({ product }) {
  return (
    <Card className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <CardContent className="product-content">
        <Typography variant="h6">{product.name}</Typography>
        <Typography>${product.price.toFixed(2)}</Typography>
        <Button component={Link} to={`/products/${product._id}`}>
          View
        </Button>
      </CardContent>
    </Card>
  );
}
