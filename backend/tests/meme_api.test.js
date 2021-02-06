const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Meme = require('../models/meme')

beforeEach(async () => {
    await Meme.deleteMany({})
    let memeObject = new Meme(helper.initialMemes[0])
    await memeObject.save()
    memeObject = new Meme(helper.initialMemes[1])
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

    expect(response.body).toHaveLength(helper.initialMemes.length)
})

test('a specific meme is within the returned memes', async () => {
    const response = await api.get('/memes')

    const names = response.body.map(r => r.name)
    expect(names).toContain(
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

    const memesAtEnd = await helper.memesInDb()
    expect(memesAtEnd).toHaveLength(helper.initialMemes.length + 1)
    const names = memesAtEnd.map(n => n.name)
    expect(names).toContain(
        'MS Dhoni'
    )
})

test('meme without name is not added', async () => {
    const newMeme = {
        'url': 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg',
        'caption': 'Meme for my place',
    }

    await api
        .post('/memes')
        .query(newMeme)
        .expect(400)

    const memesAtEnd = await helper.memesInDb()

    expect(memesAtEnd).toHaveLength(helper.initialMemes.length)
})

test('a specific meme can be viewed', async () => {
    const memesAtStart = await helper.memesInDb()

    const memeToView = memesAtStart[0]

    const resultMeme = await api
        .get(`/memes/${memeToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const processedMemeToView = JSON.parse(JSON.stringify(memeToView))

    expect(resultMeme.body.caption).toEqual(processedMemeToView.caption)
    expect(resultMeme.body.id).toEqual(processedMemeToView.id)
    expect(resultMeme.body.name).toEqual(processedMemeToView.name)
    expect(resultMeme.body.url).toEqual(processedMemeToView.url)
})

afterAll(() => {
    mongoose.connection.close()
})