import React, { Component } from "react";
import "./App.scss";
// import PokedexEntry from "./components/PokedexEntry";
import Routes from "./routes/Routes";
import { Link } from "@reach/router";

class App extends Component {
  render() {
    return (
      <div class="wrapper">
        <header class="header">
          <h1>pokedex.dforder.com</h1>
        </header>
        <Routes />
        <nav class="navbar">
          <div>
            <Link to="/home">Home</Link>
          </div>
          <div>
            <Link to="/pokedex">The Pokedex</Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default App;
