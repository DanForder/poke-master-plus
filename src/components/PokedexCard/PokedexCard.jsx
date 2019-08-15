import React, { Component } from "react";
import styles from "./PokedexCard.module.scss";

//name={this.state.pokemonNames[index]}
// id={index + 1}

class PokedexCard extends Component {
  state = {};

  capitaliseString = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    return (
      <section className={styles.wrapper}>
        <div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              this.props.id
            }.png`}
            alt={this.props.name}
          />
        </div>
        <div>
          <p>
            {this.capitaliseString(this.props.name)} #{this.props.id}
          </p>
        </div>
      </section>
    );
  }
}

export default PokedexCard;
