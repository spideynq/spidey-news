# Spidey News

Standalone Discord bot. Posts to `#spideynq-gems`:
- **7:30 AM ET, weekdays** — full "Today's Watch" market brief (econ calendar + headlines, written up by Gemini)
- **6:00 PM ET, Sun–Thu** — heads-up on tomorrow's high/medium-impact events

Fully separate from SpideyBot — its own Discord application, own token, own Railway project.
If SpideyBot goes down or gets redeployed, this keeps running untouched, and vice versa.

## Files
- `index.js` — logs into Discord, starts the scheduler
- `newsBot.js` — all the actual logic: fetching data, generating the brief, posting, fallback handling
- `config.js` — pulls every secret from environment variables (set in Railway, never hardcoded)

## Environment variables (set these in Railway → Variables)
```
DISCORD_BOT_TOKEN=
FINNHUB_API_KEY=
GEMINI_API_KEY=
NEWS_CHANNEL_ID=
OWNER_ID=
```

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
