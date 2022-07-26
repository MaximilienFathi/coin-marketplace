import React, { useEffect, useState } from "react";
import axios from "axios";
import Statistic from "./statistic";

function Hero() {
  // IMPORTANT - Should consolidate below into 1 state but closure issue
  // const [stats, setStats] = useState({});
  const [trending1, setTrending1] = useState(0);
  const [trending2, setTrending2] = useState(0);
  const [trending3, setTrending3] = useState(0);
  const [trending4, setTrending4] = useState(0);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => {
        setTrending1(res.data.coins[0].item);
        setTrending2(res.data.coins[1].item);
        setTrending3(res.data.coins[2].item);
        setTrending4(res.data.coins[3].item);
        // setStats(res.data.data); (HAS ISSUES)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // console.log(stats);
  // const values = Object.values(stats.total_volume);
  // const sum = values.reduce((accumulator, value) => {
  //   return accumulator + value;
  // }, 0);
  // console.log(sum);

  return (
    <div>
      <h1>An easy way to track and trade cryptocurrencies</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam
        assumenda atque culpa cum delectus earum enim facere fugit impedit iure
        iusto obcaecati, odio optio possimus praesentium rerum tempore velit!
      </p>
      <Statistic
        label="Market Capitalization"
        value={trending1.name}
        change={trending1.price_btc}
      ></Statistic>
      <Statistic
        label="24h Trading Volume"
        value={trending2.name}
        change={trending2.price_btc}
      ></Statistic>
      <Statistic
        label="Bitcoin Market Cap Dominance"
        value={trending3.name}
        change={trending3.price_btc}
      ></Statistic>
      <Statistic
        label="Number of Coins"
        value={trending4.name}
        change={trending4.price_btc}
      ></Statistic>
    </div>
  );
}

export default Hero;
