const express = require('express');
require('express-async-errors');

const app = express();
const swaggerApp = express();
const cors = require('cors');
const morgan = require('morgan');
const memesRouter = require('./controllers/memes');
const middleware = require('./utils/middleware');
const swaggerRouter = require('./controllers/swagger-ui');

app.use(cors());
app.use(express.json());
app.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' }));
app.use('/memes', memesRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

swaggerApp.use('/swagger-ui', swaggerRouter);

module.exports = { app, swaggerApp };
