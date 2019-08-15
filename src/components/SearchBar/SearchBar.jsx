import React, { Component } from "react";
import styles from "./SearchBar.module.scss";

class SearchBar extends Component {
  state = {};
  render() {
    return (
      <input
        className={styles.searchBar}
        onChange={this.props.setSearchText}
        placeholder="Search Pokemon..."
        value={this.props.searchText}
        type="text"
      />
    );
  }
}

export default SearchBar;
