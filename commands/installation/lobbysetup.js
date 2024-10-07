const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuOptionBuilder } = require('discord.js');
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
        channel.send({content: "Welcome to the Stormwind Union Discord Server. Please select an option below."});
		channel.send({components:[lobbyActionRow]});
	},
};
