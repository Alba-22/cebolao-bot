const Discord = require("discord.js");
const { prefix } = require('../config.json');

module.exports = {
  name: "help",
  description: "Listagem das habilidades de Cebolão",
  aliases: "commands",
  usage: "[command_name]",
  cooldown: 120,
  args: false,
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    // No arguments, send a list of all commands
    if (!args.length) {
      data.push(commands.map(command => `**${prefix}${command.name}:** *${command.description}*`).join("\n"));
      data.push(`\nDigite ${prefix}help <commando> para ver mais`);
      const embed = new Discord.MessageEmbed()
      .setTitle("🧅 Lista de minhas habilidades:")
      .setColor(0xf1c40f)
      .setDescription(data, { split: true });
      return message.channel.send(embed);
    }
    else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.find(c => c.aliases && c.aliases.includes(name));

      if (!command) {
        return message.reply("Comando inválido");
      }
      data.push(`${command.description}`);
      data.push(`Uso: ${prefix}${command.name} ${command.usage}`);
      const cooldown = command.cooldown || 0;
      data.push(`Cooldown: ${cooldown} segundo(s)`);
      const embed = new Discord.MessageEmbed()
      .setTitle(`🧅 Comando: ${command.name}`)
      .setColor(0xf1c40f)
      .setDescription(data, { split: true });
      return message.channel.send(embed);
    }
  }
}