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

