
if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const path = require('path');
const DBL = require("dblapi.js");
const db = require('quick.db');;
const ytdl = require('ytdl-core');
var stringSimilarity = require('string-similarity');
process.setMaxListeners(Infinity);
const client = new Discord.Client();
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMzY4NTE2MzE5MTc2Mjk0NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk0MDAwNDEwfQ.L8J0vDQgz10lKxf3EgtDK1pHFMHdhvGBFx90L_V_4Hc', client);


const eventtype = {
  guildMemberAdd: "movement",
  guildMemberRemove: "movement",
  guildBanAdd: "movement",
  guildBanRemove: "movement",
  guildMemberUpdate: "auditlog",
  usernameChangedMsg: "auditlog",
  discriminatorChangedMsg: "auditlog",
  avatarChangedMsg: "auditlog",
  messageDelete: "auditmsg",
  messageUpdate: "auditmsg",
  voiceStateUpdate: "voice"
}

const description = {
  name: "discord-auditlog",
  filename: "discord-auditlog.js",
  version: "2.2.3"
}


let debugmode = false


// MESSAGE DELETE V12
client.on("messageDelete", message => {
  setts = client.getSettings(message.guild);
  if(setts["useLogger"] == "true"){
  console.log("delted")
  const options = {
    auditlog: setts["modLogChannel"].toString(),	
    movement: setts["modLogChannel"].toString(),
    auditmsg: setts["modLogChannel"].toString(), 
    voice: setts["modLogChannel"].toString(), 
    trackroles: true,
  }
  if (message.author.bot === true) return
  if (message.channel.type !== "text") return
  if (debugmode) console.log(`Module: ${description.name} | messageDelete triggered`)
  var embed = {
      description: `
**Author : ** <@${message.author.id}> - *${message.author.tag}*
**Date : ** ${message.createdAt}
**Channel : ** <#${message.channel.id}> - *${message.channel.name}*

**Deleted Message : **
\`\`\`
${message.content.replace(/`/g, "'")}
\`\`\`

**Attachment URL : **
${message.attachments.map(x => x.proxyURL)}

`,
      image: {
          url: message.attachments.map(x => x.proxyURL)[0]
      },
      color: 16711680,
      timestamp: new Date(),
      footer: {
          text: `
      Deleted: `
      },
      author: {
          name: `
      MESSAGE DELETED `,
          icon_url: "https://cdn.discordapp.com/emojis/619328827872641024.png"
      }
  }
  if (message && message.member && typeof message.member.guild === "object") {
      send(client, message.member.guild, options, embed, "messageDelete")
  } else {
      console.error(`Module: ${description.name} | messageDelete - ERROR - member guild id couldn't be retrieved`)
      console.error("author", message.author)
      console.error("member", message.member)
      console.error("content", message.content)
  }
}
})

// MESSAGE UPDATE V12
client.on("messageUpdate", (oldMessage, newMessage) => {
  setts = client.getSettings(newMessage.guild);
  if(setts["useLogger"] == "true"){

      
  const options = {
    auditlog: setts["modLogChannel"].toString(),	
    movement: setts["modLogChannel"].toString(),
    auditmsg: setts["modLogChannel"].toString(), 
    voice: setts["modLogChannel"].toString(), 
    trackroles: true,
  }
  if (oldMessage.author.bot === true) return
  if (oldMessage.channel.type !== "text") return
  if (newMessage.channel.type !== "text") return

  if (oldMessage.content === newMessage.content) return
  var embed = {
      description:
`
**Author : ** <@${newMessage.member.user.id}> - *${newMessage.member.user.tag}*
**Date : ** ${newMessage.createdAt}
**Channel : ** <#${newMessage.channel.id}> - *${newMessage.channel.name}*

**Orignal Message : **
\`\`\`
${oldMessage.content.replace(/`/g, "'")}
\`\`\`
**Updated Message : **
\`\`\`
${newMessage.content.replace(/`/g, "'")}
\`\`\`
`,
      color: 16737792,
      timestamp: new Date(),
      footer: {
          text: "Edited : "
      },
      author: {
          name: "MESSAGE EDITED",
          icon_url: "https://cdn.discordapp.com/emojis/619328813381320735.png"
      }
  }
  send(client, newMessage.member.guild, options, embed, "messageDelete")
}
})

// USER JOINED V12
client.on("guildMemberAdd", member => {
  setts = client.getSettings(member.guild);
  if(setts["useLogger"] == "true"){    
  const options = {
    auditlog: setts["modLogChannel"].toString(),	
    movement: setts["modLogChannel"].toString(),
    auditmsg: setts["modLogChannel"].toString(), 
    voice: setts["modLogChannel"].toString(), 
    trackroles: true,
  }
  if (debugmode) console.log(`Module: ${description.name} | guildMemberAdd triggered`)
  var embed = {
      description: `<@${member.user.id}> - *${member.user.id}*\nUser Created on: ${new Date(member.user.createdTimestamp).toDateString()}`,
      url: member.user.displayAvatarURL(),
      color: 65280,
      timestamp: new Date(),
      footer: {
          text: `${member.nickname || member.user.username}`
      },
      thumbnail: {
          url: member.user.displayAvatarURL()
      },
      author: {
          name: `USER JOINED : ${member.user.tag}`,
          icon_url: "https://cdn.discordapp.com/emojis/435119354867220511.png"
      }
  }
  send(client, member.guild, options, embed, "guildMemberAdd")
}
})

// USER LEFT V12
client.on("guildMemberRemove", member => {
  setts = client.getSettings(member.guild);
  if(setts["useLogger"] == "true"){
  const options = {
    auditlog: setts["modLogChannel"].toString(),	
    movement: setts["modLogChannel"].toString(),
    auditmsg: setts["modLogChannel"].toString(), 
    voice: setts["modLogChannel"].toString(), 
    trackroles: true,
  }
  if (debugmode) console.log(`Module: ${description.name} | guildMemberRemove triggered`)
  var embed = {
      description: `<@${member.user.id}> - *${member.user.id}*`,
      url: member.user.displayAvatarURL(),
      color: 16711680,
      timestamp: new Date(),
      footer: {
          text: `${member.nickname || member.user.username}`
      },
      thumbnail: {
          url: member.user.displayAvatarURL()
      },
      author: {
          name: `USER LEFT : ${member.user.tag}`,
          icon_url: "https://cdn.discordapp.com/emojis/435119363595436042.png"
      },
      fields: [{
          name: "Nickname",
          value: `**${member.nickname || member.user.username}**`,
          inline: true
      }]
  }
  send(client, member.guild, options, embed, "guildMemberRemove")
}
})
// USER KICKED
// Not very doable

// USER BANNED V12
client.on("guildBanAdd", (banguild, banuser) => {
  setts = client.getSettings(banguild);
  if(setts["useLogger"] == "true"){
  const options = {
    auditlog: setts["modLogChannel"].toString(),	
    movement: setts["modLogChannel"].toString(),
    auditmsg: setts["modLogChannel"].toString(), 
    voice: setts["modLogChannel"].toString(), 
    trackroles: true,
  }
  if (debugmode) console.log(`Module: ${description.name} | guildBanAdd triggered`)
  var embed = {
      description: `<@${banuser.id}> - *${banuser.id}*`,
      url: banuser.displayAvatarURL(),
      color: 16711901,
      timestamp: new Date(),
      footer: {
          text: `${banuser.username}`
      },
      thumbnail: {
          url: banuser.displayAvatarURL()
      },
      author: {
          name: `USER BANNED : ${banuser.tag}`,
          icon_url: "https://cdn.discordapp.com/emojis/435119375138422811.png"
      }
  }
  send(client, banguild, options, embed, "guildBanAdd")
}
})

// USER UNBANNED V12
client.on("guildBanRemove", (banguild, banuser) => {
  setts = client.getSettings(banguild);
  if(setts["useLogger"] == "true"){
  const options = {
    auditlog: setts["modLogChannel"].toString(),	
    movement: setts["modLogChannel"].toString(),
    auditmsg: setts["modLogChannel"].toString(), 
    voice: setts["modLogChannel"].toString(), 
    trackroles: true,
  }
  if (debugmode) console.log(`Module: ${description.name} | guildBanRemove triggered`)
  var embed = {
      description: `<@${banuser.id}> - *${banuser.id}*`,
      url: banuser.displayAvatarURL(),
      color: 16776960,
      timestamp: new Date(),
      footer: {
          text: `${banuser.username}`
      },
      thumbnail: {
          url: banuser.displayAvatarURL()
      },
      author: {
          name: `USER UNBANNED : ${banuser.tag}`,
          icon_url: "https://cdn.discordapp.com/emojis/435462140900409344.png"
      }
  }
  send(client, banguild, options, embed, "guildBanRemove")
}
})

// USER NICKNAME UPDATE V12
client.on("guildMemberUpdate", (oldMember, newMember) => {
  setts = client.getSettings(newMember.guild);
  if(setts["useLogger"] == "true"){
  const options = {
    auditlog: setts["modLogChannel"].toString(),	
    movement: setts["modLogChannel"].toString(),
    auditmsg: setts["modLogChannel"].toString(), 
    voice: setts["modLogChannel"].toString(), 
    trackroles: true,
  }
  if (debugmode) console.log(`Module: ${description.name} | guildMemberUpdate:nickname triggered`)
  if (oldMember.nickname !==
       newMember.nickname) {
      var embed = {
          description: `<@${newMember.user.id}> - *${newMember.user.id}*`,
          url: newMember.user.displayAvatarURL(),
          color: 29372,
          timestamp: new Date(),
          footer: {
              text: `${newMember.nickname || newMember.user.username}`
          },
          thumbnail: {
              url: newMember.user.displayAvatarURL()
          },
          author: {
              name: `NICKNAME CHANGED: ${newMember.user.tag}`,
              icon_url: "https://cdn.discordapp.com/emojis/435119397237948427.png"
          },
          fields: [{
              name: "Old Nickname",
              value: `**${oldMember.nickname || oldMember.user.username}**`,
              inline: true
          },
          {
              name: "New Nickname",
              value: `**${newMember.nickname || newMember.user.username}**`,
              inline: true
          }
          ]
      }
      send(client, newMember.guild, options, embed, "guildMemberUpdate")
  }
}
})


// MEMBER ROLE (Groups) UPDATE V12
client.on("guildMemberUpdate", (oldMember, newMember) => {
  setts = client.getSettings(oldMember.guild);
  if(setts["useLogger"] == "true"){
  const options = {
    auditlog: setts["modLogChannel"].toString(),	
    movement: setts["modLogChannel"].toString(),
    auditmsg: setts["modLogChannel"].toString(), 
    voice: setts["modLogChannel"].toString(), 
    trackroles: true,
  }
  if (debugmode) console.log(`Module: ${description.name} | guildMemberUpdate:roles triggered`)

  // Initialize option if empty
  if (!options) {
      options = {}
  }

  if (options[newMember.guild.id]) {
      options = options[newMember.guild.id]
  }

  if (typeof options.excludedroles === "undefined") options.excludedroles = new Array([])
  if (typeof options.trackroles === "undefined") options.trackroles = false
  if (options.trackroles !== false) {
      const oldMemberRoles = oldMember.roles.cache.keyArray()
      const newMemberRoles = newMember.roles.cache.keyArray()


      const oldRoles = oldMemberRoles.filter(x => !options.excludedroles.includes(x)).filter(x => !newMemberRoles.includes(x))
      const newRoles = newMemberRoles.filter(x => !options.excludedroles.includes(x)).filter(x => !oldMemberRoles.includes(x))

      const rolechanged = (newRoles.length || oldRoles.length)

      if (rolechanged) {
          let roleadded = ""
          if (newRoles.length > 0) {
              for (let i = 0; i < newRoles.length; i++) {
                  if (i > 0) roleadded += ", "
                  roleadded += `<@&${newRoles[i]}>`
              }
          }

          let roleremoved = ""
          if (oldRoles.length > 0) {
              for (let i = 0; i < oldRoles.length; i++) {
                  if (i > 0) roleremoved += ", "
                  roleremoved += `<@&${oldRoles[i]}>`
              }
          }
          var embed = {
              description: `<@${newMember.user.id}> - *${newMember.user.id}*`,
              url: newMember.user.displayAvatarURL(),
              color: 29372,
              timestamp: new Date(),
              footer: {
                  text: `${newMember.nickname || newMember.user.username}`
              },
              thumbnail: {
                  url: newMember.user.displayAvatarURL()
              },
              author: {
                  name: `ROLES CHANGED: ${newMember.user.tag}`,
                  icon_url: "https://cdn.discordapp.com/emojis/435119397237948427.png"
              },
              fields: [{
                  name: "ROLES REMOVED",
                  value: `**${roleremoved} **`,
                  inline: true
              },
              {
                  name: "ROLES ADDED: ",
                  value: `**${roleadded} **`,
                  inline: true
              }
              ]
          }
          send(client, newMember.guild, options, embed, "guildMemberUpdate")
      }
  }
}
})

// USER UPDATE AVATAR, USERNAME, DISCRIMINATOR V12
client.on("userUpdate", (oldUser, newUser) => {
  setts = client.getSettings(oldUser.guild);
  if(setts["useLogger"] == "true"){
  const options = {
    auditlog: setts["modLogChannel"].toString(),	
    movement: setts["modLogChannel"].toString(),
    auditmsg: setts["modLogChannel"].toString(), 
    voice: setts["modLogChannel"].toString(), 
    trackroles: true,
  }
  if (debugmode) console.log(`Module: ${description.name} | userUpdate triggered`)

  var usernameChangedMsg = null
  var discriminatorChangedMsg = null
  var avatarChangedMsg = null

  client.guilds.cache.forEach(function (guild, guildid) {
      guild.members.cache.forEach(function (member, memberid) {
          if (newUser.id === memberid) {

              // USERNAME CHANGED V12
              if (oldUser.username !== newUser.username) {
                  if (debugmode) console.log(`Module: ${description.name} | userUpdate:USERNAME triggered`)

                  usernameChangedMsg = {
                      description: `<@${newUser.id}> - *${newUser.id}*`,
                      url: newUser.displayAvatarURL(),
                      color: 29372,
                      timestamp: new Date(),
                      footer: {
                          text: `${member.nickname || member.user.username}`
                      },
                      thumbnail: {
                          url: newUser.displayAvatarURL()
                      },
                      author: {
                          name: `USERNAME CHANGED: ${newUser.tag}`,
                          icon_url: "https://cdn.discordapp.com/emojis/435119402279763968.png"
                      },
                      fields: [{
                          name: "Old Username",
                          value: `**${oldUser.username}**`,
                          inline: true
                      },
                      {
                          name: "New Username",
                          value: `**${newUser.username}**`,
                          inline: true
                      }
                      ]
                  }
              }

              // DISCRIMINATOR CHANGED V12
              if (oldUser.discriminator !== newUser.discriminator) {
                  if (debugmode) console.log(`Module: ${description.name} | userUpdate:DISCRIMINATOR triggered`)

                  discriminatorChangedMsg = {
                      description: `<@${newUser.id}> - *${newUser.id}*`,
                      url: newUser.displayAvatarURL(),
                      color: 29372,
                      timestamp: new Date(),
                      footer: {
                          text: `${member.nickname || member.user.username}`
                      },
                      thumbnail: {
                          url: newUser.displayAvatarURL()
                      },
                      author: {
                          name: `DISCRIMINATOR CHANGED: ${newUser.tag}`,
                          icon_url: "https://cdn.discordapp.com/emojis/435119390078271488.png"
                      },
                      fields: [{
                          name: "Old Discriminator",
                          value: `**${oldUser.discriminator}**`,
                          inline: true
                      },
                      {
                          name: "New Discriminator",
                          value: `**${newUser.discriminator}**`,
                          inline: true
                      }
                      ]
                  }
              }

              // AVATAR CHANGED V12
              if (oldUser.avatar !== newUser.avatar) {
                  if (debugmode) console.log(`Module: ${description.name} | userUpdate:AVATAR triggered`)

                  avatarChangedMsg = {
                      description: `<@${newUser.id}> - *${newUser.id}*`,
                      url: newUser.displayAvatarURL(),
                      color: 29372,
                      timestamp: new Date(),
                      footer: {
                          text: `${member.nickname || member.user.username}`
                      },
                      thumbnail: {
                          url: newUser.displayAvatarURL()
                      },
                      author: {
                          name: `AVATAR CHANGED: ${newUser.tag}`,
                          icon_url: "https://cdn.discordapp.com/emojis/435119382910337024.png"
                      },
                      image: {
                          url: oldUser.displayAvatarURL()
                      },
                      fields: [{
                          name: "Old Avatar",
                          value: ":arrow_down:"
                      }]
                  }
              }

              if (usernameChangedMsg) send(client, guild, options, usernameChangedMsg, "usernameChangedMsg")
              if (discriminatorChangedMsg) send(client, guild, options, discriminatorChangedMsg, "discriminatorChangedMsg")
              if (avatarChangedMsg) send(client, guild, options, avatarChangedMsg, "avatarChangedMsg")
          }
      })
  })
}
})

// CHANNEL JOIN LEAVE SWITCH V12
client.on("voiceStateUpdate", (oldState, newState) => {
  setts = client.getSettings(oldState.guild);
  if(setts["useLogger"] == "true"){
  const options = {
    auditlog: setts["modLogChannel"].toString(),	
    movement: setts["modLogChannel"].toString(),
    auditmsg: setts["modLogChannel"].toString(), 
    voice: setts["modLogChannel"].toString(), 
    trackroles: true,
  }
  if (debugmode) console.log(`Module: ${description.name} | voiceStateUpdate triggered`)
  var oldChannelName
  var newChannelName
  var embed

  // SET CHANNEL NAME STRING
  let oldparentname = "unknown"
  let oldchannelname = "unknown"
  let oldchanelid = "unknown"
  if (oldState && oldState.channel && oldState.channel.parent && oldState.channel.parent.name) oldparentname = oldState.channel.parent.name
  if (oldState && oldState.channel && oldState.channel.name) oldchannelname = oldState.channel.name
  if (oldState && oldState.channelID) oldchanelid = oldState.channelID

  let newparentname = "unknown"
  let newchannelname = "unknown"
  let newchanelid = "unknown"
  if (newState && newState.channel && newState.channel.parent && newState.channel.parent.name) newparentname = newState.channel.parent.name
  if (newState && newState.channel && newState.channel.name) newchannelname = newState.channel.name
  if (newState && newState.channelID) newchanelid = newState.channelID

  if (oldState.channelID) {
      if (typeof oldState.channel.parent !== "undefined") {
          oldChannelName = `${oldparentname}\n\t**${oldchannelname}**\n*${oldchanelid}*`
      } else {
          oldChannelName = `-\n\t**${oldparentname}**\n*${oldchanelid}*`
      }
  }
  if (newState.channelID) {
      if (typeof newState.channel.parent !== "undefined") {
          newChannelName = `${newparentname}\n\t**${newchannelname}**\n*${newchanelid}*`
      } else {
          newChannelName = `-\n\t**${newchannelname}**\n*${newchanelid}*`
      }
  }

  // JOINED V12
  if (!oldState.channelID && newState.channelID) {
      if (debugmode) console.log(`Module: ${description.name} | voiceStateUpdate:JOINED triggered`)
      embed = {
          description: `<@${newState.member.user.id}> - *${newState.member.user.id}*`,
          url: newState.member.user.displayAvatarURL(),
          color: 3381555,
          timestamp: new Date(),
          footer: {
              text: `${newState.member.nickname || newState.member.user.username}`
          },
          thumbnail: {
              url: newState.member.user.displayAvatarURL()
          },
          author: {
              name: `Joined channel : ${newState.member.user.tag}`,
              icon_url: "https://cdn.discordapp.com/emojis/435184638160404480.png"
          },
          fields: [{
              name: "Joined channel",
              value: `${newChannelName}`
          }]
      }
  }


  // LEFT V12
  if (oldState.channelID && !newState.channelID) {
      if (debugmode) console.log(`Module: ${description.name} | voiceStateUpdate:LEFT triggered`)
      embed = {
          url: newState.member.user.displayAvatarURL(),
          color: 10040115,
          timestamp: new Date(),
          footer: {
              text: `${newState.member.nickname || newState.member.user.username}`
          },
          thumbnail: {
              url: newState.member.user.displayAvatarURL()
          },
          author: {
              name: `Left channel : ${newState.member.user.tag}`,
              icon_url: "https://cdn.discordapp.com/emojis/435174900227899393.png"
          },
          fields: [{
              name: "Left channel",
              value: `${oldChannelName}`
          }]
      }
  }


  // SWITCH V12
  if (oldState.channelID && newState.channelID) {
      // False positive check
      if (oldState.channelID !== newState.channelID) {
          if (debugmode) console.log(`Module: ${description.name} | voiceStateUpdate:SWITCH triggered`)

          embed = {
              description: `<@${newState.member.user.id}> - *${newState.member.user.id}*`,
              url: newState.member.user.displayAvatarURL(),
              color: 13421568,
              timestamp: new Date(),
              footer: {
                  text: `${newState.member.nickname || newState.member.user.username}`
              },
              thumbnail: {
                  url: newState.member.user.displayAvatarURL()
              },
              author: {
                  name: `Switched channel : ${newState.member.user.tag}`,
                  icon_url: "https://cdn.discordapp.com/emojis/435440286559371265.png"
              },
              fields: [{
                  name: "Left channel",
                  value: `${oldChannelName}`,
                  inline: true
              },
              {
                  name: "Joined channel",
                  value: `${newChannelName}`,
                  inline: true
              }
              ]
          }
      }
  }


  // SEND
  if (embed) {
      send(client, newState.guild, options, embed, "voiceStateUpdate")
  }
}
})


// SEND FUNCTION V12
function send (client, guild, options, msg, movement) {
  let embed = ""

  if (debugmode) console.log(`Module: ${description.name} | send - configured options:`, options)

  if (!options) {
      options = {}
  }

  if (options[guild.id]) {
      options = options[guild.id]
  }

  if (debugmode) console.log(`Module: ${description.name} | send - specifics options:`, options)

  if (typeof options.auditlog === "undefined") options.auditlog = "audit-log"
  if (typeof options.auditmsg === "undefined") options.auditmsg = false
  if (typeof options.movement === "undefined") options.movement = "in-out"
  if (typeof options.voice === "undefined") options.voice = false


  if (debugmode) console.log(`Module: ${description.name} | send - computed options:`, options)

  const channelname = (options[eventtype[movement]])
  if (channelname) {
      const channel = guild.channels.cache.find(val => val.name === channelname) || guild.channels.cache.find(val => val.id === channelname)
      if (channel) {
          if (channel.permissionsFor(client.user).has("SEND_MESSAGES") && channel.permissionsFor(client.user).has("SEND_MESSAGES")) {
              if (typeof msg === "object") {
                  if (channel.permissionsFor(client.user).has("EMBED_LINKS")) {
                      embed = msg
                      channel.send({
                          embed
                      })
                          .catch(console.error)
                  } else {
                      console.log(`${description.name} -> The client doesn't have the permission EMBED_LINKS to the configured channel "${channelname}" on server "${guild.name}" (${guild.id})`)
                  }
              } else {
                  channel.send(msg)
                      .catch(console.error)
              }
          } else {
              console.log(`${description.name} -> The client doesn't have the permission to send public message to the configured channel "${channelname}" on server "${guild.name}" (${guild.id})`)
          }
      } else {
          console.log(`${description.name} -> The channel "${channelname}" do not exist on server "${guild.name}" (${guild.id})`)
      }
  } else {
      // console.log(`AuditLog: No channel option for event ${movement} on server "${guild.name}" (${guild.id})`);
  }
}





client.on('ready', () => {
  /*const Guilds = client.guilds.cache.map(guild => guild.id);
  var setts;
  Guilds.forEach(guildID => { 
    setts = client.getSettings(guildID);
    console.log(setts["modLogChannel"].toString());
    idsss = guildID.toString();
    console.log(idsss)
    Auditlog(client, {
      idsss: {
        auditlog: "mod-log",	
        movement: "mod-log",
        auditmsg: "mod-log", 
        trackroles: true,
      }
    });
  
  });
  */

})
setInterval(() => {
    dbl.postStats(client.guilds.cache.size);
    console.log("Posted Server Count");
  }, 1800000);





const optionsssss = {
  messageUpdateRate: 5, // how fast should message be updated in second. Under 5 seconds its not going to work. (default: 5)
  selfDeleteTime: 5, // error message that client sends to notify user about something are going to delete in seconds. (default: 5)
  leaveVoiceChannelAfter: 20, // when there isn't playing anything when should client leave the channel is seconds. (default: 20)
  leaveVoiceChannelAfterAllMembersLeft: 20, // when no one is in channel and nothing is playing when should client leave the channel is seconds. (default: 20)
  maxTrackLength: 180, // How long can requested track be in minutes. (default: 180 )
  autoQueryDetection: true, // Smart feature a user only have to type player command and youtube url link and its going to automatically search or look for url. (default: true)
  autoPlaylistDetection: true, // should autoQueryDetection look for playlist link and automatically parse them? (default: false)
  waitTimeBetweenTracks: 2,   // how longs should client wait between switching tracks in seconds. (default: 2)
  maxItemsInPlayList: 100, // how many songs can playlist have in it. (default: 100)
  maxUserItemsInPlayList: 10,  // how many songs can user have in playlist (default: 10)
  playlistParseWait: 2, // wait time between fetching each track form playlist in seconds (default: 2)
  multipleParser: true, // should client look for multiple url in one message eg (player yt_url yt_url) (default: true)
  playlistParse: true, // should client parse playlists at all? (default: false)
  votePercentage: 60, // how many votes in percentage are required to perform vote action in percentage (default: 60)
  coolDown: 5, // how repeatedly can user send client command. It's recommended to be higher tan 5 seconds in seconds (default: 5)
  deleteUserMessage: false, // should delete user command messages (default: true)
  hardDeleteUserMessage: false, // should delete every user message when the player is active (default:false)
  reactionButtons: true, // should add reaction button to easily control the player with out entering commands (default: true)
  suggestReplay: 0, // should client offer you a replay after the end of the song in seconds 0 to disable the feature (default: 20)
   // Custom language pack is check url above. By defining custom command you are only added aliases to existing commands the default ones are still going to be available
};



client.config = require("./config.js");


client.logger = require("./util/logger.js");

require("./util/functions.js")(client);

client.commands = new Enmap();
client.aliases = new Enmap();

client.owners = new Array();


client.settings = new Enmap({ name: "settings", cloneLevel: "deep", fetchAll: false, autoFetch: true });

const init = async () => {

  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  client.login(client.config.token);

};

init();
