const Discord = require("discord.js");

module.exports = {
  name: "dance",
  description: "Mostra o Cebolão em seu auge em Sen's Fortress",
  cooldown: 300,
  args: false,
  guildOnly: false,
  execute(message, _) {
    const gif = new Discord.MessageAttachment(`./assets/dance.gif`);
    if (gif) {
      return message.channel.send(gif);
    }
  }
}