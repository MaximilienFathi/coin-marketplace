import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="footer-outer-container">
      <div className="footer-inner-container">
        <p className="copyright">
          Copyright &copy;{" "}
          <span className="year">{new Date().getFullYear()}</span> by{" "}
          <a className="footer-link" href="https://github.com/MaximilienFathi">
            Maximilien Fathi
          </a>
          . All rights reserved.
        </p>
        <p className="attributions">
          Powered by{" "}
          <a className="footer-link" href="https://www.coingecko.com">
            CoinGecko
          </a>{" "}
          and{" "}
          <a className="footer-link" href="https://storyset.com">
            Storyset
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
