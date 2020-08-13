const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot started, running in ${client.guilds.cache.size} server(s)`);
  client.user.setPresence({
    status: "online",
    activity: {
      name: `você morrer de novo`,
      type: "WATCHING"
    }
  });
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  if (message.content == "-c dance") {
    const attachment = new Discord.MessageAttachment("./assets/dance.gif");
    message.channel.send(attachment);
  }
  if (message.contenr == "-c a") {
    
  }
});

client.login(config.token);