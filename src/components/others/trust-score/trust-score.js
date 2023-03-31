import React from "react";

import "./trust-score.css";

//############################################################################

export default function TrustScore({ trust_score }) {
  return (
    <td className="exchange-trust-score">
      <div className="trust-score-bar-group">
        <div className="back-bar">
          <div className={`front-bar trust-score-${trust_score}`} />
        </div>
        <p className="trust-score-label">{trust_score}</p>
      </div>
    </td>
  );
}
