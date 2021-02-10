import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const Deck = ({ memesToShow, handleEditClick }) => (
  <div className="columns is-multiline">
    {memesToShow.map((meme) => (
      <Card
        name={meme.name}
        caption={meme.caption}
        url={meme.url}
        handleEditClick={handleEditClick}
        key={meme.id}
      />
    ))}
  </div>

);
Deck.propTypes = {
  memesToShow: PropTypes.arrayOf(Object),
  handleEditClick: PropTypes.func.isRequired,
};
Deck.defaultProps = {
  memesToShow: [],
};

export default Deck;
