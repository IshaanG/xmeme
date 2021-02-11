/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Img } from 'react-image';
import isImageUrl from 'is-image-url';

const Card = (props) => {
  const {
    name,
    caption,
    url,
    handleEditClick,
    id,
  } = props;
  const [newUrl, setNewUrl] = useState(url);
  const [newCaption, setNewCaption] = useState(caption);
  const [editing, setEditing] = useState(false);
  const [validUrl, setValidUrl] = useState(true);

  return (
    editing
      ? (
        <div className="column is-one-third">
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <Img
                  src={[url, `${process.env.PUBLIC_URL}/placeholder-placeholder-everywhere.jpg`]}
                  alt={caption}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="field">
                <div className="control">
                  <label className="label is-small" htmlFor="newCaption">
                    New Caption
                    <input
                      className="input is-small"
                      type="text"
                      placeholder="Be creative with the caption"
                      id="newCaption"
                      value={newCaption}
                      onChange={(event) => { setNewCaption(event.target.value); }}
                    />
                  </label>

                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label is-small" htmlFor="newUrl">
                    New URL
                    <input
                      className="input is-small"
                      type="text"
                      placeholder="Enter URL of your meme here"
                      id="newUrl"
                      value={newUrl}
                      onChange={(event) => {
                        setNewUrl(event.target.value);
                        setValidUrl(true);
                      }}

                    />
                  </label>

                </div>
              </div>
              <p
                className="help is-danger"
                style={{
                  visibility: validUrl ? 'hidden' : 'visible',
                }}
              >
                This URL is invalid
              </p>

            </div>
            <footer className="card-footer">
              <button
                type="button"
                className="button card-footer-item"
                onClick={() => {
                  if (!validUrl) return;
                  if (!isImageUrl(newUrl)) { setValidUrl(false); return; }
                  handleEditClick(id, newUrl, newCaption);
                  setEditing(false);
                }}
              >
                Save
              </button>
            </footer>
          </div>
        </div>
      )
      : (
        <div className="column is-one-third">
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <Img
                  src={[url, `${process.env.PUBLIC_URL}/placeholder-placeholder-everywhere.jpg`]}
                  alt={caption}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="card-content">
              <p className="title is-4">{caption}</p>
              <p className="subtitle is-6">{name}</p>
            </div>
            <footer className="card-footer">
              <button type="button" className="button card-footer-item" onClick={() => { setEditing(true); }}>Edit</button>
            </footer>
          </div>
        </div>
      )
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Card;
