import React, { useEffect, useState } from "react";
import axios from "axios";
import currencyContext from "../contexts/currency-context";
import Header from "../components/others/header/header";
import TopSection from "../components/others/top-section";
import GlobalStats from "../components/others/global-stats/global-stats";
import TableBox from "../components/exchanges/table-box";
import Footer from "../components/others/footer/footer";
import ScrollButton from "../components/others/scroll-button";
import "./page.css";

function ExchangesPage() {
  const [data, setData] = useState([]);
  const [fullDataList, setFullDataList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [currencyName, setCurrencyName] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");

  // ISSUE - Cannot update totalExchanges and use it in findPageCount.
  // Must send a variable with same value instead.
  const pageSize = 100;
  const findPageCount = (exchangeCount) => {
    // console.log(exchangeCount, pageSize);
    setPageCount(Math.ceil(exchangeCount / pageSize));
  };

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

  // Initialize all data that will be retrieved from localStorage
  useEffect(() => {
    // Currency data
    if (localStorage.getItem("currency")) {
      setCurrencyName(JSON.parse(localStorage.getItem("currency"))["name"]);
      setCurrencySymbol(JSON.parse(localStorage.getItem("currency"))["symbol"]);
    }
    if (!localStorage.getItem("currency")) {
      localStorage.setItem(
        "currency",
        JSON.stringify({ name: currencyName, symbol: currencySymbol })
      );
    }
  }, [currencyName]);

  // (Going from .then/.catch to async/await has been the solution!!)
  async function fetchData() {
    try {
      let exchangeCount = 0;
      let currentPage = 0;
      let currentPageDataLength = 0;
      let lastPage = false;
      while (!lastPage) {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/exchanges?per_page=${pageSize}&page=${++currentPage}`
        );
        currentPageDataLength = response.data.length;
        exchangeCount += currentPageDataLength;
        lastPage = currentPageDataLength < pageSize ? true : false;
      }
      return exchangeCount;
    } catch (err) {
      console.error(err);
    }
  }

  // Retrieve total number of exchanges
  useEffect(() => {
    async function findExchangeCount() {
      try {
        const response = await fetchData();
        findPageCount(response);
      } catch (err) {
        console.error(err);
      }
    }
    findExchangeCount();
  }, []);

  // Retrieve data of 100 exchanges on specific page
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/exchanges?per_page=${pageSize}&page=${page}`
      )
      .then((response) => {
        // setData(addRankToExchanges(response.data));
        setData(response.data);
        // console.log(response.data);
      })
      .catch((err) => console.error(err));
  }, [page]); // This will run everytime page changes.

  // Retrieve full list of exchanges (necessary for search mechanism)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/exchanges/list"
        );
        setFullDataList(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <currencyContext.Provider
      value={[currencyName, setCurrencyName, currencySymbol, setCurrencySymbol]}
    >
      <div className="page-container">
        <Header />
        <TopSection
          heading={
            <h1 className="global-stats-heading">
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
        <TableBox
          data={data}
          setData={setData}
          fullDataList={fullDataList}
          page={page}
          setPage={setPage}
          pageCount={pageCount}
          setPageCount={setPageCount}
        ></TableBox>
        <Footer />
        <ScrollButton></ScrollButton>
      </div>
    </currencyContext.Provider>
  );
}

export default ExchangesPage;
