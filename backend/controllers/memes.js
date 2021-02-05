const memesRouter = require('express').Router()
const Meme = require('../models/meme')

memesRouter.post('/', (request, response, next) => {

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

memesRouter.get('/', (request, response, next) => {
    Meme.find({})
        .then(memes => {
            response.json(memes.map(meme => {
                const { id, name, url, caption } = meme.toJSON()
                return { id, name, url, caption }
            }))
        })
        .catch(error => next(error))
})

memesRouter.get('/:id', (request, response, next) => {
    Meme.findById(request.params.id)
        .then(meme => {
            if (meme) {
                const { id, name, url, caption } = meme
                response.json({ id, name, url, caption })
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

module.exports = memesRouter