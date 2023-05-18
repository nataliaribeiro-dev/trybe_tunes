import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    data: [],

  };

  componentDidMount() {
    this.getMusicsAlbum();
  }

  getMusicsAlbum = async () => {
    const { match: { params } } = this.props;
    const data = await getMusics(params.id);
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    const { collectionName, artistName, artworkUrl100 } = data[0] || {}; // para garantir de que a desestruturação só será feita após getMusicsAlbum tiver sido resolvida

    return (

      <div data-testid="page-album  ">
        <Header />

        <h2 data-testid="album-name">{collectionName}</h2>
        <p data-testid="artist-name">{artistName}</p>
        <img src={ artworkUrl100 } alt={ collectionName } />

        {data.slice(1)
          .map((music, index) => (
            <MusicCard
              key={ index }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          ))}
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
