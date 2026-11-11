# VEYROST-DEVKIT

A local-first, zero-dependency Node.js toolkit that checks repository hygiene, detects selected exposed-secret patterns, and produces an explainable health score.

## Requirements

- Node.js 18 or newer
- No paid API, account, or network access required

## Quick start

    git clone https://github.com/Khayom1/VEYROST-DEVKIT.git
    cd VEYROST-DEVKIT
    npm test
    npm run scan

Scan another project:

    node src/cli.js /path/to/project
    node src/cli.js /path/to/project --json
    node src/cli.js /path/to/project --output=health-report.json

## Checks and scoring

| Area | Points |
|---|---:|
| README | 15 |
| License | 10 |
| .gitignore | 5 |
| Package test script | 10 |
| Automated tests | 15 |
| GitHub Actions | 15 |
| Contribution guide | 5 |
| Security policy | 5 |
| No detected secret patterns | 20 |
| **Total** | **100** |

The report includes passed checks, recommendations, a grade, and the number of inspected files.

## Security and limitations

- Scanning is local. Repository contents are not uploaded.
- Secret detection uses heuristic pattern matching. It can produce false positives and miss secrets; it is not a replacement for a dedicated secret scanner.
- The scanner skips .git, node_modules, coverage, dist, and build.
- A health score is a guidance metric, not a security certification or guarantee.

## Development

    npm test
    npm run check

See CONTRIBUTING.md for contribution guidance and SECURITY.md for vulnerability reporting.

## License

MIT. See LICENSE.
