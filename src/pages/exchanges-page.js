/*
TODO:
1) REMOVE EMPTY PAGES - ALSO MANY RANKS SKIPPED
*/

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

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

  const pageSize = 100;

  //############################################################################

  // Calculate number of pages needed to represent all exchanges in table
  // useEffect(() => {
  //   const exchangesNumber = globalMarketData?.["markets"];
  //   exchangesNumber && setPageCount(Math.ceil(exchangesNumber / pageSize));
  // }, [globalMarketData]);

  // Retrieve data of next 100 exchanges everytime we switch page
  useEffect(() => {
    fetchPaginatedData().then(() =>
      console.log("Paginated data has been fetched!")
    );
  }, [currentPage]);

  //############################################################################

  // Make API call to fetch data for 100 exchanges on specific page
  async function fetchPaginatedData() {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/exchanges?per_page=${pageSize}&page=${currentPage}`
      );
      const exchangesArray = response.data.map((exchange) =>
        updateData(exchange)
      );
      // console.log("exchangesArray is", coinsArray);
      setPaginatedData(exchangesArray);
    } catch (err) {
      console.error(err);
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
            <TableBox />
            <Footer />
            <ScrollButton />
          </div>
        </paginatedDataContext.Provider>
      </pageCountContext.Provider>
    </currentPageContext.Provider>
  );
}

// const [data, setData] = useState([]);
// const [fullDataList, setFullDataList] = useState([]);
// const [pageCount, setPageCount] = useState(0);
// const [page, setPage] = useState(1);
// const [currencyName, setCurrencyName] = useState("usd");
// const [currencySymbol, setCurrencySymbol] = useState("$");

// const findPageCount = (exchangeCount) => {
//   // console.log(exchangeCount, pageSize);
//   setPageCount(Math.ceil(exchangeCount / pageSize));
// };

// Another way of finding the rank would have been to use trust score and
// normalized volume (normalized). The following is just easier.
// Did not use their trust_score_rank property since it is missing some
// ranks
// const findExchangeRank = (data, exchange) =>
//   (page - 1) * pageSize + data.indexOf(exchange) + 1;
//
// const addRankToExchanges = (data) =>
//   data.map((exchange) => ({
//     ...exchange,
//     rank: findExchangeRank(data, exchange),
//   }));

// // Initialize all data that will be retrieved from localStorage
// useEffect(() => {
//   // Currency data
//   if (localStorage.getItem("currency")) {
//     setCurrencyName(JSON.parse(localStorage.getItem("currency"))["name"]);
//     setCurrencySymbol(JSON.parse(localStorage.getItem("currency"))["symbol"]);
//   }
//   if (!localStorage.getItem("currency")) {
//     localStorage.setItem(
//       "currency",
//       JSON.stringify({ name: currencyName, symbol: currencySymbol })
//     );
//   }
// }, [currencyName]);

// // Retrieve total number of exchanges
// useEffect(() => {
//   async function findExchangeCount() {
//     try {
//       const response = await fetchData();
//       findPageCount(response);
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   findExchangeCount();
// }, []);

// // (Going from .then/.catch to async/await has been the solution!!)
// async function fetchData() {
//   try {
//     let exchangeCount = 0;
//     let currentPage = 0;
//     let currentPageDataLength = 0;
//     let lastPage = false;
//     while (!lastPage) {
//       const response = await axios.get(
//         `https://api.coingecko.com/api/v3/exchanges?per_page=${pageSize}&page=${++currentPage}`
//       );
//       currentPageDataLength = response.data.length;
//       exchangeCount += currentPageDataLength;
//       lastPage = currentPageDataLength < pageSize ? true : false;
//     }
//     return exchangeCount;
//   } catch (err) {
//     console.error(err);
//   }
// }

// // Retrieve data of 100 exchanges on specific page
// useEffect(() => {
//   axios
//     .get(
//       `https://api.coingecko.com/api/v3/exchanges?per_page=${pageSize}&page=${page}`
//     )
//     .then((response) => {
//       // setData(addRankToExchanges(response.data));
//       setData(response.data);
//       // console.log(response.data);
//     })
//     .catch((err) => console.error(err));
// }, [page]); // This will run everytime page changes.

// // Retrieve full list of exchanges (necessary for search mechanism)
// useEffect(() => {
//   async function fetchData() {
//     try {
//       const response = await axios.get(
//         "https://api.coingecko.com/api/v3/exchanges/list"
//       );
//       setFullDataList(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   fetchData();
// }, []);
