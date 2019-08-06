import React, { Component } from "react";
import PokedexEntry from "../../components/PokedexEntry";
import styles from "./PokedexPage.module.scss";

class PokedexPage extends Component {
  state = {};
  render() {
    return (
      <div className={styles.wrapper}>
        <PokedexEntry id="1" />
      </div>
    );
  }
}

export default PokedexPage;
