import React, { useContext } from "react";
import { styled } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import favoritesContext from "../../contexts/favorites-context";

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

export default function Favorite({ favorite, setFavorite, coinID }) {
  const [favoritesChanged, setFavoritesChanged] = useContext(favoritesContext);

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
    setFavoritesChanged(!favoritesChanged);
    setFavorite(!favorite);
    // TODO: LESSON LEARNT
    // Putting following line above before conditional does not change anything.
    // This is normal!
    // "State updates using this.setState or useState do not immediately
    // mutate the state but create a pending state transition.
    // Accessing state immediately after calling the updater method can potentially return the old value."
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
