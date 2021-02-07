const memesRouter = require('express').Router()
const db = require('../db')

memesRouter.post('/', async (request, response) => {
    const body = request.body

    const check = await db.query('SELECT * FROM memes WHERE name = $1 AND url = $2 AND caption = $3',
        [body.name, body.url, body.caption])
    if (check.rows.length === 0) {
        const result = await db.query(
            `INSERT INTO memes (name, url, caption, created, updated) 
            VALUES ($1, $2, $3, $4, $5) RETURNING id`,
            [body.name, body.url, body.caption, new Date(), new Date()])
        response.status(201).json(result.rows[0])
    } else {
        response.status(409).send({ error: 'duplicate post' })
    }
})

memesRouter.get('/', async (request, response) => {
    const result = await db.query('SELECT * FROM memes ORDER BY created DESC LIMIT 100')
    response.json(result.rows.map(meme =>
        ({ id: meme.id, name: meme.name, url: meme.url, caption: meme.caption })))
})

memesRouter.get('/:id', async (request, response) => {
    const params = request.params

    const result = await db.query('SELECT id, name, url, caption FROM memes WHERE id = $1',
        [params.id])
    if (result.rows[0]) {
        response.json(result.rows[0])
    } else {
        response.status(404).send({ error: 'id not found' })
    }
})

memesRouter.patch('/:id', async (request, response) => {
    const body = request.body
    const params = request.params

    let result
    if (body.url) {
        result = await db.query('UPDATE memes SET url = $1 WHERE id = $2',
            [body.url, params.id])
    }
    if (body.caption) {
        result = await db.query('UPDATE memes SET caption = $1 WHERE id = $2',
            [body.caption, params.id])
    }
    if (!result || result.rowCount) {
        response.status(204).end()
    } else {
        response.status(404).send({ error: 'id not found' })
    }
})
// TODO: More error codes for incorrect requests
module.exports = memesRouter