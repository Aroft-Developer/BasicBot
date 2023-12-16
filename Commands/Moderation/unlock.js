const Discord = require('discord.js')

module.exports = {

    name: 'unlock',
    description: 'Unlock a channel',
    permission: Discord.PermissionFlagsBits.ManageChannels,
    dm: false,
    options: [
        {
            type: 'channel',
            name: 'channel',
            description: 'Channel unlocked',
            required: false,
            autocomplete: false
        }, {
            type: 'role',
            name: 'role',
            description: 'Role unlocked',
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
                if(role && !message.guild.roles.cache.get(role.id)) return message.reply({ ephemeral: true, content: 'Pas de role !'});
                if(!role) role = message.guild.roles.everyone;

                if(channel.permissionOverwrites.cache.get(role.id)?.allow.toArray(false).includes('SendMessages')) return message.reply(`Le role \`${role.name}\` est deja débloquer dans le salon ${channel}`);

                if(channel.permissionOverwrites.cache.get(role.id)) await channel.permissionOverwrites.edit(role.id, {SendMessages: true});
                else await channel.permissionOverwrites.create(role.id, {SendMessages: true});

                const Embed = new Discord.EmbedBuilder()
                .setTitle('Unlock')
                .setDescription(`
                Member ${message.user} a utiliser la commande \`/unlock\` :\n
                > **Channel Unlock :** ${channel}
                > **Role Unlock :** ${role}`)
                .setTimestamp()
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                await message.reply({embeds: [Embed]});
            }

            if(req[0].lang === 'English') {
                
                const channel = args.getChannel('channel');
                if(!message.guild.channels.cache.get(channel.id)) return message.reply({ ephemeral: true, content: 'No channel !'});
                if(channel.type !== Discord.ChannelType.GuildText && channel.type !== Discord.ChannelType.PublicThread && channel.type !== Discord.ChannelType.PrivateThread)return message.reply({ ephemeral: true, content: "Envoyer un salon textuel !"});

                let role = args.getRole('role');
                if(role && !message.guild.roles.cache.get(role.id)) return message.reply({ ephemeral: true, content: 'No role !'});
                if(!role) role = message.guild.roles.everyone;

                if(channel.permissionOverwrites.cache.get(role.id)?.allow.toArray(false).includes('SendMessages')) return message.reply(`Role \`${role.name}\` is already unlocked in the channel ${channel}`);

                if(channel.permissionOverwrites.cache.get(role.id)) await channel.permissionOverwrites.edit(role.id, {SendMessages: true});
                else await channel.permissionOverwrites.create(role.id, {SendMessages: true});

                const Embed = new Discord.EmbedBuilder()
                .setTitle('Unlock')
                .setDescription(`
                Member ${message.user} used the command \`/unlock\` :\n
                > **Channel Unlock :** ${channel}
                > **Role Unlock :** ${role}`)
                .setTimestamp()
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                await message.reply({embeds: [Embed]});
            }
        })
    }
}