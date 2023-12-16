const Discord = require("discord.js")

module.exports = {

  name: 'server',
  description: 'Obtain multiple information about the server',
  permission: Discord.PermissionFlagsBits.ViewChannel,
  dm: false,

  async run(client, interaction) {

    const db = client.db

    db.query(`SELECT * FROM langue WHERE guild = '${interaction.guild.id}'`, async (err, req) => {
      if(req[0].lang === 'French') {

        let description = interaction.guild.description
        if(description === null) description = 'Aucune'

        let afk = interaction.guild.afkChannel
        if(afk === null) afk = 'Aucun'

        let rules = interaction.guild.rulesChannel
        if(rules === null) rules = 'Aucun'

        let sys = interaction.guild.systemChannel
        if(sys === null) sys = 'Aucun'

        let upd = interaction.guild.publicUpdatesChannel
        if(upd === null) upd = 'Aucun'

        let EmbedServeurInfo = new Discord.EmbedBuilder()

        .setTitle(`__Informations sur le serveur :__`)
        .setColor(client.color)
        .setDescription(`
        > **Nom :** \`${interaction.guild.name}\`
        > **Propriétaire :** <@${interaction.guild.ownerId}>
        > **Création du Serveur : ** <t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>
        > **Description :** \`${description}\`
        > **Membres :** \`${interaction.guild.memberCount} / 500000\`
        > **Rôles:** \`${interaction.guild.roles.cache.size}\`
        > **Emojis:** \`${interaction.guild.emojis.cache.size}\`
        > **Stickers:** \`${interaction.guild.stickers.cache.size}\`
        > **Emojis Animés :** \`${interaction.guild.emojis.cache.filter(emoji => emoji.animated).size}\`
        > **Catégories :** \`${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildCategory).size}\`
        > **Salons Textuels :** \`${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildText).size}\`
        > **Salons Vocaux :** \`${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildVoice).size}\`\n
        **__Informations sur les salons :__**\n
        > **Salon AFK :** ${afk}
        > **Salon Règles :** ${rules}
        > **Salon Update :** ${upd}
        > **Salon Système :** ${sys}\n
        **__Informations sur le boost du serveur :__**\n
        > **Nombre total de Boost :** \`${interaction.guild.premiumSubscriptionCount}\`
        > **Niveau de Boost :** \`${interaction.guild.premiumTier}\``)
        .setImage(await (await client.guilds.fetch(interaction.guild.id, {force: true})).bannerURL({dynamic: true, size: 2048}))
        .setThumbnail(interaction.guild.iconURL({dynamic: true}))
        .setTimestamp()
        .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

        await interaction.reply({embeds: [EmbedServeurInfo]});
      }

      if(req[0].lang === 'English') {

        let description = interaction.guild.description
        if(description === null) description = 'None'

        let afk = interaction.guild.afkChannel
        if(afk === null) afk = 'None'

        let rules = interaction.guild.rulesChannel
        if(rules === null) rules = 'None'

        let sys = interaction.guild.systemChannel
        if(sys === null) sys = 'None'

        let upd = interaction.guild.publicUpdatesChannel
        if(upd === null) upd = 'None'

        let EmbedServeurInfo = new Discord.EmbedBuilder()

        .setTitle(`__Server Information :__`)
        .setColor(client.color)
        .setDescription(`
        > **Name :** \`${interaction.guild.name}\`
        > **Owner :** <@${interaction.guild.ownerId}>
        > **Creation of the Server : ** <t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>
        > **Description :** \`${description}\`
        > **Members :** \`${interaction.guild.memberCount} / 500000\`
        > **Roles:** \`${interaction.guild.roles.cache.size}\`
        > **Emojis:** \`${interaction.guild.emojis.cache.size}\`
        > **Stickers:** \`${interaction.guild.stickers.cache.size}\`
        > **Animated Emojis :** \`${interaction.guild.emojis.cache.filter(emoji => emoji.animated).size}\`
        > **Category :** \`${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildCategory).size}\`
        > **Textual Channel :** \`${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildText).size}\`
        > **Vocal Channel :** \`${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildVoice).size}\`\n
        **__Channel Information :__**\n
        > **AFK Channel :** ${afk}
        > **Rules Channel :** ${rules}
        > **Channel Update :** ${upd}
        > **System Channel :** ${sys}\n
        **__Server Boost Information :__**\n
        > **Total number of Boosts :** \`${interaction.guild.premiumSubscriptionCount}\`
        > **Boost Level :** \`${interaction.guild.premiumTier}\``)
        .setImage(await (await client.guilds.fetch(interaction.guild.id, {force: true})).bannerURL({dynamic: true, size: 2048}))
        .setThumbnail(interaction.guild.iconURL({dynamic: true}))
        .setTimestamp()
        .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

        await interaction.reply({embeds: [EmbedServeurInfo]});
      }
    })

  }
}