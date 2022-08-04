import React from "react";

function TableHeader() {
  return (
    <div className="table-row">
      <p></p>
      <p>#</p>
      <p>Name</p>
      <p>Price</p>
      <p>Change (1h)</p>
      <p>Change (24h)</p>
      <p>Change (7d)</p>
      <p>Volume (24h)</p>
      <p>Market Cap</p>
    </div>
  );
}

export default TableHeader;
