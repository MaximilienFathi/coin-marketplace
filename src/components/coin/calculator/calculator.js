import React, { useState } from "react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalculatorInput from "../calculator-input/calculator-input";
import "./calculator.css";

//========================================================
// CUSTOM STYLES
// const IconStyles = {
//   width: "2.4rem",
//   height: "auto",
//   // padding: "0.8rem",
//   // borderRadius: "50%",
//   // zIndex: 1,
//   // position: "absolute",
//   // left: "50%",
//   // top: "50%",
//   // transform: "translate(-50%, -50%)",
//   // background: "linear-gradient(90deg, #b84dc3, #a620b4)",
//   // boxShadow: "inset 0 0 2px #000",
// };
//========================================================

function Calculator({
  coinSymbol,
  currencyName,
  currencyRates,
  input2,
  setInput2,
}) {
  const [input1, setInput1] = useState("");
  // const [input2, setInput2] = useState("");

  const handleInput1Change = (event) => {
    setInput1(event.target.value);
    if (event.target.value !== "")
      setInput2(event.target.value * currencyRates[currencyName]);
    if (event.target.value === "") setInput2("");
  };

  const handleInput2Change = (event) => {
    setInput2(event.target.value);
    if (event.target.value !== "")
      setInput1(event.target.value / currencyRates[currencyName]);
    if (event.target.value === "") setInput1("");
  };

  return (
    <div className="calculator-container">
      <div className="calculator-input-container">
        <div className="calculator-input-labels">
          <p>Pay</p>
          <div className="calculator-balance">
            <AccountBalanceWalletIcon></AccountBalanceWalletIcon>Balance: 45.23
          </div>
        </div>
        <CalculatorInput
          currency={coinSymbol}
          input={input1}
          handleChange={handleInput1Change}
        />
      </div>
      <div className="calculator-input-container">
        <div className="calculator-input-labels">
          <p>Receive</p>
          <div className="calculator-balance">
            <AccountBalanceWalletIcon></AccountBalanceWalletIcon>Balance: 12.47
          </div>
        </div>
        <CalculatorInput
          currency={currencyName}
          input={input2}
          handleChange={handleInput2Change}
        />
      </div>
    </div>
  );
}

export default Calculator;
