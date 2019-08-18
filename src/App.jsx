import React, { Component } from "react";
import "./App.scss";
import Routes from "./routes/Routes";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGamepad, faBook } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  state = { activeIcon: "pokedex" };

  componentDidMount() {
    const url = window.location.href;
    if (url.includes("pokedex")) {
      this.setState({ activeIcon: "pokedex" });
    } else if (url.includes("game")) {
      this.setState({ activeIcon: "game" });
    }
  }

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
            <Routes />
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
