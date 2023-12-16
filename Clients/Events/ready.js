const { ActivityType } = require('discord.js');
const LoadSlashCommands = require('../../Handlers/SlashCommands');
const LoadDatabase = require('../../Handlers/Database')

module.exports = async client => {

    client.db = await LoadDatabase();
        
    console.log('Base de données connectée !');

    await LoadDatabase(client);

    await LoadSlashCommands(client);
    console.log(`${client.user.tag} est en ligne !`);

    client.user.setPresence({
        activities: [{
            name : `/help`,
            type : ActivityType.Watching
        }],
    })
}