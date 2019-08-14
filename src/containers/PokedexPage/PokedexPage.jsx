import React, { Component } from "react";
import PokedexEntry from "../../components/PokedexEntry";
import styles from "./PokedexPage.module.scss";

class PokedexPage extends Component {
  state = { entryId: 1 };

  randomBetweenTwo = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  renderPokedexEntry = id => {
    return <PokedexEntry id={id} />;
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <h2>Pokedex</h2>
        {this.renderPokedexEntry(this.state.entryId)}
      </div>
    );
  }
}

export default PokedexPage;
