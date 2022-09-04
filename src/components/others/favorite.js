import React, { useContext } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import favoritesContext from "../../contexts/favorites-context";
import { styled } from "@mui/material";

//========================================================
// CUSTOM STYLES
const StyledStarIcon = styled(StarIcon)({
  color: "gold",
  height: "1.6rem",
  width: "auto",
  "&:hover": {
    cursor: "pointer",
  },
});

const StyledStarBorderIcon = styled(StarBorderIcon)({
  height: "1.6rem",
  width: "auto",
  "&:hover": {
    color: "gold",
    cursor: "pointer",
  },
});
//========================================================

function Favorite({ favorite, setFavorite, id }) {
  const [favoritesChanged, setFavoritesChanged] = useContext(favoritesContext);

  const addFavorite = (id) => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    favorites = [...favorites, id];
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const removeFavorite = (id) => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    favorites.splice(favorites.indexOf(id), 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const handleClick = () => {
    favorite ? removeFavorite(id) : addFavorite(id);
    setFavoritesChanged(!favoritesChanged);
    // WEIRD ISSUE
    // Putting following before conditional does not change anything!
    // UPDATE - Actually this is normal!
    // "State updates using this.setState or useState do not immediately
    // mutate the state but create a pending state transition.
    // Accessing state immediately after calling the updater method can potentially return the old value."
    setFavorite(!favorite);
  };

  return (
    <td>
      {favorite ? (
        <StyledStarIcon onClick={() => handleClick()}></StyledStarIcon>
      ) : (
        <StyledStarBorderIcon
          onClick={() => handleClick()}
        ></StyledStarBorderIcon>
      )}
    </td>
  );
}

export default Favorite;
