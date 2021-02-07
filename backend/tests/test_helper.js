const db = require('../db')

const genQueryString = (rows) => {
    const query = `
    insert into memes (
        name, url, caption, created, updated
    )
    select
        left(md5(i::text), 10),
        md5(random()::text),
        md5(random()::text),
        now() - (random() * interval '100 days') - (interval '200 days'),
        now() - (random() * interval '100 days')
    from generate_series(1, ${rows}) s(i)
`
    return query
}

const memesInDb = async () => {
    const result = await db.query('SELECT * FROM memes')
    return result.rows
}

const clearDb = async () => {
    await db.query('TRUNCATE memes RESTART IDENTITY')
}
const getMemeWithId = async (id) => {
    const result = await db.query('SELECT * FROM memes where id = $1',[id])
    return result.rows[0]
}

module.exports = {
    genQueryString, memesInDb, clearDb, getMemeWithId
}