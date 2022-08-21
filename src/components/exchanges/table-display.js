import React, { useEffect, useState } from "react";
import axios from "axios";
import TableHeader from "../others/table-header";
import TableData from "./table-data";

function TableDisplay({ search, data, setData, page }) {
  const [sortedData, setSortedData] = useState("");
  const [btcValue, setBtcValue] = useState(0);

  // Make sure to reset position of sort arrows when changing page
  useEffect(() => setSortedData(""), [page]);

  // Moved this useEffect from table-data to here so that we don't call the
  // api for each data! Should speed up the process a bit while not
  // exceeding the API call limit
  useEffect(() => {
    async function fetchData() {
      try {
        const fromCurrency = "bitcoin";
        const toCurrency = "usd";
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}`
        );
        setBtcValue(response.data[fromCurrency][toCurrency]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [btcValue]);

  const dataHeaders = {
    rank: "#",
    name: "Name",
    trust_score: "Trust Score",
    trade_volume_24h_btc_normalized: "24h Volume (Normalized)",
    trade_volume_24h_btc: "24h Volume",
    year_established: "Year Established",
    country: "Country",
  };

  // Using Infinity (for numbers) and ~ (for strings) as we want N/A data to
  // come last when data is in ascending order.
  const transformData = function (exchange) {
    exchange.trust_score = exchange.trust_score || 0;
    exchange.year_established = exchange.year_established || Infinity;
    exchange.country = exchange.country || "~";
  };

  data.map((exchange) => transformData(exchange));

  const filteredData = data.filter((exchange) =>
    exchange.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {Object.entries(dataHeaders).map(([headerKey, headerName]) => {
        return (
          <TableHeader
            key={headerKey}
            data={data}
            setData={setData}
            headerKey={headerKey}
            headerName={headerName}
            sortedData={sortedData}
            setSortedData={setSortedData}
          ></TableHeader>
        );
      })}
      {filteredData.map((exchange) => {
        return (
          <TableData
            key={exchange.id}
            id={exchange.id}
            rank={exchange.rank}
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
