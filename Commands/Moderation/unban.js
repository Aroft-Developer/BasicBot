const Discord  = require('discord.js');

module.exports = {

    name: 'unban',
    description: 'Unban a member',
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'user',
            description: 'User unbanned',
            required: false,
            autocomplete: false,
        },{
            type: 'string',
            name: 'reason',
            description: 'Reason for unban',
            required: false,
            autocomplete: false,
        }
    ],

    async run(client, message, args) {

        const db = client.db

        db.query(`SELECT * FROM langue WHERE guild = '${message.guild.id}'`, async (err, req) => {

            if(req[0].lang === 'French') {
         
                const user = args.getUser('user');
                if(!user)return await message.reply({content: 'Veuliez saisir un utilisateur valide !', ephemeral: true});

                let reason = args.getString('reason');
                if(!reason) reason = 'Pas de raison fournie.';

                if (!(await message.guild.bans.fetch()).get(user.id)) return await message.reply({ephemeral: true, content:'Cette utilisateur n\'est pas banni !'});

                try {await user.send(`Tu as été débanni du serveur **${message.guild.name}** par ${message.user} pour la **raison** : \`${reason}\``)} catch(err) {};

                const Embed = new Discord.EmbedBuilder()
                .setTitle("Unban")
                .setDescription(`
                Le membre ${message.user} a utiliser la commande \`/unban\` :\n
                > **Utilisateur Unban :** ${user}
                > **Raison de l'Unban :** \`${reason}\``)
                .setTimestamp()
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                await message.reply({embeds: [Embed]});
                message.guild.members.unban(user, reason);
            }

            if(req[0].lang === 'English') {
                const user = args.getUser('user');
                if(!user)return await message.reply({content: 'Wanted to enter a valid user !', ephemeral: true});

                let reason = args.getString('reason');
                if(!reason) reason = 'No reason provided.';

                if (!(await message.guild.bans.fetch()).get(user.id)) return await message.reply({ephemeral: true, content:'Cette utilisateur n\'est pas banni !'});

                try {await user.send(`You have been unbanned from the server **${message.guild.name}** by ${message.user} for **reason** : \`${reason}\``)} catch(err) {};

                const Embed = new Discord.EmbedBuilder()
                .setTitle('Unban')
                .setDescription(`
                Member ${message.user} used the command \`/unban\` :\n
                > **User Unban :** ${user}
                > **Reason Unban :** \`${reason}\``)
                .setTimestamp()
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                await message.reply({embeds: [Embed]});
                message.guild.members.unban(user, reason);
            }
        })

    }
}