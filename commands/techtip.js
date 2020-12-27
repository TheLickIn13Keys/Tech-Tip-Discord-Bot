const db = require('quick.db');
var stringSimilarity = require('string-similarity');
var fs = require('fs');
const Discord = require("discord.js");
var gis = require('g-i-s');
const { error } = require('console');
const { arch } = require('os');
var rand1;
var rand;



exports.run = async (client, message, [action, key, ...value], level) => {
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

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["can i have a tech tip", "can i have a tech tip?", "tech tip pls", "pls tech tip", "gimme a tech tip", "i need a tech tip"],
    permLevel: "User"
};

exports.help = {
    name: "tip",
    category: "Base",
    description: 'Gives you a tech tip (can also be run with "can i have a tech tip" (not case sensitive))',
    usage: "tip"
};
