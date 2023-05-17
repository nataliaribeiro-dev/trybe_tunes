import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    currentArtist: '',
    albums: [],
    artistName: '',
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
    const { currentArtist } = this.state;

    const characters = 2;
    const textInput = currentArtist.length >= characters;
    return textInput;
  };

  handleClick = async () => {
    const { currentArtist } = this.state;

    this.setState({ albums: [], isLoading: true });

    const returnedAlbums = await searchAlbumsAPI(currentArtist);

    this.setState({ albums: returnedAlbums,
      currentArtist: '',
      isLoading: false,
      artistName: currentArtist });
  };

  renderAlbums() {
    const { albums } = this.state;

    return albums.map((artistAlbum) => (
      <li key={ artistAlbum.collectionId }>

        <p>{artistAlbum.collectionName}</p>

        <Link
          to={ `/album/${artistAlbum.collectionId}` }
          data-testid={ `link-to-album-${artistAlbum.collectionId}` }
        >
          Ouça!

        </Link>

        <img src={ artistAlbum.artworkUrl100 } alt={ artistAlbum.collectionName } />

        <p>{artistAlbum.artistName}</p>

      </li>));
  }

  render() {
    const { currentArtist, isLoading, albums, artistName } = this.state;
    return (

      <div data-testid="page-search">
        <Header />

        {isLoading ? (<p>Carregando...</p>) : (
          <>

            <input
              type="text"
              data-testid="search-artist-input"
              name="currentArtist"
              value={ currentArtist }
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

        { albums.length > 0 && (
          <div id="albumCard">
            <p>
              {`Resultado de álbuns de: ${artistName}`}
            </p>
            <ul>{this.renderAlbums()}</ul>
          </div>)}

        { albums.length === 0 && <p>Nenhum álbum foi encontrado</p> }

      </div>

    );
  }
}

export default Search;
