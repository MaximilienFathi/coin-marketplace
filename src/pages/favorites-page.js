import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import currencyContext from "../contexts/currency-context";
import currentPageContext from "../contexts/current-page-context";
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

export default function FavoritesPage() {
  const [currencyName] = useContext(currencyContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const pageSize = 100;
  const API_KEY = process.env.REACT_APP_API_KEY;

  //############################################################################

  // Reset scrollbar to top when page is loaded.
  window.scrollTo(0, 0);

  // Fetch and update data for all favorite coins.
  useEffect(() => {
    consolidateFavoriteData().then((response) =>
      console.log("Favorite data has been fetched and updated!")
    );
  }, [currentPage, currencyName]);

  //############################################################################

  // Retrieve coins added as favorites and consolidate their data in rank order.
  async function consolidateFavoriteData() {
    const allFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (allFavorites) {
      const coinsCount = allFavorites.length;
      const currentPageFavorites = getCurrentPageFavorites(allFavorites);
      let response = await fetchAllFavoritesData(currentPageFavorites);
      response = response.sort((a, b) =>
        a.market_cap_rank > b.market_cap_rank ? 1 : -1
      );
      setPaginatedData(response);
      setPageCount(Math.ceil(coinsCount / pageSize));
    }
  }

  // Return array of favorites for current page using pre-defined page size.
  function getCurrentPageFavorites(allFavorites) {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return allFavorites.slice(start, end);
  }

  // Make API calls to fetch data for all favorite coins.
  // Preferred making API calls to storing coin objects from coin-page and
  // then using them. This way, data in favorites page is always up-to-date.
  async function fetchAllFavoritesData(favorites) {
    return await Promise.all(
      favorites.map(async function fetchFavoriteData(coinID) {
        try {
          console.log(`Sending request for fetchFavoriteData (${coinID})`);
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinID}?x_cg_demo_api_key=${API_KEY}`
          );
          if (response) {
            setLoading(false);
          }
          const updatedData = updateData(response.data);
          return updatedData;
        } catch (err) {
          if (err.response.status === 404) {
            console.log("ERROR 404 FOUND");
            setLoading(false);
            throw new Response("Not Found", { status: 404 });
          } else {
            console.log("NETWORK ERROR FOUND");
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 10000));
            return await fetchFavoriteData(coinID);
          }
        }
      })
    );
  }

  // Return new version of current coin object where undefined values are
  // replaced with 0 or Infinity for easier usage later on.
  function updateData(data) {
    const marketData = data["market_data"];
    return {
      ...data,
      market_cap_rank: data.market_cap_rank || Infinity,
      image: data.image["large"],
      current_price: marketData.current_price[currencyName] || 0,
      price_change_percentage_1h_in_currency:
        marketData.price_change_percentage_1h_in_currency[currencyName] || 0,
      price_change_percentage_24h_in_currency:
        marketData.price_change_percentage_24h_in_currency[currencyName] || 0,
      price_change_percentage_7d_in_currency:
        marketData.price_change_percentage_7d_in_currency[currencyName] || 0,
      total_volume: marketData.total_volume[currencyName] || 0,
      market_cap: marketData.market_cap[currencyName] || 0,
    };
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
                  Your <span>Favorite</span> Crypto <span>Currencies</span> All
                  In <span>One</span> Place
                </h1>
              }
              description={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
                " Aliquid aspernatur blanditiis dignissimos necessitatibus quae ratione sapiente amet assumenda corporis culpa."
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
          </div>
          <Footer />
          <ScrollButton />
        </paginatedDataContext.Provider>
      </pageCountContext.Provider>
    </currentPageContext.Provider>
  );
}
