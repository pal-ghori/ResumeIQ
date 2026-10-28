import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type AuthResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    role: string;
    token?: string;
    createdAt?: string;
  };
};

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

// export async function getProfile(token: string) {
//   const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Failed to get profile");
//   }

//   return data;
// }

export async function getProfile(token: string) {
  const url = `${API_BASE_URL}/api/auth/profile`;

  console.log("[AUTH] API_BASE_URL:", API_BASE_URL);
  console.log("[AUTH] Profile URL:", url);

  let response: Response;

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("[AUTH] Network request failed:", error);
    throw error;
  }

  console.log("[AUTH] Profile HTTP status:", response.status);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get profile");
  }

  return data;
}

export async function analyzeResume(
  file: File,
  jobDescription: string,
  previousAnalysis?: string | null,
) {
  const formData = new FormData();

  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);

  if (previousAnalysis) {
    formData.append("previousAnalysis", previousAnalysis);
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: "POST",
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to analyze resume");
  }

  return data;
}

export async function getAnalysisHistory() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${API_BASE_URL}/api/analyze/history`, {
    method: "GET",
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch analysis history");
  }

  return data;
}

export async function getAnalysisById(id: string) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${API_BASE_URL}/api/analyze/${id}`, {
    method: "GET",
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch analysis");
  }

  return data;
}

async function resumeWriterRequest(
  endpoint: string,
  body: Record<string, string>,
) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(
    `${API_BASE_URL}/api/resume-writer/${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "AI generation failed.");
  }

  return data;
}

export async function generateResumeSummary(body: Record<string, string>) {
  return resumeWriterRequest("summary", body);
}

export async function generateResumeExperience(body: Record<string, string>) {
  return resumeWriterRequest("experience", body);
}

export async function generateResumeProject(body: Record<string, string>) {
  return resumeWriterRequest("project", body);
}

export async function generateResumeSkills(body: Record<string, string>) {
  return resumeWriterRequest("skills", body);
}

export async function generateFullResume(body: Record<string, string>) {
  return resumeWriterRequest("full", body);
}

export async function createResumeDraft(body: Record<string, string>) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${API_BASE_URL}/api/resume-drafts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to save resume draft.");
  }

  return data;
}

export async function getResumeDrafts() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${API_BASE_URL}/api/resume-drafts`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch resume drafts.");
  }

  return data;
}

export async function getResumeDraftById(id: string) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${API_BASE_URL}/api/resume-drafts/${id}`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch resume draft.");
  }

  return data;
}

export async function updateResumeDraft(
  id: string,
  body: Record<string, string>,
) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${API_BASE_URL}/api/resume-drafts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update resume draft.");
  }

  return data;
}

export async function deleteResumeDraft(id: string) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${API_BASE_URL}/api/resume-drafts/${id}`, {
    method: "DELETE",
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete resume draft.");
  }

  return data;
}

export async function compareAnalyses(previousId: string, latestId: string) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(
    `${API_BASE_URL}/api/compare?previousId=${previousId}&latestId=${latestId}`,
    {
      method: "GET",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to compare analyses");
  }

  return data;
}

export const updateRoadmapProgress = async (
  analysisId: string,
  skill: string,
  completedStages: boolean[],
) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(
    `${API_BASE_URL}/api/roadmap/${analysisId}/progress`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
      body: JSON.stringify({
        skill,
        completedStages,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update roadmap progress.");
  }

  return data;
};
