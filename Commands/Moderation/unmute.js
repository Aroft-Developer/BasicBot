const Discord  = require('discord.js')

module.exports = {

    name: 'unmute',
    description: 'Unmute a mmember',
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'user',
            description: 'User unmuted',
            required: false,
            autocomplete: false,
        },{
            type: 'string',
            name: 'reason',
            description: 'Reason for unmute',
            required: false,
            autocomplete: false,
        }
    ],

    async run(client, message, args) {

        const db = client.db
        
        db.query(`SELECT * FROM langue WHERE guild = '${message.guild.id}'`, async (err, req) => {

            if(req[0].lang === 'French') {
         
                const user = args.getUser('user')
                if(!user)return message.reply({content: 'Veuliez saisir un utilisateur valide !', ephemeral: true})

                const member = message.guild.members.cache.get(user.id)
                if(!member) return message.reply({ ephemeral: true, content: 'Pas de membre à bannir !'})

                let reason = args.getString('raison')
                if(!reason) reason = 'Pas de raison fournie.'

                if(!member.moderatable) return message.reply({ephemeral: true, content:'Je ne peux pas mute ce membre !'})
                if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ephemeral: true, content:'Tu ne peux pas mute ce membre !'})
                if(!member.isCommunicationDisabled()) return message.reply({ephemeral: true, content:'Ce membre est pas mute !'})

                try {await user.send(`Tu as été unmute du serveur **${message.guild.name}** par ${message.user} pour la **raison** : \`${reason}\``)} catch(err) {}

                const Embed = new Discord.EmbedBuilder()
                .setTitle('Unmute')
                .setDescription(`
                Le membre ${message.user} a utilisé la commande \`/unmute\` :\n
                > **Utilisateur démute :** ${user}
                > **Raison du démute :** \`${reason}\``)
                .setTimestamp()
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                await message.reply({embeds: [Embed]})

                await member.timeout(null, reason)
            }

            if(req[0].lang === 'English') {
                
                const user = args.getUser('user')
                if(!user)return message.reply({content: 'Wanted to enter a valid user !', ephemeral: true})

                const member = message.guild.members.cache.get(user.id)
                if(!member) return message.reply({ ephemeral: true, content: 'No members to unmute !'})

                let reason = args.getString('reason')
                if(!reason) reason = 'No reason provided.'

                if(!member.moderatable) return message.reply({ephemeral: true, content:'Je ne peux pas mute ce membre !'})
                if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ephemeral: true, content:'Tu ne peux pas mute ce membre !'})
                if(!member.isCommunicationDisabled()) return message.reply({ephemeral: true, content:'Ce membre est pas mute !'})

                await user.send(`You have been unmute from the server **${message.guild.name}** by ${message.user} for **reason** : \`${reason}\``)

                const Embed = new Discord.EmbedBuilder()
                .setTitle('Unmute')
                .setDescription(`
                Member ${message.user} used the command \`/unmute\` :\n
                > **User Unmute :** ${user}
                > **Reason Unmute :** \`${reason}\``)
                .setTimestamp()
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                await message.reply({embeds: [Embed]})

                await member.timeout(null, reason)
            }
        })
    }
}