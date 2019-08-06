import React, { Component } from "react";
import styles from "./PokedexEntry.module.scss";

class PokedexEntry extends Component {
  state = { pokemon: "", pokemonImage: "" };

  //https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151
  //https://pokeapi.co/api/v2/pokemon/1/

  componentDidMount() {
    //pokemon-species fetch
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.props.id}/`)
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemon: data });
      })
      .catch(error => console.log(error));
    //image fetch
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.id}/`)
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemonImage: data.sprites });
      })
      .catch(error => console.log(error));
  }

  changePokemonButton = () => {
    const randomNumber = this.randomBetweenTwo(1, 151);
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomNumber}/`)
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemon: data });
      })
      .catch(error => console.log(error));
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}/`)
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemonImage: data.sprites });
      })
      .catch(error => console.log(error));
  };

  randomBetweenTwo = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  render() {
    return (
      <main>
        <header>
          <h2>{this.state.pokemon.name}</h2>
          <h3>#{this.state.pokemon.id}</h3>
        </header>
        <section>
          <img src={this.state.pokemonImage.front_default} alt="a pokemon" />
          <div>
            {/* <span>{console.log(this.state.pokemon.types)}</span> */}
            {/* <div>
              <p>Cry</p>
              <p>Footprint</p>
            </div> */}
          </div>
        </section>
        <section>
          {/* <h3>Description</h3> */}
          <p>{console.log(this.state.pokemon.flavor_text_entries)}</p>
        </section>
        <button onClick={this.changePokemonButton}>New Pokemon</button>
      </main>
    );
  }
}

export default PokedexEntry;
