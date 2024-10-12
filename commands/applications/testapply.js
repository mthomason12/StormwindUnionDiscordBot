const { SlashCommandBuilder, ActionRowBuilder, Events, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, hyperlink, GuildApplicationCommandManager } = require('discord.js');

// Used for testing new application code while keeping the existing /apply command active 

// This command is now deprecated, use a seperate test instance of the code instead

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testapply')
		.setDescription('Submits a guild application'),
	async execute(interaction) {

		const reasonInput = new StringSelectMenuBuilder()
			.setCustomId('reasonInput')
			.setPlaceholder("Hi! What would you like to do?")
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Apply to Guild')
					.setValue('guild-application'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Request Guest Access to Server')
					.setValue('request-guest'),												
		);			

		const reasonActionRow = new ActionRowBuilder().addComponents(reasonInput);

		await interaction.reply({components:[reasonActionRow]})
	},
};
