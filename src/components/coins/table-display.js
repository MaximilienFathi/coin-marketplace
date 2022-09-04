import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import currencyContext from "../../contexts/currency-context";
import TableHeader from "../others/table-header";
import TableData from "./table-data";
import "./table-display.css";

function TableDisplay({
  search,
  data,
  setData,
  fullDataList,
  page,
  setPageCount,
}) {
  const [sortedData, setSortedData] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currencyName, , ,] = useContext(currencyContext);
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
    // <p>Price Graph (7d)</p>,
  };

  //=========================================================================

  // Make sure to reset position of sort arrows when changing page
  useEffect(() => setSortedData(""), [page]);

  // Display maximum of 5 search results for each character input
  useEffect(() => {
    let count = 0;
    // Ternary conditional needed to distinguish coinsPage from favoritesPage
    // Favorites page only deals with favorites not the full list of coins
    let filteredData = (fullDataList ? fullDataList : data).filter((coin) => {
      if (
        count < 5 &&
        coin.name.toLowerCase().startsWith(search.toLowerCase())
      ) {
        count++;
        return true;
      }
      return false;
    });
    // console.log("vfe", filteredData);
    (async () => {
      filteredData = await Promise.all(
        filteredData.map((coin) => fetchData(coin.id))
      );
      setSearchResults(filteredData.map((coin) => updateFilteredData(coin)));
      const pageSize = 100;
      search
        ? setPageCount(0)
        : setPageCount(
            Math.ceil((fullDataList ? fullDataList : data).length / pageSize)
          );
    })();
  }, [search]);

  //=========================================================================

  const updateFilteredData = function (data) {
    const marketData = data.market_data;
    return {
      ...data,
      market_cap_rank: data.market_cap_rank || Infinity,
      image: data.image.large,
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
  };

  const fetchData = async function (id) {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  const transformData = function (coin) {
    // Setting to Infinity to deal with ranks that are too low, i.e. have
    // market cap of 0
    coin.market_cap_rank = coin.market_cap_rank || Infinity;
    coin.current_price = coin.current_price || 0;
    coin.price_change_percentage_1h_in_currency =
      coin.price_change_percentage_1h_in_currency || 0;
    coin.price_change_percentage_24h_in_currency =
      coin.price_change_percentage_24h_in_currency || 0;
    coin.price_change_percentage_7d_in_currency =
      coin.price_change_percentage_7d_in_currency || 0;
    coin.total_volume = coin.total_volume || 0;
    coin.market_cap = coin.market_cap || 0;
  };

  data.map((coin) => transformData(coin));
  searchResults.map((coin) => transformData(coin));
  // The above changes the original data arrays
  // Using a duplicated data array and using setData(fixedData); caused issues

  //=========================================================================

  return (
    <table>
      <thead>
        <tr>
          <th>{dataHeaders.favorite}</th>
          {Object.entries(dataHeaders)
            .slice(1)
            .map(([headerKey, headerName]) => {
              return (
                <TableHeader
                  // Check why key is needed
                  key={headerKey}
                  data={search ? searchResults : data}
                  setData={search ? setSearchResults : setData}
                  headerKey={headerKey}
                  headerName={headerName}
                  sortedData={sortedData}
                  setSortedData={setSortedData}
                ></TableHeader>
              );
            })}
        </tr>
      </thead>
      <tbody>
        {(search ? searchResults : data).map((coin) => {
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

export default TableDisplay;
