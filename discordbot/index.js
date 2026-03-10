const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {

  if (message.content === "!join") {

    if (!message.member.voice.channel) {
      return message.reply("Join a voice channel first.");
    }

    const channel = message.member.voice.channel;

    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    message.reply("Joined VC");
  }

  if (message.content === "!leave") {

    const connection = getVoiceConnection(message.guild.id);

    if (connection) {
      connection.destroy();
      message.reply("Left VC");
    }
  }

});

client.login(process.env.TOKEN);