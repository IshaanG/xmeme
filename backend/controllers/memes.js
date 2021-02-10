const memesRouter = require('express').Router();
const db = require('../db');

/**
 * @swagger
 *  components:
 *    schemas:
 *      MemeResponse:
 *        type: object
 *        required:
 *          - id
 *          - name
 *          - url
 *          - caption
 *        properties:
 *          id:
 *            type: int
 *          name:
 *            type: string
 *          url:
 *            type: string
 *          caption:
 *            type: string
 *        example:
 *           id: 1
 *           name: Ishaan
 *           url: pics.com/awesome-meme.jpg
 *           caption: Awesome meme wow
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      MemePost:
 *        type: object
 *        required:
 *          - name
 *          - url
 *          - caption
 *        properties:
 *          name:
 *            type: string
 *          url:
 *            type: string
 *          caption:
 *            type: string
 *        example:
 *           name: Ishaan
 *           url: pics.com/awesome-meme.jpg
 *           caption: Awesome meme wow
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      MemePatch:
 *        type: object
 *        properties:
 *          url:
 *            type: string
 *          caption:
 *            type: string
 *        example:
 *           url: pics.com/awesome-meme.jpg
 *           caption: Awesome meme wow
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      IdResponse:
 *        type: object
 *        required:
 *          - id
 *        properties:
 *          id:
 *            type: int
 *        example:
 *           id: 1
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Error:
 *        type: object
 *        required:
 *          - error
 *        properties:
 *          error:
 *            type: string
 *        example:
 *           error: "missing value(s)"
 */

/**
 * @swagger
 * tags:
 *   name: Memes
 *   description: Memes endpoint
 */

/**
 * @swagger
 *  /memes/:
 *    post:
 *      summary: Create a new meme
 *      tags: [Memes]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MemePost'
 *      responses:
 *        "201":
 *          description: A user id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IdResponse'
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        "409":
 *          description: Duplicate post
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
memesRouter.post('/', async (request, response) => {
  const { body } = request;

  if (body.name === '' || body.url === '' || body.caption === '') {
    return response.status(400).send({ error: 'missing value(s)' });
  }

  const check = await db.query('SELECT id FROM memes WHERE name = $1 AND url = $2 AND caption = $3',
    [body.name, body.url, body.caption]);
  if (check.rows.length !== 0) {
    return response.status(409).send({ error: 'duplicate post' });
  }

  const result = await db.query(
    `INSERT INTO memes (name, url, caption, created, updated) 
          VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [body.name, body.url, body.caption, new Date(), new Date()],
  );
  return response.status(201).json(result.rows[0]);
});

/**
 * @swagger
 *  /memes/:
 *    get:
 *      summary: Get latest 100 memes
 *      tags: [Memes]
 *      responses:
 *        "200":
 *          description: An array of meme objects
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: '#/components/schemas/MemeResponse'
 */
memesRouter.get('/', async (request, response) => {
  const result = await db.query('SELECT id, name, url, caption FROM memes ORDER BY created DESC LIMIT 100');
  response.json(result.rows);
});

/**
 * @swagger
 *  /memes/{memeId}:
 *    get:
 *      summary: Get a meme by id
 *      tags: [Memes]
 *      parameters:
 *        - in: path
 *          name: memeId
 *          schema:
 *            type: integer
 *            minimum: 1
 *          required: true
 *          description: Id of the meme
 *      responses:
 *        "200":
 *          description: An meme object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/MemeResponse'
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        "404":
 *          description: Id not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

memesRouter.get('/:id', async (request, response) => {
  const { params } = request;

  const result = await db.query('SELECT id, name, url, caption FROM memes WHERE id = $1',
    [params.id]);
  if (result.rowCount === 0) {
    return response.status(404).send({ error: 'id not found' });
  }
  return response.json(result.rows[0]);
});

/**
 * @swagger
 *  /memes/{memeId}:
 *    patch:
 *      summary: Patch an existing meme
 *      tags: [Memes]
 *      parameters:
 *        - in: path
 *          name: memeId
 *          schema:
 *            type: integer
 *            minimum: 1
 *          required: true
 *          description: Id of the meme
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MemePatch'
 *      responses:
 *        "204":
 *          description: Resource modified successfully
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        "404":
 *          description: Id not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
memesRouter.patch('/:id', async (request, response) => {
  const { body } = request;
  const { params } = request;

  let result;
  if (body.url !== null && body.url !== '') {
    result = await db.query('UPDATE memes SET url = $1, updated = $2 WHERE id = $3',
      [body.url, new Date(), params.id]);
  }
  if (body.caption !== null && body.caption !== '') {
    result = await db.query('UPDATE memes SET caption = $1, updated = $2 WHERE id = $3',
      [body.caption, new Date(), params.id]);
  }
  if (result === null || result.rowCount > 0) {
    response.status(204).end();
  } else {
    response.status(404).send({ error: 'id not found' });
  }
});

module.exports = memesRouter;
