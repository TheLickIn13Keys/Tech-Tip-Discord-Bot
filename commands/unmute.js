const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    let toUnMute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));   
    if(!toUnMute) return message.reply("Couldn't find user.");  
    if(toUnMute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't unmute them!");   
    let muterole = message.guild.roles.cache.find(muterole => muterole.name === "silenced by tech tip");  
    if(!muterole){
        return message.reply("No one has been ever muted on this server!")
    }    

    if(!(toUnMute.roles.cache.find(r => r.name === "silenced by tech tip"))){
        return message.reply("This member is not muted!");
    }

    await (toUnMute.roles.remove(muterole.id));
    message.channel.send(`<@${toUnMute.id}> has been unmuted!`);   


}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    name: "unmute",
    category: "Moderation",
    description: 'Unmutes a user',
    usage: "<@user>"
};