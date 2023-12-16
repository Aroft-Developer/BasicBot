const Discord = require("discord.js")

module.exports = {

    name: 'user',
    description: 'Provide information about the member',
    permission: Discord.PermissionFlagsBits.ViewChannel,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'user',
            description: 'The chosen member',
            required: false,
            autocomplete: false,
        }
    ],

    async run (client, message, args) {

        const db = client.db

        db.query(`SELECT * FROM langue WHERE guild = '${message.guild.id}'`, async (err, req) => {
            if(req[0].lang === 'French') {

                let user;
                if(args.getUser('user')) {
                    user = args.getUser('user')
                    if(!user || !message.guild.members.cache.get(user?.id)) return message.reply({ephemeral: true, content:'Pas de membre !'})
                
                }else user = message.user;{
                
                    const member = message.guild.members.cache.get(user.id)
                    if(!member) return message.reply({ephemeral: true, content:'Pas de membre !'})
                
                    let presence = member ? member.presence ? member.presence.status : 'Hors ligne' : 'Inconnu';
                    if(presence == 'dnd') presence = 'Ne pas déranger';else if(presence == 'idle') presence = 'Inactif'; else if(presence == 'offline') presence = 'Hors ligne'; else if(presence == 'online') presence = 'Online'; else if(presence == 'streaming') presence = 'Streaming'; else if(presence == 'Inconnu') presence = '❓'
                
                    let botstats = user.client
                    if(botstats === false) botstats = 'Oui'; else botstats = 'Non'
                
                    let name = user.username
                    if(name === null || undefined) name = 'Auncun'
                
                    const Embed = new Discord.EmbedBuilder()
                    .setTitle(`__Information de ${user.username}__`)
                    .setColor(client.color)
                    .setDescription(`
                    > **Nom** : \`${user.globalName}\`  ${user}
                    > **Identifiant** : \`${user.id}\`
                    > **Bots :** \`${botstats}\`
                    > **Surnom :** \`${user.tag}\`
                    > **Status** : \`${presence}\`\n
                    **__Informations de compte :__**\n
                    > **Arrivée sur le serveur** : <t:${Math.floor(member.joinedAt / 1000)}:F>
                    > **Création du compte** : <t:${Math.floor(user.createdAt / 1000)}:F>`)
                    .setImage(await (await client.users.fetch(user.id, {force: true})).bannerURL({dynamic: true, size: 2048}))
                    .setTimestamp()
                    .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                    .setThumbnail(user.displayAvatarURL({dynamic: true}))
                
                    await message.reply({embeds: [Embed]})
                }
            }
            if(req[0].lang === 'English') {
                let user;
                if(args.getUser('user')) {
                    user = args.getUser('user')
                    if(!user || !message.guild.members.cache.get(user?.id)) return message.reply({ephemeral: true, content: 'No Member !'})
                
                }else user = message.user;{
                
                    const member = message.guild.members.cache.get(user.id)
                    if(!member) return message.reply({ephemeral: true, content:'No Member !'})
                
                    let presence = member ? member.presence ? member.presence.status : 'Hors ligne' : 'Inconnu';
                    if(presence == 'dnd') presence = 'Do not disturb';else if(presence == 'idle') presence = 'Inactive'; else if(presence == 'offline') presence = 'Offligne'; else if(presence == 'online') presence = 'Online'; else if(presence == 'streaming') presence = 'Streaming'; else if(presence == 'Inconnu') presence = '❓'
                
                    let botstats = user.client
                    if(botstats === false) botstats = 'Yes'; else botstats = 'No'
                
                    let name = user.username
                    if(name === null || undefined) name = 'None'
                
                    const Embed = new Discord.EmbedBuilder()
                    .setTitle(`__${user.username} Information__`)
                    .setColor(client.color)
                    .setDescription(`
                    > **Name** : \`${user.globalName}\`  ${user}
                    > **Identifier** : \`${user.id}\`
                    > **Bots :** \`${botstats}\`
                    > **Nickname :** \`${user.tag}\`
                    > **Status** : \`${presence}\`\n
                    **__Account information :__**\n
                    > **Arrival on the server** : <t:${Math.floor(member.joinedAt / 1000)}:F>
                    > **Account creation** : <t:${Math.floor(user.createdAt / 1000)}:F>`)
                    .setImage(await (await client.users.fetch(user.id, {force: true})).bannerURL({dynamic: true, size: 2048}))
                    .setTimestamp()
                    .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                    .setThumbnail(user.displayAvatarURL({dynamic: true}))
                
                    await message.reply({embeds: [Embed]})
                }
            }
        })
    }
}