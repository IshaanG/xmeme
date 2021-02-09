/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const Form = (props) => {
  const {
    handleOnSubmit,
    handleNewName,
    handleNameChange,
    handleNewCaption,
    handleCaptionChange,
    handleNewUrl,
    handleUrlChange,
    validUrl,
  } = props;
  return (
    <form onSubmit={handleOnSubmit}>

      <div className="field">
        <label className="label">Meme Owner</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Enter your full name"
            value={handleNewName}
            onChange={handleNameChange}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Caption</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Be creative with the caption"
            value={handleNewCaption}
            onChange={handleCaptionChange}
          />
        </div>
      </div>
      <label className="label">Meme URL</label>

      <div className="field has-addons ">
        <div className="control is-expanded">
          <input
            className="input is-expanded"
            type="text"
            placeholder="Enter URL of your meme here"
            value={handleNewUrl}
            onChange={handleUrlChange}
          />
        </div>
        <div className="control">
          <button className="button is-link" type="submit">Submit Meme</button>
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

    </form>

  );
};

Form.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  handleNewName: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleNewCaption: PropTypes.string.isRequired,
  handleCaptionChange: PropTypes.func.isRequired,
  handleNewUrl: PropTypes.string.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  validUrl: PropTypes.bool.isRequired,
};

export default Form;
