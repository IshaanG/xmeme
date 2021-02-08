/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import Card from './Card';

const Deck = ({ memesToShow, handleEditClick }) => (
  <div className="columns is-multiline">
    {memesToShow.map((meme) => (
      <VisibilitySensor key={meme.id}>
        <Card
          name={meme.name}
          caption={meme.caption}
          url={meme.url}
          handleEditClick={handleEditClick}
        />
      </VisibilitySensor>
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
