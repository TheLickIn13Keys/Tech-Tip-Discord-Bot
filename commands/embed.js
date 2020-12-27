const Discord = require("discord.js");
const prompter = require('discordjs-prompter');
//const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
var isAuthorImage = false;
var isAuthorName = false;
var authorName;


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "embed",
    category: "Base",
    description: 'Create an embed with an easy text based embed builder',
    usage: "embed"
};

exports.run = async (client, msg, [action, key, ...value], level) => {
    var moreFields;

        const embedToStart = new Discord.MessageEmbed()
            .setTitle("Welcome to Tech Tip Bot's Embed Builder!")
            .setURL("https://techtip.ml")
            .setColor(0xdb4105)
            .setDescription("Type EMPTY (case sensitive) to leave an empty field\n or type CANCEL at any point to stop (case sensitive)")
        msg.channel.send(embedToStart);


        

        var mainEmbed = new Discord.MessageEmbed();

        try {
            var title = await getTitle(msg)
            if(title.toString() == "CANCEL"){
                return msg.channel.send("Cancelling")
            }
            else if(title.toString() == "EMPTY"){

                msg.channel.send("Ok, leaving the title empty");

            }
            else{
                mainEmbed.setTitle(title.toString())
            }
        } catch (error) {

            msg.channel.send(error.toString());
            return;
            
        }

        try {
            var url = await getTitleURL(msg)
            if(url.toString() == "CANCEL"){
                return msg.channel.send("Cancelling")
            }
            else if(url.toString() == "EMPTY"){

                msg.channel.send("Ok, leaving the title URL empty");

            }
            else{

                if(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(url.toString()) == false){
                    msg.channel.send("Sorry this is not a link!")
                    return;
                }
                else{
                    mainEmbed.setURL(url.toString())
                }
                
            }
        } catch (error) {

            msg.channel.send(error.toString());
            return;
            
        }

        try {
            var description = await getDescription(msg)
            if(description.toString() == "CANCEL"){
                return msg.channel.send("Cancelling")
            }
            if(description.toString() == "EMPTY"){

                msg.channel.send("Ok, leaving the description empty");

            }
            else{
                mainEmbed.setDescription(description.toString())
            }
        } catch (error) {

            msg.channel.send(error.toString());
            return;
            
        }

        try {
            var color = await getColor(msg)
            if(color.toString() == "CANCEL"){
                return msg.channel.send("Cancelling")
            }
            if(color.toString() == "EMPTY"){

                msg.channel.send("Ok, leaving the color empty");

            }
            else{
                mainEmbed.setColor(color.toString())
            }
        } catch (error) {

            msg.channel.send(error.toString());
            return;
            
        }

        var isUsingAuthor = false;
        try {
            var author_name = await getAuthorName(msg)
            if(author_name.toString() == "CANCEL"){
                return msg.channel.send("Cancelling")
            }
            if(author_name.toString() == "EMPTY"){

                msg.channel.send("Ok, leaving the author name empty");


            }
            else{
                try {


    
                        var author_image = await getAuthorImage(msg, author_name, isUsingAuthor);
                        if(author_image.toString() == "CANCEL"){
                            return msg.channel.send("Cancelling")
                        }
                        else if(author_image.toString() == "EMPTY"){
                            msg.channel.send("Ok, leaving the author image empty");
                            mainEmbed.setAuthor(author_name.toString());
                        }
                        else{
                            
                                if(author_name.toString() == "CANCEL" || author_image.toString() == "CANCEL"){
                                    return msg.channel.send("Cancelling")
                                }
                                if(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(author_image.toString()) == false){
                                    msg.channel.send("Sorry this is not a link!")
                                }
                                else{
                                    mainEmbed.setAuthor(author_name.toString(), author_image.toString());
                                }
                            
                        }
                    
                    
                } catch (error) {
    
                    msg.channel.send(error.toString());
                    return;
                    
                }
    
            }
        } catch (error) {

            msg.channel.send(error.toString());

            return;
            
        }

        try {
            var footer = await getFooter(msg)
            if(footer.toString() == "CANCEL"){
                return msg.channel.send("Cancelling")
            }
            if(footer.toString() == "EMPTY"){

                msg.channel.send("Ok, leaving the footer empty");

            }
            else{
                mainEmbed.setFooter(footer.toString())
            }
        } catch (error) {

            msg.channel.send(error.toString());
            return;
            
        }

        msg.channel.send("Time for Fields! (The Bot will continue to ask for new fields until you reply STOP)");
        while(true){
            try {

                var fieldTitleRes = await getFieldTitle(msg);
                if(fieldTitleRes.toString() == "STOP"){
                    break;
                }
                else if(fieldTitleRes.toString() == "CANCEL"){
                    return msg.channel.send("Cancelling")
                }
                var fieldTextRes = await getFieldText(msg);
                if(fieldTextRes.toString() == "STOP"){
                    break;
                }
                else if(fieldTextRes.toString() == "CANCEL"){
                    return msg.channel.send("Cancelling")
                }
                var inline = await getInline(msg)
                if(inline.toString() == "STOP"){
                    break;
                }
                else if(inline.toString() == "CANCEL"){
                    return msg.channel.send("Cancelling")
                }
                else{

                    if(fieldTitleRes.toString() == "CANCEL" || fieldTextRes.toString() == "CANCEL" ||inline.toString() == "CANCEL"){
                        return msg.channel.send("Cancelling")
                    }

                    mainEmbed.addField(fieldTitleRes, fieldTextRes, inline);
            
                    continue;
                }
                
            } catch (error) {

                msg.channel.send(error.toString())
                break;
                
            }

        }

        try {
            var timestamp = await getTimestamp(msg)
            if(timestamp.toString() == "CANCEL"){
                return msg.channel.send("Cancelling")
            }
            else if(timestamp.toString() == "EMPTY" || timestamp.toString() == "false"){

                msg.channel.send("Ok, leaving the timestamp empty");

            }
            else if(timestamp.toString() == "true"){
                mainEmbed.setTimestamp(new Date())
            }
        } catch (error) {

            msg.channel.send(error.toString());
            return;
            
        }

        try {
            var thumb = await getThumbnail(msg)
            if(thumb.toString() == "CANCEL"){
                return msg.channel.send("Cancelling")
            }
            if(thumb.toString() == "EMPTY"){

                msg.channel.send("Ok, leaving the thumbnail empty");

            }
            else{
                let yesLink3 = false;
                while(yesLink3 == false){
                    if(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(thumb.toString()) == false){
                        msg.channel.send("Sorry this is not a link! Please try again.")
                    }
                    else{
                        mainEmbed.setThumbnail(thumb.toString())
                        yesLink3 = true;
                    }
                }
                
            }
        } catch (error) {

            msg.channel.send(error.toString());
            return;
            
        }

        try {
            var channel = await getChannel(msg)
            if(channel.toString() == "CANCEL"){
                return msg.channel.send("Cancelling")
            }
            if(channel.toString() == "EMPTY"){

                msg.channel.send("Ok, cancelled");

            }
            else{
                try {
                    msg.channel.send("Here is a preview of your embed")
                    msg.channel.send(mainEmbed)
    
                    var toUse = await askToSend(msg);
                    if(toUse.toString() == 'yes'){
                        try {
                            client.channels.cache.get(channel.toString()).send(mainEmbed);
                            msg.channel.send("Alright, thank you for using the Tech Tip Bot Embed Builder!");
                        } catch (error) {
                            msg.channel.send("It seems like you made an error when creating the Embed, please try again. The error is below, please contact a dev or owner for help")
                            msg.channel.send(error.toString())
                            console.log(error);
                        }
    
                    }
                    else{
                        msg.channel.send("Alright, thank you for using the Tech Tip Bot Embed Builder!");
                        return;
                    }
                    
                } catch (error) {
                    msg.channel.send(error);
                }
            }
        } catch (error) {

            msg.channel.send(error.toString());
            return;
            
        } 

        function askToSend(msg) {

            return new Promise((resolve, reject) =>{
        
                prompter
                .reaction(msg.channel, {
                  question: 'Would you like to send it?',
                  userId: msg.author.id,
                  timeout: 100000,
                })
                .then(response => {
                  // Response is false if time runs out
                  if (!response) return msg.reply('you took too long!');
                  // Returns 'yes' if user confirms and 'no' if ser cancels.
                  if (response === 'yes') resolve('yes');
                  if (response === 'no') resolve('no');
                });
            })
            
        }
        function sleep(ms) {
            return new Promise((resolve) => {
              setTimeout(resolve, ms);
            });
        }   
        
        function getChannel(msg) {
            return new Promise((resolve, reject) => {
        
                        prompter.message(msg.channel, {
                            question: 'What channel would do you want to send it in? (Must be a channel ID)?',
                            userId: msg.author.id,
                            max: 1,
                            timeout: 100000,
                        }).then(responses => {
                            // If no responses, the time ran out
                            if (!responses.size) {
                            return reject(`You took too long!`);
                            }
                            // Gets the first message in the collection
                            const response = responses.first();
                    
                            if(response == "EMPTY"){
                
                                resolve("EMPTY");
                                return;
                
                            }
                            else{
                
                                resolve(response);
                
                            }
                            
                        });
                    });
        }
        
        function getFieldTitle(msg) {
        
            return new Promise((resolve, reject) => {
        
            var isMoreFields = true;
            var fieldText;
            var fieldTitle;
            var isInline;
        
            
                    
                //Field Title
                prompter.message(msg.channel, {
                    question: 'Field Title?',
                    userId: msg.author.id,
                    max: 1,
                    timeout: 1000000,
                }).then(responses => {
                    // If no responses, the time ran out
                    if (!responses.size) {
                        reject(`You took too long!`);
                        return;
                    }
                    // Gets the first message in the collection
                    const response = responses.first();
        
                    if(response == "STOP"){
        
                        resolve(response);
                        return;
        
                    }
                    else{
        
                        resolve(response);;
        
                    }
                    
                });
        
        });
            
        }
        function getFieldText(msg) {
        
            return new Promise((resolve, reject) => {
        
            var isMoreFields = true;
            var fieldText;
            var fieldTitle;
            var isInline;
        
            
                    
                //Field Title
                prompter.message(msg.channel, {
                    question: 'Field Text?',
                    userId: msg.author.id,
                    max: 1,
                    timeout: 1000000,
                }).then(responses => {
                    // If no responses, the time ran out
                    if (!responses.size) {
                        reject(`You took too long!`);
                        return;
                    }
                    // Gets the first message in the collection
                    const response = responses.first();
        
                    if(response == "STOP"){
        
                        resolve(response);
                        return;
        
                    }
                    else{
        
                        resolve(response);;
        
                    }
                    
                });
        
        });
            
        }
        function getInline(msg) {
        
            return new Promise((resolve, reject) => {
        
            var isMoreFields = true;
            var fieldText;
            var fieldTitle;
            var isInline;
        
            
                    
                //Field Title
                prompter.message(msg.channel, {
                    question: 'Inline (true or false)?',
                    userId: msg.author.id,
                    max: 1,
                    timeout: 1000000,
                }).then(responses => {
                    // If no responses, the time ran out
                    if (!responses.size) {
                        reject(`You took too long!`);
                        return;
                    }
                    // Gets the first message in the collection
                    const response = responses.first();
        
                    if(response == "STOP"){
        
                        resolve(response);
                        return;
        
                    }
                    else{
        
                        resolve(response);
        
                    }
                    
                });
        
        });
            
        }
        
        
        function getThumbnail(msg) {
            return new Promise((resolve, reject) => {
                        //Thumbnail
                        prompter.message(msg.channel, {
                            question: 'Thumbnail (must be a link)?',
                            userId: msg.author.id,
                            max: 1,
                            timeout: 100000,
                        }).then(responses => {
                            // If no responses, the time ran out
                            if (!responses.size) {
                            return reject(`You took too long!`);
                            }
                            // Gets the first message in the collection
                            const response = responses.first();
                    
                            if(response == "EMPTY"){
                
                                resolve("EMPTY");
                                return;
                
                            }
                            else{
                
                                resolve(response);
                
                            }
                            
                        });
                    });
        }
        
        function getFooter(msg) {
        
            return new Promise((resolve, reject) => {
        
                        //Footer
                        prompter.message(msg.channel, {
                            question: 'Footer?',
                            userId: msg.author.id,
                            max: 1,
                            timeout: 100000,
                        }).then(responses => {
                            // If no responses, the time ran out
                            if (!responses.size) {
                                return reject(`You took too long!`);
                            }
                            // Gets the first message in the collection
                            const response = responses.first();
                    
                            if(response == "EMPTY"){
                
                                resolve("EMPTY");
                                return;
                
                            }
                            else{
                
                                resolve(response);
                
                            }
                            
                        }); 
                    });
            
        }
        
        function getAuthorImage(msg, authorName, isUsingAuthor) {
            return new Promise((resolve, reject) => {
        
                    prompter.message(msg.channel, {
                        question: 'Author Image?',
                        userId: msg.author.id,
                        max: 1,
                        timeout: 100000,
                    }).then(responses => {
                        // If no responses, the time ran out
                        if (!responses.size) {
                        return reject(`You took too long!`);
                        }
                        // Gets the first message in the collection
                        const response = responses.first();
                
                        if(response == "EMPTY"){
            
                            resolve("EMPTY");
                            return;
            
                        }
                        //else if(!isAuthorName){
                            //return reject("You need to set an Author Name to set an Author Image")
                        //}
                        //else if(!isUsingAuthor){
                          //  return reject("You need to set an Author Name to set an Author Image")
                        //}
                        else{
        
                            resolve(response)
            
                        }
                        
                    }); 
            });
            
        }
        
        function getTimestamp(msg) {
            return new Promise((resolve, reject) => {
        
                        //Timestamp
                        prompter.message(msg.channel, {
                            question: 'Want a time stamp (true or false)?',
                            userId: msg.author.id,
                            max: 1,
                            timeout: 100000,
                        }).then(responses => {
                            // If no responses, the time ran out
                            if (!responses.size) {
                                return reject(`You took too long!`);
                            }
                            // Gets the first message in the collection
                            const response = responses.first();
                    
                            if(response == "false" || response == "EMPTY"){
            
                                resolve("EMPTY");
                                return;
                
                            }
                            else{
                
                                resolve(response);
                
                            }
                            
                        }); 
                    });
            
        }
        
        function getAuthorName(msg) {
            return new Promise((resolve, reject) => {
        
                       //Author Name
                    prompter.message(msg.channel, {
                        question: 'Author Name?',
                        userId: msg.author.id,
                        max: 1,
                        timeout: 100000,
                    }).then(responses => {
                        // If no responses, the time ran out
                        if (!responses.size) {
                            return reject(`You took too long!`);
                        }
                        // Gets the first message in the collection
                        const response = responses.first();
                
                        if(response == "EMPTY"){
            
                            resolve("EMPTY");
                            return;
            
                        }
                        else{
            
                            resolve(response);
            
                        }
                        
                    });
                });
            
        }
        
        function getColor(msg) {
            return new Promise((resolve, reject) => {
        
                        //Color
                        prompter.message(msg.channel, {
                            question: 'Color (Must be a hex code or be within the range 0 - 16777215)?',
                            userId: msg.author.id,
                            max: 1,
                            timeout: 100000,
                        }).then(responses => {
                            // If no responses, the time ran out
                            if (!responses.size) {
                            return reject(`You took too long!`);
                            }
                            // Gets the first message in the collection
                            const response = responses.first();
                            if(response == "EMPTY"){
                
                                resolve("EMPTY");
                                return;
                
                            }
                            else{
                
                                resolve(response);
                
                            }
                            
                        });
                    });
            
        }
        
        function getTitleURL(msg) {
            return new Promise((resolve, reject) => {
        
                    //Title URL
                    prompter.message(msg.channel, {
                        question: 'Title URL?',
                        userId: msg.author.id,
                        max: 1,
                        timeout: 100000,
                    }).then(responses => {
                        // If no responses, the time ran out
                        if (!responses.size) {
                        return reject(`You took too long!`);
                        }
                        // Gets the first message in the collection
                        const response = responses.first();
                
                        if(response == "EMPTY"){
            
                            resolve("EMPTY");
                            return;
            
                        }
                        else{
            
                            resolve(response);
            
                        }
                        
                    });   
                }); 
            
        }
        
        function getTitle(msg) {
        
            return new Promise((resolve, reject) => {
        
            prompter.message(msg.channel, {
                question: 'Title?',
                userId: msg.author.id,
                max: 1,
                timeout: 100000,
                }).then(responses => {
                // If no responses, the time ran out
                if (!responses.size) {
                    return reject(`You took too long!`);
                }
                // Gets the first message in the collection
                const response = responses.first();
        
                if(response === "EMPTY"){
        
                    resolve("EMPTY");
                    return;
        
                }
                else{
        
                    resolve(response);
        
                }
                
                });
            });
            
        }
        
        function getDescription(msg) {
            return new Promise((resolve, reject) => {
        
                    prompter.message(msg.channel, {
                        question: 'Description?',
                        userId: msg.author.id,
                        max: 1,
                        timeout: 100000,
                    }).then(responses => {
                        // If no responses, the time ran out
                        if (!responses.size) {
                            return reject(`You took too long!`);
                        }
                        // Gets the first message in the collection
                        const response = responses.first();
                        if(response === "EMPTY"){
            
                            resolve("EMPTY");
                            return;
            
                        }
                        else{
            
                            resolve(response);
            
                        }
                        
                    });    
                });
        }

}

