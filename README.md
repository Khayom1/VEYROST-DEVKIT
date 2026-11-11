# VEYROST-DEVKIT

**Local-first repository health, quality, and security scanner.** Inspect project hygiene, detect selected exposed-secret patterns, calculate an explainable score, and export readable reports without sending repository contents to an external service.

![VEYROST-DEVKIT animated repository scanner](assets/animated-mark.svg)


<p align="center"><a href="https://veyrost.is-a.dev/"><img src="https://img.shields.io/badge/Part%20of-VEYROST%20Ecosystem-8b7cf6?style=for-the-badge" alt="Part of VEYROST ecosystem"></a> <a href="https://github.com/Khayom1/Veyrost">Explore VEYROST ↗</a></p>

## Features

- Repository checks for README quality, license, ignore rules, package metadata, tests, CI, and security documentation.
- Heuristic detection for selected private-key and cloud-token formats.
- Explainable health score with weighted checks and prioritized remediation guidance.
- Text, JSON, Markdown, standalone HTML, SVG score-card, and compact SVG badge reports.
- Configurable ignored paths, scan limits, and severity-based exit status.
- Local-only execution with no API key and no runtime dependencies.

## Installation

Requires Node.js 18 or newer.

Clone the repository and enter its directory:

    git clone https://github.com/Khayom1/VEYROST-DEVKIT.git
    cd VEYROST-DEVKIT

Run the project checks:

    npm test
    npm run check

## Usage

Scan the current repository:

    npm run scan

Scan a different project:

    node src/cli.js ./path/to/project

Choose an output format:

    node src/cli.js ./project --format json
    node src/cli.js ./project --format markdown --output report.md
    node src/cli.js ./project --format html --output report.html
    node src/cli.js ./project --format svg --output health.svg
    node src/cli.js ./project --format badge --output badge.svg

Show all command options:

    node src/cli.js --help

## Configuration

Create a `veyrost.config.json` file in the target project. See [the example configuration](examples/veyrost.config.json).

## Score model

The score is built from weighted repository checks. Read [Scoring](docs/scoring.md) for the point model and interpretation. A score is a maintenance aid, not a security certification.

## Security and privacy

Scanning runs locally. Repository files are not uploaded. Secret detection is heuristic and may produce false positives or miss credentials. See [Security Model](docs/security-model.md) and [Privacy](docs/privacy.md).

## Author

**Khayom Abdurahmonov** — [@Khayom1](https://github.com/Khayom1).

## License

MIT. See [LICENSE](LICENSE).
