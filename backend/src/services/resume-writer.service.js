import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateContent(prompt) {
  const completion = await groq.chat.completions.create({
   model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content:
          "You are a professional ATS resume writer. Never invent candidate information.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.4,
  });

  return completion.choices[0]?.message?.content?.trim() || "";
}

export async function generateSummary({
  jobRole,
  experience,
  skills,
  existingContent,
}) {
  const prompt = `
Generate an ATS-friendly professional resume summary.

Job Role: ${jobRole || "Not specified"}
Experience: ${experience || "Not specified"}
Skills: ${skills || "Not specified"}
Existing Content: ${existingContent || "None"}

Requirements:
- 3 to 5 sentences
- Professional tone
- ATS-friendly
- Do not invent experience
- Do not invent qualifications
- Naturally include relevant skills
- Avoid generic buzzwords
- Return only the final summary
`;

  return generateContent(prompt);
}

export async function generateExperience({
  jobRole,
  company,
  experience,
  skills,
  existingContent,
}) {
  const prompt = `
Rewrite or generate professional resume experience content.

Job Role: ${jobRole || "Not specified"}
Company: ${company || "Not specified"}
Experience: ${experience || "Not specified"}
Skills: ${skills || "Not specified"}
Existing Content: ${existingContent || "None"}

Requirements:
- Create 4 to 6 strong resume bullet points
- Use action verbs
- ATS-friendly
- Do not invent achievements, numbers, technologies, or responsibilities
- Improve clarity and professionalism
- Return only the bullet points
`;

  return generateContent(prompt);
}

export async function generateProject({
  projectName,
  technologies,
  description,
  jobRole,
}) {
  const prompt = `
Create an ATS-friendly project description.

Project Name: ${projectName || "Not specified"}
Technologies: ${technologies || "Not specified"}
Description: ${description || "Not specified"}
Target Job Role: ${jobRole || "Not specified"}

Requirements:
- Create 3 to 5 resume bullet points
- Clearly describe the project
- Mention technologies naturally
- Use strong action verbs
- Do not invent features or achievements
- Keep it concise and professional
- Return only the bullet points
`;

  return generateContent(prompt);
}

export async function generateSkills({
  jobRole,
  existingSkills,
}) {
  const prompt = `
Suggest relevant resume skills for this job role.

Job Role: ${jobRole || "Not specified"}
Existing Skills: ${existingSkills || "None"}

Requirements:
- Separate technical skills and soft skills
- Do not suggest unrealistic or unrelated skills
- Prioritize skills relevant to the specified role
- Do not claim the candidate has a skill
- Return a clean list only
`;

  return generateContent(prompt);
}

export async function generateFullResume({
  jobRole,
  experience,
  education,
  skills,
  projects,
  existingResume,
}) {
  const prompt = `
Create improved ATS-friendly resume content using only the information supplied.

Target Job Role:
${jobRole || "Not specified"}

Experience:
${experience || "Not specified"}

Education:
${education || "Not specified"}

Skills:
${skills || "Not specified"}

Projects:
${projects || "Not specified"}

Existing Resume:
${existingResume || "Not provided"}

Requirements:
- Do not invent information
- Do not invent companies, degrees, dates, achievements, or skills
- Use ATS-friendly language
- Use clear section headings
- Improve wording and structure
- Keep the resume professional and concise
- Optimize naturally for the target job role
- Return only the resume content
`;

  return generateContent(prompt);
}