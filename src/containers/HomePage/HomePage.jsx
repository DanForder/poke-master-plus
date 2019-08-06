import React, { Component } from "react";
import styles from "./HomePage.module.scss";

class HomePage extends Component {
  state = {};
  render() {
    return (
      <div className={styles.wrapper}>
        <h2>Home</h2>
        <img
          class="pokeball"
          src="https://purepng.com/public/uploads/large/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-1701527825891sbtn8.png"
          alt="pokeball"
        />
        <h2>The Pokedex is coming!</h2>
      </div>
    );
  }
}

export default HomePage;
