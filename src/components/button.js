import React from "react";

function Button({ label, handleClick }) {
  return (
    <button className="btn" onClick={handleClick}>
      {label}
    </button>
  );
}

export default Button;
