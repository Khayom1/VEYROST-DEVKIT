import { createFinding } from "../findings.js";
export function checkWorkflows(scan) {
  const paths=scan.files.filter((file)=>file.startsWith(".github/workflows/") && /\.ya?ml$/i.test(file));
  const findings=[];
  if(!paths.length) {
    findings.push(createFinding({ruleId:"CI001",title:"CI workflow missing",severity:"medium",message:"No GitHub Actions workflow was found.",recommendation:"Add a workflow that runs tests on pushes and pull requests."}));
    return {id:"ci",passed:false,points:0,possible:15,findings};
  }
  for(const file of paths) {
    const body=scan.readText?scan.readText(file):"";
    if(!/\bjobs\s*:/m.test(body)) findings.push(createFinding({ruleId:"CI002",title:"Workflow has no jobs block",severity:"high",message:"The workflow file does not contain a jobs block.",file,recommendation:"Define at least one job with explicit steps."}));
    if(!/\b(?:push|pull_request|workflow_dispatch)\b/.test(body)) findings.push(createFinding({ruleId:"CI003",title:"Workflow triggers unclear",severity:"low",message:"No common GitHub Actions trigger was detected.",file,recommendation:"Declare the events that should run CI."}));
  }
  const passed=findings.length===0;
  return {id:"ci",passed,points:passed?15:Math.max(0,15-findings.length*5),possible:15,findings};
}
