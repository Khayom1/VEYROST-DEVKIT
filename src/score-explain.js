import { SCORE_BANDS } from "./constants.js";
export function getScoreGrade(score) {
  const value = Math.max(0, Math.min(100, Number(score) || 0));
  return SCORE_BANDS.find((band) => value >= band.min) || SCORE_BANDS[SCORE_BANDS.length - 1];
}
export function explainScore(score) {
  const band = getScoreGrade(score);
  return { score:Math.max(0,Math.min(100,Number(score)||0)), grade:band.grade, label:band.label,
    explanation:band.grade==="A"?"Strong baseline across the checked repository practices.":band.grade==="B"?"A good baseline with a few improvements remaining.":band.grade==="C"?"Several important repository practices need attention.":band.grade==="D"?"Multiple project hygiene gaps should be addressed.":"Critical foundational checks are missing or failing." };
}
