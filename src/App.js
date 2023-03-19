import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import HomePage from "./pages/home-page";
import CoinsPage from "./pages/coins-page";
import CoinPage from "./pages/coin-page/coin-page";
import FavoritesPage from "./pages/favorites-page";
import ExchangesPage from "./pages/exchanges-page";
import ErrorPage from "./pages/error-page/error-page";
import "./App.css";

import axiosRetry from "axios-retry";
// axiosRetry(axios, { retries: 3 });
axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

//############################################################################

export default function App() {
  // Fetch coin data first before coin page is displayed
  const runCoinLoader = async ({ params }) => {
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
  };

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

  return <RouterProvider router={router} />;
}
