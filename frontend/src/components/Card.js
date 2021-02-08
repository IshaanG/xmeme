import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  const {
    name,
    caption,
    url,
    handleEditClick,
  } = props;
  console.log('card begins', name, caption, url, handleEditClick, 'card ends');
  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={url} alt={caption} />
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
  name: PropTypes.string,
  caption: PropTypes.string,
  url: PropTypes.string,
  handleEditClick: PropTypes.func.isRequired,
};
Card.defaultProps = {
  name: '',
  caption: '',
  url: '',
};
export default Card;
