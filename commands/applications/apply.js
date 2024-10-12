const { SlashCommandBuilder, ActionRowBuilder, Events, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, hyperlink } = require('discord.js');

// This command is deprecated, users will now use buttons from the lobby 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('apply')
		.setDescription('Submits a guild application'),
	async execute(interaction) {

		const modal = new ModalBuilder()
			.setCustomId('guildAppModal')
			.setTitle('Guild Application');

		// Create the text input components

		const charnameInput = new TextInputBuilder()
		.setCustomId('charNameInput')
		// The label is the prompt the user sees for this input
		.setLabel("Character Name (in WoW)")
		// Short means only a single line of text
		.setStyle(TextInputStyle.Short);

		const serverInput = new TextInputBuilder()
		.setCustomId('serverNameInput')
		// The label is the prompt the user sees for this input
		.setLabel("Server Name")
		// Short means only a single line of text
		.setStyle(TextInputStyle.Short);

		const charDisplayNameInput = new TextInputBuilder()
		.setCustomId('charDisplayNameInput')
		// The label is the prompt the user sees for this input
		.setLabel("Character Name (full)")
		// Short means only a single line of text
		.setStyle(TextInputStyle.Short);		
		
		const letterInput = new TextInputBuilder()
		.setCustomId('letterInput')
		// The label is the prompt the user sees for this input
		.setLabel("Your application letter to the Commander")
		// Short means only a single line of text
		.setStyle(TextInputStyle.Paragraph);			

		const firstActionRow = new ActionRowBuilder().addComponents(charnameInput)
		const secondActionRow = new ActionRowBuilder().addComponents(serverInput);;
		const thirdActionRow = new ActionRowBuilder().addComponents(charDisplayNameInput);		
		const fourthActionRow = new ActionRowBuilder().addComponents(letterInput);				

		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow)

        //channel.send(`${interaction.member.displayName} is filling out an application...`);

		await interaction.showModal(modal);

		console.log(`Processing application...`);	

		// Get the Modal Submit Interaction that is emitted once the User submits the Modal
		const submitted = await interaction.awaitModalSubmit({
			// Timeout after a minute of not receiving any valid Modals
			time: 60000,
			// Make sure we only accept Modals from the User who sent the original Interaction we're responding to
			filter: i => i.user.id === interaction.user.id,
		}).catch(error => {
			// Catch any Errors that are thrown (e.g. if the awaitModalSubmit times out after 60000 ms)
			console.error(error)
			return null
		})

		if (submitted) {
			const charNameInput = submitted.fields.getTextInputValue('charNameInput');
			const serverNameInput = submitted.fields.getTextInputValue('serverNameInput');
			const displayNameInput = submitted.fields.getTextInputValue('charDisplayNameInput');			
			const letterInput = submitted.fields.getTextInputValue('letterInput');
			const url = `https://worldofwarcraft.blizzard.com/en-us/character/us/${serverNameInput}/${charNameInput}`
			const id = submitted.member.id;

			const applicationEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle('Guild Application')
				.setDescription(hyperlink(`${charNameInput}-${serverNameInput}`,url))
				.addFields(
					{ name: 'Discord User', value: `<@${id}>`},
					{ name: 'Full Character Name', value: displayNameInput }
				)
				.addFields(
					{ name: 'Application Letter', value: letterInput }
				)
				.setTimestamp();

			const channel = interaction.member.client.channels.cache.get('1283877277649731707');				
			channel.send({embeds:[applicationEmbed]});

			/*var content = `<@${id}> has submitted an application for ${charNameInput}-${serverNameInput}`;
			content += `\n${letterInput}`;
			console.log(`${content}`);
			channel.send(content);*/

			await submitted.reply({
				content: "Thank you for your application. Please wait here for a reply."
			  });			
		  }
	},
};
