import React from "react";
import { Box, Typography } from "@mui/material";
import "./Footer.css";

const Footer = () => (
  <Box className="footer" sx={{ bgcolor: "#eee", p: 2, mt: 4 }}>
    <div className="footer-flex">
      {/* Left: Footer Columns */}
      <div className="footerCols">
        <div className="about">
          <h3>About Us</h3>
          <ul>
            <li>About</li>
            <li>Community Impact</li>
          </ul>
        </div>
        <div className="terms">
          <h3>The Fine Print</h3>
          <ul>
            <li>Terms & Conditions</li>
            <li>Shipping Policy</li>
            <li>Returns Policy</li>
          </ul>
        </div>
        <div className="support">
          <h3>Support</h3>
          <ul>
            <li>FAQs</li>
            <li>Customer Care</li>
            <li>Contact Us Form</li>
          </ul>
        </div>
      </div>

      {/* Right: Copyright */}
      <div className="copyright">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Mettle. All rights reserved.
        </Typography>
      </div>
    </div>
  </Box>
);

export default Footer;
