const { readdirSync } = require('fs');

module.exports = async client => {

    const folders = readdirSync('./Commands');

    for (const folder of folders) {

        const commandFiles = readdirSync(`./Commands/${folder}`).filter(f => f.endsWith('.js'));

        for (const file of commandFiles) {

            const commandFile = require(`../Commands/${folder}/${file}`);

            client.commands.set(commandFile.name, commandFile);
            console.log(`Command ${file} successfully loaded !`);
        }
    }
}