import React from 'react';
import PropTypes from 'prop-types';
import { Img } from 'react-image';

const Card = (props) => {
  const {
    name,
    caption,
    url,
    // eslint-disable-next-line no-unused-vars
    handleEditClick,
  } = props;
  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <Img src={[url, `${process.env.PUBLIC_URL}/placeholder-placeholder-everywhere.jpg`]} alt={caption} loading="lazy" crossorigin="anonymous" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{caption}</p>
              <p className="subtitle is-6">{name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};

export default Card;
