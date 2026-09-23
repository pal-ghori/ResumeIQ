export function matchJobSkills(resumeSkills, jobSkills) {
  // Convert both arrays to lowercase and remove duplicates
  const resumeSet = new Set(
    resumeSkills.map((skill) => skill.toLowerCase())
  );

  const jobSet = new Set(
    jobSkills.map((skill) => skill.toLowerCase())
  );

  const matchedSkills = [];
  const missingSkills = [];

  jobSet.forEach((skill) => {
    if (resumeSet.has(skill)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const matchPercentage =
    jobSet.size === 0
      ? 0
      : Math.round((matchedSkills.length / jobSet.size) * 100);

  return {
    matchedSkills,
    missingSkills,
    matchPercentage,
  };
}