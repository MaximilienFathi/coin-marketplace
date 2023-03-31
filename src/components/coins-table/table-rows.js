import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import coinsListContext from "../../contexts/coins-list-context";
import currencyContext from "../../contexts/currency-context";
import currentPageContext from "../../contexts/current-page-context";
import pageCountContext from "../../contexts/page-count-context";
import paginatedDataContext from "../../contexts/paginated-data-context";
import TableHeader from "../others/table-header/table-header";
import TableData from "./table-data";
import "./table-rows.css";

//############################################################################

export default function TableRows({ searchQuery }) {
  const [coinsList] = useContext(coinsListContext);
  const [currencyName, , ,] = useContext(currencyContext);
  const [currentPage] = useContext(currentPageContext);
  const [, setPageCount] = useContext(pageCountContext);
  const [paginatedData, setPaginatedData] = useContext(paginatedDataContext);

  const [searchResults, setSearchResults] = useState([]);
  const [sortedData, setSortedData] = useState(""); // TODO: REVIEW PURPOSE!

  const dataHeaders = {
    favorite: "",
    market_cap_rank: "#",
    name: "Name",
    current_price: "Price",
    price_change_percentage_1h_in_currency: "Change (1h)",
    price_change_percentage_24h_in_currency: "Change (24h)",
    price_change_percentage_7d_in_currency: "Change (7d)",
    total_volume: "Volume (24h)",
    market_cap: "Market Cap",
  };

  //############################################################################

  // Reset position of sort arrows when changing page.
  useEffect(() => setSortedData(""), [currentPage]);

  // Display maximum of 3 search results for each character input
  // TODO:
  // The higher the counter limit, the sooner you will get
  // error 429. This is because everytime search changes, an api call
  // for each of the 5 (current limit) coins-table will be made.
  // SOLUTION: Show the results inside a menu list under the search
  // box. This way, we do not have to make an API call everytime to
  // show all the data.
  useEffect(() => {
    let count = 0;
    const pageSize = 100;
    // const searchedCoins = filterSearchCoins(count);
    // fetchSearchedQueryData(pageSize, searchedCoins).then((r) =>
    //   console.log("das", r)
    // );

    console.log("update", paginatedData);
    // const tempArray = paginatedData.map((coin) => transformData(coin));
    // console.log("tempArray is", tempArray);

    // setPaginatedData(tempArray);
  }, [paginatedData, searchQuery]);

  //############################################################################

  // Filter coin objects and only return those relevant to a search query
  function filterSearchCoins(count) {
    // Ternary conditional needed to distinguish coinsPage from favoritesPage.
    // Favorites page only deals with favorites not the full list of coins.
    return (coinsList ? coinsList : paginatedData).filter((coin) => {
      if (
        count < 3 &&
        coin.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      ) {
        count++;
        return true;
      }
      return false;
    });
  }

  // Update all filtered coin objects with more data
  async function fetchSearchedQueryData(pageSize, searchedCoins) {
    searchedCoins = await Promise.all(
      searchedCoins.map((coin) => fetchData(coin.id))
    );
    setSearchResults(searchedCoins.map((coin) => updateFilteredData(coin)));
    // Can't remember what following was for.
    searchQuery
      ? setPageCount(0)
      : setPageCount(
          Math.ceil((coinsList ? coinsList : paginatedData).length / pageSize)
        );
  }

  // Fetch API data for a specific coin
  async function fetchData(coinID) {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinID}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  // Return an updated version of a coin object with more data in it
  function updateFilteredData(coin) {
    const marketData = coin["market_data"];
    console.log(currencyName, marketData);
    return {
      ...coin,
      market_cap_rank: coin.market_cap_rank || Infinity,
      image: coin.image["large"],
      current_price: marketData.current_price[currencyName],
      price_change_percentage_1h_in_currency:
        marketData.price_change_percentage_1h_in_currency[currencyName],
      price_change_percentage_24h_in_currency:
        marketData.price_change_percentage_24h_in_currency[currencyName],
      price_change_percentage_7d_in_currency:
        marketData.price_change_percentage_7d_in_currency[currencyName],
      total_volume: marketData.total_volume[currencyName],
      market_cap: marketData.market_cap[currencyName],
    };
  }

  // function transformData(coin) {
  //   // Setting to Infinity to deal with ranks that are too low, i.e. have
  //   // market cap of 0
  //   coin.market_cap_rank = coin.market_cap_rank || Infinity;
  //   coin.current_price = coin.current_price || 0;
  //   coin.price_change_percentage_1h_in_currency =
  //     coin.price_change_percentage_1h_in_currency || 0;
  //   coin.price_change_percentage_24h_in_currency =
  //     coin.price_change_percentage_24h_in_currency || 0;
  //   coin.price_change_percentage_7d_in_currency =
  //     coin.price_change_percentage_7d_in_currency || 0;
  //   coin.total_volume = coin.total_volume || 0;
  //   coin.market_cap = coin.market_cap || 0;
  //   return coin;
  // }

  // paginatedData.map((coin) => transformData(coin));
  // searchResults.map((coin) => transformData(coin));
  // The above changes the original data arrays
  // Using a duplicated data array and using setData(fixedData); caused issues

  //############################################################################

  return (
    <table className="coins-table">
      <thead className="coins-table-head">
        <tr className="coins-table-row">
          <th>{dataHeaders.favorite}</th>
          {Object.entries(dataHeaders)
            .slice(1)
            .map(([headerKey, headerName]) => {
              return (
                <TableHeader
                  key={headerKey}
                  headerKey={headerKey}
                  headerName={headerName}
                  data={searchQuery ? searchResults : paginatedData}
                  setData={searchQuery ? setSearchResults : setPaginatedData}
                  sortedData={sortedData}
                  setSortedData={setSortedData}
                ></TableHeader>
              );
            })}
        </tr>
      </thead>
      <tbody className="coins-table-body">
        {(searchQuery ? searchResults : paginatedData).map((coin) => {
          return (
            <TableData
              key={coin.id}
              id={coin.id}
              market_cap_rank={coin.market_cap_rank}
              image={coin.image}
              name={coin.name}
              symbol={coin.symbol}
              current_price={coin.current_price}
              price_change_percentage_1h_in_currency={
                coin.price_change_percentage_1h_in_currency
              }
              price_change_percentage_24h_in_currency={
                coin.price_change_percentage_24h_in_currency
              }
              price_change_percentage_7d_in_currency={
                coin.price_change_percentage_7d_in_currency
              }
              total_volume={coin.total_volume}
              market_cap={coin.market_cap}
            ></TableData>
          );
        })}
      </tbody>
    </table>
  );
}
