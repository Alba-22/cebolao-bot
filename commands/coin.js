const axios = require("axios");

module.exports = {
  name: "coin",
  description: "Exibe o valor de uma moeda",
  aliases: "currency",
  usage: "[pair1_label] [pair2_label]",
  cooldown: 1,
  args: true,
  guildOnly: false,
  async execute(message, args) {
    if (args.length > 2) {
      return message.channel.send("Muitos argumentos passados");
    }
    for (let i = 0; i < args.length; i++) {
      if (!args[i].match("[a-zA-Z]")) {
        return message.channel.send("Argumentos inválidos passados");
      }
    }
    try {
      const pair1Name = args[0].toUpperCase();
      const pair1Response = await axios.get(
        `https://economia.awesomeapi.com.br/json/all/${pair1Name}-BRL`,
      );
  
      if (pair1Response.status != 200) {
        return message.channel.send(`Não foi possível buscar valores para ${pair1Name}`);
      }
      else if (args.length == 1 && pair1Response.status == 200) {
        const pair1Data = pair1Response.data[pair1Name];
        return message.channel.send(`${pair1Data.name}: ${Number(pair1Data.high).toFixed(2)} ${pair1Data.codein}`);
      }
      else if (args.length == 2 && pair1Response.status == 200) {
        const pair2Name = args[1].toUpperCase();
        const pair2Response = await axios.get(
          `https://economia.awesomeapi.com.br/json/all/${pair2Name}-BRL`,
        );
        if (pair2Response.status == 200) {
          const pair1Data = pair1Response.data[pair1Name];
          const pair2Data = pair2Response.data[pair2Name];
          return message.channel.send(`${pair1Data.name}: ${(Number(pair1Data.high) / Number(pair2Data.high)).toFixed(2)} ${pair2Data.code}`)
        }
        else {
          return message.channel.send(`Não foi possível buscar valores para ${pair2Name}`);
        }
      }
    }
    catch (error) {
      console.log(`Coin Error: ${error}`);
      if (args.length == 1) {
        return message.channel.send(`Não foi possível buscar valores para ${args[0].toUpperCase()}`);
      }
      return message.channel.send(`Não foi possível buscar valores para ${args[0].toUpperCase()}/${args[1].toUpperCase()}`);
    }
  }
}