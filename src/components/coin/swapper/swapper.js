import React from "react";
import SwapOptionTabs from "../swap-option-tabs";
import "./swapper.css";

function Swapper(props) {
  return (
    <div className="swapper-outer-container">
      <p className="calculator-heading">Crypto Swapper</p>
      <div className="swapper-inner-container"></div>
      <div className="swapper-options-container">
        <div className="swapper-option-container">
          <p className="swapper-option-label">Slippage Tolerance</p>
          <div className="">
            <SwapOptionTabs></SwapOptionTabs>
          </div>
        </div>
        <div className="swapper-option-container">
          <p className="swapper-option-label">Transaction Deadline</p>
          <div className="">
            <SwapOptionTabs></SwapOptionTabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swapper;
