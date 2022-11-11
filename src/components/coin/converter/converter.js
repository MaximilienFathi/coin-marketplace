import React, { useState } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ConverterInput from "../converter-input/converter-input";
import "./converter.css";

function Converter({
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
    <div className="converter-container">
      <div className="converter-input-container">
        <div className="converter-input-labels">
          <p>Pay</p>
          <div className="converter-balance">
            <AccountBalanceWalletIcon></AccountBalanceWalletIcon>Balance: 45.23
          </div>
        </div>
        <ConverterInput
          currency={coinSymbol}
          input={input1}
          handleChange={handleInput1Change}
        />
      </div>
      <div className="converter-input-container">
        <div className="converter-input-labels">
          <p>Receive</p>
          <div className="converter-balance">
            <AccountBalanceWalletIcon></AccountBalanceWalletIcon>Balance: 12.47
          </div>
        </div>
        <ConverterInput
          currency={currencyName}
          input={input2}
          handleChange={handleInput2Change}
        />
      </div>
    </div>
  );
}

export default Converter;
