const skillRoadmap = {
  python: {
    category: "Programming",
    priority: "High",
    estimatedTime: "2–3 weeks",

    why:
      "Python is widely used for data analysis, automation, machine learning, and backend development.",

    stages: [
      {
        title: "Fundamentals",
        topics: [
          "Variables and data types",
          "Conditions and loops",
          "Functions",
          "Lists, tuples, dictionaries and sets",
        ],
      },
      {
        title: "Core Concepts",
        topics: [
          "Modules and packages",
          "File handling",
          "Exception handling",
          "Object-oriented programming",
        ],
      },
      {
        title: "Practical Practice",
        topics: [
          "Pandas",
          "NumPy",
          "Data cleaning",
          "Data analysis",
        ],
      },
      {
        title: "Project",
        topics: [
          "Build a small data analysis project",
          "Work with a real-world dataset",
          "Create visualizations and insights",
        ],
      },
      {
        title: "Interview Preparation",
        topics: [
          "Python coding problems",
          "Common interview questions",
          "Problem-solving practice",
        ],
      },
    ],

    howToImprove:
      "Practice Python regularly and build small data analysis projects using real datasets.",

    resources: [
      "Python documentation",
      "Practice coding problems",
      "Kaggle datasets and notebooks",
    ],
  },

  sql: {
    category: "Database",
    priority: "High",
    estimatedTime: "2–3 weeks",

    why:
      "SQL is essential for retrieving, analyzing, and managing data stored in relational databases.",

    stages: [
      {
        title: "Fundamentals",
        topics: [
          "SELECT statements",
          "WHERE conditions",
          "Sorting and filtering",
          "Aggregate functions",
        ],
      },
      {
        title: "Core Concepts",
        topics: [
          "JOINs",
          "GROUP BY",
          "HAVING",
          "Subqueries",
        ],
      },
      {
        title: "Advanced SQL",
        topics: [
          "Window functions",
          "CTEs",
          "CASE statements",
          "Query optimization basics",
        ],
      },
      {
        title: "Practical Practice",
        topics: [
          "Analyze real datasets",
          "Write complex queries",
          "Solve business-related SQL problems",
        ],
      },
      {
        title: "Interview Preparation",
        topics: [
          "SQL interview questions",
          "Query-writing exercises",
          "Data analysis problems",
        ],
      },
    ],

    howToImprove:
      "Solve SQL problems regularly and practice queries using real-world datasets.",

    resources: [
      "SQL documentation",
      "SQL practice platforms",
      "Database project exercises",
    ],
  },

  excel: {
    category: "Data & Analytics",
    priority: "Medium",
    estimatedTime: "1–2 weeks",

    why:
      "Excel is commonly used for data cleaning, analysis, reporting, and business decision-making.",

    stages: [
      {
        title: "Fundamentals",
        topics: [
          "Basic formulas",
          "Functions",
          "Cell references",
          "Sorting and filtering",
        ],
      },
      {
        title: "Core Concepts",
        topics: [
          "Lookup functions",
          "IF functions",
          "Pivot tables",
          "Data cleaning",
        ],
      },
      {
        title: "Visualization",
        topics: [
          "Charts",
          "Conditional formatting",
          "Interactive dashboards",
        ],
      },
      {
        title: "Project",
        topics: [
          "Build an Excel dashboard",
          "Analyze a real dataset",
          "Present business insights",
        ],
      },
    ],

    howToImprove:
      "Create practical Excel dashboards and analyze real datasets.",

    resources: [
      "Microsoft Excel learning resources",
      "Practice datasets",
      "Dashboard projects",
    ],
  },

  "power bi": {
    category: "Data Visualization",
    priority: "High",
    estimatedTime: "2–3 weeks",

    why:
      "Power BI is widely used to transform data into interactive dashboards and business reports.",

    stages: [
      {
        title: "Fundamentals",
        topics: [
          "Power BI interface",
          "Importing data",
          "Basic visualizations",
        ],
      },
      {
        title: "Data Preparation",
        topics: [
          "Power Query",
          "Data cleaning",
          "Data transformation",
        ],
      },
      {
        title: "Data Modeling",
        topics: [
          "Relationships",
          "Data models",
          "Calculated columns",
          "Measures",
        ],
      },
      {
        title: "Advanced Concepts",
        topics: [
          "DAX",
          "KPIs",
          "Interactive filters",
        ],
      },
      {
        title: "Project",
        topics: [
          "Build an interactive dashboard",
          "Use a real-world dataset",
          "Present business insights",
        ],
      },
    ],

    howToImprove:
      "Build dashboards using real datasets and practice creating different visualizations.",

    resources: [
      "Microsoft Learn",
      "Power BI documentation",
      "Public datasets",
    ],
  },

  tableau: {
    category: "Data Visualization",
    priority: "Medium",
    estimatedTime: "1–2 weeks",

    why:
      "Tableau helps create interactive visualizations and communicate insights from data.",

    stages: [
      {
        title: "Fundamentals",
        topics: [
          "Connecting datasets",
          "Tableau interface",
          "Basic charts",
        ],
      },
      {
        title: "Core Concepts",
        topics: [
          "Calculated fields",
          "Filters",
          "Parameters",
          "Aggregations",
        ],
      },
      {
        title: "Dashboards",
        topics: [
          "Dashboard design",
          "Interactive filters",
          "Visual storytelling",
        ],
      },
      {
        title: "Project",
        topics: [
          "Create a real-world dashboard",
          "Analyze a dataset",
          "Present insights",
        ],
      },
    ],

    howToImprove:
      "Create multiple dashboards from real-world datasets and reproduce existing dashboard examples.",

    resources: [
      "Tableau learning resources",
      "Sample datasets",
      "Dashboard practice projects",
    ],
  },

  javascript: {
    category: "Programming",
    priority: "High",
    estimatedTime: "2–3 weeks",

    why:
      "JavaScript is a core technology for building interactive web applications.",

    stages: [
      {
        title: "Fundamentals",
        topics: [
          "Variables",
          "Data types",
          "Operators",
          "Conditions and loops",
        ],
      },
      {
        title: "Core Concepts",
        topics: [
          "Functions",
          "Arrays",
          "Objects",
          "ES6 features",
        ],
      },
      {
        title: "Advanced Concepts",
        topics: [
          "Promises",
          "Async and await",
          "APIs",
          "Error handling",
        ],
      },
      {
        title: "Project",
        topics: [
          "Build a web application",
          "Integrate an API",
          "Create interactive features",
        ],
      },
    ],

    howToImprove:
      "Build small web applications and practice JavaScript problems regularly.",

    resources: [
      "JavaScript documentation",
      "Coding practice exercises",
      "Frontend projects",
    ],
  },

  react: {
    category: "Web Development",
    priority: "High",
    estimatedTime: "2–3 weeks",

    why:
      "React is widely used to build modern interactive user interfaces.",

    stages: [
      {
        title: "Fundamentals",
        topics: [
          "Components",
          "JSX",
          "Props",
          "State",
        ],
      },
      {
        title: "Core Concepts",
        topics: [
          "Hooks",
          "Forms",
          "Conditional rendering",
          "Lists and keys",
        ],
      },
      {
        title: "Advanced Concepts",
        topics: [
          "API integration",
          "Context",
          "Performance optimization",
          "Reusable components",
        ],
      },
      {
        title: "Project",
        topics: [
          "Build a complete React application",
          "Connect a backend API",
          "Create reusable UI components",
        ],
      },
    ],

    howToImprove:
      "Build small React applications and progressively add API integration and reusable components.",

    resources: [
      "React documentation",
      "Frontend practice projects",
      "Open-source React examples",
    ],
  },

  mongodb: {
    category: "Database",
    priority: "Medium",
    estimatedTime: "1–2 weeks",

    why:
      "MongoDB is a popular NoSQL database used for storing flexible application data.",

    stages: [
      {
        title: "Fundamentals",
        topics: [
          "Collections",
          "Documents",
          "MongoDB data types",
          "CRUD operations",
        ],
      },
      {
        title: "Core Concepts",
        topics: [
          "Queries",
          "Filtering",
          "Sorting",
          "Indexes",
        ],
      },
      {
        title: "Application Development",
        topics: [
          "Mongoose",
          "Schemas",
          "Models",
          "Database integration",
        ],
      },
      {
        title: "Project",
        topics: [
          "Build a CRUD application",
          "Connect MongoDB with a backend",
          "Implement data validation",
        ],
      },
    ],

    howToImprove:
      "Build a small application using MongoDB and practice CRUD operations.",

    resources: [
      "MongoDB documentation",
      "MongoDB University",
      "Mongoose documentation",
    ],
  },
};


export function generateRoadmap(missingSkills) {
  return missingSkills.map((skill) => {
    const normalizedSkill = skill
      .toLowerCase()
      .trim();

    const roadmap = skillRoadmap[normalizedSkill];

    if (roadmap) {
      return {
        skill,
        ...roadmap,
      };
    }

    return {
      skill,
      category: "Technical",
      priority: "Medium",
      estimatedTime: "1–2 weeks",

      why:
        `Learning ${skill} can strengthen your technical profile and improve your job readiness.`,

      stages: [
        {
          title: "Fundamentals",
          topics: [
            `${skill} fundamentals`,
            `${skill} basic concepts`,
          ],
        },
        {
          title: "Core Concepts",
          topics: [
            `${skill} practical concepts`,
            `${skill} important features`,
          ],
        },
        {
          title: "Practical Practice",
          topics: [
            `${skill} exercises`,
            `${skill} real-world applications`,
          ],
        },
        {
          title: "Project",
          topics: [
            `Build a practical project using ${skill}`,
          ],
        },
        {
          title: "Interview Preparation",
          topics: [
            `${skill} interview questions`,
            `${skill} problem-solving practice`,
          ],
        },
      ],

      howToImprove:
        `Study ${skill} fundamentals, practice regularly, and build practical projects using ${skill}.`,

      resources: [
        `${skill} official documentation`,
        "Practice exercises",
        "Project-based learning",
      ],
    };
  });
}