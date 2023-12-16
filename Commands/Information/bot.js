const Discord = require('discord.js');
const config = require('../../config.json');

module.exports  = {

    name: 'bot',
    description: 'Show bot information',
    permission: Discord.PermissionFlagsBits.ViewChannel,
    dm: true,

    async run (client, message, args) {

        const db = client.db

        db.query(`SELECT * FROM langue WHERE guild = '${message.guild.id}'`, async (err, req) => {

            if(req[0].lang === 'French') {

                const days = Math.floor(client.uptime / 86400000);
                const hours = Math.floor(client.uptime / 3600000) % 24;
                const minutes = Math.floor(client.uptime / 60000) % 60;
                const seconds = Math.floor(client.uptime / 1000) % 60;

                const Embed = new Discord.EmbedBuilder()
                .setTitle('Information du bot')
                .setColor(client.color)
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setDescription(`

                > **Développeur** : \`Aroft\`
                > **Nom** : \`${client.user.username}\`
                > **Tag** : \`${client.user.discriminator}\`
                > **Identifiant** : \`${client.user.id}\`
                > **Version de discord.js** : \`${Discord.version}\`
                > **Version de node.js** : \`${process.version}\`
                > **Temps de connexion** : \`${days} jour(s), ${hours} heure(s), ${minutes} minute(s), ${seconds} seconde(s)\`

                **__Information sur les statistiques__**

                > **Serveurs** : \`${client.guilds.cache.size}\`
                > **Utilisateurs ** : \`${client.users.cache.size}\`
                > **Commandes** : \`${client.commands.size}\`
                > **Salons** : \`${client.channels.cache.size}\`
                > **Emojis** : \`${client.emojis.cache.size}\`
                
                [**Ajouter le bot**](${config.linkbot})`)

                await message.reply({embeds: [Embed]})
            }
            if(req[0].lang === 'English') {
                
                const days = Math.floor(client.uptime / 86400000);
                const hours = Math.floor(client.uptime / 3600000) % 24;
                const minutes = Math.floor(client.uptime / 60000) % 60;
                const seconds = Math.floor(client.uptime / 1000) % 60;

                const Embed = new Discord.EmbedBuilder()
                .setTitle('Bot information')
                .setColor(client.color)
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setDescription(`

                > **Developer** : \`Aroft\`
                > **Name** : \`${client.user.username}\`
                > **Tag** : \`${client.user.discriminator}\`
                > **Identifier** : \`${client.user.id}\`
                > **Version of discord.js** : \`${Discord.version}\`
                > **Version of node.js** : \`${process.version}\`
                > **Connection time** : \`${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s)\`

                **__Information on statistics__**

                > **Servers** : \`${client.guilds.cache.size}\`
                > **Users ** : \`${client.users.cache.size}\`
                > **Commands** : \`${client.commands.size}\`
                > **Channels** : \`${client.channels.cache.size}\`
                > **Emojis** : \`${client.emojis.cache.size}\`
                
                [**Add Bot**](${config.linkbot})`)

                await message.reply({embeds: [Embed]})
            }
        })
    }
}