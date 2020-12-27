const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    const user = message.mentions.users.first();
    var reason = "No given reason";
    try {
        if(!args[1]){
            
        }
        else{
            reason = args[1];
        }
        
    } catch (error) {
    }
    if (user === message.author) return message.channel.send("You can't kick yourself");
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have permission")
    if (!message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])) return message.channel.send("You need to provide a valid user.")
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick({
            reason: reason,
          }).then(() => {
            
            message.channel.send(`Successfully kicked ${user.tag} for `+ "```" + reason +"```");
          }).catch(err => {
            message.reply('I was unable to kick the member');
            
            console.error(err);
          });
      } else {
        
        message.reply("That user isn't in this guild!");
      }
    } else {
      
      message.reply("You didn't mention the user to kick!");
    }

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    name: "kick",
    category: "Moderation",
    description: 'Kicks a user',
    usage: "<@user> <reason for the kick>"
};
