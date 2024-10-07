const { Events } = require('discord.js');
const util = require('util');
const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, hyperlink } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

		if (interaction.isChatInputCommand())
		{
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
				} else {
					await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				}
			}
		}

		if (interaction.isStringSelectMenu())
		{
			console.log(`Got a string select menu:`);
			console.log(util.inspect(interaction));
			if (interaction.customId === 'reasonInput' && interaction.values.includes('guild-application'))
			{
				beginGuildApplication(interaction);
			}
			if (interaction.customId === 'serverInput')
			{
				serverSelect(interaction);
			}
		}

		if (interaction.isModalSubmit())
		{
			console.log(`Got a modal for ${interaction.customId}`);			
			if (interaction.customId === 'guildAppModal')
			{
				guildApplication(interaction);
			}				
		}

		return;
	},
};

async function beginGuildApplication(interaction)
{
	console.log('Reason selected - apply to guild')
	const serverList=['Argent Dawn',
					  'Blackwater Raiders',
					  'Cenarion Circle',
					  'Earthen Ring',
					  'Emerald Dream',
					  'Farstriders','Feathermoon',
					  'Kirin Tor',
					  'Lightninghoof',
					  'Maelstrom', 'Moon Guard',
					  'Ravenholdt',
					  'Scarlet Crusade', 'The Scryers', 'Sentinels', 'Shadow Council', 'Silver Hand', 'Sisters of Elune', 
					  'Steamwheedle Cartel',
					  'Thorium Brotherhood',
					  'Twisting Nether',
					  'The Venture Co',
					  'Wyrmrest Accord',
					  'Other/Not Listed'
	]
	const serverInput = new StringSelectMenuBuilder()
		.setCustomId('serverInput')
		.setPlaceholder("Which server is your character on?");
		/*
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel('Cenarion Circle')
				.setValue('cenarion-circle'),
			new StringSelectMenuOptionBuilder()
				.setLabel('Sisters of Elune')
				.setValue('sisters-of-elune'),	
		);*/

	for (server of serverList)
	{
		serverInput.addOptions(
			new StringSelectMenuOptionBuilder()
			.setLabel(server)
			.setValue(serverURL(server))
		);
	}

	const serverActionRow = new ActionRowBuilder().addComponents(serverInput);

	await interaction.reply({components:[serverActionRow]})	
}

async function serverSelect(interaction)
{
	const modal = new ModalBuilder()
		.setCustomId('guildAppModal')
		.setTitle('Guild Application');

	// Create the text input components

	const charnameInput = new TextInputBuilder()
		.setCustomId('charNameInput')
		// The label is the prompt the user sees for this input
		.setLabel("Character Name (exactly as it is in WoW)")
		// Short means only a single line of text
		.setStyle(TextInputStyle.Short);

	const charDisplayNameInput = new TextInputBuilder()
		.setCustomId('charDisplayNameInput')
		// The label is the prompt the user sees for this input
		.setLabel("Character Name (full, in character name)")
		// Short means only a single line of text
		.setStyle(TextInputStyle.Short);	
		
	const serverNameInput = new TextInputBuilder()
		.setCustomId('serverNameInput')
		// The label is the prompt the user sees for this input
		.setLabel("Server Name")
		.setValue(interaction.values[0])
		// Short means only a single line of text
		.setStyle(TextInputStyle.Short);			

	const letterInput = new TextInputBuilder()
		.setCustomId('letterInput')
		// The label is the prompt the user sees for this input
		.setLabel("Your application letter to the Commander")
		// Short means only a single line of text
		.setStyle(TextInputStyle.Paragraph);			

	const firstActionRow = new ActionRowBuilder().addComponents(charnameInput);
	const secondActionRow = new ActionRowBuilder().addComponents(serverNameInput);	
	const thirdActionRow = new ActionRowBuilder().addComponents(charDisplayNameInput);		
	const fourthActionRow = new ActionRowBuilder().addComponents(letterInput);				

	modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow)

	//channel.send(`${interaction.member.displayName} is filling out an application...`);

	await interaction.showModal(modal);

	console.log(`Processing application from ${interaction.member.displayName}...`);	
}

async function guildApplication(interaction)
{
	const submitted = interaction;
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

function serverURL(server)
{
	server = server.replace(' ','-');
	server = server.replace('\'','');
	return server;
}
