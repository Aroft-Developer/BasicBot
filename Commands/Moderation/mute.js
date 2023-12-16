const Discord  = require('discord.js')
const ms = require('ms')

module.exports = {

    name: 'mute',
    description: 'Mute a member',
    permission: Discord.PermissionFlagsBits.MuteMembers,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'user',
            description: 'User muted',
            required: false,
            autocomplete: false,
        },{
            type: 'string',
            name: 'time',
            description: 'Mute timed',
            required: false,
            autocomplete: false,
        },{
            type: 'string',
            name: 'reason',
            description: 'Reason for mute',
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

                const time = args.getString('time')
                if (!time) return message.reply({ ephemeral: true, content: 'Pas de temps !'})
                if(isNaN(ms(time))) return message.reply({ ephemeral: true, content: 'Pas le bon format !'})
                if(ms(time) > 2592000000) return message.reply({ ephemeral: true, content: 'Le mute ne peut pas durer plus de 30 jours !'})

                let reason = args.getString('reason')
                if(!reason) reason = 'Pas de raison fournie.'

                if (message.user.id === user.id) return message.reply({ ephemeral: true, content: 'Ne te mute pas tout seul !'})
                if((await message.guild.fetchOwner()).id === user.id) return message.reply({ephemeral: true, content:'Ne mute pas le propriétaire du serveur !'})
                if(!member.moderatable) return message.reply({ephemeral: true, content:'Je ne peux pas mute ce membre !'})
                if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ephemeral: true, content:'Tu ne peux pas mute ce membre !'})
                if(member.isCommunicationDisabled()) return message.reply({ephemeral: true, content: 'Ce membre est déjà mute !'})
                await user.send(`Tu as été mute du serveur **${message.guild.name}** pendant \`${time}\` par ${message.user} pour la **raison** : \`${reason}\``)

                const Embed = new Discord.EmbedBuilder()
                .setTitle('Mute')
                .setDescription(`
                Le membre ${message.user} a utilisé la commande \`/mute\` :\n
                > **Utilisateur Mute :** ${user}
                > **Temps du Mute :** \`${time}\`
                > **Raison du Mute :** \`${reason}\``)
                .setTimestamp()
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})

                await message.reply({embeds: [Embed]})
                await member.timeout(ms(time), reason)
            }

            if(req[0].lang === 'English') {
                const user = args.getUser('user')
                if(!user)return message.reply({content: 'Wanted to enter a valid user !', ephemeral: true})

                const member = message.guild.members.cache.get(user.id)
                if(!member) return message.reply({ ephemeral: true, content: 'No members to ban !'})

                const time = args.getString('time')
                if (!time) return message.reply({ ephemeral: true, content: 'No time !'})
                if(isNaN(ms(time))) return message.reply({ ephemeral: true, content: 'Not the right format !'})
                if(ms(time) > 2592000000) return message.reply({ ephemeral: true, content: 'The mute cannot last more than 30 days !'})

                let reason = args.getString('reason')
                if(!reason) reason = 'No reason provided.'

                if (message.user.id === user.id) return message.reply({ ephemeral: true, content: 'Don\'t mute yourself !'})
                if((await message.guild.fetchOwner()).id === user.id) return message.reply({ephemeral: true, content:'Do not mute the server owne !'})
                if(!member.moderatable) return message.reply({ephemeral: true, content:'I can\'t mute this member !'})
                if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ephemeral: true, content:'You cannot transfer this member !'})
                if(member.isCommunicationDisabled()) return message.reply({ephemeral: true, content: 'This member is already mutated !'})
                try {await user.send(`You have been mute from the server **${message.guild.name}** during \`${time}\` by ${message.user} for **reason** : \`${reason}\``)} catch(err) {}

                const Embed = new Discord.EmbedBuilder()
                .setTitle('Mute')
                .setDescription(`
                Member ${message.user} used the command \`/mute\` :\n
                > **User Mute :** ${user}
                > **Time Mute :** \`${time}\`
                > **Reason Mute :** \`${reason}\``)
                .setTimestamp()
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                
                await message.reply({embeds: [Embed]})
                await member.timeout(ms(time), reason)
            }
        })

    }
}