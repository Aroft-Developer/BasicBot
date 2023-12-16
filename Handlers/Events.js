const { readdirSync } = require('fs');

module.exports = async client => {

    const folders = readdirSync('./Clients');

    for (const folder of folders) {

        const commandFiles = readdirSync(`./Clients/${folder}`).filter(f => f.endsWith('.js'));

        for (const file of commandFiles) {

            const event = require(`../Clients/${folder}/${file}`);

            client.on(file.split('.js').join(''), event.bind(null, client));
            console.log(`Events ${file} successfully loaded !`);
        }
    }
}