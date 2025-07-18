import React from "react";

export const LabeledCheckbox = ({ name, checked, onChange, label }) => (
  <label style={{ display: "block", marginTop: "1rem" }}>
    <input type="checkbox" name={name} checked={checked} onChange={onChange} />
    {label}
  </label>
);
