import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinsPage from "./pages/coins-page";
import SearchBox from "./components/search-box";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/*<Route index element={<CoinsPage/>}/>*/}
          {/*<Route page="coins" element={<CoinsPage/>}/>*/}
          <Route index element={<CoinsPage />} />
          <Route path="coins" element={<CoinsPage />} />
          {/*<Route path="exchanges" element={<ExchangesPage/>}/>*/}
          {/*<Route path="favorites" element={<FavoritesPage/>}/>*/}
          {/*<Route path="*" element={<NoPage />}       />*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
