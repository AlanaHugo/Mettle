import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Global CSS styles
import App from "./App.js"; // Main App component
import reportWebVitals from "./reportWebVitals.js"; // Performance measuring utility
import { ThemeProvider, createTheme } from "@mui/material/styles"; // MUI theming utilities
import CssBaseline from "@mui/material/CssBaseline"; // Normalize and reset CSS baseline for MUI
import { SearchProvider } from "./context/SearchContext.js"; // Context provider for search state management

// Define a custom Material-UI theme for the app
const theme = createTheme({
  palette: {
    primary: {
      main: "#502419", // Caput Mortum - custom primary color
    },
    background: {
      default: "#fff", // White background for app
    },
  },
  typography: {
    fontFamily: '"Montserrat", "sans-serif"', // Custom font family
  },
});

// Create root DOM node where React app will mount
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app wrapped with theme and context providers
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Applies MUI baseline CSS for consistent styling */}
      <SearchProvider> {/* Makes search context available throughout the app */}
        <App /> {/* Main application component */}
      </SearchProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// Optional: Starts measuring app performance (e.g., for analytics or optimization)
reportWebVitals();
