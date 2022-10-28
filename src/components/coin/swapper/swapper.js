import React, { useState } from "react";
import Button from "@mui/material/Button";
import SwapOptionTabs from "../swap-option-tabs/swap-option-tabs";
import Calculator from "../calculator/calculator";
import "./swapper.css";

const ButtonStyles = {
  width: "80%",
  // color: "white",
  padding: "0.8rem",
  fontSize: "1.8rem",
  fontWeight: "500",
  borderRadius: "11px",
  border: "none",
  textTransform: "capitalize",
  color: "inherit",
  background: "linear-gradient(90deg, #b84dc3, #a620b4)",
  boxShadow: "inset 0 0 2px #000",
};

function Swapper({ coinSymbol, currencySymbol, currencyName, currencyRates }) {
  const [warning, setWarning] = useState("");
  const [input2, setInput2] = useState("");
  const [slippage, setSlippage] = useState(0.1);

  const findMinimumReceived = () => {
    return input2 - (slippage / 100) * input2;
  };

  return (
    <div className="swapper-outer-container">
      <h2 className="swapper-heading">Crypto Swapper</h2>
      {/*<hr className="swapper-separator" />*/}
      <Calculator
        coinSymbol={coinSymbol}
        currencyName={currencyName}
        currencyRates={currencyRates}
        input2={input2}
        setInput2={setInput2}
      ></Calculator>
      {/*<hr className="swapper-separator" />*/}
      {/*<div className="swapper-inner-container"></div>*/}
      <div className="swapper-options-container">
        <div className="swapper-option-container">
          <p className="swapper-option-label">Slippage Tolerance</p>
          <SwapOptionTabs
            unit="%"
            values={[0.1, 0.5, 1, 2]}
            setSlippage={setSlippage}
            setWarning={setWarning}
          ></SwapOptionTabs>
          <p className="swapper-option-warning">{warning}</p>
        </div>
        <div className="swapper-option-container">
          <p className="swapper-option-label">Transaction Deadline</p>
          <SwapOptionTabs
            unit="min"
            values={[1, 5, 10, 30]}
            setWarning={setWarning}
          ></SwapOptionTabs>
        </div>
      </div>
      {/*<hr className="swapper-separator" />*/}
      <div className="swapper-info-container">
        <div className="swapper-info-line">
          <p className="swapper-info-label">Rate</p>
          <p>
            1 {coinSymbol.toUpperCase()} = {currencySymbol}
            {currencyRates[currencyName]}
          </p>
        </div>
        <div className="swapper-info-line">
          <p className="swapper-info-label">Minimum Received</p>
          <p>{findMinimumReceived()}</p>
        </div>
        <div className="swapper-info-line">
          <p className="swapper-info-label">Price Impact</p>
          <p>0.3%</p>
        </div>
      </div>
      <div className="swapper-btn-container">
        <Button className="swapper-submit-btn" sx={ButtonStyles}>
          Submit Swap
        </Button>
      </div>
    </div>
  );
}

export default Swapper;
