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
        <div className="control">
          <label className="label" htmlFor="name">
            Meme Owner
            <input
              className="input"
              type="text"
              placeholder="Enter your full name"
              value={handleNewName}
              onChange={handleNameChange}
              id="name"
            />
          </label>

        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label" htmlFor="caption">
            Caption
            <input
              className="input"
              type="text"
              placeholder="Be creative with the caption"
              value={handleNewCaption}
              onChange={handleCaptionChange}
              id="caption"
            />
          </label>

        </div>
      </div>

      <div className="field has-addons ">
        <div className="control is-expanded">
          <label className="label" htmlFor="url">
            Meme URL
            <input
              className="input is-expanded"
              type="text"
              placeholder="Enter URL of your meme here"
              value={handleNewUrl}
              onChange={handleUrlChange}
              id="url"
            />
          </label>

        </div>
        <div className="control">
          <p>&nbsp;</p>
          <button
            className="button is-primary"
            type="submit"
          >
            Submit Meme
          </button>
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
