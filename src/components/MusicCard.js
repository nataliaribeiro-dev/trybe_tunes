import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  // state = {
  //   isChecked: false,
  // };

  // handleCheck = ({target: {checked}}) => {
  //   if(checked) {

  //   } else {

  //   }
  //   this.setState({isChecked: checked})
  // }

  render() {
    const { trackName, previewUrl } = this.props;
    // const { isChecked } = this.state;
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

        {/* <input
          type="checkbox"
          name="favorite"
          checked={ isChecked }
          onChange={ this.handleCheck }
        /> */}
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
