export interface Feedback {
  strengths: string[];
  improvements: string[];
}

export interface Sections {
  contact: boolean;
  summary: boolean;
  experience: boolean;
  education: boolean;
  projects: boolean;
  skills: boolean;
  certifications: boolean;
  achievements: boolean;
  languages: boolean;
}

export interface SkillCategories {
  technical: string[];
  tools: string[];
  soft: string[];
  analytics: string[];
}

export interface AnalysisResult {
  id: string;

  atsScore: number;
  extractedText: string;

  skills: string[];
  totalSkills: number;

  jobSkills: string[];

  matchedSkills: string[];

  missingSkills: string[];

  matchPercentage: number;

  feedback: Feedback;

  sections: Sections;

  skillCategories: SkillCategories;

  fileName?: string;
  createdAt?: string;
}
