const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})