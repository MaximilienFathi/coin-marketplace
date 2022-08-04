import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Favorite({ favorite, setFavorite, rank }) {
  const handleClick = () => {
    setFavorite(!favorite);
    // WEIRD ISSUE
    // Reversed order of conditions below as not doing so gave wrong result
    favorite
      ? localStorage.removeItem(`coin ${rank}`)
      : localStorage.setItem(`coin ${rank}`, "true");
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
