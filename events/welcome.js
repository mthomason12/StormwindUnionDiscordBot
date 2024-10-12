const { Events } = require('discord.js');
const { PresenceUpdateStatus } = require('discord.js');

// Note - this is for future use and currently doesn't do anything

module.exports = {
	name: Events.GuildMemberAdd,
	once: true,
	execute(member) {
		console.log(`User ${member.displayName} has logged in`);
        const channel = member.client.channels.cache.get('1283877114080395297');
        channel.send("Welcome, ${member.displayName}, please type /apply if you to apply to the guild, or /request if you wish to request access to this server for another reason");
	},
};
