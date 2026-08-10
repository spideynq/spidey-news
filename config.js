/**
 * config.js — Spidey News
 * ---------------------------------------------------------
 * Every value here comes from an environment variable set in
 * Railway (Variables tab). Never hardcode real keys in this file —
 * that's what lets you commit this file safely to GitHub.
 * ---------------------------------------------------------
 */

module.exports = {
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  FINNHUB_API_KEY: process.env.FINNHUB_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  NEWS_CHANNEL_ID: process.env.NEWS_CHANNEL_ID,
  OWNER_ID: process.env.OWNER_ID, // where fallback/failure alerts get DMed
  CLIENT_ID: process.env.CLIENT_ID, // Discord Application ID — only needed for deploy-commands.js
  GUILD_ID: process.env.GUILD_ID, // your server's ID — only needed for deploy-commands.js
};
