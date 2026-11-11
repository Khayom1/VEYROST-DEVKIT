# CLI reference

## Syntax

    node src/cli.js [directory] [options]

## Options

| Option | Description |
|---|---|
| --format text | Terminal report (default) |
| --format json | Machine-readable JSON |
| --format markdown | Markdown summary |
| --format html | Standalone HTML report |
| --format svg | Animated SVG score card |
| --format badge | Compact SVG badge |
| --json | Shortcut for JSON |
| --output FILE | Save report to a file |
| --config FILE | Load a custom JSON configuration |
| --strict | Fail when score is below 80 |
| --help | Print usage |

## Exit codes

- 0: no finding at or above the configured fail threshold.
- 1: one or more findings meet the threshold, or strict score gate fails.
- 2: invalid arguments, configuration, or target directory.
- 3: reserved for an internal failure result.

See the built-in help output for the command's usage.
