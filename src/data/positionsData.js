// DOAP Positions Registry & Role-Specific Question Engine

export const POSITIONS_LIST = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    category: "Engineering",
    description: "Core algorithms, data structures, system design, and software fundamentals.",
    skills: ["Data Structures", "Algorithms", "OOP", "DBMS", "System Design", "Git"]
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    category: "Engineering",
    description: "Web development, React, JavaScript/TypeScript, DOM, and browser performance.",
    skills: ["React", "JavaScript", "TypeScript", "HTML/CSS", "State Management", "Performance"]
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    category: "Engineering",
    description: "Server architecture, REST APIs, databases, microservices, and security.",
    skills: ["APIs", "Databases", "Node.js/Python", "SQL/NoSQL", "Caching", "System Design"]
  },
  {
    id: "fullstack-developer",
    title: "Full Stack Developer",
    category: "Engineering",
    description: "End-to-end application development across frontend, backend, and DevOps.",
    skills: ["React", "Node.js", "Databases", "APIs", "System Architecture", "Git"]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Data",
    description: "SQL query optimization, data visualization, statistics, and business insight.",
    skills: ["SQL", "Python", "Tableau/PowerBI", "Statistics", "Excel", "Data Cleaning"]
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data",
    description: "Statistical modeling, Machine Learning, Python, and experimental analysis.",
    skills: ["Machine Learning", "Python", "Statistics", "Pandas/NumPy", "Scikit-Learn"]
  },
  {
    id: "aiml-engineer",
    title: "AI/ML Engineer",
    category: "AI",
    description: "Deep learning models, LLMs, PyTorch/TensorFlow, RAG pipelines, and model deployment.",
    skills: ["LLMs", "PyTorch", "Prompt Engineering", "Fine-Tuning", "RAG", "Model Deployment"]
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    category: "Infrastructure",
    description: "CI/CD pipelines, Docker, Kubernetes, AWS/GCP, and Infrastructure as Code.",
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS/GCP", "Terraform", "Monitoring"]
  },
  {
    id: "qa-engineer",
    title: "QA Engineer",
    category: "Quality",
    description: "Automation testing, integration tests, bug lifecycle, and performance testing.",
    skills: ["Automation Testing", "Selenium/Cypress", "API Testing", "JUnit", "Regression"]
  },
  {
    id: "uiux-designer",
    title: "UI/UX Designer",
    category: "Design",
    description: "User research, wireframing, design systems, Figma, and accessibility.",
    skills: ["Figma", "Design Systems", "User Research", "Wireframing", "Usability Testing"]
  },
  {
    id: "hr-specialist",
    title: "HR Specialist",
    category: "Human Resources",
    description: "Talent acquisition, behavioral assessment, conflict resolution, and organizational culture.",
    skills: ["Behavioral Assessment", "Communication", "Conflict Resolution", "Recruitment", "STAR Method"]
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    category: "Marketing",
    description: "Digital campaigns, SEO, growth metrics, content strategy, and CAC/LTV analysis.",
    skills: ["SEO", "Content Strategy", "Google Analytics", "Campaigns", "CAC/LTV"]
  },
  {
    id: "product-manager",
    title: "Product Manager",
    category: "Product",
    description: "PRD writing, feature prioritization (RICE), user analytics, and product roadmaps.",
    skills: ["PRDs", "RICE Prioritization", "User Analytics", "Roadmapping", "Agile/Scrum"]
  }
];

export const QUESTION_BANK = {
  "software-engineer": [
    {
      id: "se_1",
      category: "Data Structures & Algorithms",
      question: "Can you explain how a Hash Map resolves collisions under the hood, and compare chaining vs open addressing?",
      timeLimit: 120,
      keywords: ["hash map", "collision", "chaining", "open addressing", "time complexity"]
    },
    {
      id: "se_2",
      category: "System Design",
      question: "How would you design a rate limiter service for a public API handling 100,000 requests per minute?",
      timeLimit: 150,
      keywords: ["rate limiter", "token bucket", "sliding window", "redis", "concurrency"]
    },
    {
      id: "se_3",
      category: "Object Oriented Design",
      question: "Explain the SOLID principles with a concrete real-world software design example.",
      timeLimit: 120,
      keywords: ["solid", "single responsibility", "open closed", "dependency inversion"]
    },
    {
      id: "se_4",
      category: "DBMS & Transactions",
      question: "What are ACID properties in relational databases, and how does isolation level affect concurrent transactions?",
      timeLimit: 120,
      keywords: ["acid", "atomicity", "consistency", "isolation", "durability", "read committed"]
    }
  ],

  "frontend-developer": [
    {
      id: "fe_1",
      category: "React & Architecture",
      question: "Explain how React's Virtual DOM diffing algorithm works, and how key props optimize list rendering performance.",
      timeLimit: 120,
      keywords: ["virtual dom", "diffing", "reconciliation", "key prop", "re-rendering"]
    },
    {
      id: "fe_2",
      category: "JavaScript & Event Loop",
      question: "How does the JavaScript Event Loop handle microtasks vs macrotasks when processing Promises and setTimeout?",
      timeLimit: 120,
      keywords: ["event loop", "call stack", "microtask", "macrotask", "promises", "async"]
    },
    {
      id: "fe_3",
      category: "Browser Performance",
      question: "What strategies would you use to optimize the Core Web Vitals (LCP, INP, CLS) of a heavy single-page app?",
      timeLimit: 150,
      keywords: ["web vitals", "lcp", "inp", "cls", "code splitting", "lazy loading", "caching"]
    },
    {
      id: "fe_4",
      category: "State Management & DOM",
      question: "Compare controlled vs uncontrolled inputs, and explain when you would use useMemo or useCallback in React.",
      timeLimit: 120,
      keywords: ["usememo", "usecallback", "controlled input", "memoization", "referential equality"]
    }
  ],

  "backend-developer": [
    {
      id: "be_1",
      category: "APIs & REST",
      question: "What are the key architectural differences between RESTful APIs, GraphQL, and gRPC? When would you choose gRPC over REST?",
      timeLimit: 120,
      keywords: ["rest", "graphql", "grpc", "protobuf", "http/2", "latency"]
    },
    {
      id: "be_2",
      category: "Databases & Scaling",
      question: "How do database indexing, sharding, and read-replicas help scale a relational database for high-throughput applications?",
      timeLimit: 150,
      keywords: ["b-tree index", "sharding", "read replica", "replication lag", "partitioning"]
    },
    {
      id: "be_3",
      category: "Authentication & Security",
      question: "Explain JWT authentication flow, token expiration strategies, and how to mitigate OWASP Top 10 risks like SQL injection & XSS.",
      timeLimit: 120,
      keywords: ["jwt", "oauth", "sql injection", "xss", "csrf", "hashing"]
    }
  ],

  "aiml-engineer": [
    {
      id: "ai_1",
      category: "LLMs & Architecture",
      question: "Explain the self-attention mechanism in Transformers and how it computes Query, Key, and Value matrices.",
      timeLimit: 150,
      keywords: ["attention", "transformer", "query key value", "multi-head", "scaling"]
    },
    {
      id: "ai_2",
      category: "RAG & Vector Search",
      question: "How would you design a Retrieval-Augmented Generation (RAG) system with hybrid keyword and vector semantic search?",
      timeLimit: 150,
      keywords: ["rag", "embeddings", "vector db", "pinecone", "chunking", "re-ranking"]
    },
    {
      id: "ai_3",
      category: "Model Fine-Tuning",
      question: "What is LoRA (Low-Rank Adaptation) and how does it enable efficient parameter tuning of large language models?",
      timeLimit: 120,
      keywords: ["lora", "peft", "fine tuning", "rank matrix", "gradients"]
    }
  ],

  "hr-specialist": [
    {
      id: "hr_1",
      category: "Behavioral & STAR Method",
      question: "Describe a time when you had to manage a severe conflict between two team members. What steps did you take and what was the outcome?",
      timeLimit: 120,
      keywords: ["conflict resolution", "star method", "communication", "empathy", "outcome"]
    },
    {
      id: "hr_2",
      category: "Talent Acquisition",
      question: "How do you evaluate cultural alignment without introducing unconscious bias during the candidate screening process?",
      timeLimit: 120,
      keywords: ["bias", "diversity", "structured interview", "culture add", "fairness"]
    }
  ],

  "product-manager": [
    {
      id: "pm_1",
      category: "Product Strategy",
      question: "How do you prioritize competing feature requests from enterprise clients versus technical debt using frameworks like RICE or Kano?",
      timeLimit: 150,
      keywords: ["rice framework", "kano model", "trade-offs", "roi", "product roadmap"]
    },
    {
      id: "pm_2",
      category: "User Analytics",
      question: "Walk through a scenario where a core user retention metric dropped 15% overnight. How would you investigate and resolve it?",
      timeLimit: 150,
      keywords: ["funnel analysis", "retention", "a/b testing", "cohort analysis", "root cause"]
    }
  ]
};

// Generate tailored questions based on selected position & optional pasted Job Description (JD)
export const generateQuestionsForPosition = (positionId, jobDescription = "", difficulty = "Intermediate") => {
  let baseQuestions = QUESTION_BANK[positionId] || QUESTION_BANK["software-engineer"];

  // If Job Description is provided, extract keywords and synthesize custom questions
  if (jobDescription && jobDescription.trim().length > 20) {
    const jdLower = jobDescription.toLowerCase();

    const customJdQuestions = [];
    if (jdLower.includes("react") || jdLower.includes("frontend")) {
      customJdQuestions.push({
        id: "jd_1",
        category: "Job Description Specific",
        question: `Based on your target job posting requiring React expertise: How do you handle complex state synchronization and component performance optimization?`,
        timeLimit: 120,
        keywords: ["react", "state", "performance", "hooks"]
      });
    }
    if (jdLower.includes("python") || jdLower.includes("data") || jdLower.includes("ml")) {
      customJdQuestions.push({
        id: "jd_2",
        category: "Job Description Specific",
        question: `The job description mentions data pipelines and Python: Walk us through how you structure scalable data transformations and test data code.`,
        timeLimit: 120,
        keywords: ["python", "pipeline", "data transformation", "testing"]
      });
    }
    if (jdLower.includes("aws") || jdLower.includes("cloud") || jdLower.includes("docker")) {
      customJdQuestions.push({
        id: "jd_3",
        category: "Job Description Specific",
        question: `The role highlights cloud deployment: Describe your hands-on experience with containerization (Docker) and CI/CD pipelines.`,
        timeLimit: 120,
        keywords: ["docker", "aws", "ci/cd", "deployment"]
      });
    }

    if (customJdQuestions.length > 0) {
      return [...customJdQuestions, ...baseQuestions.slice(0, 3)];
    }
  }

  return baseQuestions;
};
