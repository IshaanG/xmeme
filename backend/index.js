const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)
// TODO: documentation & comments
// TODO: swagger on http://localhost:8080/swagger-ui/
// TODO: support both HTTP & HTTPS
server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})