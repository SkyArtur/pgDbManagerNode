# pgDbManagerNode
Trabalhando com Node e Postgresql. Um pequeno gerenciador para conexão com um banco de dados PostgreSQL.

### Utilização:
- Clone o repositório para a raiz do projeto NodeJs.
```shell
git clone https://github.com/SkyArtur/pgDbManagerNode ./database
```

- Edite os parâmetros do banco de dados em: ./database/index.js.
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
```

- Importe aonde precisar.
```javascript
const { database } = require('./database')
const express = require('express')
const bodyParse = require('body-parser')
const app = express()

app.use(bodyParse.urlencoded({extended: true}))

app.get('/', (req, res) => {
    const query = database.setQuery('SELECT * FROM persons;')
    database.execute(query)
        .then(responseData => {
            res.send(responseData)
        })
})

app.post('/new', (req, res) => {
    const {name, birth, height, weight} = req.body
    const query = database.setQuery(
        "INSERT INTO persons (name, birth, height, weight) VALUES (%s, %s, %s, %s);",
        [name, birth, height, weight]
    )
    database.execute(query)
        .then(responseData => {
            res.redirect('/')
        })
})


app.listen(3003)


```