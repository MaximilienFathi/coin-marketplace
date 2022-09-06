/*
NOTE: Some exchanges may be misplaced in the ranking. Ranking is based on
 trust scores. This is data that comes straight from the API though.
 */

import React from "react";
import "./trust-score.css";

function TrustScore({ trust_score }) {
  return (
    <td className="exchange-trust-score">
      <div className="trust-score-bar-group">
        <div className="back-bar">
          {/*trust_score || "N/A"*/}
          <div className={`front-bar trust-score-${trust_score}`} />
        </div>
        <p className="trust-score-label">{trust_score}</p>
      </div>
    </td>
  );
}

export default TrustScore;
