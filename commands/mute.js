const Discord = require("discord.js");
const ms = require("ms");
exports.run = async (client, message, args, level) => {
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));   
    if(!tomute) return message.reply("Couldn't find user.");  
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");   
    let muterole = message.guild.roles.cache.find(muterole => muterole.name === "silenced by tech tip");  
    if(!muterole){
        try{
        muterole = await message.guild.roles.create({
            data: {
                name: 'silenced by tech tip',
                color: 'ORANGE',
              },
              reason: 'Members have been muted',
        })
        message.guild.channels.cache.forEach(async (channel, id) => {
            message.channel.overwritePermissions([
                {
                   id: muterole.id,
                   deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
                },
              ]);
        });
        }catch(e){
        console.log(e.stack);
        }   }   //end of create role   
    let mutetime = args[1];   
    if(!mutetime) return message.reply("You didn't specify a time!");

    await(tomute.roles.add(muterole.id));   
    message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function(){
        tomute.roles.remove(muterole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted!`);   
    }, ms(mutetime));

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    name: "mute",
    category: "Moderation",
    description: 'Mutes a user',
    usage: "<@user> <time to mute for>"
};