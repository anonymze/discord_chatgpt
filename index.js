const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
require('dotenv').config();

const handleCommand = require('./helpers/command');
const handleSelectMenu = require('./helpers/select-menu');

const flavioId = '269781481285615616';
const generalChannelId = '767805471951421452';

// Intents (what bot can do (role))
const myIntents = new Intents(process.env.INTENTS);

// client discord
const client = new Client({ intents: myIntents });

// interaction commands (pour réagir aux commandes)
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', function () {
    console.log('--- CHAT GPT ---');
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) handleCommand(client, interaction);
});

client.on('userUpdate', async (oldMember, newMember) => {
    const { id, avatar: avatarOld } = oldMember;
    const { avatar: avatarNew } = newMember;

    if (id === flavioId && avatarOld !== avatarNew) {
        const channel = client.channels.cache.get(generalChannelId);
        const user = client.users.cache.get(flavioId);

        const texts = [
            'Oui oui, vous ne rêvez pas. Flavien a encore changé sa photo de profil.',
            'Les roses sont rouges, les violettes sont bleues, Flavien est un chien (désolé c\'était pour la rime).',
            'Beep boop, une nouvelle propagande du général Francisco Flavino.',
            'Arrête de mettre ces choses dans tes narines.',
            'Non.',
        ]

        // Message
        const embededMessage = new MessageEmbed();
        embededMessage.setTitle(texts[Math.floor(Math.random() * texts.length)])
            .setColor('#2aa198')
            .setDescription('Nouvelle pp du grand maître.')
            .setImage(user.displayAvatarURL());

        channel.send({ embeds: [embededMessage] });
    }
});

client.login(process.env.TOKEN);



