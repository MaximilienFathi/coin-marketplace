import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import currencyContext from "./contexts/currency-context";
import marketCapContext from "./contexts/market-cap-context";
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
  const [totalMarketCap, setTotalMarketCap] = useState(0);
  const [coinData, setCoinData] = useState(null);
  // const [loading, setLoading] = useState(false);

  // API calls to be made when opening website to collect global data
  // These were moved from other files (e.g. coin-page.js) to this one to
  // reduce number of API calls made and prevent risks of error 429.
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
    const storedTotalMarketCap = localStorage.getItem("totalMarketCap");
    storedTotalMarketCap != null
      ? setTotalMarketCap(Number(storedTotalMarketCap))
      : fetchTotalMarketCap();
  }, []);

  // Fetch total market capitalization in chosen fiat currency
  async function fetchTotalMarketCap() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/global"
      );
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      const fetchedTotalMarketCap =
        response.data.data.total_market_cap[currencyName];
      setTotalMarketCap(fetchedTotalMarketCap);
      localStorage.setItem("totalMarketCap", fetchedTotalMarketCap);
      // setLoading(false);
    } catch (err) {
      // console.error(err);
      console.log("TESTING");
      // fetchTotalMarketCap();
      // setLoading(true);
    }
  }

  // Fetch coin data first before coin page is displayed
  async function runCoinLoader({ params }) {
    // FIXME:
    // 1 TOO MANY CALL WEIRDLY WHEN LOADING CALL PAGE
    try {
      if (coinData == null) {
        console.log("it is null");
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

  // Control which specific page component to display depending on URL
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

  // The strategy here is to store specific variables in localStorage when the
  // website loads for the first time.
  // Then, have them represented as contexts that can be accessed anywhere
  // in the project.
  // This is better than always fetching from localStorage.
  return (
    <currencyContext.Provider
      value={[currencyName, setCurrencyName, currencySymbol, setCurrencySymbol]}
    >
      <marketCapContext.Provider value={[totalMarketCap, setTotalMarketCap]}>
        <RouterProvider router={router} />
      </marketCapContext.Provider>
    </currencyContext.Provider>
  );
}
