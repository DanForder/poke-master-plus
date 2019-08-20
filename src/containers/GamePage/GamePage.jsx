import React, { Component } from "react";
import styles from "./GamePage.module.scss";
import GameTurn from "../../components/GameTurn";

class GamePage extends Component {
  state = {
    gameActive: false,
    gameFail: false,
    turnNumber: 0,
    currentScore: 0,
    pokemonNames: null,
    pokemonArray: null,
    chosenPokemon: null,
    user: null
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

  failGame = () => {
    this.setState({ gameActive: false, failGame: true });
    this.props.saveScore(this.state.currentScore);
    this.props.getUserScoreArray();
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
    this.setState({
      turnNumber: this.state.turnNumber + 1,
      pokemonArray,
      chosenPokemon
    });
  };

  startNewGame = () => {
    const pokemonArray = this.get3RandomPokemon();
    const chosenPokemon = pokemonArray[this.randomBetweenTwo(0, 2)];
    this.setState({
      turnNumber: 1,
      currentScore: 0,
      gameFail: false,
      gameActive: true,
      pokemonArray,
      chosenPokemon
    });
  };

  render() {
    return (
      <main className={styles.wrapper}>
        <header>
          <h2>Who's That Pokemon?</h2>
          <div className={styles.score}>
            {this.props.user ? (
              <React.Fragment>
                <p>Welcome, {this.props.user.displayName}!</p>
                <p>Your Score: {this.state.currentScore}</p>
              </React.Fragment>
            ) : (
              <button onClick={this.props.signIn}>Sign In</button>
            )}
          </div>
        </header>
        <section className={styles.gameCanvas}>
          {this.state.gameActive ? (
            <GameTurn
              turnNumber={this.state.turnNumber}
              addScore={this.addScore}
              failGame={this.failGame}
              pokemonArray={this.state.pokemonArray}
              chosenPokemon={this.state.chosenPokemon}
            />
          ) : (
            <section className={styles.preGameCanvas}>
              {this.props.user ? (
                this.state.failGame ? (
                  <div className={styles.postGameCanvas}>
                    <h3>Your score this game was {this.state.currentScore}</h3>
                    <h3>
                      Your high score is {Math.max(...this.props.userScores)}
                    </h3>

                    <button onClick={this.startNewGame}>New Game</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={this.startNewGame}>New Game</button>
                  </div>
                )
              ) : (
                <React.Fragment>
                  <p>Sign in to play!</p>
                  <p>How many pokemon can you name?</p>
                </React.Fragment>
              )}
            </section>
          )}
        </section>
      </main>
    );
  }
}

export default GamePage;
