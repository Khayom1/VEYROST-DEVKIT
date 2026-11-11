export function renderHelp() {
  return [
    "VEYROST-DEVKIT — local repository health scanner",
    "",
    "Usage:",
    "  veyrost-devkit [directory] [options]",
    "",
    "Options:",
    "  --format <type>    text, json, markdown, html, svg, badge",
    "  --json             Shortcut for --format json",
    "  --output <file>    Write the report to a file",
    "  --config <file>    Load a JSON configuration file",
    "  --strict           Return exit code 1 when score is below 80",
    "  --help, -h         Show this help",
    "",
    "Examples:",
    "  veyrost-devkit .",
    "  veyrost-devkit ./project --format markdown --output report.md",
    "  veyrost-devkit ./project --format svg --output health.svg",
    "  veyrost-devkit ./project --json",
    "",
    "Scanning is local. Results are advisory and heuristic."
  ].join("\n");
}
