const Discord = require('discord.js');
const bot = new Discord.Client();
var fs = require('fs');
var gis = require('g-i-s');

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity('for help >> help me linus');
  
});

bot.on('message', msg =>{
  var temp = msg.content.toString();
  var message1 = temp.toLowerCase(); 
  if (message1 === 'can i have a tech tip' || message1 === 'can i have a tech tip?' || message1 === 'tech tip pls' || message1 === 'pls tech tip') {

    fs.readFile('sponsors.txt', function(err, data){
        if(err) throw err;
        foo1 = '';
        rand1 = 0;
        while(foo1 == ''){
            var lines1 = data.toString().split('\n');
            rand1 = Math.floor(Math.random()*lines1.length)
            foo1 = lines1[rand1];
        }
        fs.readFile('tips.txt', function(err, data){
            if(err) throw err;
            foo = '';
            rand = 0;
            while(foo == ''){
                var lines = data.toString().split('\n');
                rand = Math.floor(Math.random()*lines.length)
                foo = lines[rand];
                gis(foo, logResults);
            }
        })

        function logResults(error, results) {
            if (error) {
              console.log(error);
            }
            else{
                if(err) throw err;
                const embed  = new Discord.MessageEmbed()
                .addField('tech tip #' +rand+':', foo)
                .setColor(0xdb4105)
                .setThumbnail(results[0].url)
                .addField("This tech tip is brought to you by:", foo1);
                msg.channel.send(embed);
            }
        }
       



    })

    }
    
  if (message1 === 'help me linus') 
    {
        const embed  = new Discord.MessageEmbed()
        .addField('Command', 'can i have a tech tip')
        .addField('Command(alt)','can i have a tech tip?')
        .addField('Command(alt 2)','can I have a tech tip?')
        .addField('Command(alt 3)','can I have a tech tip')
        .addField('Command(alt 4)','pls tech tip')
        .addField('Command(alt 5)','tech tip pls')
        .addField('Suggest a tech tip', 'suggest *insert tech tip*')
        .addField('Easter Eggs (type them in chat', 'linus, lttstore, lttstore.com, bruh, i hate dpie')
        .addField('Help Command','help me linus')
        .addField('Github', 'https://github.com/RandomLemon10/tech-tip-discord-bot')
        .setColor(0xdb4105)
        msg.channel.send(embed);        

  

    }

  if(message1.startsWith ("suggest")){
    var suggested = msg.content.slice(8) + "\n";
    fs.appendFile("tips.txt", suggested, (err) => {
     if (err) console.log(err);
     console.log("Successfully Written to File.");
     msg.channel.send('Successfully suggested: '  + suggested);
    });
  }
  if (msg.content === 'lttstore' || msg.content === 'lttstore.com' ){ 
      msg.channel.send('Remember to go to lttstore.com to get some epic merch \nhttps://www.lttstore.com/')
    };
  if (msg.content === 'bruh') {
    if (msg.author.bot) return;
    msg.channel.send("linus says bruh", {files: ["https://pbs.twimg.com/media/D7ShRPYXoAA-XXB.jpg"]});
    };



    if (message1 === 'linus'){
    msg.react('660607734017818624');
    }

    if(message1 === 'i hate dpie'){
      msg.channel.send('same'); 
    }
});






fs.readFile('tokenboi.txt', function(err, data){
    if(err) throw err;
    foo = '';
    rand = 0;

    var lines = data.toString().split('\n');
    bot.login(lines[0]);




})
