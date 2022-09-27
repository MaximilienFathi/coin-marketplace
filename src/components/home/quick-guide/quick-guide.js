import React from "react";
import GuideCard from "../guide-card/guide-card";
import "./quick-guide.css";

function QuickGuide() {
  return (
    <div className="quick-guide-outer-container">
      <h3 className="quick-guide-subheading">Quick guide</h3>
      <h2 className="quick-guide-heading">Your Crypto Journey Starts Now</h2>
      <div className="quick-guide-inner-container">
        <GuideCard
          picture={require("../Plain credit card-amico.png")}
          number="01"
          heading="Create a wallet"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore illo itaque laboriosam minus nihil porro repellat."
        ></GuideCard>
        <GuideCard
          picture={require("../Bitcoin-cuate.png")}
          number="02"
          heading="Send cryptos to your wallet"
          description={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi" +
            " autem blanditiis cum dolorum facere impedit consectetur."
          }
        ></GuideCard>
        <GuideCard
          picture={require("../Bitcoin P2P-amico.png")}
          number="03"
          heading={"Connect wallet to coin marketplace"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
            " Corporis distinctio doloremque, eveniet facilis inventore."
          }
        ></GuideCard>
        <GuideCard
          picture={require("../Bitcoin P2P-pana.png")}
          number="04"
          heading={"Swap your cryptos for other cryptos"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
            " Corporis distinctio doloremque, eveniet facilis inventore."
          }
        ></GuideCard>
        {/*/!* STEP 2 *!/*/}
        {/*<div className="quick-guide-img-box">*/}
        {/*  <img*/}
        {/*    className="guide-step-picture"*/}
        {/*    src={require("../Plain credit card-amico.png")}*/}
        {/*    alt={`picture for creating a wallet`}*/}
        {/*  ></img>*/}
        {/*</div>*/}
        {/*<div className="quick-guide-text-box">*/}
        {/*  <p>02</p>*/}
        {/*  <h3>Create a wallet</h3>*/}
        {/*  <p>*/}
        {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam*/}
        {/*    autem delectus deserunt dicta distinctio.*/}
        {/*  </p>*/}
        {/*</div>*/}
        {/*/!* STEP 3 *!/*/}
        {/*<div className="quick-guide-text-box">*/}
        {/*  <p>03</p>*/}
        {/*  <h3>Create a wallet</h3>*/}
        {/*  <p>*/}
        {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam*/}
        {/*    autem delectus deserunt dicta distinctio.*/}
        {/*  </p>*/}
        {/*</div>*/}
        {/*<div className="quick-guide-img-box">*/}
        {/*  <img*/}
        {/*    className="guide-step-picture"*/}
        {/*    src={require("../Plain credit card-amico.png")}*/}
        {/*    alt={`picture for creating a wallet`}*/}
        {/*  ></img>*/}
        {/*</div>*/}
        {/*/!* STEP 4 *!/*/}
        {/*<div className="quick-guide-img-box">*/}
        {/*  <img*/}
        {/*    className="guide-step-picture"*/}
        {/*    src={require("../Plain credit card-amico.png")}*/}
        {/*    alt={`picture for creating a wallet`}*/}
        {/*  ></img>*/}
        {/*</div>*/}
        {/*<div className="quick-guide-text-box">*/}
        {/*  <p>04</p>*/}
        {/*  <h3>Create a wallet</h3>*/}
        {/*  <p>*/}
        {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam*/}
        {/*    autem delectus deserunt dicta distinctio.*/}
        {/*  </p>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default QuickGuide;
