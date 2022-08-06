import React, { useState } from "react";

function TableHeader({ coins, setCoins, dataKey, header }) {
  const [ascendingSort, setAscendingSort] = useState(true);

  const compareBy = (key) => {
    if (ascendingSort)
      return function (a, b) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      };
    if (!ascendingSort)
      return function (a, b) {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
      };
  };

  const sortBy = (key) => {
    const arrayCopy = [...coins];
    arrayCopy.sort(compareBy(key));
    setCoins(arrayCopy);
    setAscendingSort(!ascendingSort);
  };

  return (
    <div className="table-header">
      <p onClick={() => sortBy(dataKey)}>{header}</p>
    </div>
  );
}

export default TableHeader;
