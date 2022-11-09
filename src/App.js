import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home-page";
import CoinsPage from "./pages/coins-page";
import CoinPage from "./pages/coin-page";
import FavoritesPage from "./pages/favorites-page";
import ExchangesPage from "./pages/exchanges-page";
import ErrorPage from "./pages/error-page";
import axios from "axios";

function App() {
  const runCoinLoader = async ({ params }) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params.coinID}`
      );
      return response;
    } catch (err) {
      throw new Response("Not Found", { status: 404 });
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "coins",
          element: <CoinsPage />,
        },
        {
          path: "coins/:coinID",
          element: <CoinPage />,
          errorElement: <ErrorPage />,
          loader: (params) => runCoinLoader(params),
        },
        {
          path: "exchanges",
          element: <ExchangesPage />,
        },
        {
          path: "favorites",
          element: <FavoritesPage />,
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
