const PgDbase = require('./Connector')

/* Edit params from database connection. */

const params = {
    database: 'dbname',
    user: 'username',
    password: 'userpassword',
    host: 'dbhost',
    port: 5432
}

/* Build the queries here, editing the 'table' name, fields and values. */

const createTable = `
    CREATE TABLE IF NOT EXISTS table (
        id SERIAL,
        field VARCHAR(150)
);`


module.exports.database = new PgDbase(params, createTable)