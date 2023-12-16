const Discord = require('discord.js')

module.exports = {

    name: 'channel',
    description: 'Allows you to have information about a show',
    permission: Discord.PermissionFlagsBits.ViewChannel,
    dm: false,
    options: [
        {
            type: 'channel',
            name: 'channel',
            description: 'Give a channel',
            required: false,
            autocomplete: false
        }
    ],

    async run(client, message, args) {

        let channel = args.getChannel('channel')
        if(!channel) channel = message.channel

        const db = client.db

        db.query(`SELECT * FROM langue WHERE guild = '${message.guild.id}'`, async (err, req) => {

            if(req[0].lang === 'French') {

                let b = channel.type
                if(b === null || undefined) b = 'Inconnu'
                if(b === 0) b = 'Salon Textuel'
                if(b === 1) b = 'Message Privé'
                if(b === 2) b = 'Salon Vocal'
                if(b === 3) b = 'Groupe MP'
                if(b === 4) b = 'Catégorie'
                if(b === 5) b = 'Salon d\' Annonce'
                if(b === 10) b = 'Fils d\' Annonce'
                if(b === 11) b = 'Fils Publique'
                if(b === 12) b = 'Fils Privé'
                if(b === 13) b = 'Salon Stage'
                if(b === 15) b = 'Forum'
                if(b === 16) b = 'Salon Images'

                let c = channel.nsfw
                if(c === true) c = 'Oui';else c = 'Non'

                let d = channel.topic
                if(d === null || undefined) d = 'Aucune Description'

                const p = channel.position + 1

                const a  = new Discord.EmbedBuilder()
                .setTitle('Informations')
                .setColor(client.color)
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setDescription(`
                > **Nom :** \`${channel.name}\`  ${channel}
                > **Description :** \`${d}\`
                > **Identifiant :** \`${channel.id}\`
                > **Salon NSFW :** \`${c}\`
                > **Position :** \`${p} ème\`
                > **Type :** \`${b}\``)

                await message.reply({embeds: [a]})
            }
            if(req[0].lang === 'English') {

                let b = channel.type
                if(b === null || undefined) b = 'Inconnu'
                if(b === 0) b = 'Textual Channel'
                if(b === 1) b = 'Private Messages'
                if(b === 2) b = 'Vocal Channel'
                if(b === 3) b = 'Group DM'
                if(b === 4) b = 'Category'
                if(b === 5) b = 'Announcement Channel'
                if(b === 10) b = 'Announcement Fils'
                if(b === 11) b = 'Public Fils'
                if(b === 12) b = 'Private Fils'
                if(b === 13) b = 'Stage Channel'
                if(b === 15) b = 'Forum'
                if(b === 16) b = 'Images Channel'

                let c = channel.nsfw
                if(c === true) c = 'Yes';else c = 'No'

                let d = channel.topic
                if(d === null || undefined) d = 'No Description'

                const p = channel.position + 1

                const a  = new Discord.EmbedBuilder()
                .setTitle('Informations')
                .setColor(client.color)
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setDescription(`
                > **Name :** \`${channel.name}\`  ${channel}
                > **Description :** \`${d}\`
                > **Identifier :** \`${channel.id}\`
                > **Channel NSFW :** \`${c}\`
                > **Position :** \`${p} places\`
                > **Type :** \`${b}\``)

                await message.reply({embeds: [a]})
            }
        })
    }
}