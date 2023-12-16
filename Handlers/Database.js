const { createConnection } = require('mysql');
const config = require('../config.json');

module.exports = async () => {

    const db = createConnection({
        
        host: config.BDD.host,
        user: config.BDD.user,
        password: config.BDD.password,
        database: config.BDD.database,
    })

    return db;
}