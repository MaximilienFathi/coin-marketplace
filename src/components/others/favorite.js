import React, { useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import favoritesContext from "../../contexts/favorites-context";

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
        <FavoriteIcon
          // className="red"
          onClick={() => handleClick()}
        ></FavoriteIcon>
      ) : (
        <FavoriteBorderIcon onClick={() => handleClick()}></FavoriteBorderIcon>
      )}
    </td>
  );
}

export default Favorite;
