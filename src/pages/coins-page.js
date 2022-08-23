import React, { useEffect, useState } from "react";
import axios from "axios";
import favoritesContext from "../contexts/favorites-context";
import Header from "../components/others/header";
import Hero from "../components/others/hero";
import TableBox from "../components/coins/table-box";

function CoinsPage() {
  const [data, setData] = useState([]); // replace with "paginatedData"
  const [fullDataList, setFullDataList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  // Included the following + context provider in coins-page.js too because
  // otherwise favorite.js will complain since it cannot consume anything
  // without a provider first
  const [currency, setCurrency] = React.useState("");
  const [favoritesChanged, setFavoritesChanged] = useState(false);

  const pageSize = 100;
  const findPageCount = (coinsCount) =>
    setPageCount(Math.ceil(coinsCount / pageSize));

  // Retrieve total number of coins
  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/global")
      .then((response) => {
        findPageCount(response.data.data.active_cryptocurrencies);
        console.log(response.data.data.active_cryptocurrencies);
      })
      .catch((err) => console.log(err));
  }, []); // findPageCount - if included, runs too many times (remove []?)

  // Retrieve data of 100 coins on specific page
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${pageSize}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
      .then((response) => {
        console.log(response.data);
        // setData(addRankToCoins(response.data));
        setData(response.data);
      })
      .catch((err) => console.error(err));
  }, [page]); // This will run everytime page changes.

  // Retrieve full list of coins (necessary for search mechanism)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/list"
        );
        setFullDataList(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    // See explanation above for following. This does nothing but prevent
    // a context error in favorite.js
    <favoritesContext.Provider value={[favoritesChanged, setFavoritesChanged]}>
      {/* Replace className App with something else*/}
      <div className="App">
        <Header></Header>
        <Hero></Hero>
        <TableBox
          data={data}
          setData={setData}
          fullDataList={fullDataList}
          currency={currency}
          setCurrency={currency}
          page={page}
          setPage={setPage}
          pageCount={pageCount}
          setPageCount={setPageCount}
        ></TableBox>
      </div>
    </favoritesContext.Provider>
  );
}

export default CoinsPage;
