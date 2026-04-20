# Lead Scraper

## Manual run

```bash
cd scraper
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python -m playwright install chromium
export HUNTER_API_KEY=xxxxxxx
python lead_scraper.py "dental office" "Miami FL" --output leads_master.csv
```

Results append to `leads_master.csv`. Duplicates are filtered by
`(business name, phone digits)`, so re-running only adds new leads.

## Schedule on Mac mini (8 AM daily via launchd)

1. Copy `.env.example` to `.env` and add your Hunter.io key.
2. Edit `NICHE` and `CITY` at the top of `run_daily.sh`.
3. Make runner executable: `chmod +x run_daily.sh`
4. Point the plist at the absolute path, then install it:

```bash
ABS=$(cd scraper && pwd)
sed -i '' "s|/REPLACE/WITH/ABSOLUTE/PATH/TO/scraper|$ABS|g" \
  scraper/com.nexflow.leadscraper.plist
cp scraper/com.nexflow.leadscraper.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.nexflow.leadscraper.plist
```

Verify: `launchctl list | grep nexflow`
Unload: `launchctl unload ~/Library/LaunchAgents/com.nexflow.leadscraper.plist`

`run_daily.sh` creates the venv and installs Playwright on first run, then
writes a timestamped log under `scraper/logs/`.

> Caveat: launchd only fires at 8 AM if the Mac is awake. In System
> Settings → Energy, enable "Wake for network access" or set a Power
> Schedule to wake the machine a minute before 8 AM.
