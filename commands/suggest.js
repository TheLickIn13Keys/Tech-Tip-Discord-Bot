const Discord = require("discord.js");
const db = require('quick.db');;
var stringSimilarity = require('string-similarity');
var fs = require('fs');
var gis = require('g-i-s');
const { error } = require('console');
const { arch } = require('os');


    exports.run = async (client, message, args, level) => {
        const suggested = args.join(' ');
        var isSimilar = false;
        if(!args[0]){
            message.channel.send("USAGE: ```tech! suggest <a tech tip>```")
            return;
        }
        for(let i = 1; i<=db.get('tipnumber'); i++){
            var fooooo = db.get(`tip_${i}.tip`);
            var suggCheck = suggested;

            var similarity = stringSimilarity.compareTwoStrings(fooooo, suggCheck); 

            if(similarity > .50){
                
                var oopsMessage = `Oops,`+"\n"+ "```" + suggested + "```" + " is too similar to " + "\n" + "```" + fooooo+ "```\n";
                const embed69 = new Discord.MessageEmbed()
                    .addField(oopsMessage, `Similarity: ${similarity*100}% \n\n If you feel like they are not similar please contact TheLickIn13Keys#9999`)
                    .setColor(0xdb4105)
                message.channel.send(embed69);
                isSimilar = true;
                return;
            }
        }

            if (suggested.includes("@")) {
                message.channel.send("Please don't mention users in tech tips!")
                return;
            } 

            if(/(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(suggested)){
                message.channel.send("Please don't use links!");
                return;
            }

            var currentTipNum = db.get('tipnumber') + 1;
            db.set(`tip_${currentTipNum}`, {
                tip: `${suggested}`,
                username: `${message.author.username}`,
                usertag: `${message.author.tag}`,
                tipnum: `${currentTipNum}`
            });
            db.set('tipnumber', currentTipNum);
            const embed00 = new Discord.MessageEmbed()
                .addField('Successfully Suggested:', suggested)
                .setColor(0xdb4105)
            message.channel.send(embed00);
		    return;
            


    }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "suggest",
    category: "Base",
    description: 'Suggest a tech tip.',
    usage: "suggest <a tech tip>"
};