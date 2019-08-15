import React, { Component } from "react";
import PokedexEntry from "../../components/PokedexEntry";
import PokedexCard from "../../components/PokedexCard";
import SearchBar from "../../components/SearchBar";
import styles from "./PokedexPage.module.scss";

class PokedexPage extends Component {
  state = {
    pokemonNames: null,
    entryId: 1,
    searchText: "",
    cards: [],
    filteredList: []
  };

  componentDidMount() {
    this.fetchPokemonNames();
  }

  fetchPokemonNames = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`)
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemonNames: data.results });
      })
      .catch(error => console.log(error));
  };

  randomBetweenTwo = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  renderPokedexEntry = id => {
    return <PokedexEntry id={id} />;
  };

  setSearchText = event => {
    const searchText = event.target.value;
    this.setState({ searchText });
  };

  filterRenderedCards = searchTerm => {
    if (this.state.pokemonNames) {
      const currentCards = this.renderPokeCards();
      // console.log(currentCards);
      let filteredCards = currentCards.filter(card => {
        return card.props.name.includes(searchTerm);
      });
      console.log(filteredCards);
      return filteredCards;
    }
  };

  renderPokeCards = () => {
    let pokeCardArray = [];
    if (this.state.pokemonNames) {
      for (let index = 0; index < 151; index++) {
        pokeCardArray.push(
          <PokedexCard
            key={index}
            name={this.state.pokemonNames[index].name}
            id={index + 1}
          />
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
        <h2>Pokedex</h2>
        <SearchBar
          setSearchText={this.setSearchText}
          searchText={this.state.searchText}
        />
        <section className={styles.pokedexCards}>
          {/* {this.renderPokeCards()} */}
          {this.filterRenderedCards(this.state.searchText)}
        </section>
        {/* {this.renderPokedexEntry(this.state.entryId)} */}
      </div>
    );
  }
}

export default PokedexPage;
