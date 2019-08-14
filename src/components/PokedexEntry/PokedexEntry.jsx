import React, { Component } from "react";
import styles from "./PokedexEntry.module.scss";

class PokedexEntry extends Component {
  state = { pokemon: "", pokemonData: "", pokemonImage: "", id: "" };

  //https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151
  //https://pokeapi.co/api/v2/pokemon/1/

  componentDidMount() {
    //pokemon-species fetch
    this.setState({ id: this.props.id });
    this.fetchData(this.props.id);
  }

  getPreviousPokemon(currentId) {
    if (currentId <= 1) {
      return null;
    } else {
      const prevId = currentId - 1;
      this.fetchData(prevId);
      this.setState({ id: prevId });
    }
  }

  getNextPokemon(currentId) {
    if (currentId >= 151) {
      return null;
    } else {
      const nextId = currentId + 1;
      this.fetchData(nextId);
      this.setState({ id: nextId });
    }
  }

  fetchData(id) {
    //if random, choose random ID, else use prop ID passed in
    // let newId;
    // random ? (newId = this.randomBetweenTwo(1, 151)) : (newId = id);

    //pokemon-species fetch
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemon: data });
      })
      .catch(error => console.log(error));
    //image fetch
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemonData: data, pokemonImage: data.sprites });
      })
      .catch(error => console.log(error));
  }

  // changePokemonButton = () => {
  //   this.fetchData(true);
  // };

  randomBetweenTwo = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  getPokemonData = () => {
    let pokemonTypes = this.state.pokemonData.types.map(type => {
      return type.type.name;
    });

    let pokemonAbilities = this.state.pokemonData.abilities.map(ability => {
      return ability.ability.name;
    });

    return (
      <section className={styles.pokeData}>
        <div>
          <img src={this.state.pokemonImage.front_default} alt="a pokemon" />
        </div>
        <div>
          <div>
            <h3>Types</h3>
            <p>{this.capitalize(pokemonTypes[0])}</p>
            {pokemonTypes[1] ? <p>{this.capitalize(pokemonTypes[1])}</p> : null}
          </div>
          <div>
            <h3>Abilities</h3>
            <p>{this.capitalize(pokemonAbilities[0])}</p>
            {pokemonAbilities[1] ? (
              <p>{this.capitalize(pokemonAbilities[1])}</p>
            ) : null}
          </div>
        </div>
        <div>
          <div>
            <h3>Height</h3>
            <p>{this.state.pokemonData.height}</p>
          </div>
          <div>
            <h3>Weight</h3>
            <p>{this.state.pokemonData.weight}</p>
          </div>
        </div>
      </section>
    );
  };

  getPokemonDescription = () => {
    return (
      <section className={styles.pokeDescription}>
        <h3>Description</h3>
        <p>
          {
            this.state.pokemon.flavor_text_entries[
              this.state.pokemon.flavor_text_entries.length - 1
            ].flavor_text
          }
        </p>
      </section>
    );
  };

  render() {
    return (
      <main className={styles.main}>
        <header>
          <button onClick={() => this.getPreviousPokemon(this.state.id)}>
            Previous
          </button>
          <h2>{this.state.pokemon.name}</h2>
          <h2>#{this.state.pokemon.id}</h2>
          <button onClick={() => this.getNextPokemon(this.state.id)}>
            Next
          </button>
          {/* TODO: loading image until state is defined */}
        </header>

        <section className={styles.info}>
          {this.state.pokemonData ? (
            this.getPokemonData()
          ) : (
            <div>Loading PokeData</div>
          )}

          {this.state.pokemon ? (
            this.getPokemonDescription()
          ) : (
            <section>Loading Description</section>
          )}
        </section>

        {/* <button onClick={this.changePokemonButton}>New Pokemon</button> */}
      </main>
    );
  }
}

export default PokedexEntry;
