import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

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
    return (
      <div data-testid="page-album">
        <Header />

        {data
          .map((music) => (
            <audio
              data-testid="audio-component"
              src={ music.previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
          ))}

        <p>{data.collectionName}</p>
      </div>

    );
  }
}

export default Album;
