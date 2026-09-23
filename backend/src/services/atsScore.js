export function calculateATSScore(skills) {
  const TOTAL_EXPECTED_SKILLS = 20;

  const score = Math.min(
    Math.round((skills.length / TOTAL_EXPECTED_SKILLS) * 100),
    100
  );

  return score;
}