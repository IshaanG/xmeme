const memesRouter = require('express').Router()
const Meme = require('../models/meme')

memesRouter.post('/', async (request, response) => {

    const query = request.query

    const meme = new Meme({
        name: query.name,
        url: query.url,
        caption: query.caption,
        created: new Date(),
        updated: new Date()
    })

    const savedMeme = await meme.save()

    console.log(savedMeme)
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

module.exports = memesRouter