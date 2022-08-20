import React, { useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import favoritesContext from "../../contexts/favorites-context";

function Favorite({ favorite, setFavorite, id, rank }) {
  const [favoritesChanged, setFavoritesChanged] = useContext(favoritesContext);

  const handleClick = () => {
    favorite ? localStorage.removeItem(id) : localStorage.setItem(id, rank);
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
    <div>
      {favorite ? (
        <FavoriteIcon
          // className="red"
          onClick={() => handleClick()}
        ></FavoriteIcon>
      ) : (
        <FavoriteBorderIcon onClick={() => handleClick()}></FavoriteBorderIcon>
      )}
    </div>
  );
}

export default Favorite;
