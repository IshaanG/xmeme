require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Meme = require('./models/meme')

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.post('/memes', (request, response,next) => {

    const query = request.query

    const meme = new Meme({
        name: query.name,
        url: query.url,
        caption: query.caption,
        date: new Date()
    })
    meme.save()
        .then(savedMeme => {
            console.log(savedMeme)
            const { id } = savedMeme.toJSON()
            response.json({ id })
        })
        .catch(error => next(error))
})

app.get('/memes', (request, response) => {
    Meme.find({}).then(memes => {
        response.json(memes.map(meme => {
            const { id, name, url, caption } = meme.toJSON()
            return { id, name, url, caption }
        }))
    })
})

app.get('/memes/:id', (request, response,next) => {
    Meme.findById(request.params.id).then(meme => {
        if (meme) {
            const { id, name, url, caption } = meme
            response.json({ id, name, url, caption })
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})


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
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})