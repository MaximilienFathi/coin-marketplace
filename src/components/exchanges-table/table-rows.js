/*
TODO:
1) REMOVE EMPTY PAGES - ALSO MANY RANKS SKIPPED
*/

/*
IMPORTANT
Table will only display data that has 24h Volume greater than 0.
BUT, when searching for an exchange, exchanges-table with 24h Volume = 0 may appear.
This is because fullDataList (used by search) is more complete than all
paginatedData put together. I am just relying on what the API is giving me
though.

Some exchanges may be misplaced in the ranking. Ranking is based on
trust scores. This is data that comes straight from the API though.
 */

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import currencyContext from "../../contexts/currency-context";
import currentPageContext from "../../contexts/current-page-context";
import exchangesListContext from "../../contexts/exchanges-list-context";
import pageCountContext from "../../contexts/page-count-context";
import paginatedDataContext from "../../contexts/paginated-data-context";
import TableHeader from "../others/table-header/table-header";
import TableData from "./table-data";
import "../coins-table/table-rows.css";

//############################################################################

export default function TableRows({ searchQuery }) {
  const [exchangesList] = useContext(exchangesListContext);
  const [currencyName, , ,] = useContext(currencyContext);
  const [currentPage] = useContext(currentPageContext);
  const [, setPageCount] = useContext(pageCountContext);
  const [paginatedData, setPaginatedData] = useContext(paginatedDataContext);

  const [searchResults, setSearchResults] = useState([]);
  const [sortedData, setSortedData] = useState("");
  const [exchangeRates, setExchangeRates] = useState(null);
  const [btcRate, setBtcRate] = useState(0);

  const dataHeaders = {
    trust_score_rank: "#",
    name: "Name",
    trust_score: "Trust Score",
    trade_volume_24h_btc_normalized: "24h Volume (Normalized)",
    trade_volume_24h_btc: "24h Volume",
    year_established: "Year Established",
    country: "Country",
  };

  //############################################################################

  // Reset position of sort arrows when changing page.
  useEffect(() => setSortedData(""), [currentPage]);

  // Retrieve exchange rate data from 1 BTC to chosen fiat currency.
  useEffect(() => {
    fetchBtcExchangeRates().then(() =>
      console.log("BTC exchange rates data has been fetched!")
    );
  }, []);

  // Update BtcRate whenever fiat currency is changed.
  // Following was created to prevent making another API call for rates.
  // Exchange rate values are stored to prevent fetching new values everytime.
  // New values will be fetched only when page is refreshed or switched.
  useEffect(() => {
    setBtcRate(exchangeRates?.[currencyName]["value"]);
  }, [currencyName]);

  //############################################################################

  // Make API call to fetch data from 1 BTC to chosen fiat currency.
  async function fetchBtcExchangeRates() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/exchange_rates"
      );
      setExchangeRates(response["data"]["rates"]);
      setBtcRate(response["data"]["rates"][currencyName]["value"]);
    } catch (err) {
      console.error(err);
    }
  }

  //############################################################################

  return (
    <table className="exchanges-table">
      <thead className="exchanges-table-head">
        <tr className="exchanges-table-row">
          {Object.entries(dataHeaders).map(([headerKey, headerName]) => {
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
      <tbody className="exchanges-table-body">
        {(searchQuery ? searchResults : paginatedData).map((exchange) => {
          return (
            <TableData
              key={exchange.id}
              id={exchange.id}
              trust_score_rank={exchange.trust_score_rank}
              image={exchange.image}
              name={exchange.name}
              trust_score={exchange.trust_score}
              trade_volume_24h_normalized={
                btcRate && exchange.trade_volume_24h_btc_normalized * btcRate
              }
              trade_volume_24h={
                btcRate && exchange.trade_volume_24h_btc * btcRate
              }
              year_established={exchange.year_established}
              country={exchange.country}
            ></TableData>
          );
        })}
      </tbody>
    </table>
  );
}

// // Moved this useEffect from table-data to here so that we don't call the
// // api for each data! Should speed up the process a bit while not
// // exceeding the API call limit
// useEffect(() => {
//   async function fetchData() {
//     try {
//       const fromCurrency = "bitcoin";
//       const response = await axios.get(
//         `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${currencyName}`
//       );
//       setBtcValue(response.data[fromCurrency][currencyName]);
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   fetchData();
// }, [currencyName]);

// // Display maximum of 5 search results for each character input
// useEffect(() => {
//   let count = 0;
//   let filteredData = fullDataList.filter((exchange) => {
//     if (
//       count < 5 &&
//       exchange.name.toLowerCase().startsWith(search.toLowerCase())
//     ) {
//       count++;
//       return true;
//     }
//     return false;
//   });
//   // console.log("result_1", filteredData);
//   (async () => {
//     filteredData = await Promise.all(
//       filteredData.map((exchange) => fetchData(exchange.id))
//     );
//     setSearchResults(filteredData);
//     const pageSize = 100;
//     search
//       ? setPageCount(0)
//       : setPageCount(
//           Math.ceil((fullDataList ? fullDataList : data).length / pageSize)
//         );
//   })();
// }, [search]);

// const fetchData = async function (id) {
//   try {
//     const response = await axios.get(
//       `https://api.coingecko.com/api/v3/exchanges/${id}`
//     );
//     const updatedData = { ...response.data, id: id };
//     // console.log("result_2", updatedData);
//     return updatedData;
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Using Infinity (for numbers) and ~ (for strings) as we want N/A data to
// // come last when data is in ascending order.
// const transformData = function (exchange) {
//   exchange.trust_score_rank = exchange.trust_score_rank || Infinity;
//   exchange.trust_score = exchange.trust_score || 0;
//   exchange.year_established = exchange.year_established || Infinity;
//   exchange.country = exchange.country || "~";
// };

// data.map((exchange) => transformData(exchange));
// searchResults.map((exchange) => transformData(exchange));
