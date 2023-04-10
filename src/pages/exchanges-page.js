import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import currentPageContext from "../contexts/current-page-context";
import globalMarketDataContext from "../contexts/global-market-data-context";
import pageCountContext from "../contexts/page-count-context";
import paginatedDataContext from "../contexts/paginated-data-context";
import Header from "../components/others/header/header";
import TopSection from "../components/others/top-section/top-section";
import GlobalStats from "../components/others/global-stats/global-stats";
import TableBox from "../components/exchanges-table/table-box";
import Footer from "../components/others/footer/footer";
import ScrollButton from "../components/others/scroll-button";
import "./page.css";

//############################################################################

export default function ExchangesPage() {
  const [globalMarketData] = useContext(globalMarketDataContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(5);
  const [paginatedData, setPaginatedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const pageSize = 100;

  //############################################################################

  // Reset scrollbar to top when page is loaded.
  window.scrollTo(0, 0);

  // Calculate number of pages needed to represent all exchanges in table
  // useEffect(() => {
  //   const exchangesNumber = globalMarketData?.["markets"];
  //   exchangesNumber && setPageCount(Math.ceil(exchangesNumber / pageSize));
  // }, [globalMarketData]);

  // Retrieve data of next 100 exchanges everytime we switch page
  useEffect(() => {
    fetchPaginatedData().then();
  }, [currentPage]);

  //############################################################################

  // Make API call to fetch data for 100 exchanges on specific page
  async function fetchPaginatedData() {
    try {
      console.log("Sending request for fetchPaginatedData (exchanges)");
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/exchanges?per_page=${pageSize}&page=${currentPage}`
      );
      const exchangesArray = response.data.map((exchange) =>
        updateData(exchange)
      );
      // console.log("exchangesArray is", coinsArray);
      setPaginatedData(exchangesArray);
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

  // Return new version of current exchange object where undefined values are
  // replaced with 0, Infinity or "~" for easier usage later on.
  // Using "~" for strings as we want N/A data to come last when data is in
  // ascending order to keep it consistent with how N/A data is displayed
  // for year_established (personal choice).
  function updateData(exchange) {
    exchange.trust_score_rank = exchange.trust_score_rank || Infinity;
    exchange.trust_score = exchange.trust_score || 0;
    exchange.year_established = exchange.year_established || Infinity;
    exchange.country = exchange.country || "~";
    return exchange;
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
                  Top Crypto <span>Exchanges</span> Ranked by{" "}
                  <span>Trust Score</span>
                </h1>
              }
              description={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
                " Accusantium amet animi assumenda corporis culpa aspernatur" +
                " blanditiis eaque earum blanditiis dignissimos necessitatibus."
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
