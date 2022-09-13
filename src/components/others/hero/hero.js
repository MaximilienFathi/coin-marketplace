import React from "react";
import "./hero.css";

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-text">
        <h1 className="hero-heading">
          An easy way to <span>track</span> and <span>trade</span>{" "}
          cryptocurrencies
        </h1>
        <p className="hero-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam
          assumenda atque culpa cum delectus earum enim facere fugit impedit
          iure iusto obcaecati, odio optio possimus praesentium rerum tempore
          velit!
        </p>
        {/*<div className="global-stats-btn-box">*/}
        {/*<a className="btn btn-full btn-explore" href="#nfts">*/}
        {/*  Explore now*/}
        {/*</a>*/}
        {/*<a className="btn btn-outline" href="#procedure">*/}
        {/*  Learn more*/}
        {/*</a>*/}
        {/*</div>*/}
      </div>
      <div className="hero-img">
        {/*<picture>*/}
        {/*  <source srcSet="" type="" />*/}
        {/*  <source srcSet="" type="" />*/}
        <img
          className="hero-img"
          src={require("../../../pages/pictures/Crypto portfolio-amico.png")}
          alt=""
        />
        {/*</picture>*/}
      </div>
    </div>
  );
}

export default Hero;

/*
<a href="https://storyset.com/data">Data illustrations by Storyset</a>
 */
