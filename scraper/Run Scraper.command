#!/bin/bash
# Double-click this file on macOS to run the scraper.
# It will prompt you for the niche and city, then open the Excel file.
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

VENV="$SCRIPT_DIR/.venv"
if [ ! -d "$VENV" ]; then
  echo "First run: installing dependencies (this takes a minute)..."
  python3 -m venv "$VENV"
  "$VENV/bin/pip" install --quiet --upgrade pip
  "$VENV/bin/pip" install --quiet -r requirements.txt
  "$VENV/bin/python" -m playwright install chromium
fi

if [ -f "$SCRIPT_DIR/.env" ]; then
  set -a
  . "$SCRIPT_DIR/.env"
  set +a
fi

"$VENV/bin/python" "$SCRIPT_DIR/lead_scraper.py" \
  --output "$SCRIPT_DIR/leads_master.xlsx"

echo ""
echo "Done. Opening spreadsheet..."
open "$SCRIPT_DIR/leads_master.xlsx" || true

echo ""
read -n 1 -s -r -p "Press any key to close..."
