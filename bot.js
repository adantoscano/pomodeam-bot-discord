require('dotenv').config();
const Discord = require('discord.js');

let teamodoro = null;
let started = false;

// Initialize Discord Bot
var bot = new Discord.Client();

bot.on('ready', () => {
  // ready...
  console.log('Redi');
});

bot.on('message', message => {
  // ignore messages from bots
  if (message.author.bot) {
    return;
  }

  if (message.content.startsWith(`<@${bot.user.id}>`)) {
    const args = message.content.split(' ');
    const cmd = args[1];

    switch (cmd) {
      case 'help':
        const helpEmbed = new Discord.RichEmbed()
          .setTitle('Commands list by mentioning this bot')
          .addField('start', 'Start pomodoro time counter')
          .addField('stop', 'Stop pomodoro time counter')
          .setColor('#F52C28');
        message.channel.send(helpEmbed);
      break;
      case 'start':
        teamodoro = require('./teamodoro')(bot, message.channel.id);
        teamodoro.start();
        started = true;

        const startEmbed = new Discord.RichEmbed()
          .setTitle('Started!')
          .setDescription('Pomodoro counter has been started!')
          .setColor('#F52C28');
        message.channel.send(startEmbed);
      break;
      case 'stop':
        if (teamodoro) {
          teamodoro.stop();
          started = false;

          const stopEmbed = new Discord.RichEmbed()
            .setTitle('Stopped!')
            .setDescription('Pomodoro counter has been stopped!')
            .setColor('#F52C28');
          message.channel.send(stopEmbed);
        } else {
          message.reply(`Pomodoro counter has no been started yet! Use  \`@${bot.user.tag} start\` to start it.`);
        }
      break;
      default:
        if (!started) {
          message.reply(`Hello! mention me to start the pomodoro counter using \`@${bot.user.tag} start\``);
        } else {
          message.reply(`The counter is already started. Use \`@${bot.user.tag} stop\` to stop it.`)
        }
      break;
    }
  }
});

bot.login(process.env.BOT_TOKEN);
