import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import currencyContext from "../../contexts/currency-context";
import currentPageContext from "../../contexts/current-page-context";
import paginatedDataContext from "../../contexts/paginated-data-context";
import TableHeader from "../others/table-header/table-header";
import TableData from "./table-data";
import "../coins-table/table-rows.css";

//############################################################################

function TableRows({ searchQuery }) {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [currencyName, , ,] = useContext(currencyContext);
  const [currentPage] = useContext(currentPageContext);
  const [paginatedData, setPaginatedData] = useContext(paginatedDataContext);

  const [searchResults, setSearchResults] = useState([]);
  const [sortedData, setSortedData] = useState("");
  const [exchangeRates, setExchangeRates] = useState(null);
  const [btcRate, setBtcRate] = useState(0);
  const [loading, setLoading] = useState(false);

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
    fetchBtcExchangeRates().then();
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
      console.log("Sending request for fetchBtcExchangeRates");
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/exchange_rates?x_cg_demo_api_key=${API_KEY}`
      );
      setExchangeRates(response["data"]["rates"]);
      setBtcRate(response["data"]["rates"][currencyName]["value"]);
      if (response) {
        setLoading(false);
      }
      return response;
    } catch (err) {
      if (err.response.status === 404) {
        console.log("ERROR 404 FOUND");
        setLoading(false);
        throw new Response("Not Found", { status: 404 });
      } else {
        console.log("NETWORK ERROR FOUND");
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return await fetchBtcExchangeRates();
      }
    }
  }

  //############################################################################

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.6rem",
          }}
        >
          <CircularProgress
            style={{ color: "#b84dc3" }}
            size={450}
            thickness={1}
          />
          <Typography
            variant="caption"
            component="div"
            color="#dc7be7"
            fontSize="2.4rem"
          >{`Network Error - Data Will Load Soon!`}</Typography>
        </Box>
      ) : !exchangeRates ? null : (
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
                    btcRate &&
                    exchange.trade_volume_24h_btc_normalized * btcRate
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
      )}
    </>
  );
}

export default TableRows;
