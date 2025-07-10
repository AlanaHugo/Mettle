import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant="h3" gutterBottom>Welcome to Mettle</Typography>
      <Typography variant="h6" paragraph>
        Thoughtfully curated gifts and real stories for people navigating treatment, recovery, or hospital stays.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/products">
        Shop Gifts
      </Button>
      <Button variant="outlined" color="secondary" sx={{ ml: 2 }} component={Link} to="/articles">
        Read Articles
      </Button>
    </Box>
  );
};

export default Home;
