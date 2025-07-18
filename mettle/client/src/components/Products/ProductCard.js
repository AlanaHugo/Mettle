import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function ProductCard({ product, filters }) {
  return (
    <Card className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <CardContent className="product-content">
        <Typography variant="h6">{product.name}</Typography>
        <Typography>${product.price.toFixed(2)}</Typography>
        <Button
          component={Link}
          to={`/products/${product._id}`}
          state={{ filters }}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
