import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Hero from "../components/hero";
import TableBox from "../components/table-box";

function ExchangesPage() {
  const [data, setData] = useState([]);
  const [totalExchanges, setTotalExchanges] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const pageSize = 100;
  const findPageCount = () =>
    setPageCount(Math.ceil(totalExchanges / pageSize));

  // ISSUE - Cannot update coins and then use it as it always gives []
  // So passing coins straight from res.data via "data" parameter
  const findExchangeRank = (data, exchange) =>
    (page - 1) * pageSize + data.indexOf(exchange) + 1;

  const addRankToExchanges = (data) =>
    data.map((exchange) => ({
      ...exchange,
      rank: findExchangeRank(data, exchange),
    }));

  // Retrieve total number of exchanges
  // (Going from .then/.catch to async/await has been the solution!!)
  useEffect(() => {
    async function fetchData() {
      try {
        let totalExchanges = 0;
        let currentPage = 0;
        let currentPageDataLength = 0;
        let lastPage = false;
        while (!lastPage) {
          const res = await axios.get(
            `https://api.coingecko.com/api/v3/exchanges?per_page=${pageSize}&page=${++currentPage}`
          );
          currentPageDataLength = res.data.length;
          totalExchanges += currentPageDataLength;
          lastPage = currentPageDataLength < pageSize ? true : false;
          console.log(res.data);
          console.log(currentPageDataLength, totalExchanges, currentPage);
        }
        return totalExchanges;
      } catch (err) {
        console.error(err);
      }
    }
    setTotalExchanges(fetchData());
    findPageCount();
  }, []);

  // Retrieve data of 100 exchanges on specific page
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/exchanges?per_page=${pageSize}&page=${page}`
      )
      .then((res) => {
        setData(addRankToExchanges(res.data));
        // console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, [page]); // This will run everytime page changes.

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

export default ExchangesPage;
