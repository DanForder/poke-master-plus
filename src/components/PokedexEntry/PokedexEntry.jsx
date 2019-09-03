import React, { Component } from "react";
import styles from "./PokedexEntry.module.scss";
import { Link } from "@reach/router";

class PokedexEntry extends Component {
  state = {
    pokemon: "",
    pokemonData: "",
    pokemonImages: "",
    pokemonImage: "",
    id: 0
  };

  componentDidMount() {
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

  getNextPokemon = currentId => {
    if (Number(currentId) >= 151) {
      return null;
    } else {
      const nextId = Number(currentId) + 1;
      this.fetchData(nextId);
      this.setState({ id: nextId });
    }
  };

  fetchData(id) {
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
        this.setState({
          pokemonData: data,
          pokemonImages: data.sprites,
          pokemonImage: data.sprites.front_default
        });
      })
      .catch(error => console.log(error));
  }

  randomBetweenTwo = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  toggleShinyImage = () => {
    this.state.pokemonImage === this.state.pokemonImages.front_default
      ? this.setState({ pokemonImage: this.state.pokemonImages.front_shiny })
      : this.setState({ pokemonImage: this.state.pokemonImages.front_default });
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
        <div onClick={this.toggleShinyImage}>
          <img
            src={this.state.pokemonImage}
            alt={`${this.state.pokemon.name}`}
          />
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
            <p>
              {this.state.pokemonData.height >= 10
                ? `${Math.round(this.state.pokemonData.height * 0.1 * 10) /
                    10}m`
                : `${this.state.pokemonData.height * 10}cm`}
            </p>
          </div>
          <div>
            <h3>Weight</h3>
            <p>
              {this.state.pokemonData.weight >= 10
                ? `${Math.round(this.state.pokemonData.weight * 0.1 * 10) /
                    10}kg`
                : `${this.state.pokemonData.weight * 10}g`}
            </p>
          </div>
        </div>
      </section>
    );
  };

  getPokemonDescription = () => {
    const englishDescriptions = this.state.pokemon.flavor_text_entries.filter(
      entry => {
        return entry.language.name === "en";
      }
    );
    return (
      <section className={styles.pokeDescription}>
        <h3>Description</h3>
        <p>{englishDescriptions[englishDescriptions.length - 1].flavor_text}</p>
      </section>
    );
  };

  render() {
    return (
      <main className={styles.main}>
        <section className={styles.headerContainer}>
          <header>
            <Link
              to={`../${
                this.state.pokemon.id - 1 < 1 ? 1 : this.state.pokemon.id - 1
              }`}
            >
              <button onClick={() => this.getPreviousPokemon(this.state.id)}>
                Previous
              </button>
            </Link>
            {this.state.pokemon ? (
              <div>
                <h2>
                  {this.capitalize(this.state.pokemon.name)} #
                  {this.state.pokemon.id}
                </h2>
              </div>
            ) : (
              <h2>Loading...</h2>
            )}
            {/* <h2>#{this.state.pokemon.id}</h2> */}
            <Link
              to={`../${
                this.state.pokemon.id + 1 > 151
                  ? 151
                  : this.state.pokemon.id + 1
              }`}
            >
              <button onClick={() => this.getNextPokemon(this.state.id)}>
                Next
              </button>
            </Link>
            {/* TODO: loading image until state is defined */}
          </header>
        </section>

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
