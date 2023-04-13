const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription('Renvoie le nombre de ping'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        await interaction.reply('Pong');
        return interaction.editReply(`Ton ping est de ${interaction.client.ws.ping} ms.`);
    }
}