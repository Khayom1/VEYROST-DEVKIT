export const TOOL_NAME = "VEYROST-DEVKIT";
export const TOOL_VERSION = "0.2.0";
export const DEFAULT_CONFIG_FILE = "veyrost.config.json";
export const DEFAULT_MAX_FILES = 5000;
export const DEFAULT_EXCLUDED_DIRS = Object.freeze([".git", "node_modules", "coverage", "dist", "build"]);
export const SCORE_BANDS = Object.freeze([
  { min: 90, grade: "A", label: "Excellent" },
  { min: 80, grade: "B", label: "Good" },
  { min: 70, grade: "C", label: "Fair" },
  { min: 60, grade: "D", label: "Needs attention" },
  { min: 0, grade: "F", label: "Critical gaps" }
]);
