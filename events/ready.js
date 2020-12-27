const path = require('path');
const DBL = require("dblapi.js");
const db = require('quick.db');;
const ytdl = require('ytdl-core');
var stringSimilarity = require('string-similarity');
var fs = require('fs');
var gis = require('g-i-s');
module.exports = async client => {


  await client.wait(1000);

  client.application = await client.fetchApplication();
  if (client.owners.length < 1) client.application.team ? client.owners.push(...client.application.team.members.keys()) : client.owners.push(client.application.owner.id);
  setInterval( async () => {
    client.owners = [];
    client.application = await client.fetchApplication();
    client.application.team ? client.owners.push(...client.application.team.members.keys()) : client.owners.push(client.application.owner.id);
  }, 60000);


  /*client.user.setActivity({

    name: 'tech! help | www.techtip.ml',
    type: 'STREAMING',
    url: 'https://www.twitch.tv/thelickin13keys'
  })*/
  client.logger.log("Bot status is now: " + `www.techtip.ml | ${client.getSettings("default").prefix} help`)
  client.user.setActivity(`www.techtip.ml | ${client.getSettings("default").prefix} help`);


  if (!client.settings.has("default")) {
    if (!client.config.defaultSettings) throw new Error("defaultSettings not preset in config.js or settings database. Bot cannot load.");
    client.settings.set("default", client.config.defaultSettings);
  }


  require("../util/dashboard")(client);  

  client.logger.log(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, "ready");
};
