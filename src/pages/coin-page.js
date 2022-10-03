import React from "react";
import Header from "../components/others/header/header";
import CoinCharts from "../components/coin/coin-charts";
import Footer from "../components/others/footer/footer";

function CoinPage(props) {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header />
        <CoinCharts />
      </div>
      <Footer />
    </div>
  );
}

export default CoinPage;
