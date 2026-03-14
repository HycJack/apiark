#!/usr/bin/env bash
# Measures ApiArk binary size and criterion benchmark results.
# Outputs JSON to docs/benchmarks/apiark-latest.json
# Run from repo root after a release build.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
OUT_DIR="$REPO_ROOT/docs/benchmarks"
OUT_FILE="$OUT_DIR/apiark-latest.json"

mkdir -p "$OUT_DIR"

echo "=== ApiArk Benchmark Suite ==="
echo ""

# --- Binary size ---
echo "[1/4] Measuring binary sizes..."

DESKTOP_BIN=""
CLI_BIN=""

# Find desktop binary (release build)
for path in \
    "$REPO_ROOT/apps/desktop/src-tauri/target/release/apiark" \
    "$REPO_ROOT/apps/desktop/src-tauri/target/release/apiark.exe"; do
    if [ -f "$path" ]; then
        DESKTOP_BIN="$path"
        break
    fi
done

# Find CLI binary
for path in \
    "$REPO_ROOT/apps/cli/target/release/apiark" \
    "$REPO_ROOT/apps/cli/target/release/apiark.exe"; do
    if [ -f "$path" ]; then
        CLI_BIN="$path"
        break
    fi
done

desktop_size_bytes=0
desktop_size_mb="0"
cli_size_bytes=0
cli_size_mb="0"

if [ -n "$DESKTOP_BIN" ]; then
    desktop_size_bytes=$(stat --printf="%s" "$DESKTOP_BIN" 2>/dev/null || stat -f%z "$DESKTOP_BIN" 2>/dev/null || echo 0)
    desktop_size_mb=$(echo "scale=1; $desktop_size_bytes / 1048576" | bc)
    echo "  Desktop binary: ${desktop_size_mb} MB ($DESKTOP_BIN)"
else
    echo "  Desktop binary: not found (run 'cargo build --release' in apps/desktop/src-tauri)"
fi

if [ -n "$CLI_BIN" ]; then
    cli_size_bytes=$(stat --printf="%s" "$CLI_BIN" 2>/dev/null || stat -f%z "$CLI_BIN" 2>/dev/null || echo 0)
    cli_size_mb=$(echo "scale=1; $cli_size_bytes / 1048576" | bc)
    echo "  CLI binary: ${cli_size_mb} MB ($CLI_BIN)"
else
    echo "  CLI binary: not found (run 'cargo build --release' in apps/cli)"
fi

# --- Criterion benchmarks ---
echo ""
echo "[2/4] Running criterion benchmarks..."

BENCH_RESULTS="{}"
cd "$REPO_ROOT/apps/desktop/src-tauri"

for bench in interpolation curl_parsing assertions collection_loading scripting; do
    echo "  Running $bench..."
    # Run benchmark and capture JSON output
    cargo bench --bench "$bench" -- --quick 2>/dev/null | \
        grep -E "^(Benchmarking |                        time:)" | \
        sed 's/Benchmarking /\n/g' > "/tmp/bench_${bench}.txt" || true
done

cd "$REPO_ROOT"

# --- Parse criterion results into key metrics ---
echo ""
echo "[3/4] Parsing benchmark results..."

# Extract key numbers from criterion output
parse_bench_time() {
    local file="$1"
    local name="$2"
    # Look for the benchmark name and extract median time
    grep -A1 "$name" "$file" 2>/dev/null | grep "time:" | head -1 | \
        sed 's/.*\[\([0-9.]*\) [µnm]s.*/\1/' || echo "0"
}

parse_bench_unit() {
    local file="$1"
    local name="$2"
    grep -A1 "$name" "$file" 2>/dev/null | grep "time:" | head -1 | \
        sed 's/.*\[[0-9.]* \([µnm]*s\).*/\1/' || echo "us"
}

# --- Collect AppImage/deb/dmg sizes if available ---
echo ""
echo "[4/4] Checking installer sizes..."

appimage_size_mb="0"
deb_size_mb="0"
dmg_size_mb="0"

for f in "$REPO_ROOT"/apps/desktop/src-tauri/target/release/bundle/appimage/*.AppImage; do
    if [ -f "$f" ]; then
        sz=$(stat --printf="%s" "$f" 2>/dev/null || stat -f%z "$f" 2>/dev/null || echo 0)
        appimage_size_mb=$(echo "scale=1; $sz / 1048576" | bc)
        echo "  AppImage: ${appimage_size_mb} MB"
    fi
done

for f in "$REPO_ROOT"/apps/desktop/src-tauri/target/release/bundle/deb/*.deb; do
    if [ -f "$f" ]; then
        sz=$(stat --printf="%s" "$f" 2>/dev/null || stat -f%z "$f" 2>/dev/null || echo 0)
        deb_size_mb=$(echo "scale=1; $sz / 1048576" | bc)
        echo "  deb: ${deb_size_mb} MB"
    fi
done

# --- Write output JSON ---
VERSION=$(grep '^version' "$REPO_ROOT/apps/desktop/src-tauri/Cargo.toml" | head -1 | sed 's/.*"\(.*\)".*/\1/')
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
OS=$(uname -s)
ARCH=$(uname -m)

cat > "$OUT_FILE" << ENDJSON
{
  "version": "$VERSION",
  "date": "$DATE",
  "platform": "${OS}-${ARCH}",
  "binary_sizes": {
    "desktop_binary_mb": $desktop_size_mb,
    "cli_binary_mb": $cli_size_mb,
    "appimage_mb": $appimage_size_mb,
    "deb_mb": $deb_size_mb
  },
  "framework": "Tauri v2",
  "protocols": ["REST", "GraphQL", "gRPC", "WebSocket", "SSE", "MQTT", "Socket.IO"],
  "requires_account": false,
  "open_source": true,
  "_note": "RAM and startup metrics require GUI measurement — update manually or via desktop benchmark tool"
}
ENDJSON

echo ""
echo "=== Results written to $OUT_FILE ==="
echo ""
cat "$OUT_FILE"
