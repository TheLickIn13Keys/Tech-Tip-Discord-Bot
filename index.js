const Discord = require('discord.js');
const bot = new Discord.Client();
const DBL = require("dblapi.js");
const db = require('quick.db');
require('dotenv').config()
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMzY4NTE2MzE5MTc2Mjk0NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk0MDAwNDEwfQ.L8J0vDQgz10lKxf3EgtDK1pHFMHdhvGBFx90L_V_4Hc', bot);
var fs = require('fs');
var fs = require('fs');
var gis = require('g-i-s');

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity('tech! help');
  setInterval(() => {
    dbl.postStats(bot.guilds.size, bot.shards.Id, bot.shards.total);
}, 1800000);
});

bot.on("guildCreate", guild => {
  console.log("Joined a new guild: " + guild.name);
  guild.channels.forEach((channel) => {
    if(channel.type == "text" && defaultChannel == "") {
      if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  })
  const embed0  = new Discord.MessageEmbed()
        .setTitle('Thanks For Adding Me to Your Server!')
        .addField('Prefix', 'tech!')
        .addField('Help Command', 'tech! help')
        .addField('Disable Bruh Reply','tech! bruh off')
        .addField('Github', 'https://github.com/TheLickIn13Keys/tech-tip-discord-bot')
        .setThumbnail("https://pbs.twimg.com/media/D7ShRPYXoAA-XXB.jpg")
        .setColor(0xdb4105)
  defaultChannel.send(embed0);
  db.set(`bruh_${guild.id}`, on);
  
})


dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

bot.on('message', async msg =>{
  var temp = msg.content.toString();
  var message1 = temp.toLowerCase(); 
  if (message1 === 'can i have a tech tip' || message1 === 'can i have a tech tip?' || message1 === 'tech tip pls' || message1 === 'pls tech tip' || message1 === 'gimme a tech tip'|| message1 === 'i need a tech tip'|| message1 === 'tech! tip' ) {
    var max = db.get('tipnumber');
    var max1 = db.get('sponnumber');
    rand = Math.floor(Math.random() * (max - 1)) + 1;
    rand1 = Math.floor(Math.random() * (max1 - 1)) + 1;
    var tipToSearchFor = db.get(`tip_${rand}.tip`);
    gis(tipToSearchFor, logResults);
    function logResults(error, results) {
      if (error) {
        console.log(error);
      }
      else {
        const embed  = new Discord.MessageEmbed()
          .addField('tech tip # ' + db.get(`tip_${rand}.tipnum`) + ':', db.get(`tip_${rand}.tip`))
          .setColor(0xdb4105)
          .setThumbnail(results[0].url)
          .addField("This tech tip is brought to you by:", db.get(`tip_${rand}.usertag`) + " and " + db.get(`sponsor_${rand1}`));
        msg.channel.send(embed);    
      }
    }
    
    }

  if (message1 === 'tech! help' || message1 === 'help me linus') 
    {
        const embed  = new Discord.MessageEmbed()
        .addField('Command (Note: capitalization does not matter)', 'can i have a tech tip')
        .addField('Command(alt)','can i have a tech tip?')
        .addField('Command(alt 2)','can I have a tech tip?')
        .addField('Command(alt 3)','can I have a tech tip')
        .addField('Command(alt 4)','pls tech tip')
        .addField('Command(alt 5)','tech tip pls')
        .addField('Command(alt 6)','i need a tech tip')
        .addField('Command(alt 7)','gimme a tech tip')
        .addField('Suggest a tech tip', 'tech! suggest ***insert tech tip***')
        .addField('"Easter Eggs" (type them in chat)', 'linus, lttstore, lttstore.com, bruh')
        .addField('Turn off Bruh Reply', 'tech! bruh off')
        .addField('Turn on Bruh Reply', 'tech! bruh on')
        .addField('Help Command','tech! help')
        .addField('Github', 'https://github.com/TheLickIn13Keys/tech-tip-discord-bot')
        .setColor(0xdb4105)
        msg.channel.send(embed);        
    }

  if(message1.startsWith ("tech! suggest")){
    var suggested = msg.content.slice(14) + "\n"
    if(suggested.includes("@")){
      msg.channel.send("Please don't mention users in tech tips!")
    }
    else{
      var currentTipNum = db.get('tipnumber') + 1;
      db.set(`tip_${currentTipNum}`, { tip: `${suggested}`, username: `${msg.author.username}`, usertag: `${msg.author.tag}`, tipnum: `${currentTipNum}` });
      db.set('tipnumber', currentTipNum);
      const embed00  = new Discord.MessageEmbed()
      .addField('Successfully Suggested:', suggested)
      .setColor(0xdb4105)
      msg.channel.send(embed00);    
    }
    
  }
  if (msg.content === 'lttstore' || msg.content === 'lttstore.com' ){ 
      msg.channel.send('Remember to go to lttstore.com to get some epic merch \nhttps://www.lttstore.com/')
    };
  if (msg.content === 'bruh') {
    if (msg.author.bot) return;
    if(db.get(`bruh_${msg.guild.id}`) === "on"){
      msg.channel.send("linus says bruh", {files: ["https://pbs.twimg.com/media/D7ShRPYXoAA-XXB.jpg"]});
    }
    else{
      return;
    }
    };

    if (message1 === 'linus' || message1 === 'tech tip'){
    msg.react('660607734017818624');
    }
    if (message1 === 'thank you linus' || message1 === 'thanks linus'){
      msg.channel.send("np senpai");
    }


  if(message1 === 'tech! disable bruh'){
    if(msg.member.hasPermission("MANAGE_GUILD")){
      db.set(`bruh_${msg.guild.id}`, "off");
      const embed1  = new Discord.MessageEmbed()
          .setTitle('Bruh reply has been disabled')
          .addField('Turn it back on with:', 'tech! bruh on')
          .setColor(0xdb4105)
      msg.channel.send(embed1);
    }
    else{
      msg.reply("Sorry you don't have permission to execute this command!")
    }

  }
  if(message1 === 'tech! enable bruh'){
    if(msg.member.hasPermission("MANAGE_GUILD")){
      db.set(`bruh_${msg.guild.id}`, "on");
      const embed2  = new Discord.MessageEmbed()
          .setTitle('Bruh reply has been enabled')
          .addField('Turn it back off with:', 'tech! bruh off')
          .setColor(0xdb4105)
      msg.channel.send(embed2);
    }
    else{
      msg.reply("Sorry you don't have permission to execute this command!")
    }
  }
  if(message1.startsWith('tech! add sponsor')){
    var spon = msg.content.slice(18) + "\n";
    var currentSponNum = db.get('sponnumber') + 1;
    db.set(`sponsor_${currentSponNum}`, spon);
    db.set('sponnumber', currentSponNum);
  }
});
bot.login(process.env.TOKEN);

