import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function TableHeader({
  data,
  setData,
  headerKey,
  headerName,
  sortedData,
  setSortedData,
}) {
  const [ascendingSort, setAscendingSort] = useState(true);

  // Make sure to reset position of THIS sort arrow if another header is clicked
  // This will run everytime sortedData changes.
  useEffect(() => {
    sortedData === headerKey ? setAscendingSort(false) : setAscendingSort(true);
  }, [sortedData]);

  // Not very pretty but best solution I could find
  const compareBy = (key) => {
    if (!ascendingSort && key !== "name")
      return function (a, b) {
        // console.log(a[key], b[key], a[key] > b[key]);
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      };
    if (ascendingSort && key !== "name") {
      setSortedData(key);
      return function (a, b) {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
      };
    }
    // Have case-insensitive sorting when sorting by name
    if (!ascendingSort && key === "name")
      return function (a, b) {
        if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;
        if (a[key].toLowerCase() > b[key].toLowerCase()) return 1;
        return 0;
      };
    if (ascendingSort && key === "name") {
      setSortedData(key);
      return function (a, b) {
        if (a[key].toLowerCase() < b[key].toLowerCase()) return 1;
        if (a[key].toLowerCase() > b[key].toLowerCase()) return -1;
        return 0;
      };
    }
  };

  const sortBy = (key) => {
    const arrayCopy = [...data];
    arrayCopy.sort(compareBy(key));
    setData(arrayCopy);
    setAscendingSort(!ascendingSort);
  };

  return (
    <th className="table-header">
      <p onClick={() => sortBy(headerKey)}>
        {headerName}
        {ascendingSort ? (
          <ArrowDropUpIcon></ArrowDropUpIcon>
        ) : (
          <ArrowDropDownIcon></ArrowDropDownIcon>
        )}
      </p>
    </th>
  );
}

export default TableHeader;
