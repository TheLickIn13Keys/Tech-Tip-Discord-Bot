// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
const path = require('path');
const Discord = require("discord.js");
const DBL = require("dblapi.js");
const db = require('quick.db');;
const ytdl = require('ytdl-core');
var gis = require('g-i-s');
var stringSimilarity = require('string-similarity');
const AntiSpam = require('discord-anti-spam');




module.exports = async (client, message) => {

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;
  var temp = message.content.toString();
  var message1 = temp.toLowerCase();
  //const youtubePlayer = new MusicBotAddon.YoutubePlayer(YOUTUBE_API_KEY, options);
  //console.log(message.content);
  //youtubePlayer.onMessagePrefix(message, "tech! ");
  const settings = message.settings = client.getSettings(message.guild);
  if (message.content === 'lttstore' || message.content === 'lttstore.com') {
      message.channel.send('Remember to go to lttstore.com to get some epic merch \nhttps://www.lttstore.com/')
  };
  if (message.content === 'bruh') {
      if (message.author.bot) return;
      if (settings["replyToBruh"] == "false") {
          return;
      } else {
          message.channel.send("linus says bruh");
          message.channel.send("https://cdn.discordapp.com/attachments/642568249300615198/750383457590313091/D7ShRPYXoAA-XXB.jpg");
      }
  };

  if (message1 === 'linus' || message1 === 'tech tip') {
      message.react('660607734017818624');
  }
  if (message1 === 'thank you linus' || message1 === 'thanks linus' || message1 === 'thanks tech tip') {
      message.channel.send("np senpai");
  }

  if (message1 === 'can i have a tech tip' || message1 === 'can i have a tech tip?' || message1 === 'tech tip pls' || message1 === 'pls tech tip' || message1 === 'gimme a tech tip' || message1 === 'i need a tech tip') {
    message.channel.startTyping();

    var max = db.get('tipnumber');
    var max1 = db.get('sponnumber');


    rand1 = Math.floor(Math.random() * (max1 - 1)) + 1;
    rand = Math.floor(Math.random() * (max - 1)) + 1;

    while (!(db.has(`tip_${rand}`))) {

        rand = Math.floor(Math.random() * (max - 1)) + 1;
        
    }


    var tipToSearchFor = db.get(`tip_${rand}.tip`);
    gis(tipToSearchFor, logResults);

    function logResults(error, results) {
        if (error) {
            console.log(error);
        } else {
            const embed = new Discord.MessageEmbed()
                .addField('tech tip #' + db.get(`tip_${rand}.tipnum`) + ':', db.get(`tip_${rand}.tip`))
                .setColor(0xdb4105)
                .setImage(results[0].url)
                .addField("This tech tip is brought to you by:", db.get(`tip_${rand}.usertag`) + " and " + db.get(`sponsor_${rand1}`));
            message.channel.send(embed);
            message.channel.stopTyping();
        }
    }

  }

  /*const antiSpam = new AntiSpam({
    warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
    kickThreshold: settings["spamKickThreshold"], // Amount of messages sent in a row that will cause a ban.
    banThreshold: settings["spamBanThreshold"], // Amount of messages sent in a row that will cause a ban.
    maxInterval: 10000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
    banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: settings["spamKickThreshold"], // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: settings["spamBanThreshold"], // Amount of duplicate messages that trigger a warning.
    exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredUsers: [], // Array of User IDs that get ignored.
    // And many more options... See the documentation.
  });
  if(settings["useAntiSpam"] == "true"){
    antiSpam.on("error", (message, error, type) => {
      console.log(`${message.author.tag} couldn't receive the sanction '${type}', error: ${error}`);
    });
    console.log("test");
    antiSpam.message(message)
  }*/
  // Grab the settings for this server from the PersistentCollection
  // If there is no guild, get default conf (DMs)
  // For ease of use in commands and functions, we'll attach the settings
  // to the message object, so `message.settings` is accessible.

  
  // Just in case we don't know what the current prefix is, mention the bot
  // and the following regex will detect it and fire off letting you know
  // what the current prefix is.
  const mentionMatch = new RegExp(`^<@!?${client.user.id}> ?$`);
  if (message.content.match(mentionMatch)) {
    return message.channel.send(`My prefix on this guild is \`${settings.prefix}\``);
  }

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file, but as a fall back we'll also use
  // a mention as a prefix.
  // So the prefixes array lists 2 items, the prefix from the settings and
  // the bots user id (a mention).
  const prefixes = [settings.prefix.toLowerCase(), `<@!${client.user.id}>`];

  const content = message.content.toLowerCase();
  const prefix = prefixes.find(p => content.startsWith(p));
  if(message.channel.type === 'dm' && !prefix){
    message.channel.send("Make sure to use the global prefix: `tech!` for DMs")
  }
  if (!prefix) return;


  

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const level = client.permlevel(message);

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (!cmd) return;


  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }


  message.author.permLevel = level;
  
  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  client.logger.log(`${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");
  cmd.run(client, message, args, level);


};
