const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Meme = require('../models/meme')

const initialMemes = [
    {
        'name': 'MS Dhoni',
        'url': 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg',
        'caption': 'Meme for my place',
        'created': new Date(),
        'updated': new Date()
    },
    {
        'name': 'Viral Kohli',
        'url': 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg',
        'caption': 'Another home meme',
        'created': new Date(),
        'updated': new Date()
    }
]


beforeEach(async () => {
    await Meme.deleteMany({})
    let memeObject = new Meme(initialMemes[0])
    await memeObject.save()
    memeObject = new Meme(initialMemes[1])
    await memeObject.save()
})
test('memes are returned as json', async () => {
    await api
        .get('/memes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all memes are returned', async () => {
    const response = await api.get('/memes')

    expect(response.body).toHaveLength(initialMemes.length)
})

test('a specific meme is within the returned memes', async () => {
    const response = await api.get('/memes')

    const contents = response.body.map(r => r.name)
    expect(contents).toContain(
        'Viral Kohli'
    )
})

test('a valid meme can be added', async () => {
    const newMeme = {
        'name': 'MS Dhoni',
        'url': 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg',
        'caption': 'Meme for my place',
    }
    await api
        .post('/memes')
        .query(newMeme)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/memes')

    const contents = response.body.map(r => r.name)

    expect(response.body).toHaveLength(initialMemes.length + 1)
    expect(contents).toContain(
        'MS Dhoni'
    )
})

afterAll(() => {
    mongoose.connection.close()
})