import React from "react";
import "./App.scss";
import PokedexEntry from "./components/PokedexEntry";

function App() {
  return (
    <div class="wrapper">
      <h1>pokedex.dforder.com</h1>
      <img
        class="pokeball"
        src="https://purepng.com/public/uploads/large/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-1701527825891sbtn8.png"
        alt="pokeball"
      />
      <h2>The Pokedex is coming!</h2>
      <PokedexEntry id="1" />
    </div>
  );
}

export default App;
