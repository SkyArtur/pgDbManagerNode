const pgk = require('pg')
const { Client } = pgk


module.exports = class PgDbase {
    /**
    * Connects to the postgresql database.
    * @params database {object}: {database, user, password, host, port}
    * @params queryCreateTable {string || array}: string || array = 'query' || ['query', 'query']
    * */
    constructor(database, queryCreateTable=null) {
        this.database = typeof database === 'object' ? database: null
        if (queryCreateTable) {
            if (typeof queryCreateTable === 'string') {
                this.execute(queryCreateTable)
                    .catch(console.error)
            } else {
                queryCreateTable.forEach(query => {
                    this.execute(query)
                        .catch(console.error)
                })
            }
        }
    }

    async execute (query) {
        const client = new Client(this.database)
        try {
            await client.connect()
            let dataResponse = client.query(query)
            return dataResponse.rows
        } catch (e) {
            return e
        } finally {
            await client.end()
        }
    }
}