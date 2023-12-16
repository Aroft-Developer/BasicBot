const Discord  = require('discord.js');

module.exports = {

    name: 'kick',
    description: 'Kick a member',
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'user',
            description: 'User kicked',
            required: false,
            autocomplete: false,
        },{
            type: 'string',
            name: 'reason',
            description: 'Reason for kick',
            required: false,
            autocomplete: false,
        }
    ],

    async run(client, message, args) {

        const db = client.db

        db.query(`SELECT * FROM langue WHERE guild = '${message.guild.id}'`, async (err, req) => {

            if(req[0].lang === 'French') {

         
                const user = args.getUser('user');
                if(!user) return await message.reply({content: 'Veuliez saisir un utilisateur valide  !', ephemeral: true});

                const member = message.guild.members.cache.get(user.id);
                if(!member) return await message.reply({ ephemeral: true, content: 'Pas de membre !'});

                let reason = args.getString('reason');
                if(!reason) reason = 'Pas de raison.';

                if(message.user.id === user.id)return message.reply({ ephemeral: true, content: 'Essaie pas de te kick pas !'});
                if((await message.guild.fetchOwner()).id === user.id) return message.reply({ ephemeral: true, content: 'Ne kick pas le propriétaire du serveur !'})
                if(member && !member?.kickable) return message.reply({ ephemeral: true, content: 'Je ne peux pas kick ce membre !'})
                if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ ephemeral: true, content: 'Tu ne peux pas kick ce membre'})
                await user.send(`Tu viens d'être kick du serveur **${message.guild.name}** par ${message.user} pour **reason** : \`${reason}\``)

                const Embed = new Discord.EmbedBuilder()
                .setTitle('Kick')
                .setDescription(`
                Le membre ${message.user} a utilisé la commande \`/kick\` :\n
                > **Utilisateur Kick :** ${user}
                > **Raison du Kick :** \`${reason}\``)
                .setTimestamp()
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                await message.reply({embeds: [Embed]});
                await member.kick()
            }

            if(req[0].lang === 'English') {

                const user = args.getUser('user');
                if(!user) return await message.reply({content: 'Wanted to enter a valid user !', ephemeral: true});

                const member = message.guild.members.cache.get(user.id);
                if(!member) return await message.reply({ ephemeral: true, content: 'No members to kick !'});

                let reason = args.getString('reason');
                if(!reason) reason = 'No reason provided.';

                if(message.user.id === user.id)return message.reply({ ephemeral: true, content: 'Don\'t try to kick yourself !'});
                if((await message.guild.fetchOwner()).id === user.id) return message.reply({ ephemeral: true, content: 'Don\'t kick the server owner !'});
                if(member && !member?.kickable) return message.reply({ ephemeral: true, content: 'I can\'t kick this member !'});
                if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ ephemeral: true, content: 'You cannot kick this member !'});
                await user.send(`You have been kicked from the server **${message.guild.name}** by ${message.user} for **reason** : \`${reason}\``)

                const Embed = new Discord.EmbedBuilder()
                .setTitle('Kick')
                .setDescription(`
                Member ${message.user} used the command \`/kick\` :\n
                > **User Kicked :** ${user}
                > **Kick Reason :** \`${reason}\``)
                .setTimestamp()
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                await message.reply({embeds: [Embed]});
                await member.kick()
            }
        })
    }
}