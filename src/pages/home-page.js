import React from "react";
import Header from "../components/others/header/header";
import Hero from "../components/home/hero/hero";
import TrendingCoins from "../components/home/trending-coins/trending-coins";
import Footer from "../components/others/footer/footer";
import "./page.css";

function HomePage() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header />
        <Hero />
        <TrendingCoins />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;