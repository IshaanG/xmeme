const logger = require('./logger')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error)

    if (error.code === '23502') {
        return response.status(400).json({ error: 'misssing field(s)' })
    } else if (error.code === '22P02') {
        return response.status(400).json({ error: 'invalid field(s)' })
    } else if (error.name === 'SyntaxError') {
        return response.status(400).json({ error: 'invalid JSON' })
    }

    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler
}