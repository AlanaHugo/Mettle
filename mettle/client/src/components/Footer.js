import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box sx={{ bgcolor: '#eee', textAlign: 'center', p: 2, mt: 4 }}>
    <Typography variant="body2">
      &copy; {new Date().getFullYear()} Mettle. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
