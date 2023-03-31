import React from "react";
import "./cta-banner.css";

function CtaBanner() {
  return (
    <div className="cta-banner-outer-container">
      <div className="cta-banner-middle-container">
        <div className="cta-banner-inner-container">
          <h2 className="cta-banner-heading">
            Stay in the loop and get the latest news in your inbox!
          </h2>
          <form
            className="cta-banner-form"
            action="src/components/home/hero/hero#"
          >
            <input
              id="cta-banner-email"
              name="email"
              type="email"
              placeholder="Your email address"
              required
            />
            <button className="GetStarted-btn">Get Started</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CtaBanner;
