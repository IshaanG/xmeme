const logger = require('./logger');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  logger.error(error);

  if (error.code === '23502') {
    return response.status(400).json({ error: 'misssing field(s)' });
  } if (error.code === '22P02') {
    return response.status(400).json({ error: 'invalid field(s)' });
  } if (error.name === 'SyntaxError') {
    return response.status(400).json({ error: 'invalid JSON' });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
