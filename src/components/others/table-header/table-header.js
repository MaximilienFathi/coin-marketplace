import React, { useEffect, useState } from "react";
import { styled } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import "./table-header.css";

//############################################################################

// CUSTOM STYLES
const StyledArrowDropDrownIcon = styled(ArrowDropDownIcon)({
  color: "#b8b8b8",
});

const StyledArrowDropUpIcon = styled(ArrowDropUpIcon)({ color: "#b8b8b8" });

//############################################################################

export default function TableHeader({
  headerKey,
  headerName,
  data,
  setData,
  sortedData,
  setSortedData,
}) {
  const [ascendingSort, setAscendingSort] = useState(true);

  // Reset position of THIS sort arrow icon if another header is clicked.
  // This will run everytime sortedData changes.
  useEffect(() => {
    sortedData === headerKey ? setAscendingSort(false) : setAscendingSort(true);
  }, [sortedData]);

  // Compare values to each other to enable sorting mechanism
  function compareBy(key) {
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
  }

  // Sort data in ascending or descending order
  function sortBy(key) {
    const arrayCopy = [...data];
    arrayCopy.sort(compareBy(key));
    setData(arrayCopy);
    setAscendingSort(!ascendingSort);
  }

  //############################################################################

  return (
    <th>
      {headerKey === "market_cap_rank" ||
      headerKey === "trust_score_rank" ||
      headerKey === "name" ? (
        <div className="table-header-start" onClick={() => sortBy(headerKey)}>
          {headerName}
          {ascendingSort ? (
            <StyledArrowDropUpIcon></StyledArrowDropUpIcon>
          ) : (
            <StyledArrowDropDrownIcon></StyledArrowDropDrownIcon>
          )}
        </div>
      ) : (
        <div className="table-header-end" onClick={() => sortBy(headerKey)}>
          {ascendingSort ? (
            <StyledArrowDropUpIcon></StyledArrowDropUpIcon>
          ) : (
            <StyledArrowDropDrownIcon></StyledArrowDropDrownIcon>
          )}
          {headerName}
        </div>
      )}
    </th>
  );
}
