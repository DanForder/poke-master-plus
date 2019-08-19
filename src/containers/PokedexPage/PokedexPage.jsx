import React, { Component } from "react";
// import PokedexEntry from "../../components/PokedexEntry";
import PokedexCard from "../../components/PokedexCard";
import SearchBar from "../../components/SearchBar";
import styles from "./PokedexPage.module.scss";
import { Link } from "@reach/router";

class PokedexPage extends Component {
  state = {
    pokemonNames: null,
    searchText: "",
    filteredList: []
  };

  componentDidMount() {
    this.fetchPokemonNames(151);
  }

  fetchPokemonNames = dexLimit => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${dexLimit}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemonNames: data.results });
      })
      .catch(error => console.log(error));
  };

  randomBetweenTwo = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  setSearchText = event => {
    const searchText = event.target.value;
    this.setState({ searchText });
  };

  filterRenderedCards = searchTerm => {
    if (this.state.pokemonNames) {
      const currentCards = this.renderPokeCards();
      // console.log(currentCards);
      // return null;
      let filteredCards = currentCards.filter(card => {
        return (
          card.props.children.props.name.includes(searchTerm) ||
          card.props.children.props.id.toString().includes(searchTerm)
        );
      });
      return filteredCards;
    }
  };

  renderPokeCards = () => {
    let pokeCardArray = [];
    if (this.state.pokemonNames) {
      for (let index = 0; index < 151; index++) {
        pokeCardArray.push(
          <Link key={index} to={`${index + 1}`}>
            <PokedexCard
              key={index}
              name={this.state.pokemonNames[index].name}
              id={index + 1}
            />
          </Link>
        );
      }
      return pokeCardArray;
    } else {
      return <div>Loading</div>;
    }
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <header>
          <h2>The Pokedex</h2>
          <SearchBar
            setSearchText={this.setSearchText}
            searchText={this.state.searchText}
          />
        </header>
        <section className={styles.pokedexCards}>
          {this.filterRenderedCards(this.state.searchText.toLowerCase())}
        </section>
      </div>
    );
  }
}

export default PokedexPage;
