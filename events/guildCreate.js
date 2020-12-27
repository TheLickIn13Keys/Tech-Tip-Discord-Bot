
module.exports = (client, guild) => {
  const Discord = require("discord.js");

  client.logger.log(`Joined guild: ${guild.name} (${guild.id}) with ${guild.memberCount} members`);
  const embed0 = new Discord.MessageEmbed()
  .setTitle('Thanks For Adding Me to Your Server!')
  .setDescription("The prefix for `" + guild.name +"` is `" + client.getSettings("default").prefix +"`\n\n"+
  "**Useful Resources**\n"+
  "[Command List](https://techtip.ml/commands)\n"+
  "[Dashboard](https://techtip.ml/)\n"+
  "[Support Server](https://discord.gg/ns3RHwz)\n"+
  "[Updates](https://updates.techtip.ml/)\n\n")
  .setColor(0xdb4105)
  .setFooter("\nTech Tip Bot Developed by @TheLickIn13Keys on Twitter!")
  .addField('Help Command', 'tech! help')
  .addField('Turn off Bruh Reply', 'tech! set edit replyToBruh false')
  .addField('Turn on Bruh Reply', 'tech! set edit replyToBruh true')
  .addField('Github', 'https://github.com/TheLickIn13Keys/tech-tip-discord-bot')
  .setThumbnail("https://pbs.twimg.com/media/D7ShRPYXoAA-XXB.jpg")
  guild.systemChannel.send(embed0);

};
