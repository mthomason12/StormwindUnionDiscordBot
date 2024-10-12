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
			
		const websiteButton = new ButtonBuilder()
			.setLabel('Our Website')
			.setURL('https://stormwindunion.shivtr.com')
			.setStyle(ButtonStyle.Link);

		const handbookButton = new ButtonBuilder()
			.setLabel(`Officer's Handbook`)
			.setURL('https://stormwindunion.shivtr.com/pages/handbook')
			.setStyle(ButtonStyle.Link);
			
		const linksActionRow = new ActionRowBuilder().addComponents(websiteButton, handbookButton);
		const lobbyActionRow = new ActionRowBuilder().addComponents(applyButton, guestButton, rpButton, pveButton);

        const channel = interaction.member.client.channels.cache.get(config.channels.lobby);	

        channel.send({content: "_ _\nWelcome to the Stormwind Union Discord Server.\n\n"
			+"Please select an option below, and check out the links for our website and Officer's Handbook\n_ _\n",
			components:[linksActionRow,lobbyActionRow]});
		interaction.reply({content:"Lobby messages sent."});
	},
};
