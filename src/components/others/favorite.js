import React, { useState } from "react";
import { styled } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

//############################################################################

// CUSTOM STYLES
const StyledStarIcon = styled(StarIcon)({
  color: "gold",
  height: "2.0rem",
  width: "auto",
  "&:hover": {
    cursor: "pointer",
  },
});

const StyledStarBorderIcon = styled(StarBorderIcon)({
  height: "2.0rem",
  width: "auto",
  "&:hover": {
    color: "gold",
    cursor: "pointer",
  },
});

//############################################################################

export default function Favorite({ coinID }) {
  // Show if coin is in localStorage favorites array or not (boolean value)
  /*
   TODO: LESSON LEARNT
   If I use a regular string (e.g. "ethereum") rather than the variable
   coinID, there are no issues. If I use coinID instead, there are
   issues since it will render before even knowing what coinID is!
   Hence, I used {coinData.id && <Favorite
   coinID={coinData.id}></Favorite>} in parent component (marketInfo)
   TODO: LESSON LEARNT
   Had to add ?. because otherwise it was not null safe!
  */
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorites"))?.includes(coinID)
  );

  // Add coin to favorites array in localStorage
  function addFavorite(coinID) {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    favorites = [...favorites, coinID];
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  // Remove coin from favorites array in localStorage
  function removeFavorite(coinID) {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    favorites.splice(favorites.indexOf(coinID), 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  // Add or remove coin from favorites based on action taken by user
  function handleClick() {
    favorite ? removeFavorite(coinID) : addFavorite(coinID);
    setFavorite(!favorite);
    /* TODO: LESSON LEARNT
     "State updates using this.setState or useState do not immediately
     mutate the state but create a pending state transition.
     Accessing state immediately after calling the updater method can potentially return the old value."
     ===> https://www.daggala.com/react-state-not-updating-immediately/
     "The component has to rerender before updating the new state.
     The reason why the state does not update immediately is because for each
     render, the state is immutable."
    */
  }

  //############################################################################

  return (
    <>
      {favorite ? (
        <StyledStarIcon onClick={() => handleClick()}></StyledStarIcon>
      ) : (
        <StyledStarBorderIcon
          onClick={() => handleClick()}
        ></StyledStarBorderIcon>
      )}
    </>
  );
}
