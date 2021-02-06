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

const nonExistingId = async () => {
    const meme = new Meme({
        'name': 'MS Dhoni',
        'url': 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg',
        'caption': 'Meme for my place',
    })
    await meme.save()
    await meme.remove()

    return meme._id.toString()
}

const memesInDb = async () => {
    const notes = await Meme.find({})
    return notes.map(note => note.toJSON())
}

module.exports = {
    initialMemes, nonExistingId, memesInDb
}