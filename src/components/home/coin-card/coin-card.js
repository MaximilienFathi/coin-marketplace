import React from "react";

function CoinCard({ name, symbol, logo, current_price, price_change }) {
  return (
    <div>
      <img className="coin-logo" src={logo} alt={`logo of ${name}`}></img>
      <p>{name}</p>
      <p>{symbol}</p>
      <p>{current_price}</p>
      <p>{price_change}</p>
    </div>
  );
}

export default CoinCard;

// Must include price change (in past 24h?) (in USD or have it change?)
