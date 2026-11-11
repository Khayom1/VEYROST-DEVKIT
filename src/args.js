export function parseArgs(argv) {
  const result = { target:".", format:"text", output:null, config:null, help:false, strict:false };
  let targetSet = false;
  for (let i=0;i<argv.length;i+=1) {
    const arg = argv[i];
    if (arg==="--help" || arg==="-h") result.help=true;
    else if (arg==="--strict") result.strict=true;
    else if (arg==="--json") result.format="json";
    else if (arg==="--format") { result.format=argv[++i] || ""; }
    else if (arg.startsWith("--format=")) result.format=arg.slice(9);
    else if (arg==="--output" || arg==="-o") result.output=argv[++i] || null;
    else if (arg.startsWith("--output=")) result.output=arg.slice(9);
    else if (arg==="--config") result.config=argv[++i] || null;
    else if (arg.startsWith("--config=")) result.config=arg.slice(9);
    else if (arg.startsWith("-")) throw new Error("Unknown option: " + arg);
    else if (!targetSet) { result.target=arg; targetSet=true; }
    else throw new Error("Unexpected argument: " + arg);
  }
  if (!["text","terminal","json","markdown","md","html","svg","badge"].includes(result.format)) throw new Error("Unsupported format: " + result.format);
  return result;
}
