import React, { Component } from "react";
import "./App.scss";
import Routes from "./routes/Routes";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGamepad, faBook } from "@fortawesome/free-solid-svg-icons";
import firebase, { provider, firestore } from "./firebase";

class App extends Component {
  state = { activeIcon: "pokedex", user: null };

  componentDidMount() {
    const url = window.location.href;
    if (url.includes("pokedex")) {
      this.setState({ activeIcon: "pokedex" });
    } else if (url.includes("game")) {
      this.setState({ activeIcon: "game" });
    }
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
        this.checkForUserCollection(user.uid);
      })
      .catch(error => {
        // An error happened.
        console.log(error);
      });
  };

  checkForUserCollection = userToken => {
    firestore
      .collection("users")
      .doc(userToken)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.data()) {
          console.log("user data doesn't exist yet");
          console.log("making user collection in database");
          this.createUserCollection(userToken);
        } else {
          console.log("user data exists already");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };

  createUserCollection(userToken) {
    firestore
      .collection("users")
      .doc(userToken)
      .set({ scores: [] });
  }

  saveScore = score => {
    firestore
      .collection("users")
      .doc(this.state.user.uid)
      .update({ scores: firebase.firestore.FieldValue.arrayUnion(score) });
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
              signIn={this.signIn}
              saveScore={this.saveScore}
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
          </nav>
        </div>
      </div>
    );
  }
}

export default App;
