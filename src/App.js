import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import favoritesContext from "./contexts/favorites-context";
import currencyContext from "./contexts/currency-context";
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
  const [favoritesChanged, setFavoritesChanged] = useState(false);

  const [totalMarketCap, setTotalMarketCap] = useState(0);
  const [loading, setLoading] = useState(false);

  // API calls to be made when opening website to collect global data
  // These were moved from other files (e.g. coin-page.js) to this one to
  // reduce number of API calls made and prevent risks of error 429
  useEffect(() => {
    fetchTotalMarketCap();
  }, []);

  // Fetch total market capitalization
  async function fetchTotalMarketCap() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/global"
      );
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      setTotalMarketCap(response.data.data.total_market_cap[currencyName]);
      setLoading(false);
    } catch (err) {
      // console.error(err);
      console.log("TESTING");
      fetchTotalMarketCap();
      setLoading(true);
    }
  }

  // Fetch coin data first before coin page is displayed
  async function runCoinLoader({ params }) {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params.coinID}`
      );
      return response;
    } catch (err) {
      console.log(err);
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

  return (
    <currencyContext.Provider
      value={[currencyName, setCurrencyName, currencySymbol, setCurrencySymbol]}
    >
      <favoritesContext.Provider
        value={[favoritesChanged, setFavoritesChanged]}
      >
        <RouterProvider router={router} />
      </favoritesContext.Provider>
    </currencyContext.Provider>
  );
}
