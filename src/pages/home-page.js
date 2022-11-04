import React from "react";
import Header from "../components/others/header/header";
import Hero from "../components/home/hero/hero";
import TrendingCoins from "../components/home/trending-coins/trending-coins";
import Footer from "../components/others/footer/footer";
import Features from "../components/home/features/features";
import QuickGuide from "../components/home/quick-guide/quick-guide";
import CtaBanner from "../components/home/cta-banner/cta-banner";
import ScrollButton from "../components/others/scroll-button";
import "./page.css";

function HomePage() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header />
        <Hero />
        <TrendingCoins />
        <Features />
        <QuickGuide />
        <CtaBanner />
      </div>
      <Footer />
      <ScrollButton />
    </div>
  );
}

export default HomePage;
