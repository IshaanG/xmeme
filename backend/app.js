const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const memesRouter = require('./controllers/memes')
const middleware = require('./utils/middleware')
const morgan = require('morgan')

app.use(cors())
app.use(express.json())
app.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' }))
app.use('/memes', memesRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app