const http = require('http');
const { app, swaggerApp } = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

const swaggerServer = http.createServer(swaggerApp);
swaggerServer.listen(config.SWAGGER_PORT, () => {
  logger.info(`Swagger-ui running on port ${config.SWAGGER_PORT}`);
});
