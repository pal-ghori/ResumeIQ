export function calculateAdvancedATS({
  resumeText,
  skills,
  matchPercentage,
}) {
  let score = 0;

  // 1. Skills Score (30)
  score += Math.min(skills.length * 2, 30);

  // 2. Job Match (40)
  score += Math.round(matchPercentage * 0.4);

  // 3. Contact Information (10)

  const hasEmail =
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(
      resumeText
    );

  const hasPhone =
    /(\+?\d[\d\s-]{8,})/.test(resumeText);

  if (hasEmail) score += 5;
  if (hasPhone) score += 5;

  // 4. Education (10)

  const educationKeywords = [
    "bachelor",
    "master",
    "university",
    "college",
    "bca",
    "b.sc",
    "m.sc",
    "degree",
  ];

  const hasEducation = educationKeywords.some((word) =>
    resumeText.toLowerCase().includes(word)
  );

  if (hasEducation) score += 10;

  // 5. Experience (10)

  const experienceKeywords = [
    "experience",
    "worked",
    "intern",
    "developer",
    "engineer",
  ];

  const hasExperience = experienceKeywords.some((word) =>
    resumeText.toLowerCase().includes(word)
  );

  if (hasExperience) score += 10;

  return Math.min(score, 100);
}