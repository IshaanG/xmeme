const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);
const db = require('../db');

const initialRows = 1500;

beforeEach(async () => {
  await helper.clearDb();
  const queryString = helper.genQueryString(initialRows);
  await db.query(queryString);
});

describe('when there are no memes stored', () => {
  test('empty array is returned', async () => {
    await helper.clearDb();
    const response = await api.get('/memes');
    expect(response.body).toEqual([]);
  });
});
describe('when there are some memes stored initially', () => {
  test('memes are returned as json', async () => {
    await api
      .get('/memes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('min(100,initialRows) memes are returned', async () => {
    const response = await api.get('/memes');

    expect(response.body).toHaveLength(Math.min(100, initialRows));
  });
});

describe('viewing a specific meme', () => {
  test('succeeds with a valid id', async () => {
    const memeToView = Math.min(42, initialRows);

    await api
      .get(`/memes/${memeToView}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('fails with statuscode 404 if meme does not exist', async () => {
    const nonexistingId = Math.max(12343, initialRows + 134);

    await api
      .get(`/memes/${nonexistingId}`)
      .expect(404);
  });

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = 'appYo';

    await api
      .get(`/memes/${invalidId}`)
      .expect(400);
  });
});

describe('addition of a new meme', () => {
  test('succeeds with valid data', async () => {
    const newMeme = {
      name: 'Sachin Tendulkar',
      url: 'https://images.pexels.com/photos/6165877/pexels-photo-6165877.jpeg',
      caption: 'Yeah memes please',
    };
    await api
      .post('/memes')
      .send(newMeme)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const memesAtEnd = await helper.memesInDb();
    expect(memesAtEnd).toHaveLength(initialRows + 1);
    const names = memesAtEnd.map((n) => n.name);
    expect(names).toContain(
      'Sachin Tendulkar',
    );
  });

  test('fails with status code 400 if data invaild', async () => {
    const newMeme = {
      url: 'https://images.pexels.com/photos/3867204/pexels-photo-3867204.jpeg',
      caption: 'You can see me',
    };

    await api
      .post('/memes')
      .send(newMeme)
      .expect(400);

    const memesAtEnd = await helper.memesInDb();

    expect(memesAtEnd).toHaveLength(initialRows);
  });

  test('duplicate posts returns status code 409', async () => {
    const newMeme = {
      name: 'ABD Wow',
      url: 'https://images.pexels.com/photos/6165877/pexels-photo-6165877.jpeg',
      caption: 'No more memes please',
    };
    await api
      .post('/memes')
      .send(newMeme)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/memes')
      .send(newMeme)
      .expect(409);
  });
});

describe('updation of a meme', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const memesAtStart = await helper.memesInDb();
    const memeToEdit = memesAtStart[0];

    const editedMeme = {
      url: 'new url',
      caption: 'new caption',
    };
    await api
      .patch(`/memes/${memeToEdit.id}`)
      .send(editedMeme)
      .expect(204);
    const memeAtEnd = await helper.getMemeWithId(memeToEdit.id);
    const memesAtEnd = await helper.memesInDb();
    expect(memesAtEnd).toHaveLength(initialRows);
    expect(memeAtEnd.url).toEqual(editedMeme.url);
    expect(memeAtEnd.caption).toEqual(editedMeme.caption);
  });
  test('fails with status code 404 if id not valid', async () => {
    const nonexistingId = Math.max(12343, initialRows + 1);
    const editedMeme = {
      url: 'new url',
      caption: 'new caption',
    };

    await api
      .patch(`/memes/${nonexistingId}`)
      .send(editedMeme)
      .expect(404);
  });
});

afterAll(() => {
  helper.clearDb();
  db.end();
});
