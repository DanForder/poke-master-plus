import React, { Component } from "react";
import PokedexEntry from "../../components/PokedexEntry";
import styles from "./PokedexPage.module.scss";

class PokedexPage extends Component {
  state = {};

  randomBetweenTwo = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <h2>Pokedex</h2>
        <PokedexEntry id={1} />
      </div>
    );
  }
}

export default PokedexPage;
