# Stormwind Union Discord Bot

This is a custom Discord bot for the World of Warcraft [Stormwind Union](https://stormwindunion.shivtr.com/) Guild on Cenarion Circle.

## Setup

This bot is designed to run on a single server at a time.  Multiple servers require multiple bot instances.  As we only need one server, there's no plan to change this at this time.

### Discord Application

Create a Discord Application for each bot instance at https://discord.com/developers/applications  

This should be set up as a *user installation*, not *guild installation*

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

### Commands

/apply - deprecated
/testapply - deprecated
/lobbysetup - sends a message to the Lobby channel (configured in channels.json) welcoming new users.



