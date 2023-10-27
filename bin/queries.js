/* Build the queries here, editing the 'table' name, fields and values. */

module.exports.createTable = `
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