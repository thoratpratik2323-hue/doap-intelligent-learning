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

// Company-Specific Interview Tracks
export const COMPANY_TRACKS = [
  {
    id: 'sanjivani_campus',
    name: 'Sanjivani T&P Drive',
    badge: 'TCS • Persistent • Cognizant • Juspay',
    color: '#F59E0B',
    rubric: 'Sanjivani COE Training & Placement Benchmark: Core CS fundamentals, DSA efficiency, OOP design patterns, and clear technical communication.',
    questions: [
      {
        id: 'sres_1',
        title: 'Explain the internal working of HashMaps in Java/C++. How are collisions resolved, and how does Java 8 treeify high-collision buckets?',
        category: 'Sanjivani T&P • Core CS & Data Structures',
        hint: 'Separate chaining, open addressing, O(1) average lookup, and Red-Black Tree conversion beyond threshold 8.',
        expectedDuration: '3 min'
      },
      {
        id: 'sres_2',
        title: 'Design a normalized relational schema versus a NoSQL document store for a high-traffic College Placement Portal. Contrast ACID versus BASE.',
        category: 'Sanjivani T&P • Database Design & Systems',
        hint: 'ACID for student registrations and company eligibility; indexing roll numbers; eventual consistency for notifications.',
        expectedDuration: '3 min'
      },
      {
        id: 'sres_3',
        title: 'Walk through an optimal algorithm to find the Longest Substring Without Repeating Characters with optimal Time and Space complexity.',
        category: 'Sanjivani T&P • Algorithmic Problem Solving (DSA)',
        hint: 'Sliding window technique with two pointers or Hash Map storing the most recent index. Time: O(N), Space: O(min(N, M)).',
        expectedDuration: '3 min'
      }
    ]
  },
  {
    id: 'google',
    name: 'Google Track',
    badge: 'O(N) Algorithmic Rigor',
    color: '#4285F4',
    rubric: 'Heavy emphasis on algorithmic scalability, graph traversal, edge cases, and clean modular code.',
    questions: [
      {
        id: 'goog_1',
        title: 'Design an LRU Cache with O(1) Get and Put operations. Explain your data structure choices, eviction policy, and thread safety.',
        category: 'Google • Data Structures & Concurrency',
        hint: 'Doubly Linked List + HashMap. Mention mutex/read-write locks for multi-threaded environments.',
        expectedDuration: '3 min'
      },
      {
        id: 'goog_2',
        title: 'Given a distributed streaming cluster with billions of URL clicks, how do you find the Top 100 trending URLs in real-time?',
        category: 'Google • Large-Scale Systems',
        hint: 'Count-Min Sketch or Heavy Hitters algorithm + Min-Heap with Sliding Time Window.',
        expectedDuration: '4 min'
      },
      {
        id: 'goog_3',
        title: 'Explain how you detect cycles in directed versus undirected graphs, and why topological sorting requires a DAG.',
        category: 'Google • Graph Algorithms',
        hint: 'DFS with 3 colors (White, Gray, Black) or Kahn algorithm (indegree array).',
        expectedDuration: '3 min'
      }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon Track',
    badge: '16 Leadership Principles + LLD',
    color: '#FF9900',
    rubric: 'Emphasis on Customer Obsession, Ownership, Bias for Action, and Microservices high-availability.',
    questions: [
      {
        id: 'amzn_1',
        title: 'Tell me about a time you had to make a high-stakes architectural decision with incomplete data (Bias for Action & Ownership).',
        category: 'Amazon • Leadership Principles (STAR)',
        hint: 'Use Situation, Task, Action, Result. Highlight measurable business impact and risk mitigation.',
        expectedDuration: '3 min'
      },
      {
        id: 'amzn_2',
        title: 'Design Amazon’s Flash Sale / Prime Day inventory locking service. How do you prevent overselling under 50,000 req/sec?',
        category: 'Amazon • Low-Level & High-Scale Design',
        hint: 'Redis atomic DECR, distributed lock (Redlock), transactional outbox, and idempotent queues.',
        expectedDuration: '4 min'
      },
      {
        id: 'amzn_3',
        title: 'How does DynamoDB achieve single-digit millisecond latency at scale? Compare consistent hashing versus partition keys.',
        category: 'Amazon • Distributed Storage Internals',
        hint: 'Partition key hashing, SSTables, replication factor, and tunable eventual consistency.',
        expectedDuration: '3 min'
      }
    ]
  },
  {
    id: 'meta',
    name: 'Meta Track',
    badge: 'Rapid 35-min Speed & Architecture',
    color: '#0668E1',
    rubric: 'Fast optimal DSA implementation, clean BFS/DFS, and massive social graph architectures.',
    questions: [
      {
        id: 'meta_1',
        title: 'Design a Real-Time Live Comments streaming architecture for 10 million concurrent viewers on Instagram Live.',
        category: 'Meta • Real-Time Systems',
        hint: 'WebSocket edge gateways, Redis Pub/Sub sharded by live-stream ID, and client rate-limiting.',
        expectedDuration: '4 min'
      },
      {
        id: 'meta_2',
        title: 'Given a social network graph, how do you find all 2nd-degree connections (Friends of Friends) efficiently without memory blowout?',
        category: 'Meta • Social Graph Traversals',
        hint: 'Bidirectional BFS with degree heuristics, Bloom filters, and adjacency list sharding.',
        expectedDuration: '3 min'
      },
      {
        id: 'meta_3',
        title: 'Walk through an optimal O(N) solution for finding the minimum window substring containing all target characters.',
        category: 'Meta • Algorithmic Speed',
        hint: 'Sliding Window + Frequency HashMap + match counter.',
        expectedDuration: '3 min'
      }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft Track',
    badge: 'Enterprise Architecture & Reliability',
    color: '#00A4EF',
    rubric: 'SOLID principles, defensive coding, cloud resilience on Azure, and testability.',
    questions: [
      {
        id: 'msft_1',
        title: 'How do you design a high-throughput webhook delivery engine that guarantees at-least-once delivery with exponential backoff?',
        category: 'Microsoft • Cloud Resilience',
        hint: 'Dead Letter Queues (DLQ), jittered backoff, idempotency keys, and circuit breakers.',
        expectedDuration: '3 min'
      },
      {
        id: 'msft_2',
        title: 'Explain the internal differences between Process Memory Layout, Thread Stacks, and Heap allocations in high-concurrency runtimes.',
        category: 'Microsoft • Systems Fundamentals',
        hint: 'Virtual memory pages, stack frames, heap fragmentation, and context switching overhead.',
        expectedDuration: '3 min'
      }
    ]
  },
  {
    id: 'uber',
    name: 'Uber / Netflix Track',
    badge: 'Geospatial & Fault-Tolerant Streaming',
    color: '#10B981',
    rubric: 'H3 geospatial indexing, adaptive video bitrate streaming, and chaos engineering.',
    questions: [
      {
        id: 'uber_1',
        title: 'How do you design a real-time driver-rider dispatch matching system handling millions of GPS location updates per second?',
        category: 'Uber • Geospatial Distributed Systems',
        hint: 'Uber H3 hexagonal spatial indexing, quadtrees, Kafka streaming, and geohash clustering.',
        expectedDuration: '4 min'
      },
      {
        id: 'uber_2',
        title: 'Explain how Chaos Engineering (Chaos Monkey) and circuit breakers prevent cascading failures across 1,000 microservices.',
        category: 'Netflix • Fault Tolerance & SRE',
        hint: 'Bulkheads, timeouts, fallback caches, and intentional failure injection in staging.',
        expectedDuration: '3 min'
      }
    ]
  }
];

// Generate tailored questions based on selected company track, position, or custom Job Description
export const generateQuestionsForPosition = (positionId, jobDescription = "", difficulty = "Intermediate", companyTrackId = null) => {
  // If a company track is active, load curated company questions
  if (companyTrackId) {
    const track = COMPANY_TRACKS.find(t => t.id === companyTrackId);
    if (track && track.questions && track.questions.length > 0) {
      return track.questions;
    }
  }

  let baseQuestions = QUESTION_BANK[positionId] || QUESTION_BANK["software-engineer"];

  // Normalize questions to have title property
  const normalized = baseQuestions.map(q => ({
    ...q,
    title: q.question || q.title || 'Technical Question'
  }));

  // If Job Description is provided, extract keywords and synthesize custom questions
  if (jobDescription && jobDescription.trim().length > 20) {
    const jdLower = jobDescription.toLowerCase();

    const customJdQuestions = [];
    if (jdLower.includes("react") || jdLower.includes("frontend")) {
      customJdQuestions.push({
        id: "jd_1",
        category: "Job Description Specific",
        title: `Based on your target job posting requiring React expertise: How do you handle complex state synchronization and component performance optimization?`,
        hint: "Discuss reconciliation, useMemo, custom hooks, and state managers.",
        expectedDuration: '3 min'
      });
    }
    if (jdLower.includes("python") || jdLower.includes("data") || jdLower.includes("ml")) {
      customJdQuestions.push({
        id: "jd_2",
        category: "Job Description Specific",
        title: `The job description mentions data pipelines and Python: Walk us through how you structure scalable data transformations and test data code.`,
        hint: "Discuss generator iterators, vectorized Pandas/NumPy, and pytest.",
        expectedDuration: '3 min'
      });
    }
    if (jdLower.includes("aws") || jdLower.includes("cloud") || jdLower.includes("docker")) {
      customJdQuestions.push({
        id: "jd_3",
        category: "Job Description Specific",
        title: `The role highlights cloud deployment: Describe your hands-on experience with containerization (Docker) and CI/CD pipelines.`,
        hint: "Discuss multi-stage builds, container security, and rollbacks.",
        expectedDuration: '3 min'
      });
    }

    if (customJdQuestions.length > 0) {
      return [...customJdQuestions, ...normalized.slice(0, 3)];
    }
  }

  return normalized;
};
