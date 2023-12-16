const Discord = require('discord.js');

module.exports = {

    name: 'language',
    description: 'Bot language',
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    options: [
        {
            type: 'string',
            name: 'language',
            description: 'Bot language',
            required: false,
            autocomplete: true
        }
    ],
    
    async run(client, message, args) {

        const db = client.db;

        const lang = args.getString('language')

        db.query(`SELECT * FROM langue WHERE guild = '${message.guild.id}'`, async (err, req) => {

            if(req[0].lang === 'English') {
                if(!lang && lang != 'English' && lang != 'French') return message.reply({content: 'Please choose English or French !', ephemeral: true})
                await message.reply(`The language of the bot was set to \`${lang}\` !`)
            }
            
            if(req[0].lang === 'French') {
                if(!lang && lang != 'English' && lang != 'French') return message.reply({content: 'Merci de choisir English ou French !', ephemeral: true})
                await message.reply(`La langue du bot a était mit en \`${lang}\` !`)
            }

            db.query(`UPDATE langue SET lang = '${lang}' WHERE guild = '${message.guildId}'`);
        })
    }
}   