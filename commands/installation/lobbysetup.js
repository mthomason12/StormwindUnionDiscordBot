const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lobbysetup')
		.setDescription('Sets up the lobby'),
	async execute(interaction) {

		const applyButton = new ButtonBuilder()
            .setCustomId('lobbyGuildApplication')
			.setLabel('Apply to Guild')
			.setStyle(ButtonStyle.Success);
        const guestButton = new ButtonBuilder()
            .setCustomId('lobbyGuestApplication')
			.setLabel('Request Access to Guest channels')
			.setStyle(ButtonStyle.Primary);            
        const rpButton = new ButtonBuilder()
            .setCustomId('lobbyRPApplication')
			.setLabel('Request Access to RP channels')
			.setStyle(ButtonStyle.Primary);  
        const pveButton= new ButtonBuilder()
            .setCustomId('lobbyPVEApplication')
			.setLabel('Request Access to PVE channels')
			.setStyle(ButtonStyle.Primary);              		

		const lobbyActionRow = new ActionRowBuilder().addComponents(applyButton, guestButton, rpButton, pveButton);

        const channel = interaction.member.client.channels.cache.get(config.channels.lobby);	

        channel.send({content: "\nWelcome to the Stormwind Union Discord Server.\n\n"
			+"[Check out our Website](<https://stormwindunion.shivtr.com>)\n"
			+"[Read our Handbook](<https://stormwindunion.shivtr.com/pages/handbook>)\n\n"
			+"Please select an option below.\n",
			components:[lobbyActionRow]});
		interaction.reply({content:"Lobby messages sent."});
	},
};
