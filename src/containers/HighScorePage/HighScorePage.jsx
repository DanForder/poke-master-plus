import React, { Component } from "react";
import styles from "./HighScorePage.module.scss";

class HighScorePage extends Component {
  state = { highScores: [] };

  render() {
    return (
      <main className={styles.wrapper}>
        <h2>High Scores</h2>
        <div>
          {this.props.highScores.length > 0 ? (
            this.props.highScores.map(highScore => {
              return (
                <div className={styles.highScore}>
                  <p>{highScore[0]}</p>
                  <p>{highScore[1]}</p>
                </div>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </main>
    );
  }
}

export default HighScorePage;
