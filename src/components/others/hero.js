import React, { useEffect, useState } from "react";
import axios from "axios";
import Statistic from "./statistic";
import "./hero.css";

function Hero() {
  const [marketCap, setMarketCap] = useState(0);
  const [marketCapChange, setMarketCapChange] = useState(0);
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
        setMarketCap(data.total_market_cap.usd);
        setMarketCapChange(data.market_cap_change_percentage_24h_usd);
        setVolume(data.total_volume.usd);
        setBtcDominance(data.market_cap_percentage.btc);
        setCoinsTotal(data.active_cryptocurrencies);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="hero-heading">
        An easy way to track and trade cryptocurrencies
      </h1>
      <p className="hero-description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam
        assumenda atque culpa cum delectus earum enim facere fugit impedit iure
        iusto obcaecati, odio optio possimus praesentium rerum tempore velit!
      </p>
      <div className="hero-stats">
        <Statistic
          label="Market Capitalization"
          value={marketCap}
          change={marketCapChange}
        ></Statistic>
        <Statistic
          label="24h Trading Volume"
          value={volume}
          // change={}
        ></Statistic>
        <Statistic
          label="Bitcoin Market Cap Dominance"
          value={btcDominance}
        ></Statistic>
        <Statistic label="Number of Coins" value={coinsTotal}></Statistic>
      </div>
    </div>
  );
}

export default Hero;
