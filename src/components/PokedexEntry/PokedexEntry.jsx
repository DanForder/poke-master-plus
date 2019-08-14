import React, { Component } from "react";
import styles from "./PokedexEntry.module.scss";

class PokedexEntry extends Component {
  state = { pokemon: "", pokemonData: "", pokemonImage: "" };

  //https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151
  //https://pokeapi.co/api/v2/pokemon/1/

  fetchData(random) {
    //if random, choose random ID, else use prop ID passed in
    let newId;
    random ? (newId = this.randomBetweenTwo(1, 151)) : (newId = this.props.id);

    //pokemon-species fetch
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${newId}/`)
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemon: data });
      })
      .catch(error => console.log(error));
    //image fetch
    fetch(`https://pokeapi.co/api/v2/pokemon/${newId}/`)
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

  componentDidMount() {
    //pokemon-species fetch
    this.fetchData(this.props.id === "random");
  }

  render() {
    return (
      <main>
        <header>
          <h2>{this.state.pokemon.name}</h2>
          <h3>#{this.state.pokemon.id}</h3>
          {/* TODO: loading image until state is defined */}
        </header>

        <main className={styles.main}>
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
        </main>

        {/* <button onClick={this.changePokemonButton}>New Pokemon</button> */}
      </main>
    );
  }
}

export default PokedexEntry;
