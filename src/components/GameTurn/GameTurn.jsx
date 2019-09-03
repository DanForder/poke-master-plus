import React, { Component } from "react";
import styles from "./GameTurn.module.scss";

class GameTurn extends Component {
  state = {};

  getAnswerImage = () => {
    let imgSrc =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
      this.props.chosenPokemon.id +
      ".png";
    return (
      <img
        style={{ filter: `contrast(0%) brightness(30%)` }}
        src={imgSrc}
        alt="Answer Pokemon"
      />
    );
  };

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  renderPokemonButtons = () => {
    return this.props.pokemonArray.map((pokemon, key) => {
      return pokemon === this.props.chosenPokemon ? (
        <button onClick={this.props.addScore} key={key}>
          {this.capitalizeFirstLetter(pokemon.pokemon.name)}
        </button>
      ) : (
        <button onClick={this.props.failGame} key={key}>
          {this.capitalizeFirstLetter(pokemon.pokemon.name)}
        </button>
      );
    });
  };

  render() {
    return (
      <section className={styles.wrapper}>
        <h3>Question #{this.props.turnNumber}</h3>
        <div className={styles.answerImg}>{this.getAnswerImage()}</div>
        <div className={styles.answers}>{this.renderPokemonButtons()}</div>
      </section>
    );
  }
}

export default GameTurn;
