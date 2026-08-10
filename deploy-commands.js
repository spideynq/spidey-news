/**
 * deploy-commands.js
 * ---------------------------------------------------------
 * Registers /news and /tomorrow as slash commands for Spidey News.
 * Run this ONCE after first deploying (and again anytime you add/change
 * a command). It doesn't run automatically on every startup — same
 * pattern as SpideyBot's deploy-commands.js.
 *
 * Run it locally with: node deploy-commands.js
 * (Needs DISCORD_BOT_TOKEN, CLIENT_ID, and GUILD_ID available as env vars —
 * either export them in your terminal first, or run it as a one-off
 * command in Railway's shell.)
 * ---------------------------------------------------------
 */

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("news")
    .setDescription("Pull today's market brief right now, instead of waiting for 7:30 AM"),
  new SlashCommandBuilder()
    .setName("tomorrow")
    .setDescription("Pull tomorrow's heads-up on high/medium-impact events right now"),
].map((c) => c.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log("Done — /news and /tomorrow are ready to use in your server.");
  } catch (err) {
    console.error("Failed to register commands:", err);
  }
})();
