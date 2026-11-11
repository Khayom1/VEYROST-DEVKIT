# Scoring model

The health score is a weighted maintenance signal. Each rule contributes points only when its check passes.

| Check | Maximum |
|---|---:|
| README quality | 15 |
| License presence and recognition | 10 |
| Common ignore entries | 5 |
| Package metadata and test command | 10 |
| Automated test files | 15 |
| GitHub Actions workflow | 15 |
| Contribution and security documentation | 10 |
| No detected secret patterns | 20 |
| **Total** | **100** |

## Grade bands

- **A (90–100):** strong baseline across checked practices.
- **B (80–89):** good baseline with a small number of improvements.
- **C (70–79):** several important practices need attention.
- **D (60–69):** multiple foundational gaps remain.
- **F (0–59):** critical baseline checks are missing or failing.

A score is not a security rating, compliance statement, or guarantee that a project is safe. Rule coverage is intentionally limited and must be read alongside findings.
