import React, { useState } from "react";

import TableSettings from "../others/table-settings/table-settings";
import TableRows from "./table-rows";
import Pagination from "../others/pagination";
import "./table-box.css";

//############################################################################

export default function TableBox() {
  const [searchQuery, setSearchQuery] = useState("");

  //############################################################################

  return (
    <div className="table-container">
      <TableSettings setSearchQuery={setSearchQuery}></TableSettings>
      <TableRows searchQuery={searchQuery}></TableRows>
      <Pagination></Pagination>
      {/* removed setPage={setPage} pageCount={pageCount}*/}
    </div>
  );
}
