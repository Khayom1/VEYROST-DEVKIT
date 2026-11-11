export function scoreRepository(scan) {
  const checks = [
    ["README.md", scan.hasReadme, 15, "Add a README with purpose, installation, usage, and examples."],
    ["LICENSE", scan.hasLicense, 10, "Choose and add an open-source license."],
    [".gitignore", scan.hasGitignore, 5, "Ignore dependencies, build output, secrets, and local files."],
    ["Package test script", scan.hasPackageJson && Boolean(scan.packageJson?.scripts?.test), 10, "Add a test script to package.json."],
    ["Automated tests", scan.hasTests, 15, "Add automated tests for critical behavior."],
    ["GitHub Actions", scan.hasCi, 15, "Add CI to run checks on pushes and pull requests."],
    ["CONTRIBUTING.md", scan.hasContributing, 5, "Explain how contributors can report issues and submit changes."],
    ["Security policy", scan.hasSecurityPolicy, 5, "Add a SECURITY.md with a vulnerability reporting path."],
    ["No detected secrets", scan.secrets.length === 0, 20, "Remove exposed credentials and rotate any real leaked secrets."]
  ];
  const earned = checks.reduce((sum, item) => sum + (item[1] ? item[2] : 0), 0);
  return {
    score: earned, grade: earned >= 90 ? "A" : earned >= 80 ? "B" : earned >= 70 ? "C" : earned >= 60 ? "D" : "F",
    checks: checks.map(([name, passed, points, recommendation]) => ({ name, passed, points: passed ? points : 0, possible: points, recommendation: passed ? null : recommendation })),
    recommendations: checks.filter((item) => !item[1]).map((item) => item[3])
  };
}
