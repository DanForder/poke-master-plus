import React, { Component } from "react";
// import styles from "./PokedexEntry.module.scss";

class PokedexEntry extends Component {
  state = { pokemon: "", pokemonImage: "" };

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
        this.setState({ pokemonImage: data.sprites });
      })
      .catch(error => console.log(error));
  }

  changePokemonButton = () => {
    this.fetchData(true);
  };

  randomBetweenTwo = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  componentDidMount() {
    //pokemon-species fetch
    this.fetchData(false);
  }

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
          {/* <p>{console.log(this.state.pokemon.flavor_text_entries)}</p> */}
        </section>
        <button onClick={this.changePokemonButton}>New Pokemon</button>
      </main>
    );
  }
}

export default PokedexEntry;
