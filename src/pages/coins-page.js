import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import currencyContext from "../contexts/currency-context";
import currentPageContext from "../contexts/current-page-context";
import globalMarketDataContext from "../contexts/global-market-data-context";
import pageCountContext from "../contexts/page-count-context";
import paginatedDataContext from "../contexts/paginated-data-context";
import Header from "../components/others/header/header";
import TopSection from "../components/others/top-section/top-section";
import GlobalStats from "../components/others/global-stats/global-stats";
import TableBox from "../components/coins-table/table-box";
import Footer from "../components/others/footer/footer";
import ScrollButton from "../components/others/scroll-button";
import "./page.css";

//############################################################################

export default function CoinsPage() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [currencyName] = useContext(currencyContext);
  const [globalMarketData] = useContext(globalMarketDataContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const pageSize = 100;

  //############################################################################

  // Reset scrollbar to top when page is loaded.
  window.scrollTo(0, 0);

  // Calculate number of pages needed to represent all coins in table.
  useEffect(() => {
    const coinsNumber = globalMarketData?.["active_cryptocurrencies"];
    coinsNumber && setPageCount(Math.ceil(coinsNumber / pageSize));
  }, [globalMarketData]);

  // Retrieve data of next 100 coins everytime we switch page.
  useEffect(() => {
    fetchPaginatedData().then();
  }, [currentPage, currencyName]);

  //############################################################################

  // Make API call to fetch data for 100 coins on specific page.
  async function fetchPaginatedData() {
    try {
      console.log("Sending request for fetchPaginatedData (coins)");
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyName}&order=market_cap_desc&per_page=${pageSize}&page=${currentPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d?x_cg_demo_api_key=${API_KEY}`
      );
      const coinsArray = response.data.map((coin) => updateData(coin));
      setPaginatedData(coinsArray);
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
        return await fetchPaginatedData();
      }
    }
  }

  // Return new version of current coin object where undefined values are
  // replaced with 0 or Infinity for easier usage later on.
  function updateData(coin) {
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
    return coin;
  }

  //############################################################################

  return (
    <currentPageContext.Provider value={[currentPage, setCurrentPage]}>
      <pageCountContext.Provider value={[pageCount, setPageCount]}>
        <paginatedDataContext.Provider
          value={[paginatedData, setPaginatedData]}
        >
          <div className="page-container">
            <Header />
            <TopSection
              heading={
                <h1 className="top-section-heading">
                  Top Crypto <span>Currencies</span> Ranked by{" "}
                  <span>Market Cap</span>
                </h1>
              }
              description={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
                " Asperiores aspernatur blanditiis eaque earum fugit incidunt" +
                " nobis ipsum dolor sit amet adipisicing elit amet animi assumenda."
              }
            />
            <GlobalStats />
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
            ) : (
              <TableBox />
            )}
            <Footer />
            <ScrollButton />
          </div>
        </paginatedDataContext.Provider>
      </pageCountContext.Provider>
    </currentPageContext.Provider>
  );
}
