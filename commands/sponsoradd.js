const Discord = require("discord.js");
const db = require('quick.db');;
var stringSimilarity = require('string-similarity');
var fs = require('fs');
var gis = require('g-i-s');
const { error } = require('console');
const { arch } = require('os');
    exports.run = async (client, message, args, level) => {
        var spon = message.content.slice(14) + "\n";
        var isSimilar = false;
        if(!args[0]){
            message.channel.send("USAGE: ```tech! sponsor <a sponsor>```")
            return;
        }
        for(let i = 1; i<=db.get('sponnumber'); i++){
            var fooooo = db.get(`sponsor_${i}`);
            var suggCheck = spon;

            var similarity = stringSimilarity.compareTwoStrings(fooooo, suggCheck); 

            if(similarity > .50){
                
                var oopsMessage = `Oops,`+"\n"+ `${spon} is too similar to` + "\n" + `${fooooo}`;
                const embed69 = new Discord.MessageEmbed()
                    .addField(oopsMessage, `Similarity: ${similarity*100}% \n If you feel like they are not similar please contact TheLickIn13Keys#9999`)
                    .setColor(0xdb4105)
                message.channel.send(embed69);
                isSimilar = true;
                return;
            }
        }

        if(/(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(spon)){
            message.channel.send("Please don't use links!");
            return;
        }

        if (spon.includes("@")) {
            message.channel.send("Please don't mention users in sponsors!");
            return;
        }
        var currentSponNum = db.get('sponnumber') + 1;
        db.set(`sponsor_${currentSponNum}`, spon);
        db.set('sponnumber', currentSponNum);
        const embed01 = new Discord.MessageEmbed()
            .addField('Successfully Suggested:', spon)
            .setColor(0xdb4105)
        message.channel.send(embed01);
    }

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: [],
        permLevel: "User"
    };
    
    exports.help = {
        name: "sponsor",
        category: "Base",
        description: 'Suggest a future sponsor',
        usage: "sponsor <a sponsor>"
    };
