const {  } = require('discord.js')

module.exports = async (client, message) => {

    if(message.author.bot || message.channel.type === Discord.ChannelType.DM) return;

    const db = client.db

    db.query(`SELECT * FROM langue WHERE guild = '${message.guild.id}'`, async (err, req) => {
        
        if(req.length < 1) {
            
            db.query(`INSERT INTO langue (guild, lang) VALUES ('${message.guild.id}', 'English')`)

        } else {

            db.query(`SELECT * FROM langue WHERE guild = '${message.guild.id}'`, async (err, req) => {
                if(req[0].lang === 'French') {
                    if(message.content === `${client.user}`) {
                        return await message.reply(`Salut ! Je suis ${client.user.username}, mon prefix est \`/\` !`)
                    }
                }
                if(req[0].lang === 'English') {
                    if(message.content === `${client.user}`) {
                        return await message.reply(`Hi ! I\'m ${client.user.username}, my prefix is \`/\` !`)
                    }
                }
            })
        }
    })
}