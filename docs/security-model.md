# Security model

## Scope

The scanner inspects repository files readable by the current process. It checks selected project hygiene controls and searches source-like files for a small set of credential patterns.

## Trust boundaries

- Repository names, paths, file contents, package metadata, and workflow text are untrusted input.
- HTML and SVG report text must be escaped before insertion into markup.
- Output paths are resolved by the local process and should be chosen by the operator.
- The scanner does not execute repository scripts or install dependencies.

## Detection limitations

Credential detection is heuristic. It may miss provider formats, encoded values, split secrets, or credentials outside scanned file types. It may also flag test fixtures and examples. Rotate a credential whenever exposure is plausible; do not rely on this tool as a secret-management system.

## Safe usage

Run the scanner on repositories you are authorized to inspect. Review findings manually before taking action. Do not upload generated reports that contain sensitive paths or evidence into public issues.
