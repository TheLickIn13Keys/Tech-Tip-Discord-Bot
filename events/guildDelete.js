
module.exports = (client, guild) => {

  client.settings.delete(guild.id);
  client.logger.log(`Left guild: ${guild.name} (${guild.id}) with ${guild.memberCount} members`);
};
