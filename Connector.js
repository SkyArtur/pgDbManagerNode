const pgk = require('pg')
const { Client } = pgk


module.exports = class Connector {
    /**
    * Connects to the postgresql database.
    * @params database {object}: {database, user, password, host, port}
    * @params createTable string: 'query'
    * */
    constructor(database, createTable=null) {
        this.database = typeof database === 'object' ? database : null
        if (createTable)
            this.execute(this.setQuery(createTable))
                .catch(console.error)
    }

    setQuery = function (text, values = [], rowMode = 'object') {
        return { text, values, rowMode }
    }

    async execute (setQuery) {
        const client = new Client(this.database)
        try {
            await client.connect()
            let response = await client.query(setQuery)
            return response.rows
        } catch (e) {
            return e
        } finally {
            await client.end()
        }
    }
}