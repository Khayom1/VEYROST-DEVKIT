import fs from "node:fs";
import path from "node:path";
import { DEFAULT_CONFIG_FILE, DEFAULT_MAX_FILES, DEFAULT_EXCLUDED_DIRS } from "./constants.js";
export function defaultConfig() {
  return { maxFiles:DEFAULT_MAX_FILES, excludedDirectories:[...DEFAULT_EXCLUDED_DIRS], ignorePatterns:[], failOn:"high" };
}
export function validateConfig(value) {
  const config = { ...defaultConfig(), ...(value || {}) };
  if (!Number.isInteger(config.maxFiles) || config.maxFiles < 1 || config.maxFiles > 100000) throw new TypeError("maxFiles must be an integer between 1 and 100000");
  if (!Array.isArray(config.excludedDirectories) || !config.excludedDirectories.every((x)=>typeof x==="string")) throw new TypeError("excludedDirectories must be an array of strings");
  if (!Array.isArray(config.ignorePatterns) || !config.ignorePatterns.every((x)=>typeof x==="string")) throw new TypeError("ignorePatterns must be an array of strings");
  if (!["critical","high","medium","low","none"].includes(config.failOn)) throw new TypeError("failOn must be critical, high, medium, low, or none");
  return config;
}
export function loadConfig(root, explicitPath = null) {
  const selected = explicitPath ? path.resolve(root, explicitPath) : path.join(root, DEFAULT_CONFIG_FILE);
  if (!fs.existsSync(selected)) {
    if (explicitPath) throw new Error("Configuration file not found: " + selected);
    return defaultConfig();
  }
  let parsed;
  try { parsed = JSON.parse(fs.readFileSync(selected,"utf8")); }
  catch (error) { throw new Error("Invalid JSON in configuration: " + error.message); }
  return validateConfig(parsed);
}
