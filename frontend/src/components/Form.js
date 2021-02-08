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
  } = props;
  return (
  // <div>
  //   <div className="field">
  //     <label className="label" htmlFor="name">Name</label>
  //     <div className="control">
  //       <input className="input" type="text" placeholder="Text input" id="name" />
  //     </div>
  //   </div>
  //   <div className="field has-addons">
  //     <div className="control">
  //       <input className="input" type="text" placeholder="Text input" />
  //     </div>
  //     <div className="control">
  //       <button className="button is-primary" type="button">Submit</button>
  //     </div>
  //   </div>
  // </div>
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
    </form>

  );
};

Form.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  handleNewName: PropTypes.string,
  handleNameChange: PropTypes.func.isRequired,
  handleNewCaption: PropTypes.string,
  handleCaptionChange: PropTypes.func.isRequired,
  handleNewUrl: PropTypes.string,
  handleUrlChange: PropTypes.func.isRequired,
};
Form.defaultProps = {
  handleNewName: '',
  handleNewCaption: '',
  handleNewUrl: '',
};

export default Form;
