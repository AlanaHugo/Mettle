import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography } from '@mui/material';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <img src={product.imageUrl} alt={product.name} width="300" />
      <Typography variant="h4">{product.name}</Typography>
      <Typography>${product.price}</Typography>
      <Typography>{product.description}</Typography>
      <Button onClick={() => addToCart(product)}>Add to Cart</Button>
    </div>
  );
};

export default ProductDetail;
