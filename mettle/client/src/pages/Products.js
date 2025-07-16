import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

useEffect(() => {
  console.log("useEffect triggered"); // Check this shows in console
  axios.get('/api/products')
    .then(res => {
      console.log('Fetched products:', res.data);
      setProducts(res.data);
    })
    .catch(err => {
      console.error('Error fetching products:', err);
    });
}, []);

  return (
    <Grid container spacing={2} padding={2}>
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} key={product._id}>
          <Card>
            <img src={product.imageUrl} alt={product.name} width="100%" />
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>${product.price}</Typography>
              <Button component={Link} to={`/products/${product._id}`}>
                View
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
