require('dotenv').config()

const PORT = process.env.PORT
const PGHOST = process.env.PGHOST
const PGUSER = process.env.PGUSER
const PGPASSWORD = process.env.PGPASSWORD
const PGPORT = process.env.PGPORT
let PGDATABASE = process.env.PGDATABASE

if (process.env.NODE_ENV === 'test') {
    PGDATABASE = process.env.TEST_PGDATABASE
}

module.exports = {
    PORT,
    PGHOST,
    PGUSER,
    PGDATABASE,
    PGPASSWORD,
    PGPORT
}