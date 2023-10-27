const PgDbase = require('./pgdbase')
const { queries, createTable} = require('./queries')

const params = {
    database: 'dbname',
    user: 'username',
    password: 'userpassword',
    host: 'dbhost',
    port: 5432
}


module.exports.queries = queries
module.exports.database = new PgDbase(params, createTable)
module.exports.querySet = (text, values='', rowMode='object') => {return {text, values, rowMode}}