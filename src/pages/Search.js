import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artist: '',
    // isLoading: false,
  };

  handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    const values = type === 'checkbox' ? checked : value; // se o type do for name, por exemplo o estado vai ser populado com o valor digitado.
    this.setState({
      [name]: values,
    });
  };

  buttonDisabled = () => {
    const { artist } = this.state;

    const characters = 2;
    const artistInput = artist.length >= characters;
    return artistInput;
  };

  render() {
    const { artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />

        <input
          type="text"
          data-testid="search-artist-input"
          name="artist"
          value={ artist }
          onChange={ this.handleChange }
          placeholder="Nome do Artista"
        />
        <div>
          <button
            data-testid="search-artist-button"
            // onClick={ this.handleClick }
            disabled={ !this.buttonDisabled() }
          >
            Pesquisar

          </button>
        </div>
      </div>

    );
  }
}

export default Search;
