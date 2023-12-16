const {  } = require('discord.js')

module.exports = async (client, guild) => {

    const db = client.db
            
    db.query(`DELETE FROM langue WHERE guild = '${guild.id}'`);
            
}