const {  } = require('discord.js')

module.exports = async (client, guild) => {

    const db = client.db

    db.query(`SELECT * FROM langue WHERE guild = '${guild.id}'`, async (err, req) => {
        
        if(req.length < 1) {
            
            db.query(`INSERT INTO langue (guild, lang) VALUES ('${guild.id}', 'English')`)
        }
    })      
}