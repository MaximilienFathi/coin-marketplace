/*
IMPORTANT
Table will only display data that has 24h Volume greater than 0.
BUT, when searching for an exchange, exchanges with 24h Volume = 0 may appear.
This is because fullDataList (used by search) is more complete than all
paginatedData put together. I am just relying on what the API is giving me
though.
 */

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import currencyContext from "../../contexts/currency-context";
import TableHeader from "../others/table-header";
import TableData from "./table-data";

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
  const [btcValue, setBtcValue] = useState(0);
  const [currencyName, , ,] = useContext(currencyContext);
  const dataHeaders = {
    trust_score_rank: "#",
    name: "Name",
    trust_score: "Trust Score",
    trade_volume_24h_btc_normalized: "24h Volume (Normalized)",
    trade_volume_24h_btc: "24h Volume",
    year_established: "Year Established",
    country: "Country",
  };

  //=========================================================================

  // Make sure to reset position of sort arrows when changing page
  useEffect(() => setSortedData(""), [page]);

  // Moved this useEffect from table-data to here so that we don't call the
  // api for each data! Should speed up the process a bit while not
  // exceeding the API call limit
  useEffect(() => {
    async function fetchData() {
      try {
        const fromCurrency = "bitcoin";
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${currencyName}`
        );
        setBtcValue(response.data[fromCurrency][currencyName]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [currencyName]);

  // Display maximum of 5 search results for each character input
  useEffect(() => {
    let count = 0;
    let filteredData = fullDataList.filter((exchange) => {
      if (
        count < 5 &&
        exchange.name.toLowerCase().startsWith(search.toLowerCase())
      ) {
        count++;
        return true;
      }
      return false;
    });
    // console.log("result_1", filteredData);
    (async () => {
      filteredData = await Promise.all(
        filteredData.map((exchange) => fetchData(exchange.id))
      );
      setSearchResults(filteredData);
      const pageSize = 100;
      search
        ? setPageCount(0)
        : setPageCount(
            Math.ceil((fullDataList ? fullDataList : data).length / pageSize)
          );
    })();
  }, [search]);

  //=========================================================================

  const fetchData = async function (id) {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/exchanges/${id}`
      );
      const updatedData = { ...response.data, id: id };
      // console.log("result_2", updatedData);
      return updatedData;
    } catch (err) {
      console.error(err);
    }
  };

  // Using Infinity (for numbers) and ~ (for strings) as we want N/A data to
  // come last when data is in ascending order.
  const transformData = function (exchange) {
    exchange.trust_score_rank = exchange.trust_score_rank || Infinity;
    exchange.trust_score = exchange.trust_score || 0;
    exchange.year_established = exchange.year_established || Infinity;
    exchange.country = exchange.country || "~";
  };

  data.map((exchange) => transformData(exchange));
  searchResults.map((exchange) => transformData(exchange));

  //=========================================================================

  return (
    <div>
      {Object.entries(dataHeaders).map(([headerKey, headerName]) => {
        return (
          <TableHeader
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
      {(search ? searchResults : data).map((exchange) => {
        return (
          <TableData
            key={exchange.id}
            id={exchange.id}
            trust_score_rank={exchange.trust_score_rank}
            image={exchange.image}
            name={exchange.name}
            trust_score={exchange.trust_score}
            trade_volume_24h_normalized={
              exchange.trade_volume_24h_btc_normalized * btcValue
            }
            trade_volume_24h={exchange.trade_volume_24h_btc * btcValue}
            year_established={exchange.year_established}
            country={exchange.country}
          ></TableData>
        );
      })}
    </div>
  );
}

export default TableDisplay;
