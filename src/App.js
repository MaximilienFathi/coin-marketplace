import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
  json,
} from "react-router-dom";
import HomePage from "./pages/home-page";
import CoinsPage from "./pages/coins-page";
import CoinPage from "./pages/coin-page";
import FavoritesPage from "./pages/favorites-page";
import ExchangesPage from "./pages/exchanges-page";
import ErrorPage from "./pages/error-page";
import axios from "axios";

function App() {
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
          loader: async ({ request, params }) => {
            const response = await axios.get(
              "https://api.coingecko.com/api/v3/coins/list"
            );
            if (
              response.data.some(
                (obj) => obj.id.toLowerCase() === params.coinID.toLowerCase()
              )
            )
              console.log(response.status);
            if (response.status === 404) {
              throw new Response("Not Found", { status: 404 });
            }
            return response;
          },
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
  // const router = createBrowserRouter([
  //   {
  //     path: "coins/:coinID",
  //     loader: ({ params }) => {
  //       console.log(params.coinID);
  //     },
  //   },
  // ]);
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/">
  //         <Route index element={<HomePage />} />
  //         <Route path="coins" element={<CoinsPage />} />
  //         <Route
  //           path="coins/:coinID"
  //           element={<CoinPage />}
  //           // action={({ params }) => {
  //           //   console.log(params.coinID);
  //           // }}
  //           errorElement={<ErrorPage />}
  //         />
  //         <Route path="exchanges" element={<ExchangesPage />} />
  //         <Route path="favorites" element={<FavoritesPage />} />
  //         <Route path="*" element={<ErrorPage />} />
  //       </Route>
  //     </Routes>
  //   </BrowserRouter>
  // );
}

export default App;
