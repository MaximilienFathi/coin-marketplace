import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

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

//############################################################################

export default function App() {
  const [currencyName, setCurrencyName] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [globalMarketData, setGlobalMarketData] = useState(null);
  const [trendingCoinsList, setTrendingCoinsList] = useState(null);
  const [coinsList, setCoinsList] = useState(null);
  const [exchangesList, setExchangesList] = useState(null);
  const [loading, setLoading] = useState(false);

  // Control which specific page component to display depending on URL.
  /* TODO: LESSON LEARNT (annoying bug fixed)
     Transformed the following from regular variable to state and used arrow
     function. Doing so prevented the loader function to be run everytime
     a state was modified in the useEffect functions.
   */
  const [router, setRouter] = useState(() =>
    createBrowserRouter([
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
            loader: async (params) => {
              return await runCoinLoader(params);
            },
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
    ])
  );

  const API_KEY = process.env.REACT_APP_API_KEY;

  //############################################################################

  /* TODO: LESSON LEARNT
     ===> https://legacy.reactjs.org/docs/hooks-effect.html
     "The Effect Hook lets you perform side effects in function components."
     "You tell React that your component needs to do something AFTER render.
     React will remember the function you passed (we’ll refer to it as our
     “EFFECT”), and call it later AFTER performing the DOM updates."
     ===> https://codedamn.com/news/reactjs/useeffect-dependency
     If deps array is [] => callback function is only called once the page
     renders.
     If deps array is [a, b] => Callback function gets triggered on 2
     occasions. First, WHEN PAGE RENDERS and whenever a or b is updated.
     IMPORTANT - THIS EXPLAINS WHY USEEFFECT() WOULD RUN MULTIPLE TIMES
     BECAUSE IT HAD TO ACCOUNT FOR THE INITIAL PAGE RENDERING AS WELL!
   */

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
  }, []);

  // Make API call to collect global data only if we don't have that data
  // already stored in localStorage (i.e. when initially loading website).
  // This was moved from coin-page.js to this one to reduce number of API
  // calls made and prevent risks of error 429.
  /* TODO: LESSON LEARNT
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
      console.log("Sending request for fetchGlobalMarketData");
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=${API_KEY}`
      );
      const fetchedGlobalMarketData = response.data.data;
      setGlobalMarketData(fetchedGlobalMarketData);
      localStorage.setItem(
        "globalMarketData",
        JSON.stringify(fetchedGlobalMarketData)
      );
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
        // Must use return statement else returned value after error 429 is
        // over will be "undefined". Remember, this is recursive!
        return await fetchGlobalMarketData();
      }
    }
  }

  // Fetch list of trending coins (most searched in last 24 hours).
  async function fetchTrendingCoinsList() {
    try {
      console.log("Sending request for fetchTrendingCoinsList");
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=${API_KEY}`
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
        return await fetchTrendingCoinsList();
      }
    }
  }

  // Fetch full list of coins available in the market.
  async function fetchCoinsList() {
    try {
      console.log("Sending request for fetchCoinsList");
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=${API_KEY}`
      );
      const fetchedCoinsList = response.data;
      const updatedCoinsList = addTypePropertyToList(fetchedCoinsList, "Coins");
      setCoinsList(updatedCoinsList);
      localStorage.setItem("coinsList", JSON.stringify(updatedCoinsList));
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
        return await fetchCoinsList();
      }
    }
  }

  // Fetch full list of coin exchanges available.
  async function fetchExchangesList() {
    try {
      console.log("Sending request for fetchExchangesList");
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/exchanges/list?x_cg_demo_api_key=${API_KEY}`
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
        return await fetchExchangesList();
      }
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
  // Retry API call in case of network errors.
  async function runCoinLoader({ params }) {
    try {
      console.log("Sending request for runCoinLoader");
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params.coinID}?x_cg_demo_api_key=${API_KEY}`
      );
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
        // Must use return statement else returned value after error 429 is
        // over will be "undefined". Remember, this is recursive!
        return await runCoinLoader({ params });
      }
    }
  }

  //############################################################################

  return (
    <div className="coin-page-container">
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.4rem",
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100vh",
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
            fontSize="3rem"
          >{`Network Error - Data Will Load Soon!`}</Typography>
        </Box>
      ) : (
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
      )}
    </div>
  );
}
