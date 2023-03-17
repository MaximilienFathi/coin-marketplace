import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home-page";
import CoinsPage from "./pages/coins-page";
import CoinPage from "./pages/coin-page/coin-page";
import FavoritesPage from "./pages/favorites-page";
import ExchangesPage from "./pages/exchanges-page";
import ErrorPage from "./pages/error-page/error-page";
import axios from "axios";

function App() {
  const runCoinLoader = async ({ params }) => {
    try {
      console.log("PUBLIC_URL is", process.env.PUBLIC_URL);
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

export default App;
