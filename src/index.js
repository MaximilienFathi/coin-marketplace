import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

//############################################################################

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // TODO: ACTIVATE STRICTMODE AGAIN AT THE END
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
