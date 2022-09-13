import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import currencyContext from "../../../contexts/currency-context";
import StatisticCard from "../statistic-card/statistic-card";
import HandshakeTwoToneIcon from "@mui/icons-material/HandshakeTwoTone";
import "./global-stats.css";

function GlobalStats() {
  const [currencyName] = useContext(currencyContext);
  const [marketCap, setMarketCap] = useState(0);
  // const [marketCapChange, setMarketCapChange] = useState(0);
  const [volume, setVolume] = useState(0);
  const [btcDominance, setBtcDominance] = useState(0);
  const [coinsTotal, setCoinsTotal] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/global"
        );
        const data = response.data.data;
        setMarketCap(data.total_market_cap[currencyName]);
        // setMarketCapChange(data.market_cap_change_percentage_24h_usd);
        setVolume(data.total_volume[currencyName]);
        setBtcDominance(data.market_cap_percentage.btc);
        setCoinsTotal(data.active_cryptocurrencies);
        // console.log(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [currencyName]);

  return (
    <div className="global-stats-section">
      <h1 className="global-stats-heading">
        An easy way to <span>track</span> and <span>trade</span>{" "}
        cryptocurrencies
      </h1>
      <p className="global-stats-description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam
        assumenda atque culpa cum delectus earum enim facere fugit impedit iure
        iusto obcaecati, odio optio possimus praesentium rerum tempore velit!
      </p>
      <div className="global-stats-cards-container">
        <StatisticCard
          label="Market Capitalization"
          value={marketCap}
          type={"monetary"}
          // change={marketCapChange}
        ></StatisticCard>
        <StatisticCard
          label="24h Trading Volume"
          value={volume}
          type={"monetary"}
          icon={HandshakeTwoToneIcon}
          // change={}
        ></StatisticCard>
        <StatisticCard
          label="Bitcoin Market Cap Dominance"
          value={btcDominance}
          type={"percentage"}
        ></StatisticCard>
        <StatisticCard
          label="Number of Coins"
          value={coinsTotal}
          type={"other"}
        ></StatisticCard>
      </div>
    </div>
  );
}

export default GlobalStats;
