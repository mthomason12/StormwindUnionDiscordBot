const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
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
        channel.send({content: "Welcome to the Stormwind Union Discord Server.\n"
			+"Please select an option below."});
		const websiteEmbed = new EmbedBuilder()
			.setTitle("Check out our website")
			.setURL("https://stormwindunion.shivtr.com/");
		const handbookEmbed = new EmbedBuilder()
			.setTitle("Read our Handbook")
			.setURL("https://stormwindunion.shivtr.com/pages/handbook");
		channel.send({embeds:[websiteEmbed, handbookEmbed]});
		channel.send({components:[lobbyActionRow]});
		interaction.reply({content:"Lobby messages sent."})
	},
};
