import React, { useState } from "react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalculatorInput from "../calculator-input/calculator-input";
import "./calculator.css";

//========================================================
// CUSTOM STYLES
const IconStyles = {
  width: "2.4rem",
  height: "auto",
  // padding: "0.8rem",
  // borderRadius: "50%",
  // zIndex: 1,
  // position: "absolute",
  // left: "50%",
  // top: "50%",
  // transform: "translate(-50%, -50%)",
  // background: "linear-gradient(90deg, #b84dc3, #a620b4)",
  // boxShadow: "inset 0 0 2px #000",
};
//========================================================

function Calculator({
  coinSymbol,
  currencySymbol,
  currencyName,
  currencyRates,
}) {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [currency1, setCurrency1] = useState(coinSymbol);
  const [currency2, setCurrency2] = useState(currencyName);

  const handleInput1Change = (event) => {
    setInput1(event.target.value);
    if (event.target.value !== "")
      setInput2(event.target.value * currencyRates[currencyName]);
    if (event.target.value === "") setInput2("");
  };

  const handleInput2Change = (event) => {
    setInput1(event.target.value * currencyRates[currencyName]);
    setInput2(event.target.value);
  };

  const handleClick = () => {
    const temp1 = input1;
    setInput1(input2);
    setInput2(temp1);

    const temp2 = currency1;
    setCurrency1(currency2);
    setCurrency2(temp2);
  };

  return (
    // <div className="calculator-outer-container">
    <div className="calculator-container">
      <div className="calculator-input-container">
        <div className="calculator-input-labels">
          <p>Pay</p>
          <div className="calculator-balance">
            <AccountBalanceWalletIcon></AccountBalanceWalletIcon>Balance: 45.23
          </div>
        </div>
        <CalculatorInput
          currency1={currency1}
          currency2={currency2}
          input1={input1}
          input2={input2}
          inputOrder={1}
          handleChange={handleInput1Change}
        />
      </div>
      {/*<button className="switchButton" onClick={handleClick}>*/}
      {/*  <SwapVertIcon sx={IconStyles}></SwapVertIcon>*/}
      {/*</button>*/}
      <div className="calculator-input-container">
        <div className="calculator-input-labels">
          <p>Receive</p>
          <div className="calculator-balance">
            <AccountBalanceWalletIcon></AccountBalanceWalletIcon>Balance: 45.23
          </div>
        </div>
        <CalculatorInput
          currency1={currency1}
          currency2={currency2}
          input1={input1}
          input2={input2}
          inputOrder={2}
          handleChange={handleInput2Change}
        />
      </div>
    </div>
    // </div>
  );
}

export default Calculator;
