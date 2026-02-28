#!/bin/bash
# Validate JS/HTML files before committing.
# Usage: validate-js.sh <file> [<file2> ...]
# Exits non-zero if any file has syntax errors.

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

if [ $# -eq 0 ]; then
  echo "Usage: validate-js.sh <file> [<file2> ...]"
  exit 1
fi

errors=0

for file in "$@"; do
  ext="${file##*.}"
  
  if [ "$ext" = "js" ]; then
    if node -c "$file" 2>/dev/null; then
      echo -e "${GREEN}✓${NC} $file"
    else
      echo -e "${RED}✗${NC} $file — syntax error!"
      node -c "$file" 2>&1 | head -5
      errors=$((errors + 1))
    fi
  elif [ "$ext" = "html" ]; then
    # Extract inline <script> blocks (skip <script src=...>) and check syntax
    tmpjs=$(mktemp /tmp/validate-XXXXXX.js)
    # Use awk to only extract content of <script> tags without src attribute
    awk '
      /<script[^>]*src[[:space:]]*=/ { next }
      /<script[^>]*>/ { capture=1; next }
      /<\/script>/ { capture=0; next }
      capture { print }
    ' "$file" > "$tmpjs"
    if [ -s "$tmpjs" ]; then
      if node -c "$tmpjs" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $file (inline JS)"
      else
        echo -e "${RED}✗${NC} $file — inline JS syntax error!"
        node -c "$tmpjs" 2>&1 | head -5
        errors=$((errors + 1))
      fi
    else
      echo -e "${GREEN}✓${NC} $file (no script blocks)"
    fi
    rm -f "$tmpjs"
  elif [ "$ext" = "json" ]; then
    if node -e "JSON.parse(require('fs').readFileSync('$file','utf8'))" 2>/dev/null; then
      echo -e "${GREEN}✓${NC} $file"
    else
      echo -e "${RED}✗${NC} $file — invalid JSON!"
      errors=$((errors + 1))
    fi
  fi
done

if [ $errors -gt 0 ]; then
  echo -e "\n${RED}$errors file(s) with errors. Fix before committing.${NC}"
  exit 1
fi
echo -e "\n${GREEN}All files valid.${NC}"
