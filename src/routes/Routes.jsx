import React, { Component } from "react";
import { Router, Redirect } from "@reach/router";
import HomePage from "../containers/HomePage";
import PokedexPage from "../containers/PokedexPage";
import GamePage from "../containers/GamePage";
import PokedexEntry from "../components/PokedexEntry/PokedexEntry";

const NotFound = () => <h2>Not Found</h2>;

class Routes extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Redirect noThrow from="/" to="home" />
        <HomePage path="home" />
        <PokedexPage path="pokedex" />
        <PokedexEntry path="pokedex/:id" />
        <GamePage path="game" />
        <NotFound default />
      </Router>
    );
  }
}

export default Routes;
