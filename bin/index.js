const PgDbase = require('./pgdbase')

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

module.exports.queries = {
    selectAll: "SELECT * FROM table;",
    selectByID: "SELECT * FROM table WHERE id = $1;",
    insertInto: "INSERT INTO table (field) VALUES ($1);",
    updateByID: "UPDATE table SET (field) = ($1) WHERE id = $2;",
    deleteByID: "DELETE FROM table WHERE id = ($1);"
}
module.exports.database = new PgDbase(params, createTable)
module.exports.querySet = (text, values='', rowMode='object') => {return {text, values, rowMode}}