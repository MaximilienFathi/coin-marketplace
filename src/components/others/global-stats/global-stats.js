import React, { useContext } from "react";

import currencyContext from "../../../contexts/currency-context";
import globalMarketDataContext from "../../../contexts/global-market-data-context";
import StatisticCard from "../statistic-card/statistic-card";
import "./global-stats.css";

//############################################################################

function GlobalStats() {
  const [currencyName] = useContext(currencyContext);
  const [globalMarketData] = useContext(globalMarketDataContext);

  // Keep track of labels and related data tag
  const cardsArray = [
    {
      label: "Market Capitalization",
      value: globalMarketData?.["total_market_cap"]?.[currencyName],
      type: "monetary",
    },
    {
      label: "24h Trading Volume",
      value: globalMarketData?.["total_volume"]?.[currencyName],
      type: "monetary",
    },
    {
      label: "Bitcoin Market Cap Dominance",
      value: globalMarketData?.["market_cap_percentage"]?.["btc"],
      type: "percentage",
    },
    {
      label: "Number of Coins",
      value: globalMarketData?.["active_cryptocurrencies"],
      type: "other",
    },
  ];

  //############################################################################

  return (
    <div className="global-stats-section">
      <div className="global-stats-cards-container">
        {cardsArray.map(({ label, value, type }) => {
          return (
            <StatisticCard
              key={label}
              label={label}
              value={value}
              type={type}
            ></StatisticCard>
          );
        })}
      </div>
    </div>
  );
}

export default GlobalStats;
