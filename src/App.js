import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokedex from "./components/Pokedex";
import PokemonDetails from "./components/PokemonDetails";
import NavTitle from "./components/NavTitle";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <NavTitle />
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
