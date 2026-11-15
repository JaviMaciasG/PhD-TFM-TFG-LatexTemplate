#!/usr/bin/env bash

set -euo pipefail

# ------------------------------------------------------------
# Compare PDF files side by side using Evince.
#
# Usage:
#   compare-pdf.sh DIR1 DIR2 [FILE.pdf]
#
# With FILE.pdf: compare only that file.
# Without FILE.pdf: compare all matching PDFs sequentially.
#
# Requires: evince, wmctrl, xdotool, X11
# ------------------------------------------------------------

usage() {
    echo "Usage: $(basename "$0") DIR1 DIR2 [FILE.pdf]"
}

if [[ $# -lt 2 || $# -gt 3 ]]; then
    usage >&2
    exit 1
fi

# Check dependencies
for cmd in evince wmctrl xdotool realpath find sort; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
        echo "Error: Missing dependency: $cmd" >&2
        exit 1
    fi
done

if [[ "${XDG_SESSION_TYPE:-}" == "wayland" ]]; then
    echo "Error: Window positioning requires an X11 session." >&2
    exit 1
fi

# Resolve directories
DIR1=$(realpath "$1")
DIR2=$(realpath "$2")

for dir in "$DIR1" "$DIR2"; do
    if [[ ! -d "$dir" ]]; then
        echo "Error: Directory not found: $dir" >&2
        exit 1
    fi
done

# ------------------------------------------------------------
# Find Evince windows
# ------------------------------------------------------------

evince_windows() {
    xdotool search --onlyvisible --class '[Ee]vince' \
        2>/dev/null | sort -u || true
}

window_exists() {
    xdotool getwindowname "$1" >/dev/null 2>&1
}

# ------------------------------------------------------------
# Open a PDF and return its new window ID
# ------------------------------------------------------------

open_pdf() {
    local pdf="$1"
    local before after id
    local attempt

    before=$(evince_windows)

    evince "$pdf" >/dev/null 2>&1 &

    # Wait up to 15 seconds for a new window
    for ((attempt=0; attempt<150; attempt++)); do

        sleep 0.1

        after=$(evince_windows)

        while IFS= read -r id; do

            [[ -z "$id" ]] && continue

            if ! grep -Fxq "$id" <<< "$before"; then
                echo "$id"
                return 0
            fi

        done <<< "$after"

    done

    echo "Error: Could not identify Evince window: $pdf" >&2
    return 1
}

# ------------------------------------------------------------
# Position and resize window
# ------------------------------------------------------------

position_window() {
    local win="$1"
    local x="$2"
    local width="$3"
    local height="$4"

    # Remove maximization
    wmctrl -ir "$win" \
        -b remove,maximized_vert,maximized_horz

    sleep 0.2

    # Move and resize
    wmctrl -ir "$win" \
        -e "0,$x,0,$width,$height"

    sleep 0.3

    # Activate and apply Fit Page
    xdotool windowactivate --sync "$win"
    xdotool key --clearmodifiers f
}

# ------------------------------------------------------------
# Compare one pair of PDFs
# ------------------------------------------------------------

compare_pair() {
    local filename="$1"

    local pdf1="$DIR1/$filename"
    local pdf2="$DIR2/$filename"

    local win1 win2
    local screen_w screen_h half_w

    echo
    echo "=================================================="
    echo "Comparing: $filename"
    echo "=================================================="

    # Open both PDF files
    win1=$(open_pdf "$pdf1")

    if ! win2=$(open_pdf "$pdf2"); then
        echo "Could not open second window." >&2
        echo "Close the first window manually if necessary." >&2
        return 1
    fi

    # Get screen dimensions
    read -r screen_w screen_h < <(
        xdotool getdisplaygeometry
    )

    half_w=$((screen_w / 2))

    # Position windows
    position_window \
        "$win1" 0 "$half_w" "$screen_h"

    position_window \
        "$win2" "$half_w" \
        "$((screen_w - half_w))" "$screen_h"

    echo "LEFT:  $pdf1"
    echo "RIGHT: $pdf2"
    echo
    echo "Close BOTH windows to continue..."

    # --------------------------------------------------------
    # Wait until BOTH windows have been closed
    # --------------------------------------------------------

    while window_exists "$win1" || window_exists "$win2"; do
        sleep 0.5
    done

    echo "Finished: $filename"
}

# ------------------------------------------------------------
# Build list of PDF files
# ------------------------------------------------------------

declare -a files=()

if [[ $# -eq 3 ]]; then

    # Single-file mode
    filename="$3"

    if [[ ! -f "$DIR1/$filename" ||
          ! -f "$DIR2/$filename" ]]; then
        echo "Error: PDF not found in both directories: $filename" >&2
        exit 1
    fi

    files+=("$filename")

else

    # Batch mode
    # Search DIR1 for PDF files, sorted alphabetically.
    # Only include files also present in DIR2.

    while IFS= read -r -d '' filename; do

        if [[ -f "$DIR2/$filename" ]]; then
            files+=("$filename")
        else
            echo "Skipping (missing in DIR2): $filename" >&2
        fi

    done < <(
        find "$DIR1" \
            -maxdepth 1 \
            -type f \
            -iname '*.pdf' \
            -printf '%f\0' |
        LC_ALL=C sort -z
    )

fi

# ------------------------------------------------------------
# Main comparison loop
# ------------------------------------------------------------

total=${#files[@]}

if ((total == 0)); then
    echo "No matching PDF files found."
    exit 0
fi

echo
echo "Found $total PDF file(s) to compare."

for ((i=0; i<total; i++)); do

    echo
    echo "[$((i+1))/$total] ${files[$i]}"

    compare_pair "${files[$i]}"

done

echo
echo "=================================================="
echo "All PDF comparisons completed."
echo "=================================================="
