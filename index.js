/**
 * index.js — Spidey News
 * ---------------------------------------------------------
 * This is a standalone Discord bot, separate from SpideyBot.
 * Its only job: log in, and let newsBot.js handle the scheduled posts.
 * ---------------------------------------------------------
 */

const { Client, GatewayIntentBits } = require("discord.js");
const { initNewsBot } = require("./newsBot");
const config = require("./config");

const client = new Client({
  intents: [GatewayIntentBits.Guilds], // this bot only ever sends messages — it doesn't need to read any
});

client.once("ready", () => {
  console.log(`Spidey News is online as ${client.user.tag}`);
  initNewsBot(client);
});

client.login(config.DISCORD_BOT_TOKEN);
