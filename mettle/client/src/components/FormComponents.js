import React from "react";

/**
 * FullWidthInput
 * --------------
 * A text input that stretches to 100% width of its container.
 * 
 * To control width and layout, wrap this input in a container (e.g., a div or form)
 * with desired CSS styles like `display: flex` or grid.
 * 
 * Props: pass any input props (placeholder, value, onChange, etc.)
 */
export const FullWidthInput = (props) => {
  return (
    <input
      type="text"
      style={{
        width: "100%",        // Full width of parent container
        padding: "8px",
        marginBottom: "30px",
        boxSizing: "border-box",
        fontFamily: "Montserrat",
      }}
      {...props}
    />
  );
};

/**
 * SmallerInput
 * ------------
 * A smaller text input, by default 30% width of parent container.
 * 
 * Wrap in a flex container or grid to control placement next to other inputs.
 * 
 * Props: pass any input props (placeholder, value, onChange, etc.)
 */
export const SmallerInput = (props) => {
  return (
    <input
      type="text"
      style={{
        width: "30%",         // Smaller fixed width (can be adjusted)
        minWidth: "150px",
        marginBottom: "30px",    
        padding: "8px",
        boxSizing: "border-box",
        fontFamily: "Montserrat",
        
      }}
      {...props}
    />
  );
};


// Example wrapping inputs side-by-side in a form:

{/* <form style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
  <FullWidthInput placeholder="Full width input" />
  <SmallerInput placeholder="Smaller input" />
</form> */}

/**
 * A reusable container component for wrapping form content.
 * Applies consistent styling (e.g., width, background, border radius).
 */
export const FormContainer = ({ children, ...props }) => {
  return (
    <div
      style={{
        width: "80vw",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
      {...props}
    >
      {children}
    </div>
  );
};