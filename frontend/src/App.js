import React, { useState, useEffect } from 'react';
import memeService from './services/memes';
import Form from './components/Form';
import Deck from './components/Deck';
import Notification from './components/Notification';
import './App.scss';

const App = () => {
  const [memes, setMemes] = useState([]);
  const [newName, setNewName] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleCaptionChange = (event) => {
    setNewCaption(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addMeme = (event) => {
    event.preventDefault();
    const memeObject = {
      name: newName,
      caption: newCaption,
      url: newUrl,
    };
    memeService.create(memeObject)
      .then(() => {
        setSuccessMessage(`Added ${newName} - ${newCaption}`);
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
      })
      .catch((e) => {
        setErrorMessage(e.response.data.error);
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      });
    setNewName('');
    setNewUrl('');
    setNewCaption('');
  };

  useEffect(() => {
    if (successMessage === '' && memes.length) return;
    memeService
      .getAll()
      .then((receivedMemes) => {
        setMemes(receivedMemes);
      })
      .catch(() => {
        setErrorMessage('Could not fetch memes data');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      });
  }, [successMessage]);

  // TODO
  const editMeme = (event) => {
    console.log(event);
  };

  return (
    <div>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />

      <section className="section">
        <div className="container">
          <h1 className="title has-text-weight-bold has-text-centered">Meme Stream</h1>
        </div>

        <div className="container">
          <Form
            handleOnSubmit={addMeme}
            handleNewName={newName}
            handleNameChange={handleNameChange}
            handleNewCaption={newCaption}
            handleCaptionChange={handleCaptionChange}
            handleNewUrl={newUrl}
            handleUrlChange={handleUrlChange}
          />
        </div>
      </section>
      <section className="section">
        <div className="">
          <Deck memesToShow={memes} handleEditClick={editMeme} />
        </div>
      </section>
      <footer className="footer">
        <div className="container content has-text-centered">
          <p>
            <strong>XMeme</strong>
            {' '}
            by
            {' '}
            <a href="https://ishaan.ninja">Ishaan Gupta</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;