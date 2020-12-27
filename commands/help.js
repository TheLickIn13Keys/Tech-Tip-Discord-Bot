

const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js");

exports.run = (client, message, args, level) => {
  if (!args[0]) {
    const settings = message.settings;

    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);


    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = `= Command List =\n\n[Use ${settings.prefix}help <command name> for details]\n`;

   const outputEmbed = new Discord.MessageEmbed()
   .setAuthor("Tech Tip Commands", "https://pbs.twimg.com/media/D7ShRPYXoAA-XXB.jpg")
   .setDescription("The prefix for `" + message.guild.name +"` is `" + settings.prefix +"`\n\n"+
   "Individual Command Help: `" + settings.prefix +"help <command>`\n\n"+
   "**Useful Resources**\n"+
   "[Command List](https://techtip.ml/commands)\n"+
   "[Dashboard](https://techtip.ml/)\n"+
   "[Support Server](https://discord.gg/ns3RHwz)\n"+
   "[Updates](https://updates.techtip.ml/)\n" +
   "[Github Repo](https://github.com/TheLickIn13Keys/Tech-Tip-Discord-Bot)\n")
   .setColor(0xdb4105)
   .setFooter("\nTech Tip Bot Developed by @TheLickIn13Keys on Twitter!\n(TheLickIn13Keys#9999)")
    message.channel.send(outputEmbed);
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nUSAGE: ${command.help.usage}`, {code:"asciidoc"});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "General",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
