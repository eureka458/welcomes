// Import the discord.js module
const Discord = require('discord.js');

// Import the configuration from the json file
const config = require('./config.json');

// Create an instance of a Discord client
const client = new Discord.Client();


client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setActivity(`Welcoming Users!`);
  });
  
// Create an event listener for when a member joins
client.on('guildMemberAdd', member => {
    // retrieves user name from our member
    var memberName = member.toString();
    var wMessage = config.welcomeMessage.replace(config.usertext, memberName);

    if (config.welcomeChannelId) {
        var welcomeChannel = member.guild.channels.get(config.welcomeChannelId);
        if (welcomeChannel) {
            welcomeChannel.send(wMessage);
            return;
        }
    }
    member.guild.defaultChannel.send(wMessage);
});

// Create an event listener for when a member leaves
client.on('guildMemberRemove', member => {
    // retrieves user name from our member
    var memberName = member.toString();
    var gMessage = config.goodbyeMessage.replace(config.usertext, memberName);

    if (config.welcomeChannelId) {
        var welcomeChannel = member.guild.channels.get(config.welcomeChannelId);
        if (welcomeChannel) {
            welcomeChannel.send(gMessage);
            return;
        }
    }

    member.guild.defaultChannel.send(gMessage);
});

// Log our bot in
client.login(config.token);