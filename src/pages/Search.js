import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artist: '',
    albums: [],
    isLoading: false,
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

  handleClick = async () => {
    const { artist, albums, isLoading } = this.state;

    this.setState({ albums: [], isLoading: true });

    const returnedAlbums = await searchAlbumsAPI(artist);

    this.setState({ albums: returnedAlbums });
    this.setState({ artist: '', isLoading: false });
  };

  renderAlbums() {
    const { albums } = this.state;
    if (albums.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }

    return albums.map((artistAlbum) => (<li key={ artistAlbum.collectionId }>
      <p>{artistAlbum.collectionName}</p>
      <Link
        to={ `/album/${artistAlbum.collectionId}` }
        data-testid={ `link-to-album-${artistAlbum.collectionId}` }
      />
      <img src={ artistAlbum.artworkUrl100 } alt={ artistAlbum.collectionName } />
    </li>));
  }

  render() {
    const { artist, isLoading, albums } = this.state;
    return (

      <div data-testid="page-search">
        <Header />

        {isLoading ? (<p>Carregando...</p>) : (
          <>
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
                onClick={ this.handleClick }
                disabled={ !this.buttonDisabled() }
              >
                Pesquisar
              </button>
            </div>

          </>

        )}

        <div id="albumCard">
          <ul>{this.renderAlbums()}</ul>
        </div>

      </div>

    );
  }
}

export default Search;
