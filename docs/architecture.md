# Architecture

VEYROST-DEVKIT is a dependency-free Node.js command-line application.

## Pipeline

1. Argument parser validates the target directory and output options.
2. Configuration loader merges safe defaults with an optional JSON file.
3. Filesystem scanner walks the target tree, applies exclusions, and reads metadata.
4. Rule registry runs independent checks and returns structured results.
5. Finding normalizer deduplicates findings and counts severity levels.
6. Report renderers produce terminal, JSON, Markdown, HTML, SVG, or badge output.
7. Exit policy applies the configured severity threshold.

## Design constraints

- Keep analysis local and deterministic where practical.
- Avoid network calls and runtime dependencies.
- Keep rule functions small and independently testable.
- Treat repository content as untrusted input.
- Make findings actionable and explain score impact.
- Keep report renderers free of filesystem side effects.
