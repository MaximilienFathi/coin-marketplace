import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Hero from "../components/hero";
import TableBox from "../components/table-box";

function FavoritesPage() {
  const [data, setData] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const pageSize = 100;
  const findPageCount = (data) =>
    setPageCount(Math.ceil(data.length / pageSize));

  useEffect(() => {
    setData(localStorage);
    findPageCount(data);
  });

  return (
    // Replace className App with something else
    <div className="App">
      <Header></Header>
      <Hero></Hero>
      <TableBox
        data={data}
        setData={setData}
        page={page}
        setPage={setPage}
        pageCount={pageCount}
      ></TableBox>
    </div>
  );
}

export default FavoritesPage;

// const favoriteCoins = coins.filter((coin) => coin.id in favorites);
// console.log(favorites);

// Rename table-display to coins-table
// Add an exchange-table
// Use conditional operator in table-box to display coins-table or
// exchange-table
