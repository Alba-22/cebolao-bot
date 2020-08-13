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
  if (message.content == "-c dance") {
    
  }
});

client.login(config.token);