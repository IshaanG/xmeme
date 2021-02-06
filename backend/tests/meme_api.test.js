const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Meme = require('../models/meme')

beforeEach(async () => {
    await Meme.deleteMany({})

    const memeObject = helper.initialMemes.map(meme => new Meme(meme))
    const promiseArray = memeObject.map(meme => meme.save())
    await Promise.all(promiseArray)
})
describe('when there is initially some memes saved', () => {
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
})

describe('viewing a specific meme', () => {
    test('succeeds with a valid id', async () => {
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

    test('fails with statuscode 404 if meme does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        await api
            .get(`/memes/${validNonexistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/memes/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new meme', () => {
    test('succeeds with valid data', async () => {
        const newMeme = {
            'name': 'Sachin Tendulkar',
            'url': 'https://images.pexels.com/photos/6165877/pexels-photo-6165877.jpeg',
            'caption': 'Yeah memes please'
        }
        await api
            .post('/memes')
            .send(newMeme)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const memesAtEnd = await helper.memesInDb()
        expect(memesAtEnd).toHaveLength(helper.initialMemes.length + 1)
        const names = memesAtEnd.map(n => n.name)
        expect(names).toContain(
            'Sachin Tendulkar'
        )
    })
    test('fails with status code 400 if data invaild', async () => {
        const newMeme = {
            'url': 'https://images.pexels.com/photos/3867204/pexels-photo-3867204.jpeg',
            'caption': 'You can see me',
        }

        await api
            .post('/memes')
            .send(newMeme)
            .expect(400)

        const memesAtEnd = await helper.memesInDb()

        expect(memesAtEnd).toHaveLength(helper.initialMemes.length)
    })

})

// TODO: PATCH tests
// describe('deletion of a note', () => {
//     test('succeeds with status code 204 if id is valid', async () => {
//         const notesAtStart = await helper.notesInDb()
//         const noteToDelete = notesAtStart[0]

//         await api
//             .delete(`/api/notes/${noteToDelete.id}`)
//             .expect(204)

//         const notesAtEnd = await helper.notesInDb()

//         expect(notesAtEnd).toHaveLength(
//             helper.initialNotes.length - 1
//         )

//         const contents = notesAtEnd.map(r => r.content)

//         expect(contents).not.toContain(noteToDelete.content)
//     })
// })


afterAll(() => {
    mongoose.connection.close()
})