const mongoose = require('mongoose')

const memeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    caption: { type: String, required: true },
    date: { type: Date, required: true }
})

memeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Meme', memeSchema)