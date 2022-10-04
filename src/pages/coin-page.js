import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/others/header/header";
import CoinCharts from "../components/coin/coin-charts";
import Footer from "../components/others/footer/footer";

function CoinPage(props) {
  const location = useLocation();
  const { coinID } = location.state;

  console.log(coinID);

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header />
        <CoinCharts coinID={coinID} />
      </div>
      <Footer />
    </div>
  );
}

export default CoinPage;
