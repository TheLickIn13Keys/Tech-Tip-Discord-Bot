const Discord = require("discord.js");
const url = 'https://www.reddit.com/r/LinusFaces/hot/.json?limit=100'
const https = require('https');

exports.run = async (client, message, args, level) => { 
    message.channel.startTyping();
    https.get(url, (result) => {
        var body = ''
        result.on('data', (chunk) => {
            body += chunk
        })

        result.on('end', () => {
            var response = JSON.parse(body)
            var index = response.data.children[Math.floor(Math.random() * 99) + 1].data

            if (index.post_hint !== 'image') {

                var text = index.selftext
                var subRedditName = "r/LinusFaces"
                const textembed = new Discord.MessageEmbed()
                    .setTitle(subRedditName)
                    .setColor(0xdb4105)
                    .setDescription(`[${title}](${link})\n\n${text}`)
                    .setURL(`https://reddit.com/${subRedditName}`)

                message.channel.send(textembed)
                message.channel.stopTyping();
                return;
            }

            var image = index.preview.images[0].source.url.replace('&amp;', '&')
            var title = index.title
            var link = 'https://reddit.com' + index.permalink
            var subRedditName = index.subreddit_name_prefixed

            if (index.post_hint !== 'image') {
                const textembed = new Discord.RichEmbed()
                    .setTitle(subRedditName)
                    .setColor(0xdb4105)
                    .setDescription(`[${title}](${link})\n\n${text}`)
                    .setURL(`https://reddit.com/${subRedditName}`)

                message.channel.send(textembed)
                message.channel.stopTyping();
                return;
            }

            const imageembed = new Discord.MessageEmbed()
                .setTitle(subRedditName)
                .setImage(image)
                .setColor(0xdb4105)
                .setDescription(`[${title}](${link})`)
                .setURL(`https://reddit.com/${subRedditName}`)
            message.channel.send(imageembed)
            message.channel.stopTyping();
            return;
        }).on('error', function (e) {
            message.channel.stopTyping();
            console.log('Got an error: ', e)
        })
    })
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "face",
    category: "Base",
    description: 'gives a funni linus face',
    usage: "face"
};
