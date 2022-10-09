import React, { useState } from "react";

function Calculator(props) {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="calculator-outer-container">
      <p>Crypto Calculator</p>
      <div className="calculator-inner-container">
        <input type="number" value={value} onChange={handleChange} />
        <button></button>
        <input type="number" value={value} onChange={handleChange} />
      </div>
    </div>
  );
}

export default Calculator;
