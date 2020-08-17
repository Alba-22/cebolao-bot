const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const fs = require('fs'); // Node file system module
const { time } = require("console");

const client = new Discord.Client();
client.commands = new Discord.Collection();
cooldowns = new Discord.Collection();

// List all the file names in ./commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Cebolão is ready, running in ${client.guilds.cache.size} server(s)`);
  client.user.setPresence({
    status: "online",
    activity: {
      name: `você morrer de novo`,
      type: "WATCHING"
    }
  });
});

client.on("message", async (message) => {

  // If who sent is a bot or command don't start with prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  // Check if command sent is in commands collection
  if (!client.commands.has(commandName)) {
    return message.channel.send(`Comando não encontrado, digite **${prefix}help**.`);
  }

  // Search for command using commandName or command aliasses
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  // When command need arguments
  if (command.args && !args.length) {
    let reply = `Nenhum argumento foi passado, ${message.author}!`;

    // Show an example of usage
		if (command.usage) {
			reply += `\nExemplo de uso: \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
  }

  // When message is sent in DM, but command need to sent in guild
  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply("Não é possível executar esse comando em mensagens privadas")
  }

  // Handle cooldowns
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 30) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`Aguarde mais ${timeLeft.toFixed(1)} segundos. \`${command.name}\` está em cooldown.`);
    }
  }
  else {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  // Execute command
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Cebolão falhou em executar o comando.');
  }
});

client.login(token);