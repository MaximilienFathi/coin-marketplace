import { createContext, useState } from "react";

const [favoritesChanged, setFavoritesChanged] = useState(false);
const favoritesContext = createContext([favoritesChanged, setFavoritesChanged]);

export default favoritesContext;
