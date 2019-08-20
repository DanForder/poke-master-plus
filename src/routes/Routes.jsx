import React, { Component } from "react";
import { Router, Redirect } from "@reach/router";
import HomePage from "../containers/HomePage";
import PokedexPage from "../containers/PokedexPage";
import HighScorePage from "../containers/HighScorePage";
import GamePage from "../containers/GamePage";
import PokedexEntry from "../components/PokedexEntry/PokedexEntry";

const NotFound = () => <h2>Not Found</h2>;

class Routes extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Redirect noThrow from="/" to="pokedex" />
        <HomePage path="home" />
        <PokedexPage path="pokedex" />
        <PokedexEntry path="pokedex/:id" />
        <GamePage
          user={this.props.user}
          userScores={this.props.userScores}
          signIn={this.props.signIn}
          saveScore={this.props.saveScore}
          getUserScoreArray={this.props.getUserScoreArray}
          path="game"
        />
        <HighScorePage highScores={this.props.highScores} path="highscores" />
        <NotFound default />
      </Router>
    );
  }
}

export default Routes;
