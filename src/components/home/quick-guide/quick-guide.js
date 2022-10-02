import React from "react";
import GuideStep from "../guide-step/guide-step";
import "./quick-guide.css";

function QuickGuide() {
  return (
    <div className="quick-guide-outer-container">
      <h3 className="quick-guide-subheading">Quick guide</h3>
      <h2 className="quick-guide-heading">Your Crypto Journey Starts Now</h2>
      <div className="quick-guide-inner-container">
        <GuideStep
          order="-1"
          leftBorder="5px solid #fb79c5"
          rightBorder="none"
          bottomBorder="5px solid #fb79c5"
          borderRadius="0px 0px 5px 0px"
          picture={require("../IMAGES/Plain credit card-amico.png")}
          number="01"
          heading="Create a wallet"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore illo itaque laboriosam minus nihil porro repellat, ipsum dolor sit amet, consectetur adipisicing elit."
        ></GuideStep>
        <GuideStep
          order="1"
          leftBorder="none"
          rightBorder="5px solid #fb79c5"
          bottomBorder="5px solid #fb79c5"
          borderRadius="0px 5px 0px 5px"
          picture={require("../IMAGES/Bitcoin-cuate.png")}
          number="02"
          heading="Send cryptos to your wallet"
          description={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi" +
            " autem blanditiis cum dolorum facere impedit consectetur, ipsum" +
            " dolor sit amet, consectetur adipisicing elit."
          }
        ></GuideStep>
        <GuideStep
          order="-1"
          leftBorder="5px solid #fb79c5"
          rightBorder="none"
          bottomBorder="5px solid #fb79c5"
          borderRadius="5px 0px 5px 0px"
          picture={require("../IMAGES/Bitcoin P2P-amico.png")}
          number="03"
          heading={"Connect wallet to coin marketplace"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
            " Corporis distinctio doloremque, eveniet facilis inventore," +
            " ipsum dolor sit amet, consectetur adipisicing elit."
          }
        ></GuideStep>
        <GuideStep
          order="1"
          leftBorder="none"
          rightBorder="5px solid #fb79c5"
          bottomBorder="none"
          borderRadius="0px 5px 0px 0px"
          picture={require("../IMAGES/Bitcoin P2P-pana.png")}
          number="04"
          heading={"Swap your cryptos for other cryptos"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
            " Corporis distinctio doloremque, eveniet facilis inventore," +
            " ipsum dolor sit amet, consectetur adipisicing elit."
          }
        ></GuideStep>
      </div>
    </div>
  );
}

export default QuickGuide;
