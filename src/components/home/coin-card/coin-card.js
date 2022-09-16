import React from "react";

function CoinCard({ name, price_btc, symbol, logo }) {
  return (
    <div>
      <img className="coin-logo" src={logo} alt={`logo of ${name}`}></img>
      <p>{name}</p>
      <p>{symbol}</p>
      <p>{price_btc}</p>
    </div>
  );
}

export default CoinCard;

// Must include price change (in past 24h?) (in USD or have it change?)
