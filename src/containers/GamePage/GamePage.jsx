import React, { Component } from "react";
import styles from "./GamePage.module.scss";
import GameTurn from "../../components/GameTurn";

class GamePage extends Component {
  state = {
    gameActive: false,
    currentScore: 0,
    pokemonNames: null,
    pokemonArray: null,
    chosenPokemon: null
  };

  componentDidMount() {
    this.fetchPokemonNames(151);
  }

  fetchPokemonNames = dexLimit => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${dexLimit}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemonNames: data.results });
      })
      .catch(error => console.log(error));
  };

  addScore = () => {
    this.setState({ currentScore: this.state.currentScore + 1 });
    this.createNewTurn();
  };

  minusScore = () => {
    this.setState({ currentScore: this.state.currentScore - 1 });
    this.createNewTurn();
  };

  randomBetweenTwo = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  get3RandomPokemon = () => {
    const number1 = this.randomBetweenTwo(0, 150);
    let number2 = this.randomBetweenTwo(0, 150);
    let number3 = this.randomBetweenTwo(0, 150);

    while (number2 === number1) {
      number2 = this.randomBetweenTwo(0, 150);
    }

    while (number3 === number2 || number3 === number1) {
      number3 = this.randomBetweenTwo(0, 150);
    }

    return [
      { id: number1 + 1, pokemon: this.state.pokemonNames[number1] },
      { id: number2 + 1, pokemon: this.state.pokemonNames[number2] },
      { id: number3 + 1, pokemon: this.state.pokemonNames[number3] }
    ];
  };

  createNewTurn = () => {
    const pokemonArray = this.get3RandomPokemon();
    const chosenPokemon = pokemonArray[this.randomBetweenTwo(0, 2)];
    this.setState({ pokemonArray, chosenPokemon, gameActive: true });
  };

  render() {
    return (
      <main className={styles.wrapper}>
        <h2>Who's That Pokemon?</h2>
        {this.state.gameActive ? (
          <GameTurn
            addScore={this.addScore}
            minusScore={this.minusScore}
            pokemonArray={this.state.pokemonArray}
            chosenPokemon={this.state.chosenPokemon}
          />
        ) : null}
        <p>{this.state.currentScore}</p>
        {/* <button onClick={this.addScore}>+1 Score</button>
        <button onClick={this.minusScore}>-1 Score</button> */}
        <button onClick={this.createNewTurn}>New Game</button>
      </main>
    );
  }
}

export default GamePage;
