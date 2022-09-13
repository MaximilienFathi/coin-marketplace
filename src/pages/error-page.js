import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../components/others/header/header";
import Footer from "../components/others/footer/footer";
import "./page.css";
import "./error-page.css";

function ErrorPage() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header />
        <div className="error-container">
          <div className="error-text">
            <p className="error-heading">Oh no!</p>
            <p className="error-subheading">Something went wrong</p>
            <p className="error-description">
              The page you are looking for could not be found.
              <br />
              How about we go home?
            </p>
            <Link className="home-btn" to="/coins">
              Go Home
            </Link>
          </div>
          {/*<div className="global-stats-img-box">*/}
          {/*  <picture>*/}
          {/*    <source srcSet="" type="" />*/}
          {/*    <source srcSet="" type="" />*/}
          <img
            className="error-img"
            src={require("./pictures/404 error lost in space-pana.png")}
            alt=""
          />
          {/*  </picture>*/}
          {/*</div>*/}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ErrorPage;
