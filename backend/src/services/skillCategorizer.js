export function categorizeSkills(skills) {
  const categories = {
    technical: [],
    tools: [],
    soft: [],
    analytics: [],
  };

  const technicalList = [
    "python",
    "java",
    "javascript",
    "sql",
    "react",
    "node.js",
    "mongodb",
  ];

  const toolsList = [
    "excel",
    "power bi",
    "tableau",
    "git",
    "github",
    "vs code",
  ];

  const softList = [
    "communication",
    "teamwork",
    "leadership",
    "problem solving",
  ];

  const analyticsList = [
    "statistics",
    "data analysis",
    "machine learning",
    "data visualization",
  ];

  skills.forEach((skill) => {
    const s = skill.toLowerCase().trim();

    if (technicalList.includes(s)) {
      categories.technical.push(skill);
    } else if (toolsList.includes(s)) {
      categories.tools.push(skill);
    } else if (softList.includes(s)) {
      categories.soft.push(skill);
    } else if (analyticsList.includes(s)) {
      categories.analytics.push(skill);
    }
  });

  return categories;
}