# pgDbManagerNode
Trabalhando com Node e Postgresql. Um pequeno gerenciador para conexão com um banco de dados PostgreSQL.

### Utilização:
- Clone o repositório para a raiz do projeto NodeJs.
```shell
git clone https://github.com/SkyArtur/pgDbManagerNode ./pgdb-manager-node
```

- Instale o módulo usando npm.
```shell
npm i ./pgdb-manager-node --save
```
- Edite os parâmetros do banco de dados em: ./pgdb-manager-node/bin/index.js.
```javascript
const params = {
    database: 'escola',
    user: 'escolaAdmin',
    password: 'a%dssd%3gT7736Tr$#6TyyT',
    host: '192.111.1.11',
    port: 5432
}
```
- Crie as consultas que desejar.
```javascript
const createTable = `
    CREATE TABLE IF NOT EXISTS persons (
        id SERIAL,
        name VARCHAR(150),
        birth DATE,
        height NUMERIC(3, 2),
        weight NUMERIC(6, 3)
);`

module.exports.queries = {
    selectAll: "SELECT * FROM persons;",
    selectByID: "SELECT * FROM persons WHERE id = $1;",
    insertInto: "INSERT INTO persons (name, birth, height, weight) VALUES ($1, $2, $3, $4);",
    updateByID: "UPDATE persons SET (name) = ($1) WHERE id = $2;",
    deleteByID: "DELETE FROM table WHERE id = ($1);"
}
```

- Importe aonde precisar na API Express.
```javascript
const {database, queries, querySet} = require('pgdb-manager-node')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    database.execute(queries.selectAll)
        .then(responseData => {
            res.send(responseData)
        })
})
```