const { PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {

    name: 'ping',
    description: 'Allows you to have the bot\'s ping',
    permission: PermissionFlagsBits.SendMessages,
    dm: true,

    async run(client, message) {

        const db = client.db

        db.query(`SELECT * FROM langue WHERE guild = '${message.guild.id}'`, async (err, req) => {
            if(req[0].lang === 'French') {
                const rep = `Le ping du bot est de ${client.ws.ping} ms .`
                const e = new EmbedBuilder()
                .setDescription(`${rep}`)
                await message.reply({embeds: [e]})
            }
            if(req[0].lang === 'English') {
                const rep = `The bot's ping is ${client.ws.ping} ms .`
                const e = new EmbedBuilder()
                .setDescription(`${rep}`)
                await message.reply({embeds: [e]})
            }
        })
    }
}