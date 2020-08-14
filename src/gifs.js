const Discord = require("discord.js");

exports.searchGif = function (gifName) {
  const gif = new Discord.MessageAttachment(`./assets/${gifName}.gif`);
  return gif;
}