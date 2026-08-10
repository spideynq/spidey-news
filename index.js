/**
 * index.js — Spidey News
 * ---------------------------------------------------------
 * This is a standalone Discord bot, separate from SpideyBot.
 * Handles: the scheduled posts (via newsBot.js) AND on-demand
 * slash commands (/news, /tomorrow) so you can pull a brief early.
 * ---------------------------------------------------------
 */

const { Client, GatewayIntentBits } = require("discord.js");
const { initNewsBot, runMorningPost, runEveningWarning } = require("./newsBot");
const config = require("./config");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("ready", () => {
  console.log(`Spidey News is online as ${client.user.tag}`);
  initNewsBot(client);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "news") {
    // Fetching data + generating the writeup takes a few seconds —
    // deferReply keeps Discord from timing out the interaction while we work.
    await interaction.reply({ content: "Pulling today's brief now — posting in a moment...", ephemeral: true });
    await runMorningPost(client);
  }

  if (interaction.commandName === "tomorrow") {
    await interaction.reply({ content: "Pulling tomorrow's heads-up now...", ephemeral: true });
    await runEveningWarning(client);
  }
});

client.login(config.DISCORD_BOT_TOKEN);
