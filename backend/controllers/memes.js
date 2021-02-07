const memesRouter = require('express').Router();
const db = require('../db');

memesRouter.post('/', async (request, response) => {
  const { body } = request;

  const check = await db.query('SELECT id FROM memes WHERE name = $1 AND url = $2 AND caption = $3',
    [body.name, body.url, body.caption]);
  if (check.rows.length === 0) {
    const result = await db.query(
      `INSERT INTO memes (name, url, caption, created, updated) 
            VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [body.name, body.url, body.caption, new Date(), new Date()],
    );
    response.status(201).json(result.rows[0]);
  } else {
    response.status(409).send({ error: 'duplicate post' });
  }
});

memesRouter.get('/', async (request, response) => {
  const result = await db.query('SELECT id, name, url, caption FROM memes ORDER BY created DESC LIMIT 100');
  response.json(result.rows);
});

memesRouter.get('/:id', async (request, response) => {
  const { params } = request;

  const result = await db.query('SELECT id, name, url, caption FROM memes WHERE id = $1',
    [params.id]);
  if (result.rows[0]) {
    response.json(result.rows[0]);
  } else {
    response.status(404).send({ error: 'id not found' });
  }
});

memesRouter.patch('/:id', async (request, response) => {
  const { body } = request;
  const { params } = request;

  let result;
  if (body.url) {
    result = await db.query('UPDATE memes SET url = $1, updated = $2 WHERE id = $3',
      [body.url, new Date(), params.id]);
  }
  if (body.caption) {
    result = await db.query('UPDATE memes SET caption = $1, updated = $2 WHERE id = $3',
      [body.caption, new Date(), params.id]);
  }
  if (!result || result.rowCount) {
    response.status(204).end();
  } else {
    response.status(404).send({ error: 'id not found' });
  }
});

module.exports = memesRouter;
