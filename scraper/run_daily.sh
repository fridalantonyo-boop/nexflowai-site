#!/bin/bash
# Daily lead scraper runner. Edit NICHE and CITY below.
set -e

# ===== Edit these =====
NICHE="dental office"
CITY="Miami FL"
# ======================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

VENV="$SCRIPT_DIR/.venv"
if [ ! -d "$VENV" ]; then
  python3 -m venv "$VENV"
  "$VENV/bin/pip" install --quiet --upgrade pip
  "$VENV/bin/pip" install --quiet -r requirements.txt
  "$VENV/bin/python" -m playwright install chromium
fi

# Load HUNTER_API_KEY from .env (KEY=VALUE format) if present.
if [ -f "$SCRIPT_DIR/.env" ]; then
  set -a
  . "$SCRIPT_DIR/.env"
  set +a
fi

mkdir -p "$SCRIPT_DIR/logs"
TS=$(date +"%Y-%m-%d_%H-%M")
LOG="$SCRIPT_DIR/logs/run_$TS.log"

echo "[$(date)] Starting scrape: $NICHE / $CITY" >> "$LOG"
"$VENV/bin/python" "$SCRIPT_DIR/lead_scraper.py" \
  "$NICHE" "$CITY" \
  --output "$SCRIPT_DIR/leads_master.xlsx" \
  --max 40 \
  >> "$LOG" 2>&1
echo "[$(date)] Done." >> "$LOG"
