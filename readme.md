# Stormwind Union Discord Bot

This is a custom Discord bot for the World of Warcraft [Stormwind Union](https://stormwindunion.shivtr.com/) Guild on Cenarion Circle.

## Setup

This bot is designed to run on a single server at a time.  Multiple servers require multiple bot instances.  As we only need one server, there's no plan to change this at this time.

### Discord Application

Create a Discord Application for each bot instance at https://discord.com/developers/applications  

Scopes
- applications.commands


### Config Files

Use the .example files in /config to create a channels.json and token.json in that directory.

Configure channels.json with the relevant channel IDs
Configure token.json with your bot's authentication info obtained when setting it up as a Discord Application above

### Deploy Commands to Discord

Deploy the bot's commands to Discord using
```node deploy-commands.js```
This typically takes up to 30 minutes for Discord to pick up and allow users to use the commands

### Set up Discord Permissions

The bot is designed to run as an administrator, in order to be able to manipulate user roles and see every channel it needs to see
There's probably ways to do it with less permissions but that requires effort :P   

The lobby channel (set in channels.json) should not allow any users to post to it.  It's designed to hold a single message from the bot with the option buttons displayed to new users.

The command /lobbysetup should be restricted to a bot-commands channel

The bot-commands channel should be restricted to server admins

The applications channel should be restricted to those staff who need to see user requests and applications

Ensure there are groups for Members, Guests, PVE Guests, and RP Guests

As the Discord invite code will now be public, the only channel new users should be able to see is the lobby channel, ensuring they cannot post anywhere until they've been approved by a staff member.

# Run the Bot

Note that this bot is designed to run under a process manager of some kind, for example [PM2](https://pm2.keymetrics.io/).

```pm2 start index.js```

For testing, you can use

```node index.js```

## Commands

/lobbysetup - sends a message to the Lobby channel (configured in channels.json) welcoming new users.

The suggested method to restrict access to commands is to configure Discord to only allow those commands from specific channels, and restrict access to those channels to those users who you want to use the command.



