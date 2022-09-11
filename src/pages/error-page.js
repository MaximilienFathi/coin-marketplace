import React from "react";
import { Link, Outlet } from "react-router-dom";
// import { Button } from "@mui/material";
import Header from "../components/others/header/header";
import "./error-page.css";

function ErrorPage() {
  return (
    <div>
      <Header />
      {/*<div className="error-page">*/}
      <div className="error-message-container">
        <div className="error-text">
          <h1 className="error-heading">404</h1>
          <h3 className="error-subheading">Oops! Something went wrong</h3>
          <p className="error-description">
            The page you are looking for could not be found.
            <br />
            How about we go home?
          </p>
          <Link className="home-btn" to="/coins">
            {/*<button className="home-btn">Go Home</button>*/}
            Go Home
          </Link>
        </div>
        {/*<div className="hero-img-box">*/}
        {/*  <picture>*/}
        {/*    <source srcSet="" type="" />*/}
        {/*    <source srcSet="" type="" />*/}
        <img
          className="error-img"
          src={require("./404 error with person looking for-amico.png")}
          alt=""
        />
        {/*  </picture>*/}
        {/*</div>*/}
      </div>
      {/*</div>*/}
    </div>
  );
}

export default ErrorPage;
