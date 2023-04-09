import React from "react";

import Header from "../components/others/header/header";
import Hero from "../components/home/hero/hero";
import TrendingCoins from "../components/home/trending-coins/trending-coins";
import Features from "../components/home/features/features";
import QuickGuide from "../components/home/quick-guide/quick-guide";
import CtaBanner from "../components/home/cta-banner/cta-banner";
import Footer from "../components/others/footer/footer";
import ScrollButton from "../components/others/scroll-button";
import "./page.css";

//############################################################################

export default function HomePage() {
  // Reset scrollbar to top when page is loaded.
  window.scrollTo(0, 0);

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
