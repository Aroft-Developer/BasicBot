const { InteractionType } = require('discord.js');

module.exports = async (client, interaction) => {

    if(interaction.type === InteractionType.ApplicationCommandAutocomplete) {

        const a = interaction.options.getFocused();

        if (interaction.commandName === 'language') {
    
            const choices = ['French', 'English'];
            const b = choices.filter(c => c.includes(a));
            await interaction.respond(a === "" ? b.map(c => ({ name: c, value: c })) : b.map(c => ({ name: c, value: c })));
        }
    }

    if(interaction.type === InteractionType.ApplicationCommand) {
        
        const command = client.commands.get(interaction.commandName);
        command.run(client, interaction, interaction.options);
    }
}