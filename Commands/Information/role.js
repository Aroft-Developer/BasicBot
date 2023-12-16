const Discord = require('discord.js')

module.exports = {

    name: 'role',
    description: 'Allows you to have information about a role',
    permission: Discord.PermissionFlagsBits.ViewChannel,
    dm: false,
    options: [
        {
            type: 'role',
            name: 'role',
            description: 'Give Roles',
            required: true,
            autocomplete: false
        }
    ],

    async run(client, message, args) {

        const db = client.db

        const role = args.getRole('role')

        const p = role.position + 1

        db.query(`SELECT * FROM langue WHERE guild = '${message.guild.id}'`, async (err, req) => {
            if(req[0].lang === 'French') {

                let perms = role.permissions.toArray().map(e => `\`${e}\`\n `);
                if(!perms) perms = 'Aucune permissions';

                const a  = new Discord.EmbedBuilder()
                .setTitle('Informations')
                .setColor(client.color)
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setDescription(`
                > **Nom :** \`${role.name}\`  ${role}
                > **Identifiant :** \`${role.id}\`
                > **Couleur :** \`#${role.color}\`
                > **Position :** \`${p} ème\``)
                .addFields({ name: `> **Permissions :**`, value: `${perms}`})

                await message.reply({embeds: [a]})
            }

            if(req[0].lang === 'English') {
                
                let perms = role.permissions.toArray().map(e => `\`${e}\`\n `);
                if(!perms) perms = 'No Permission';

                const a  = new Discord.EmbedBuilder()
                .setTitle('Informations')
                .setColor(client.color)
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setDescription(`
                > **Name :** \`${role.name}\`  ${role}
                > **Identifier :** \`${role.id}\`
                > **Color :** \`#${role.color}\`
                > **Position :** \`${p} places\``)
                .addFields({ name: `> **Permissions :**`, value: `${perms}`})

                await message.reply({embeds: [a]})
            }
        })
    }
}