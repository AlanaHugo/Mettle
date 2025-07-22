// Buttons.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Shared styles
const baseStyle = {
  width: '200px',
  padding: '10px 24px',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.75em',
  textTransform: 'none',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  display: 'inline-block',
  textAlign: 'center',
  textDecoration: 'none',
};

const hoverEffect = (hoverColor, defaultColor) => ({
  onMouseOver: (e) => (e.target.style.backgroundColor = hoverColor),
  onMouseOut: (e) => (e.target.style.backgroundColor = defaultColor),
});

// Primary
export const PrimaryButton = ({ children, to, onClick, type = 'button' }) => {
  const style = { ...baseStyle, backgroundColor: '#C7CB85', color: 'black' };
  const hover = hoverEffect('#7EA172', '#C7CB85');

  if (to) {
    return (
      <Link to={to} style={style} {...hover}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} style={style} {...hover}>
      {children}
    </button>
  );
};

// Secondary
export const SecondaryButton = ({ children, to, onClick, type = 'button' }) => {
  const style = { ...baseStyle, backgroundColor: '#EBBE9B', color: 'black' };
  const hover = hoverEffect('#E7A977', '#EBBE9B');

  if (to) {
    return (
      <Link to={to} style={style} {...hover}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} style={style} {...hover}>
      {children}
    </button>
  );
};
