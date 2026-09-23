export function generateResumeFeedback({
  skills,
  matchedSkills,
  missingSkills,
  resumeText,
}) {
  const strengths = [];
  const improvements = [];

  if (matchedSkills.length >= 5) {
    strengths.push("Your resume matches many required job skills.");
  }

  if (skills.includes("react")) {
    strengths.push("Strong React.js knowledge detected.");
  }

  if (skills.includes("next.js")) {
    strengths.push("Next.js experience is a valuable strength.");
  }

  if (skills.includes("git")) {
    strengths.push("Version control (Git) experience is included.");
  }

  if (!resumeText.match(/\d+%|\d+\+|\d+\s(year|month)/i)) {
    improvements.push(
      "Add measurable achievements (e.g. Increased performance by 30%)."
    );
  }

  missingSkills.forEach((skill) => {
    improvements.push(`Consider learning or mentioning ${skill}.`);
  });

  if (!resumeText.toLowerCase().includes("linkedin")) {
    improvements.push("Add your LinkedIn profile.");
  }

  return {
    strengths,
    improvements,
  };
}