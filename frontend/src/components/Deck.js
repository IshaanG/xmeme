/* eslint-disable jsx-a11y/label-has-associated-control */
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
      />
    ))}
    {/* <div className="column is-one-third">
        First column
        <Card />
      </div>
      <div className="column is-one-third">
        Second column
        <Card />
      </div>
      <div className="column is-one-third">
        Third column
        <Card />
      </div>
      <div className="column is-one-third">
        Fourth column
        <Card />
      </div> */}
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
