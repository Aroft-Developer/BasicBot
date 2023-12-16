const Discord = require('discord.js');

module.exports = {

    name: 'lock',
    description: 'Lock a channel',
    permission: Discord.PermissionFlagsBits.ManageChannels,
    dm: false,
    options: [
        {
            type: 'channel',
            name: 'channel',
            description: 'Channel locked',
            required: false,
            autocomplete: false
        }, {
            type: 'role',
            name: 'role',
            description: 'Role lock',
            required: false,
            autocomplete: false
        }
    ],

    async run(client, message, args) {


        const db = client.db

        db.query(`SELECT * FROM langue WHERE guild = '${message.guild.id}'`, async (err, req) => {

            if(req[0].lang === 'French') {

                const channel = args.getChannel('channel');
                if(!message.guild.channels.cache.get(channel.id)) return message.reply({ ephemeral: true, content: 'Pas de salon !'});
                if(channel.type !== Discord.ChannelType.GuildText && channel.type !== Discord.ChannelType.PublicThread && channel.type !== Discord.ChannelType.PrivateThread)return message.reply({ ephemeral: true, content: "Envoyer un salon textuel !"});

                let role = args.getRole('role');
                if(role && !message.guild.roles.cache.get(role.id)) return message.reply({ ephemeral: true, content: 'Pas de rôle !'});
                if(!role) role = message.guild.roles.everyone;

                if(channel.permissionOverwrites.cache.get(role.id)?.deny.toArray(false).includes('SendMessages')) return message.reply({ ephemeral: true, content:`Le role \`${role.name}\` est déjà lock dans le salon ${channel}`});

                if(channel.permissionOverwrites.cache.get(role.id)) await channel.permissionOverwrites.edit(role.id, {SendMessages: false});
                else await channel.permissionOverwrites.create(role.id, {SendMessages: false});

                const Embed = new Discord.EmbedBuilder()
                .setTitle('Lock')
                .setDescription(`
                Le membre ${message.user} a utiliser la commande \`/lock\` :\n
                > **Salon Lock :** ${channel}
                > **Role lock :** ${role}`)
                .setTimestamp()
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                await message.reply({embeds: [Embed]});
            }

            if(req[0].lang === 'English') {

                const channel = args.getChannel('channel');
                if(!message.guild.channels.cache.get(channel.id)) return message.reply({ ephemeral: true, content: 'No Channel !'});
                if(channel.type !== Discord.ChannelType.GuildText && channel.type !== Discord.ChannelType.PublicThread && channel.type !== Discord.ChannelType.PrivateThread)return message.reply({ ephemeral: true, content: "Give a textual channel !"});

                let role = args.getRole('role');
                if(role && !message.guild.roles.cache.get(role.id)) return message.reply({ ephemeral: true, content: 'No Role !'});
                if(!role) role = message.guild.roles.everyone;

                if(channel.permissionOverwrites.cache.get(role.id)?.deny.toArray(false).includes('SendMessages')) return message.reply({ ephemeral: true, content:`Role \`${role.name}\` is already locked in the channel ${channel}`});

                if(channel.permissionOverwrites.cache.get(role.id)) await channel.permissionOverwrites.edit(role.id, {SendMessages: false});
                else await channel.permissionOverwrites.create(role.id, {SendMessages: false});

                const Embed = new Discord.EmbedBuilder()
                .setTitle('Lock')
                .setDescription(`
                Member ${message.user} used the command \`/lock\` :\n
                > **Lock Channel :** ${channel}
                > **Lock Role :** ${role}`)
                .setTimestamp()
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                await message.reply({embeds: [Embed]});
            }
        })
    }
}