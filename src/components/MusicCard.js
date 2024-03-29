import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isFavorite: false,
    isLoading: false,
  };

  componentDidMount() {
    this.isFav();
  }

  isFav = async () => {
    const { trackId } = this.props;
    const songsFavorites = await getFavoriteSongs();
    const favorited = songsFavorites
      .some((favorite) => favorite.trackId === trackId);

    this.setState({ isFavorite: favorited });
  };

  handleCheck = async ({ target: { checked } }) => {
    const { trackId, previewUrl, trackName } = this.props;
    this.setState({ isLoading: true });

    if (checked) {
      await addSong({ trackId, previewUrl, trackName });
    } else {
      await removeSong({ trackId, previewUrl, trackName });
    }
    this.setState({ isFavorite: checked, isLoading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isFavorite, isLoading } = this.state;
    return (
      <>
        <p>{trackName}</p>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>

        {isLoading ? <p>Carregando...</p> : (
          <label>
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id={ trackId }
              name="isFavorite"
              checked={ isFavorite }
              onChange={ this.handleCheck }
            />
          </label>) }
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
