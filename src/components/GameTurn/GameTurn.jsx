import React, { Component } from "react";
import styles from "./GameTurn.module.scss";

class GameTurn extends Component {
  state = {};

  getAnswerImage = () => {
    let imgSrc =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
      this.props.chosenPokemon.id +
      ".png";

    // console.log(this.state.chosenPokemon);
    return (
      <img style={{ filter: `contrast(0%) brightness(30%)` }} src={imgSrc} />
    );
  };

  renderPokemonButtons = () => {
    return this.props.pokemonArray.map((pokemon, key) => {
      return pokemon === this.props.chosenPokemon ? (
        <button onClick={this.props.addScore} key={key}>
          {pokemon.pokemon.name}
        </button>
      ) : (
        <button onClick={this.props.minusScore} key={key}>
          {pokemon.pokemon.name}
        </button>
      );
    });
  };

  render() {
    return (
      <section className={styles.wrapper}>
        <h3>Question #{this.props.turnNumber}</h3>
        {this.getAnswerImage()}
        <div>{this.renderPokemonButtons()}</div>
      </section>
    );
  }
}

export default GameTurn;
