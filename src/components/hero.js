import React, { useEffect, useState } from "react";
import axios from "axios";
import Statistic from "./statistic";

function Hero() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/global")
      .then(async (res) => {
        const temp = await res.data.data;
        setStats(temp);
        // console.log(stats);
        // const values = Object.values(stats.total_volume);
        // const sum = values.reduce((accumulator, value) => {
        //   return accumulator + value;
        // }, 0);
        // console.log(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>An easy way to track and trade cryptocurrencies</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam
        assumenda atque culpa cum delectus earum enim facere fugit impedit iure
        iusto obcaecati, odio optio possimus praesentium rerum tempore velit!
      </p>
      {/*<Statistic label="Market Capitalization" value="0" change=""></Statistic>*/}
      {/*<Statistic label="24h Trading Volume" value="0" change=""></Statistic>*/}
      {/*<Statistic*/}
      {/*  label="Bitcoin Market Cap Dominance"*/}
      {/*  value={stats.market_cap_percentage.btc}*/}
      {/*  change=""*/}
      {/*></Statistic>*/}
      {/*<Statistic*/}
      {/*  label="Number of Coins"*/}
      {/*  value={stats.active_cryptocurrencies}*/}
      {/*  change=""*/}
      {/*></Statistic>*/}
    </div>
  );
}

export default Hero;
