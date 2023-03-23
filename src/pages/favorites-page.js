import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import currencyContext from "../contexts/currency-context";
import favoritesContext from "../contexts/favorites-context";
import Header from "../components/others/header/header";
import TopSection from "../components/others/top-section/top-section";
import GlobalStats from "../components/others/global-stats/global-stats";
import TableBox from "../components/coins-table/table-box";
import Footer from "../components/others/footer/footer";
import ScrollButton from "../components/others/scroll-button";
import "./page.css";

function FavoritesPage() {
  const [favoritesChanged] = useContext(favoritesContext);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [currencyName, setCurrencyName] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");

  const pageSize = 100;
  const findPageCount = (coinsCount) =>
    setPageCount(Math.ceil(coinsCount / pageSize));

  const updateData = function (data) {
    const marketData = data.market_data;
    return {
      ...data,
      market_cap_rank: data.market_cap_rank || Infinity,
      image: data.image.large,
      current_price: marketData.current_price[currencyName],
      price_change_percentage_1h_in_currency:
        marketData.price_change_percentage_1h_in_currency[currencyName],
      price_change_percentage_24h_in_currency:
        marketData.price_change_percentage_24h_in_currency[currencyName],
      price_change_percentage_7d_in_currency:
        marketData.price_change_percentage_7d_in_currency[currencyName],
      total_volume: marketData.total_volume[currencyName],
      market_cap: marketData.market_cap[currencyName],
    };
  };

  const fetchData = async function (favorites) {
    return await Promise.all(
      favorites.map(async (coinID) => {
        try {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinID}`
          );
          const updatedData = updateData(response.data);
          return updatedData;
        } catch (err) {
          console.error(err);
        }
      })
    );
  };

  // Initialize all data that will be retrieved from localStorage
  useEffect(() => {
    // Favorites data
    localStorage.getItem("favorites") ||
      localStorage.setItem("favorites", "[]");
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

  // Retrieve data of favorite coins-table
  // When checking "favorites" page, show all favorites in order.
  useEffect(() => {
    async function consolidateData() {
      const favorites = JSON.parse(localStorage.getItem("favorites"));
      let response = await fetchData(favorites);
      response = response.sort((a, b) =>
        a.market_cap_rank > b.market_cap_rank ? 1 : -1
      );
      // console.log("testing", response);
      setData(response);
      findPageCount(response.length);
    }
    consolidateData();
  }, [favoritesChanged, currencyName]);

  return (
    <currencyContext.Provider
      value={[currencyName, setCurrencyName, currencySymbol, setCurrencySymbol]}
    >
      <div className="page-container">
        <div className="content-wrap">
          <Header />
          <TopSection
            heading={
              <h1 className="top-section-heading">
                Your <span>Favorite</span> Crypto <span>Currencies</span> All In{" "}
                <span>One</span> Place
              </h1>
            }
            description={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
              " Aliquid aspernatur blanditiis dignissimos necessitatibus quae ratione sapiente amet assumenda corporis culpa."
            }
          />
          <GlobalStats />
          <TableBox
            data={data}
            setData={setData}
            page={page}
            setPage={setPage}
            pageCount={pageCount}
            setPageCount={setPageCount}
          ></TableBox>
        </div>
        <Footer />
        <ScrollButton></ScrollButton>
      </div>
    </currencyContext.Provider>
  );
}

export default FavoritesPage;
