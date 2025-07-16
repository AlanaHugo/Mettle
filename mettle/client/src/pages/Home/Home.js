import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Home.css";
import { PrimaryButton, SecondaryButton } from "../../components/Buttons";


const Home = () => {
  return (
    <div>
      {/* Banner1 */}
      <Box className="flexBanner flexBanner1">
  <div className="textBlock1">
    <h2>What to give when you don't know what to give.</h2>
    <p>Thoughtfully curated gifts for yourself or someone special navigating a diagnosis or hospital stay.</p>
    <p>Our practical supplies come recommended by a community with firsthand experience with medical journeys. 
      You can read their stories and advice, connect with others and share your own stories and advice.</p>
    <div className="buttonsDiv">
    <PrimaryButton component={Link} to="/products">Shop Gifts</PrimaryButton>
    <SecondaryButton  component={Link} to="/articles">Community Page</SecondaryButton>
  </div>
  </div>
  </Box>
<Box className="Banner2">
  <h2>This is the header</h2>
  <p>This is placeholder text</p>
</Box>

</div>
);
};

export default Home;
