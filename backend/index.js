const http = require('http');
const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);
// TODO: documentation & comments
// TODO: Dockerize
// TODO: swagger on http://localhost:8080/swagger-ui/
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
