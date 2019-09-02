import React, { Component } from "react";
import "./App.scss";
import Routes from "./routes/Routes";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faBook, faListOl } from "@fortawesome/free-solid-svg-icons";
import firebase, { provider, firestore } from "./firebase";

class App extends Component {
  state = { activeIcon: "", user: null, userScores: [], highScores: [] };

  componentDidMount() {
    const url = window.location.href;
    if (url.includes("game")) {
      this.setState({ activeIcon: "game" });
    } else if (url.includes("highscores")) {
      this.setState({ activeIcon: "highscores" });
    } else if (url.includes("pokedex")) {
      this.setState({ activeIcon: "pokedex" });
    }
    //check for new highscores every second
    // setInterval(this.getAllHighScores, 1000);

    this.getAllHighScores();
  }

  signIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;

        // The signed-in user info.
        var user = result.user;
        this.setState({
          user
        });
        //if one doesn't exist, create new collection with unique user ID
        this.checkForUserCollection(user);
      })
      .catch(error => {
        // An error happened.
        console.log(error);
      });
  };

  checkForUserCollection = user => {
    firestore
      .collection("userlist")
      .doc(user.uid)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.data()) {
          console.log("user data doesn't exist yet");
          console.log("making user collection in database");
          this.createUserCollection(user);
        } else {
          console.log("user data exists already");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };

  createUserCollection(user) {
    firestore
      .collection("userlist")
      .doc(user.uid)
      .set({ scores: [], name: user.displayName });
  }

  saveScore = score => {
    firestore
      .collection("userlist")
      .doc(this.state.user.uid)
      .update({ scores: firebase.firestore.FieldValue.arrayUnion(score) });
  };

  getUserScoreArray = () => {
    const docRef = firestore.collection("userlist").doc(this.state.user.uid);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          this.setState({ userScores: doc.data().scores });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };

  getAllHighScores = () => {
    let allScoresArray = [];
    firestore
      .collection("userlist")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          allScoresArray.push([doc.data().name, doc.data().scores]);
          // console.log("getting high scores array");
        });
        this.makeHighScoreList(allScoresArray);
      });
  };

  makeHighScoreList = highScoreArray => {
    let highestScoreArray = [];
    highScoreArray.forEach(highScore => {
      highScore[1][0]
        ? highestScoreArray.push([highScore[0], Math.max(...highScore[1])])
        : highestScoreArray.push([highScore[0], 0]);
    });
    // console.log(highestScoreArray);
    this.setState({ highScores: highestScoreArray });
  };

  getActiveLink = link => {
    return link === this.state.activeIcon
      ? { backgroundColor: `rgb(136, 58, 58)` }
      : null;
  };

  render() {
    return (
      <div class="container">
        <div class="wrapper">
          <header class="header">
            <h1>Poké Master Plus</h1>
          </header>
          <div class="content">
            <Routes
              user={this.state.user}
              userScores={this.state.userScores}
              highScores={this.state.highScores}
              signIn={this.signIn}
              saveScore={this.saveScore}
              getUserScoreArray={this.getUserScoreArray}
            />
          </div>
          <nav class="navbar">
            {/* <div style={this.getActiveLink("home")}>
              <Link
                to="/home"
                onClick={() => this.setState({ activeIcon: "home" })}
              >
                <FontAwesomeIcon icon={faHome} size="lg" />
              </Link>
            </div> */}
            <div style={this.getActiveLink("pokedex")}>
              <Link
                to="/pokedex"
                onClick={() => this.setState({ activeIcon: "pokedex" })}
              >
                <FontAwesomeIcon icon={faBook} size="lg" />
              </Link>
            </div>
            <div style={this.getActiveLink("game")}>
              <Link
                to="/game"
                onClick={() => this.setState({ activeIcon: "game" })}
              >
                <FontAwesomeIcon icon={faGamepad} size="lg" />
              </Link>
            </div>
            <div style={this.getActiveLink("highscores")}>
              <Link
                to="/highscores"
                onClick={() => this.setState({ activeIcon: "highscores" })}
              >
                <FontAwesomeIcon icon={faListOl} size="lg" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default App;
