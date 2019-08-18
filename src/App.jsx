import React, { Component } from "react";
import "./App.scss";
// import PokedexEntry from "./components/PokedexEntry";
import Routes from "./routes/Routes";
import { Link } from "@reach/router";

class App extends Component {
  render() {
    return (
      <div class="container">
        <div class="wrapper">
          <header class="header">
            <h1>Poké Master Plus</h1>
          </header>
          <div class="content">
            <Routes />
          </div>
          <nav class="navbar">
            <div>
              <Link to="/home">Home</Link>
            </div>
            <div>
              <Link to="/pokedex">The Pokédex</Link>
            </div>
            <div>
              <Link to="/game">Who's That Pokémon?</Link>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default App;
