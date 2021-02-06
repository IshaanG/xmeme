const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const memesRouter = require('./controllers/memes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const morgan = require('morgan')
const mongoose = require('mongoose')



logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })


app.use(cors())


app.use(express.json())
app.use(morgan('dev'))
app.use('/memes', memesRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

// app.put('/api/notes/:id', (request, response, next) => {
//     const body = request.body

//     const note = {
//       content: body.content,
//       important: body.important,
//     }

//     Note.findByIdAndUpdate(request.params.id, note, { new: true })
//       .then(updatedNote => {
//         response.json(updatedNote)
//       })
//       .catch(error => next(error))
//   })
