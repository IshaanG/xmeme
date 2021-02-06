const memesRouter = require('express').Router()
const Meme = require('../models/meme')
const logger = require('../utils/logger')

memesRouter.post('/', async (request, response) => {

    const body = request.body

    const meme = new Meme({
        name: body.name,
        url: body.url,
        caption: body.caption,
        created: new Date(),
        updated: new Date()
    })

    const savedMeme = await meme.save()

    logger.info(savedMeme)
    const { id } = savedMeme.toJSON()
    response.json({ id })
})

memesRouter.get('/', async (request, response) => {
    const memes = await Meme.find({})

    response.json(memes.map(meme => {
        const { id, name, url, caption } = meme.toJSON()
        return { id, name, url, caption }
    }))
})

memesRouter.get('/:id', async (request, response) => {
    const meme = await Meme.findById(request.params.id)

    if (meme) {
        const { id, name, url, caption } = meme
        response.json({ id, name, url, caption })
    } else {
        response.status(404).end()
    }
})

// TODO: patch route
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

module.exports = memesRouter