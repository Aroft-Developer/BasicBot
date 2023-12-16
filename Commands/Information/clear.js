const Discord = require('discord.js');

module.exports = {

    name: 'clear',
    description: 'Clear messages in a channel',
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    options: [
        {
            type: 'number',
            name: 'number',
            description: 'The number of messages to delete',
            required: false,
            autocomplete: false
        }, {
            type: 'channel',
            name: 'channel',
            description: 'The channel where messages will be deleted',
            required: false,
            autocomplete: false
        },
    ],

    async run(client, message, args) {

        let channel = args.getChannel('salon');
        if(!channel) channel = message.channel;

        const db = client.db

        db.query(`SELECT * FROM langue WHERE guild = '${message.guild.id}'`, async (err, req) => {

            if(req[0].lang === 'French') {

                if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply({content: 'Merci de donnez un salon valide !',ephemeral: true});

                const number = args.getNumber('nombre');
                if(!number) return message.reply({content: 'Merci de donnez une valeur valide !', ephemeral: true});
                if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply({content: 'Il faut un nombre entre `0` et `100` inclus !', ephemeral: true});

                try {
                
                    const messages = await channel.bulkDelete(parseInt(number));
                
                    const Embed = new Discord.EmbedBuilder()
                    .setTitle('Clear')
                    .setDescription(`
                    Le membre ${message.user} a utiliser la commande \`/clear\` :\n
                    > **Nombre de messages :** \`${messages.size}\`
                    > **Le salon :** ${channel}`)
                    .setTimestamp()
                    .setColor(client.color)
                    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                    .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                    await message.reply({embeds: [Embed], ephemeral: true});

                } catch (err) {

                    const messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()];
                    await channel.bulkDelete(messages);

                    message.reply({content: `J'ai pu supprimé uniquement \`${messages.length}\` message(s) dans le salon ${channel} car les autres dataient de plus \`14 jours\``, ephemeral: true});
                }
            }

            if(req[0].lang === 'English') {
                if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply({content: 'Please give a valid channel !',ephemeral: true});

                const number = args.getNumber('nombre');
                if(!number) return message.reply({content: 'Please provide a valid value !', ephemeral: true});
                if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply({content: 'You need a number between `0` and `100` inclusive !', ephemeral: true});

                try {
                
                    const messages = await channel.bulkDelete(parseInt(number));
                
                    const Embed = new Discord.EmbedBuilder()
                    .setTitle('Clear')
                    .setDescription(`
                    Member ${message.user} used the command \`/clear\` :\n
                    > **Number of messages :** \`${messages.size}\`
                    > **Channel :** ${channel}`)
                    .setTimestamp()
                    .setColor(client.color)
                    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                    .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                    await message.reply({embeds: [Embed], ephemeral: true});

                } catch (err) {

                    const messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()];
                    await channel.bulkDelete(messages);

                    message.reply({content: `I was only able to delete \`${messages.length}\` message(s) in the ${channel} channel because the others were older than \`14 days\``, ephemeral: true});
                }
            }
        })
    }
}