// src/components/Buttons.js
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

// Primary Button
export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#C7CB85',
  color: 'black',
  width: 200,
  padding: '10px 24px',
  fontFamily: 'Montserrat, sans-serif',
  fontSize:'0.75em',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#7EA172',
  },
}));

// Secondary Button
export const SecondaryButton = styled(Button)(({ theme }) => ({
 backgroundColor: '#EBBE9B',
  color: 'black',
  width: 200,
  padding: '10px 24px',
  fontFamily: 'Montserrat, sans-serif',
  fontSize:'0.75em',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#E7A977',
  },
}));
