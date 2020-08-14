const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const coin = require("./src/coins.js");
const gifs = require("./src/gifs.js");

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
  else if (message.channel.type == "dm") return;
  else if (message.content == "-c dance") {
    const response = gifs.searchGif(message.content.split(" ")[1]);
    message.channel.send(response);
  }
  else if (message.content == "-c usd") {
    const response = await coin.searchSimpleCoin(message.content.split(" ")[1].toUpperCase())
    message.channel.send(response);
  }
  else if (message.content == "-c eur") {
    const response = await coin.searchSimpleCoin(message.content.split(" ")[1].toUpperCase())
    message.channel.send(response);  
  }
  else if (message.content == "-c btc") {
    const response = await coin.searchCoinToUSD(message.content.split(" ")[1].toUpperCase())
    message.channel.send(response);  
  }
  else if (message.content == "-c eth") {
    const response = await coin.searchCoinToUSD(message.content.split(" ")[1].toUpperCase())
    message.channel.send(response);  
  }
  else if (message.content == "-c ltc") {
    const response = await coin.searchCoinToUSD(message.content.split(" ")[1].toUpperCase())
    message.channel.send(response);  
  }
});

client.login(config.token);