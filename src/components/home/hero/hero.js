import React from "react";
import "./hero.css";

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-text-container">
        <h1 className="hero-heading">
          An easy way to <span>track</span> and <span>trade</span>{" "}
          cryptocurrencies
        </h1>
        <p className="hero-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam
          assumenda atque culpa cum delectus earum enim facere fugit impedit
          iure iusto obcaecati!
        </p>
        <form className="hero-form" action="src/components/home/hero/hero#">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            required
          />
          <button className="GetStarted-btn">Get Started</button>
        </form>
      </div>
      <div className="hero-img-container">
        {/*<picture>*/}
        {/*  <source srcSet="" type="" />*/}
        {/*  <source srcSet="" type="" />*/}
        <img
          className="hero-img"
          src={require("../../../IMAGES/Crypto portfolio-amico.png")}
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
