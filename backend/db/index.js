const { Pool } = require('pg')
const config = require('../utils/config')
const pool = new Pool({
    user: config.PGUSER,
    host: config.PGHOST,
    database: config.PGDATABASE,
    password: config.PGPASSWORD,
    port: config.PGPORT,
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}