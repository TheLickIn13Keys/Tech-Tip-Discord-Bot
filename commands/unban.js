const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    var user;
    try {

        user = args[0];
        
    } catch (error) {

        return message.reply("No userID was provided");

    }
    var reason = "No given reason";
    try {
        if(!args[1]){
            
        }
        else{
            reason = args[1];
        }
        
    } catch (error) {
    }
    if(client.guilds.cache.get(message.guild.id).member(user.id)) return message.channel.send("This user is not banned!");
    if (user === message.author) return message.channel.send("You can't unban yourself");
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don't have permission")
    //if (!message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])) return message.channel.send("You need to provide a valid user.")
        message.guild.members.unban(user, reason)
            .then(() => {
            message.reply(`Successfully unbanned ${user} for `+ "```" +reason+"```");
          }).catch(err => {
            message.reply('Either the UserID is invalid or the member does not exist');
            console.error(err);
          });


}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    name: "unban",
    category: "Moderation",
    description: 'Unbans a user',
    usage: "<UserID> <reason for the unban>"
};