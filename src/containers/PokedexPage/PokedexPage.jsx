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
        <h2>Random Pokemon</h2>
        <PokedexEntry id={this.randomBetweenTwo(1, 151)} />
      </div>
    );
  }
}

export default PokedexPage;
