const Discord  = require('discord.js');

module.exports = {

    name: 'ban',
    description: 'Ban a member',
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'user',
            description: 'User banned',
            required: false,
            autocomplete: false,
        },{
            type: 'string',
            name: 'reason',
            description: 'Reason for ban',
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

                if(message.user.id === user.id)return message.reply({ ephemeral: true, content: 'Essaie pas de te ban pas !'});
                if((await message.guild.fetchOwner()).id === user.id) return message.reply({ ephemeral: true, content: 'Ne ban pas le propriétaire du serveur !'});
                if(member && !member?.bannable) return message.reply({ ephemeral: true, content: 'Je ne peux pas bannir ce membre !'});
                if(member && !member.bannable) return message.reply({ ephemeral: true, content: 'Vous ne pouvez pas bannir cet utilisateur !'});
                if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ ephemeral: true, content: 'Tu ne peux pas bannir ce membre !'});
                if((await message.guild.bans.fetch()).get(user.id)) return message.reply({ ephemeral: true, content:'Ce membre est déjà ban !'})
                await user.send(`Tu as été banni du serveur **${message.guild.name}** par ${message.user} pour la **raison** : \`${reason}\``)
                const Embed = new Discord.EmbedBuilder()
                .setTitle('Ban')
                .setDescription(`
                Le membre ${message.user} a utilisé la commande \`/ban\` :\n
                > **Utilisateur Banni :** ${user}
                > **Raison du Ban :** \`${reason}\``)
                .setTimestamp()
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                await message.reply({embeds: [Embed]});
                await message.guild.bans.create(user.id, {reason: reason});
            }

            if(req[0].lang === 'English') {

                const user = args.getUser('user');
                if(!user) return await message.reply({content: 'Wanted to enter a valid user !', ephemeral: true});

                const member = message.guild.members.cache.get(user.id);
                if(!member) return await message.reply({ ephemeral: true, content: 'No members to ban !'});

                let reason = args.getString('reason');
                if(!reason) reason = 'No reason provided.';

                if(message.user.id === user.id)return message.reply({ ephemeral: true, content: 'Don\'t try to ban yourself !'});
                if((await message.guild.fetchOwner()).id === user.id) return message.reply({ ephemeral: true, content: 'Don\'t ban the server owner !'});
                if(member && !member?.bannable) return message.reply({ ephemeral: true, content: 'I can\'t ban this member !'});
                if(member && !member.bannable) return message.reply({ ephemeral: true, content: 'You cannot ban this user !'});
                if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ ephemeral: true, content: 'You cannot ban this member !'});
                if((await message.guild.bans.fetch()).get(user.id)) return message.reply({ ephemeral: true, content:"This member is already banned !"})
                await user.send(`You have been banned from the server **${message.guild.name}** by ${message.user} for **reason** : \`${reason}\``)

                const Embed = new Discord.EmbedBuilder()
                .setTitle('Ban')
                .setDescription(`
                Member ${message.user} used the command \`/ban\` :\n
                > **User Banned :** ${user}
                > **Ban Reason :** \`${reason}\``)
                .setTimestamp()
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                await message.reply({embeds: [Embed]});
                await message.guild.bans.create(user.id, {reason: reason});
            }
        })
    }
}