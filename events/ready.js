const { Events } = require('discord.js');
const { PresenceUpdateStatus } = require('discord.js');

// Note - this is for future use and currently doesn't do anything

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setPresence({ activities: [{ name: 'Welcoming new users' }], status: PresenceUpdateStatus.Idle });
	},
};
