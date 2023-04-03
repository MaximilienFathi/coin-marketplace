import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import coinsListContext from "./contexts/coins-list-context";
import currencyContext from "./contexts/currency-context";
import exchangesListContext from "./contexts/exchanges-list-context";
import globalMarketDataContext from "./contexts/global-market-data-context";
import trendingCoinsListContext from "./contexts/trending-coins-list-context";
import HomePage from "./pages/home-page";
import CoinsPage from "./pages/coins-page";
import CoinPage from "./pages/coin-page/coin-page";
import FavoritesPage from "./pages/favorites-page";
import ExchangesPage from "./pages/exchanges-page";
import ErrorPage from "./pages/error-page/error-page";
import "./App.css";

// import axiosRetry from "axios-retry";
// // axiosRetry(axios, { retries: 3 });
// axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

//############################################################################

export default function App() {
  const [currencyName, setCurrencyName] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [globalMarketData, setGlobalMarketData] = useState(null);
  const [trendingCoinsList, setTrendingCoinsList] = useState(null);
  const [coinsList, setCoinsList] = useState(null);
  const [exchangesList, setExchangesList] = useState(null);
  const [coinData, setCoinData] = useState(null);
  // const [loading, setLoading] = useState(false);

  //############################################################################

  /* TODO: LESSON LEARNT
 ===> https://legacy.reactjs.org/docs/hooks-effect.html
 "The Effect Hook lets you perform side effects in function components."
 "You tell React that your component needs to do something AFTER render.
 React will remember the function you passed (we’ll refer to it as our
 “EFFECT”), and call it later AFTER performing the DOM updates."
 ===> https://codedamn.com/news/reactjs/useeffect-dependency
 If deps array is [] => callback function is only called once the page renders
 If deps array is [a, b] => Callback function gets triggered on 2
 occasions. First, WHEN PAGE RENDERS and whenever a or b is updated.
 IMPORTANT - THIS EXPLAINS WHY USEEFFECT() WOULD RUN MULTIPLE TIMES
 BECAUSE IT HAD TO ACCOUNT FOR THE INITIAL PAGE RENDERING AS WELL!
 */

  // Reset scrollbar to top when switching to another page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initialize favorites array in localStorage if it is absent.
  useEffect(() => {
    localStorage.getItem("favorites") ||
      localStorage.setItem("favorites", "[]");
  }, []);

  // Initialize fiat currency name and symbol in localStorage if it is absent.
  // Have the content of the localStorage be stored in states that will then
  // be globally available via context providers so that we do not have to
  // fetch that data directly from localStorage everytime we need it.
  useEffect(() => {
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
  }, [currencyName]); // FIXME: check if you need [] or [currencyName]

  // Make API call to collect global data only if we don't have that data
  // already stored in localStorage (i.e. when initially loading website).
  // This was moved from coin-page.js to this one to reduce number of API
  // calls made and prevent risks of error 429.
  // TODO: LESSON LEARNT
  /*
    "There's simply just no way of knowing from inside the app how exactly the
    URL changed in the address bar. When a user does this the browser completely
    reloads the page, so the entire React app is mounted fresh."
    Following conditional was therefore included since manually searching
    for specific coin page using URL address bar would not prevent API call
    from being made.
  */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("globalMarketData"));
    data != null ? setGlobalMarketData(data) : fetchGlobalMarketData();
  }, []);

  // Retrieve full list of TRENDING coins (necessary for search mechanism)
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("trendingCoinsList"));
    data != null ? setTrendingCoinsList(data) : fetchTrendingCoinsList();
  }, []);

  // Retrieve full list of coins (necessary for search mechanism)
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("coinsList"));
    data != null ? setCoinsList(data) : fetchCoinsList();
  }, []);

  // Retrieve full list of exchanges (necessary for search mechanism)
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("exchangesList"));
    data != null ? setExchangesList(data) : fetchExchangesList();
  }, []);

  //############################################################################

  // Fetch global market data and update state and localStorage accordingly.
  async function fetchGlobalMarketData() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/global"
      );
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      const fetchedGlobalMarketData = response.data.data;
      setGlobalMarketData(fetchedGlobalMarketData);
      localStorage.setItem(
        "globalMarketData",
        JSON.stringify(fetchedGlobalMarketData)
      );
      // setLoading(false);
    } catch (err) {
      // console.error(err);
      console.log("TESTING");
      // fetchTotalMarketCap();
      // setLoading(true);
    }
  }

  // Fetch list of trending coins (most searched in last 24 hours).
  async function fetchTrendingCoinsList() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/search/trending"
      );
      const fetchedTrendingCoinsList = response.data["coins"].map((coin) => {
        return coin["item"];
      });
      const updatedTrendingCoinsList = addTypePropertyToList(
        fetchedTrendingCoinsList,
        "Trending Coins 🔥"
      );
      setTrendingCoinsList(updatedTrendingCoinsList);
      localStorage.setItem(
        "trendingCoinsList",
        JSON.stringify(updatedTrendingCoinsList)
      );
    } catch (err) {
      console.error(err);
    }
  }

  // Fetch full list of coins available in the market.
  async function fetchCoinsList() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/list"
      );
      const fetchedCoinsList = response.data;
      const updatedCoinsList = addTypePropertyToList(fetchedCoinsList, "Coins");
      setCoinsList(updatedCoinsList);
      localStorage.setItem("coinsList", JSON.stringify(updatedCoinsList));
    } catch (err) {
      console.error(err);
    }
  }

  // Fetch full list of coin exchanges available.
  async function fetchExchangesList() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/exchanges/list"
      );
      const fetchedExchangesList = response.data;
      const updatedExchangesList = addTypePropertyToList(
        fetchedExchangesList,
        "Exchanges"
      );
      setExchangesList(updatedExchangesList);
      localStorage.setItem(
        "exchangesList",
        JSON.stringify(updatedExchangesList)
      );
    } catch (err) {
      console.error(err);
    }
  }

  // Add property to objects inside list to clarify if they are coins or
  // exchanges. Return new version of list.
  function addTypePropertyToList(list, type) {
    return list.map((listItem) => {
      return { ...listItem, type: type };
    });
  }

  // Fetch coin data first before coin page is displayed.
  async function runCoinLoader({ params }) {
    // FIXME:
    // 1 TOO MANY CALL WEIRDLY WHEN LOADING CALL PAGE
    try {
      if (coinData == null) {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${params.coinID}`
        );
        setCoinData(response);
        return response;
      }
      console.log(coinData);
      return coinData;
    } catch (err) {
      console.log(err);
      console.log("COIN ID ERROR IN APP.JS");
      throw new Response("Not Found", { status: 404 });
    } finally {
      // await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  // Control which specific page component to display depending on URL.
  const router = createBrowserRouter([
    {
      path: `${process.env.PUBLIC_URL}/`,
      children: [
        {
          path: `${process.env.PUBLIC_URL}/`,
          element: <HomePage />,
        },
        {
          path: `${process.env.PUBLIC_URL}/coins`,
          element: <CoinsPage />,
        },
        {
          path: `${process.env.PUBLIC_URL}/coins/:coinID`,
          element: <CoinPage />,
          errorElement: <ErrorPage />,
          loader: (params) => runCoinLoader(params),
        },
        {
          path: `${process.env.PUBLIC_URL}/exchanges`,
          element: <ExchangesPage />,
        },
        {
          path: `${process.env.PUBLIC_URL}/favorites`,
          element: <FavoritesPage />,
        },
        {
          path: `${process.env.PUBLIC_URL}/*`,
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  //############################################################################

  return (
    <coinsListContext.Provider value={[coinsList]}>
      <exchangesListContext.Provider value={[exchangesList]}>
        <currencyContext.Provider
          value={[
            currencyName,
            setCurrencyName,
            currencySymbol,
            setCurrencySymbol,
          ]}
        >
          <globalMarketDataContext.Provider value={[globalMarketData]}>
            <trendingCoinsListContext.Provider value={[trendingCoinsList]}>
              <RouterProvider router={router} />
            </trendingCoinsListContext.Provider>
          </globalMarketDataContext.Provider>
        </currencyContext.Provider>
      </exchangesListContext.Provider>
    </coinsListContext.Provider>
  );
}
