# Lead Scraper

Outputs to `leads_master.xlsx` in this folder. Re-running appends only new
rows (dedup on business name + phone).

## Easy mode (double-click)

1. Put your Hunter.io key in a file called `.env` in this folder:
   ```
   HUNTER_API_KEY=your_key_here
   ```
2. Double-click **`Run Scraper.command`**.
3. It asks for the niche and city in a Terminal window.
4. When it finishes, `leads_master.xlsx` opens automatically.

First launch takes ~1 minute to install dependencies. After that it's fast.

> **First time on Mac:** if macOS blocks the `.command` file, right-click it
> → Open → Open. You only need to do that once.

## Daily auto-run at 8 AM (launchd)

1. Edit `NICHE` and `CITY` at the top of `run_daily.sh`.
2. Install the launchd job:
   ```bash
   ABS=$(cd scraper && pwd)
   sed -i '' "s|/REPLACE/WITH/ABSOLUTE/PATH/TO/scraper|$ABS|g" \
     scraper/com.nexflow.leadscraper.plist
   cp scraper/com.nexflow.leadscraper.plist ~/Library/LaunchAgents/
   launchctl load ~/Library/LaunchAgents/com.nexflow.leadscraper.plist
   ```
3. Enable System Settings → Energy → "Wake for network access" so the Mac
   is awake at 8 AM.

Verify: `launchctl list | grep nexflow`
Unload: `launchctl unload ~/Library/LaunchAgents/com.nexflow.leadscraper.plist`

## Advanced (CLI)

```bash
python lead_scraper.py "dental office" "Miami FL" --output leads_master.xlsx --max 40
```

Flags: `--max N`, `--no-headless` (show browser), `--hunter-key KEY`.
