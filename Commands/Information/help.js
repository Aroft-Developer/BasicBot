const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {

    name: 'help',
    description: 'Allows you to have the list of orders',
    permission: Discord.PermissionFlagsBits.SendMessages,
    dm: true,

    async run(client, message) {

        const db = client.db

        db.query(`SELECT * FROM langue WHERE guild = '${message.guild.id}'`, async (err, req) => {

            if(req[0].lang === 'French') {

                const gestion = new Discord.EmbedBuilder()
                .setTitle(`・Gestion`)
                .setColor(client.color)
                .setDescription(`
                > \`/language\` ➔ Permet de changer la langue du bot.`)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter({ text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

                const info = new Discord.EmbedBuilder()
                .setTitle(`・Information`)
                .setColor(client.color)
                .setDescription(`
                > \`/bot\` ➔ Montre les informations du bot.
                > \`/help\` ➔ Obtenez de l'aide.
                > \`/ping\` ➔ Montre la latence du bot.
                > \`/user\` ➔ Donne des informations sur le membre.
                > \`/role\` ➔ Donne des informations sur le rôle.
                > \`/server\` ➔ Obtenir plusieurs informations sur le serveur.
                > \`/channel\` ➔ Donne des informations sur le salon.`)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter({ text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

                const modo = new Discord.EmbedBuilder()
                .setTitle(`・Modération`)
                .setColor(client.color)
                .setDescription(`
                > \`/ban\` ➔ Ban un membre.
                > \`/kick\` ➔ Kick un membre.
                > \`/lock\` ➔ Lock un salon.
                > \`/mute\` ➔ Mute un membre.
                > \`/unban\` ➔ Unban un utilisateur.
                > \`/unlock\` ➔ Unlock un salon.
                > \`/unmute\` ➔ Unmute un membre.`)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter({ text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

                const menu = new Discord.SelectMenuBuilder()
                .setCustomId('help')
                .addOptions([
                    {
                        label: 'Accueil',
                        value: 'accueil',
                        description: 'Revenir à l\'accueil'
                    },{
                        label: 'Gestion',
                        value: 'admin',
                        description: 'Commande de Gestion'
                    },{
                        label: 'Information',
                        value: 'info',
                        description: 'Commande d\'Information'
                    },{
                        label: 'Modération',
                        value: 'modo',
                        description: 'Commande de Modération'
                    }
                ])
            
                const menuRow = new Discord.ActionRowBuilder().addComponents(menu);
                const EmbedHelp = new Discord.EmbedBuilder()
            
                .setTitle(`・Menu help`)
                .setDescription(`
                Voici le menu help ! Vous n'avez cas cliquer sur la catégorie de commande correspondante et je serai ravi de vous aider !
            
                **Catégories** : \`3\`
                **Commandes** : \`16\`
            
                __**Catégorie des commandes :**__
            
                ・ Gestion
                ・ Information
                ・ Modération

                [**Ajouter le bot**](${config.linkbot})`)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(client.color)
                .setFooter({ text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            
                message.reply({ embeds: [EmbedHelp], components: [menuRow] }).then( msg => {
                
                    const collector = msg.createMessageComponentCollector();
                
                    collector.on('collect', async interaction => {
                    
                        if(interaction.isSelectMenu()) {
                        
                            if(interaction.user.id !== message.user.id) return interaction.reply({content: `Vous ne pouvez pas utiliser ce select menu !`, ephemeral: true});
                        
                            if(interaction.values[0] === 'accueil'){
                                interaction.update({ embeds: [EmbedHelp], components: [menuRow] });
                            }
                            if(interaction.values[0] === 'admin'){
                                interaction.update({ embeds: [gestion], components: [menuRow] })
                            }
                            if(interaction.values[0] === 'info'){
                                interaction.update({ embeds: [info], components: [menuRow] });
                            }
                            if(interaction.values[0] === 'modo'){
                                interaction.update({ embeds: [modo], components: [menuRow] });
                            }
                        }
                    })
                })
            }
            if(req[0].lang === 'English') {

                const gestion = new Discord.EmbedBuilder()
                .setTitle(`・Gestion`)
                .setColor(client.color)
                .setDescription(`
                > \`/language\` ➔ Allows you to change the bot language.`)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter({ text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

                const info = new Discord.EmbedBuilder()
                .setTitle(`・Information`)
                .setColor(client.color)
                .setDescription(`
                > \`/bot\` ➔ Shows bot information.
                > \`/help\` ➔ Get help.
                > \`/ping\` ➔ Shows bot latency.
                > \`/user\` ➔ Gives information about the member.
                > \`/role\` ➔ Provides information about the role.
                > \`/server\` ➔ Obtain several information about the server
                > \`/report\` ➔ Report a problem on the bot.
                > \`/channel\` ➔ Gives information about channel.`)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter({ text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

                const modo = new Discord.EmbedBuilder()
                .setTitle(`・Moderation`)
                .setColor(client.color)
                .setDescription(`
                > \`/ban\` ➔ Ban a member.
                > \`/kick\` ➔ Kick a member.
                > \`/lock\` ➔ Lock a channel.
                > \`/mute\` ➔ Mute a member.
                > \`/unban\` ➔ Unban a user.
                > \`/unlock\` ➔ Unlock a channel.
                > \`/unmute\` ➔ Unmute a member.`)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter({ text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

                const menu = new Discord.SelectMenuBuilder()
                .setCustomId('help')
                .addOptions([
                    {
                        label: 'Home',
                        value: 'accueil',
                        description: 'Return to home'
                    },{
                        label: 'Gestion',
                        value: 'admin',
                        description: 'Administration Command'
                    },{
                        label: 'Information',
                        value: 'info',
                        description: 'Information Command'
                    },{
                        label: 'Moderation',
                        value: 'modo',
                        description: 'Moderation Commands'
                    }
                ])
            
                const menuRow = new Discord.ActionRowBuilder().addComponents(menu);
                const EmbedHelp = new Discord.EmbedBuilder()
            
                .setTitle(`・Menu help`)
                .setDescription(`
                Here is the help menu! You just have to click on the corresponding order category and I will be happy to help you !
            
                **Category** : \`3\`
                **Commands** : \`16\`
            
                __**Commands Category :**__
            
                ・ Administration
                ・ Information
                ・ Moderation

                [**Add Bot**](${config.linkbot})`)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(client.color)
                .setFooter({ text: `${client.user.username} © 2023`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            
                message.reply({ embeds: [EmbedHelp], components: [menuRow] }).then( msg => {
                
                    const collector = msg.createMessageComponentCollector();
                
                    collector.on('collect', async interaction => {
                    
                        if(interaction.isSelectMenu()) {
                        
                            if(interaction.user.id !== message.user.id) return interaction.reply({content: `You cannot use this select menu !`, ephemeral: true});
                        
                            if(interaction.values[0] === 'accueil'){
                                interaction.update({ embeds: [EmbedHelp], components: [menuRow] });
                            }
                            if(interaction.values[0] === 'admin'){
                                interaction.update({ embeds: [gestion], components: [menuRow] })
                            }
                            if(interaction.values[0] === 'info'){
                                interaction.update({ embeds: [info], components: [menuRow] });
                            }
                            if(interaction.values[0] === 'modo'){
                                interaction.update({ embeds: [modo], components: [menuRow] });
                            }
                            if(interaction.values[0] === 'music'){
                                interaction.update({ embeds: [music], components: [menuRow] });
                            }
                        }
                    })
                })
            }
        })
    }
}