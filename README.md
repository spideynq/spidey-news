# Spidey News

Standalone Discord bot. Posts to `#spideynq-gems`:
- **7:30 AM ET, weekdays** — full "Today's Watch" market brief (econ calendar + headlines, written up by Gemini)
- **6:00 PM ET, Sun–Thu** — heads-up on tomorrow's high/medium-impact events

Fully separate from SpideyBot — its own Discord application, own token, own Railway project.
If SpideyBot goes down or gets redeployed, this keeps running untouched, and vice versa.

## Files
- `index.js` — logs into Discord, starts the scheduler, and handles the `/news` and `/tomorrow` slash commands
- `newsBot.js` — all the actual logic: fetching data, generating the brief, posting, fallback handling
- `config.js` — pulls every secret from environment variables (set in Railway, never hardcoded)
- `deploy-commands.js` — one-time script that registers the slash commands with Discord

## Environment variables (set these in Railway → Variables)
```
DISCORD_BOT_TOKEN=
FINNHUB_API_KEY=
GEMINI_API_KEY=
NEWS_CHANNEL_ID=
OWNER_ID=
CLIENT_ID=      (only needed to run deploy-commands.js — your Discord Application ID, found on the same page you got the bot token)
GUILD_ID=       (only needed to run deploy-commands.js — right-click your server icon → Copy Server ID)
```

## On-demand commands
Once deployed, anyone in the server can type `/news` to get today's brief immediately
instead of waiting for 7:30 AM, or `/tomorrow` for the next-day heads-up. These use the
exact same logic (and the same fallback-if-Gemini-fails safety net) as the scheduled posts.

**One-time setup step:** slash commands don't register themselves — you have to run
`deploy-commands.js` once after deploying (and again anytime you add a new command).
Easiest way: in Railway, open your service → click the three-dot menu → "Command" or open
a shell, and run:
```bash
node deploy-commands.js
```
You'll need `CLIENT_ID` and `GUILD_ID` set as variables first (see above) for this to work.

## Local testing (optional)
```bash
npm install
DISCORD_BOT_TOKEN=xxx FINNHUB_API_KEY=xxx GEMINI_API_KEY=xxx NEWS_CHANNEL_ID=xxx OWNER_ID=xxx node index.js
```

## Deploying
Push to GitHub → Railway auto-deploys from the connected repo. Check Railway logs for:
```
Spidey News is online as Spidey News#XXXX
News bot scheduled: morning brief 7:30 AM ET, evening warning 6:00 PM ET (Sun–Thu).
```
