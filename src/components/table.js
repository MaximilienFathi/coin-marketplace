import React, { useEffect, useInsertionEffect, useState } from "react";
import axios from "axios";

function Table(props) {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <div></div>; // {coins.map((coin) => {return(<Row>)})}
}

export default Table;
