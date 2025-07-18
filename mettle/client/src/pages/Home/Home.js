import React from "react";
import { Button, Typography, Box } from "@mui/material"; // MUI components for layout and styling
import { Link } from "react-router-dom"; // For navigation
import "./Home.css"; // Local styles specific to the Home page
import { PrimaryButton, SecondaryButton } from "../../components/Buttons"; // Custom reusable button components

/**
 * Home Component
 * ----------------
 * Displays the homepage layout, including:
 * - Banner 1: Intro with text and call-to-action buttons
 * - Divider
 * - Banner 2: Pay It Forward section with description and background image
 */
const Home = () => {
  return (
    <div>
      {/* ---------- Banner 1: Intro Section with Shop & Community Links ---------- */}
      <Box className="flexBanner flexBanner1">
        <div className="textBlock1">
          <h2>What to give when you don't know what to give.</h2>
          <p>
            Thoughtfully curated gifts for yourself or someone special
            navigating a diagnosis or hospital stay.
          </p>
          <p>
            Our practical supplies come recommended by a community with
            firsthand experience with medical journeys. You can read their
            stories and advice, connect with others and share your own stories
            and advice.
          </p>

          {/* CTA Buttons linking to Products and Community Articles */}
          <div className="buttonsDiv">
            <PrimaryButton component={Link} to="/products">
              Shop Gifts
            </PrimaryButton>
            <SecondaryButton component={Link} to="/articles">
              Community Page
            </SecondaryButton>
          </div>
        </div>
      </Box>

      {/* ---------- Divider between Banners ---------- */}
      <div className="Homedivider"></div>

      {/* ---------- Banner 2: Pay It Forward Program Info ---------- */}
      <Box className="Banner2">
        <div className="Banner2Text">
          <h2>
            Pay it Forward <br />
            Program
          </h2>

          {/* Program description paragraphs */}
          <p>
            With any purchase, you have the option to buy a second pack that
            will be donated to someone who needs it in a regional community.
            Each donated pack is thoughtfully curated with comfort and
            practicality in mind — including cosy nightwear, silk pillowcase,
            warm bed socks, and other treatment essentials, plus the bag to
            carry it all.
          </p>
          <p>
            Your act of generosity helps provide useful items and small
            comforts, turning a simple gift into a meaningful gesture for
            someone doing it tough.
          </p>
          <p>
            Opt in at checkout to send everyday support and thoughtful goods to
            those who need it most. You can leave a note or donate on someone
            else's behalf.
          </p>
        </div>

        {/* Background image box (hidden on mobile via CSS) */}
        <div className="Banner2Img"></div>
      </Box>
    </div>
  );
};

export default Home;
