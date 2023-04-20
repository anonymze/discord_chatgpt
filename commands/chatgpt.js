const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed } = require('discord.js');
const fetchedData = require('../api/fetch.js');

const randomColors = [
    '#666',
    '#efef',
    '#9ea',
    '#B3B',
    '#A9F',
    '#A19',
    '#8E1',
    '#A7A',
    '#04A',
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chatgpt")
        .setDescription("Demande quelquechose à l'IA")
        .addStringOption(option => option.setName('texte').setDescription('Pose ta demande').setRequired(true))
    ,
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {

        await interaction.deferReply();

        const textObject = interaction.options.get('texte');
        const text = textObject.value;

        let response = '';

        try {
            // Fetch data
            response = await fetchedData(text);
        } catch (e) {
            console.log(e.response.status);
            console.log(e.response.statusText);
            response = 'Le model IA n\'est pas disponible actuellement. Désolé le sang...' + `\n\nStatus code : ${e.response.status}`;
        }

        const embededMessage = (new MessageEmbed())
            .setTitle('Question')
            .setColor(randomColors[Math.floor(Math.random() * randomColors.length)])
            .setDescription('```' + text + '```')
            .addFields(
                { name: 'Réponse', value: '```' + response + '```' },
            )
            ;

        await interaction.editReply({
            embeds: [embededMessage]
        });
    }
} 