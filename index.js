const { IntentsBitField, Client, Collection } = require('discord.js');
const intents = new IntentsBitField(3276799);
const client = new Client({ intents });
const config = require('./config.json');
const LoadCommands = require('./Handlers/Commands');
const LoadEvents = require('./Handlers/Events');
const Anticrash = require('./Anticrash/anticrash');

client.commands = new Collection();
client.color = config.colorbot;

client.login(config.token);

LoadCommands(client);
LoadEvents(client);
Anticrash(client);