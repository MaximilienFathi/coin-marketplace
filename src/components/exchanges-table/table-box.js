import React from "react";

import TableSettings from "../others/table-settings/table-settings";
import TableRows from "./table-rows";
import Pagination from "../others/pagination";
import "../coins-table/table-box.css";

//############################################################################

export default function TableBox() {
  return (
    <div className="table-container">
      <TableSettings />
      <TableRows />
      <Pagination />
    </div>
  );
}
