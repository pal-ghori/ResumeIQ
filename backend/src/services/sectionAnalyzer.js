export function analyzeSections(text = "") {
  const content = text.toLowerCase();

  const sections = {
    contact:
      /@|phone|mobile|\+91|\+1/.test(content),

    summary:
      /summary|profile|objective|about/.test(content),

    experience:
      /experience|employment|work experience|intern/.test(content),

    education:
      /education|university|college|bachelor|master|degree/.test(content),

    projects:
      /projects|project/.test(content),

    skills:
      /skills|technical skills/.test(content),

    certifications:
      /certification|certifications/.test(content),

    achievements:
      /achievement|achievements|awards/.test(content),

    languages:
      /languages|language/.test(content),
  };

  return sections;
}