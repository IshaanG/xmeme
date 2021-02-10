const swaggerRouter = require('express').Router();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const config = require('../utils/config');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'XMeme API',
      description: 'XMeme API Information | Crio Winter of Doing Stage 2B',
      contact: {
        name: 'Ishaan Gupta',
        url: 'https://ishaan.ninja',
        email: 'ishaang12@gmail.com',
      },
    },
    servers: [
      { url: 'https://api.xmeme.ishaan.ninja', description: 'Production server' },
      { url: `http://localhost:${config.PORT}`, description: 'Development server' },
    ],
  },
  apis: ['./controllers/memes.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
swaggerRouter.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = swaggerRouter;
