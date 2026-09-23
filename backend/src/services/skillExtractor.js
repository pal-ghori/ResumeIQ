import skills from "../data/skills.json" with { type: "json" };

export function extractSkills(text = "") {
  const lowerText = text.toLowerCase();
  const foundSkills = [];

  skills.forEach((skill) => {
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(`\\b${escapedSkill}\\b`, "i");

    if (regex.test(lowerText)) {
      foundSkills.push(skill);
    }
  });

  return [...new Set(foundSkills)];
}