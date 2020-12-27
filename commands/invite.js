
var stringSimilarity = require('string-similarity');
var fs = require('fs');
var gis = require('g-i-s');
const { error } = require('console');
const { arch } = require('os');

exports.run = async (client, message, args, level) => {
    message.channel.send('https://discord.com/oauth2/authorize?client_id=703685163191762944&scope=bot&permissions=8')
    message.channel.send('Also, make sure to check out the website/panel!')
}   


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "invite",
    category: "General",
    description: 'Gives the invite link.',
    usage: "invite"
};