import React from "react";
import Header from "../components/others/header/header";
import Hero from "../components/others/hero/hero";
import Footer from "../components/others/footer/footer";
import "./page.css";

function HomePage() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header />
        <Hero />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
