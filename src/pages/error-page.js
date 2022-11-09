import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/others/header/header";
import Footer from "../components/others/footer/footer";
import "./page.css";
import "./error-page.css";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";

//========================================================
// CUSTOM STYLES
const StyledHomeButton = styled(Button)({
  "&.MuiButtonBase-root:hover": {
    background: "#fb79c5",
  },
});

const HomeButtonStyles = {
  fontFamily: "inherit",
  color: "inherit",
  width: "fit-content",
  padding: "1.2rem 2.4rem",
  fontSize: "2.4rem",
  fontWeight: 400,
  borderRadius: "11px",
  border: "none",
  textTransform: "capitalize",
  background: "#fa58b6",
  boxShadow: "inset 0 0 2px #000",
  transition: "all 0.3s",
};
//========================================================

function ErrorPage() {
  const navigate = useNavigate();
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
            <StyledHomeButton
              sx={HomeButtonStyles}
              onClick={() => navigate("/")}
            >
              Go Home
            </StyledHomeButton>
          </div>
          {/*<div className="global-stats-img-box">*/}
          {/*  <picture>*/}
          {/*    <source srcSet="" type="" />*/}
          {/*    <source srcSet="" type="" />*/}
          <img
            className="error-img"
            src={require("./IMAGES/404 error robot 2.png")}
            alt="Error page image"
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
