const Discord = require("discord.js");
const db = require('quick.db');;
const ytdl = require('ytdl-core');
var stringSimilarity = require('string-similarity');
var fs = require('fs');
var gis = require('g-i-s');
const { error } = require('console');
const { arch } = require('os');

exports.run = async (client, message, args, level) => {
    if(args[0] === 'play'){
        try{
            if(!(message.guild.me.hasPermission("CONNECT")) || !(message.guild.me.hasPermission("SPEAK")) || !(message.guild.me.hasPermission("VIEW_CHANNEL"))){
                message.channel.send("Linus sad because linus doesn't have perms to play funni song");
                return;
            }
    
            const voiceChannel = message.member.voice.channel;
    
            if (!voiceChannel) {
                return message.reply('You must be in a voice channel to play the funni song');
            }
    
            await voiceChannel.join().then(connection => {
    
                const stream = ytdl('https://www.youtube.com/watch?v=PKfxmFU3lWY', { filter: 'audioonly' });
                const dispatcher = connection.play(stream);
                
                message.channel.send("Now playing funni tech tip song");
                var isStop = false;
    
    
                dispatcher.on('finish', () => voiceChannel.leave());
                
            });

        }
        catch(err){
            message.reply("Error, Please contact TheLickIn13Keys#9999 in this server: https://discord.gg/ns3RHwz");
            const voiceChannel = message.member.voice.channel;
            var isStop = true;
            voiceChannel.leave();
            return;
        }
    }
    else if(args[0] === 'stop'){
        const voiceChannel = message.member.voice.channel;
        var isStop = true;
        voiceChannel.leave();
    }
    else{
        message.channel.send("USAGE: ```tech! song <play/stop>```")
        return;
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "song",
    category: "Base",
    description: 'Play the funni tech tip song',
    usage: "song <play/stop>"
};