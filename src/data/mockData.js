// DOAP Application Clean Production Initial Models & Schemas

export const INITIAL_PROFILE = {
  name: "Student",
  title: "",
  university: "",
  course: "",
  year: "",
  avatar: "U",
  bio: "",
  stats: {
    achievements: 0,
    dayStreak: 1,
    aiReadiness: 0
  },
  skills: [],
  interests: [],
  careerGoals: []
};

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', path: '/', icon: 'Home' },
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  { id: 'ai-tutor', label: 'AI Tutor', path: '/ai-tutor', icon: 'MessageSquare' },
  { id: 'voice-tutor', label: 'Voice Tutor', path: '/voice-tutor', icon: 'Radio' },
  { id: 'learning', label: 'My Learning', path: '/learning', icon: 'BookOpen' },
  { id: 'study-plan', label: 'Study Plan', path: '/study-plan', icon: 'Calendar' },
  { id: 'coding', label: 'Coding Practice', path: '/coding', icon: 'Code' },
  { id: 'interview', label: 'AI Interview', path: '/interview', icon: 'Video' },
  { id: 'assessments', label: 'Assessments', path: '/assessments', icon: 'FileCheck2' },
  { id: 'job-readiness', label: 'Job Readiness', path: '/job-readiness', icon: 'Briefcase' }
];

export const STAT_CARDS = [
  {
    id: "readiness",
    title: "AI Readiness",
    value: "0%",
    change: "Not assessed",
    subtext: "Take assessment",
    isPositive: true,
    icon: "TrendingUp"
  },
  {
    id: "learning",
    title: "Learning",
    value: "0%",
    subtext: "Modules completed",
    icon: "Zap"
  },
  {
    id: "coding",
    title: "Coding",
    value: "0",
    subtext: "Problems solved",
    icon: "Code"
  },
  {
    id: "interviews",
    title: "Interviews",
    value: "0",
    subtext: "Sessions completed",
    icon: "Video"
  }
];

export const WEEKLY_SCORE_DATA = [];

export const SKILL_RADAR_DATA = [
  { skill: "DSA", value: 0 },
  { skill: "Algorithms", value: 0 },
  { skill: "System Design", value: 0 },
  { skill: "AI / ML", value: 0 },
  { skill: "Web Tech", value: 0 },
  { skill: "Communication", value: 0 }
];

export const SKILL_PROGRESS_DATA = [
  { name: "AI Fundamentals", progress: 0 },
  { name: "Prompt Engineering", progress: 0 },
  { name: "Data Structures", progress: 0 },
  { name: "Algorithms", progress: 0 },
  { name: "System Design", progress: 0 },
  { name: "Web Engineering", progress: 0 }
];

export const COURSES_DATA = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    level: "Beginner",
    category: "Artificial Intelligence",
    modulesCount: 8,
    duration: "6h",
    progress: 0,
    currentModuleIndex: 0,
    modules: [
      { 
        id: 1, 
        title: "What is AI?", 
        completed: false, 
        isCurrent: true,
        subTopics: [
          { id: "ai-1-1", title: "Definition & Core Concepts of AI", desc: "Understanding intelligence, perception, learning, and automated decision-making." },
          { id: "ai-1-2", title: "Narrow AI vs General AI (AGI) vs Super AI", desc: "Current ANI systems versus hypothetical human-level and superhuman intelligence." },
          { id: "ai-1-3", title: "History of AI & The Turing Test", desc: "From Dartmouth 1956 and AI Winters to the modern Deep Learning renaissance." },
          { id: "ai-1-4", title: "Real-World Industrial Applications", desc: "How AI transforms healthcare diagnostics, autonomous robotics, finance, and search." }
        ]
      },
      { 
        id: 2, 
        title: "Machine Learning Basics", 
        completed: false,
        subTopics: [
          { id: "ai-2-1", title: "Supervised vs Unsupervised vs Reinforcement", desc: "Learning from labeled datasets vs pattern clustering vs reward-driven agent policies." },
          { id: "ai-2-2", title: "Train, Validation & Test Split", desc: "Preventing data leakage and establishing reliable model generalization benchmarks." },
          { id: "ai-2-3", title: "Overfitting, Underfitting & Bias-Variance Tradeoff", desc: "Balancing model complexity against generalization errors using regularization." },
          { id: "ai-2-4", title: "Classification vs Regression", desc: "Predicting continuous values vs categorical decision boundaries." }
        ]
      },
      { 
        id: 3, 
        title: "Generative AI", 
        completed: false,
        subTopics: [
          { id: "ai-3-1", title: "Generative vs Discriminative Modeling", desc: "Modeling probability distributions P(X, Y) vs decision boundaries P(Y|X)." },
          { id: "ai-3-2", title: "Diffusion Models & Neural Art", desc: "How forward noise addition and reverse denoising generate photo-realistic images." },
          { id: "ai-3-3", title: "Variational Autoencoders & GANs", desc: "Latent space representations, generator vs discriminator adversarial dynamics." },
          { id: "ai-3-4", title: "Multimodal Foundation Models", desc: "Unifying vision, audio, text, and sensor telemetry in single neural architectures." }
        ]
      },
      { 
        id: 4, 
        title: "Large Language Models", 
        completed: false,
        subTopics: [
          { id: "ai-4-1", title: "Transformer Architecture & Self-Attention", desc: "Query, Key, Value matrices, multi-head attention mechanisms, and parallelization." },
          { id: "ai-4-2", title: "Tokenization, Embeddings & Vectors", desc: "Byte-Pair Encoding (BPE), semantic vector spaces, and cosine similarity." },
          { id: "ai-4-3", title: "Pre-training, SFT & RLHF Alignment", desc: "Next-token prediction on trillions of tokens followed by human preference tuning." },
          { id: "ai-4-4", title: "Inference Hyperparameters", desc: "Mastering temperature, Top-P (nucleus sampling), frequency penalty, and context windows." }
        ]
      },
      { 
        id: 5, 
        title: "Prompt Engineering", 
        completed: false,
        subTopics: [
          { id: "ai-5-1", title: "Zero-Shot vs Few-Shot Prompting", desc: "Providing exemplar demonstrations to guide structured LLM outputs." },
          { id: "ai-5-2", title: "Chain-of-Thought (CoT) & Reasoning", desc: "Step-by-step cognitive scaffolding for complex logic, math, and code generation." },
          { id: "ai-5-3", title: "System Prompts, Personas & Guardrails", desc: "Establishing strict operational boundaries, formatting contracts, and personas." },
          { id: "ai-5-4", title: "Prompt Injection & Jailbreak Defense", desc: "Hardening LLM applications against adversarial inputs and indirect prompt injections." }
        ]
      },
      { 
        id: 6, 
        title: "AI Tools & APIs", 
        completed: false,
        subTopics: [
          { id: "ai-6-1", title: "REST & Streaming Inference APIs", desc: "Connecting to high-speed inference LPUs (Groq, Gemini, NVIDIA NIM)." },
          { id: "ai-6-2", title: "RAG & Vector Databases", desc: "Building knowledge retrieval pipelines with Pinecone, Chroma, and LanceDB." },
          { id: "ai-6-3", title: "Orchestration: LangChain & LlamaIndex", desc: "Constructing multi-step agent chains, document loaders, and semantic routers." },
          { id: "ai-6-4", title: "Function Calling & Tool Use", desc: "Enabling models to execute SQL queries, calculate math, and call external APIs." }
        ]
      },
      { 
        id: 7, 
        title: "AI Ethics & Safety", 
        completed: false,
        subTopics: [
          { id: "ai-7-1", title: "Algorithmic Bias & Fairness", desc: "Detecting and mitigating historical demographic biases in training data." },
          { id: "ai-7-2", title: "Copyright, IP & Data Privacy", desc: "Legal frameworks, GDPR compliance, and fair-use considerations in generative AI." },
          { id: "ai-7-3", title: "Deepfakes & Digital Provenance", desc: "Watermarking, synthetic media detection, and cryptographic authenticity standards." }
        ]
      },
      { 
        id: 8, 
        title: "AI in the Workplace", 
        completed: false,
        subTopics: [
          { id: "ai-8-1", title: "AI Copilots in Software Engineering", desc: "Supercharging developer productivity with automated code reviews, tests, and refactors." },
          { id: "ai-8-2", title: "Autonomous Agentic Workflows", desc: "Multi-agent collaboration architectures for research, data pipelines, and customer operations." },
          { id: "ai-8-3", title: "Career Readiness & Strategic Upskilling", desc: "Positioning yourself at the forefront of the AI-augmented global engineering market." }
        ]
      }
    ]
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    level: "Intermediate",
    category: "Data Structures",
    modulesCount: 5,
    duration: "10h",
    progress: 0,
    modules: [
      { 
        id: 1, 
        title: "Arrays & Strings", 
        completed: false, 
        isCurrent: true,
        subTopics: [
          { id: "dsa-1-1", title: "Two Pointer Technique", desc: "Optimal O(N) convergence patterns for pair sums, palindrome checks, and container area." },
          { id: "dsa-1-2", title: "Sliding Window Patterns", desc: "Fixed and dynamic window paradigms for longest substrings, minimum window search." },
          { id: "dsa-1-3", title: "Prefix Sum & Kadane's Algorithm", desc: "O(1) range sum lookups, maximum contiguous subarray sums, and circular arrays." },
          { id: "dsa-1-4", title: "In-Place Array Manipulations", desc: "Dutch National Flag algorithm (0/1/2 partitioning), rotations, and cycle marking." }
        ]
      },
      { 
        id: 2, 
        title: "Linked Lists", 
        completed: false,
        subTopics: [
          { id: "dsa-2-1", title: "Singly & Doubly Linked Lists", desc: "Node traversal, head/tail insertion, deletion, and memory footprint comparisons." },
          { id: "dsa-2-2", title: "Floyd's Cycle Finding Algorithm", desc: "Slow and fast pointer mechanics for loop detection and finding cycle starting nodes." },
          { id: "dsa-2-3", title: "In-Place List Reversals", desc: "Iterative and recursive list reversals, reversing nodes in k-groups." },
          { id: "dsa-2-4", title: "LRU Cache Architecture", desc: "Combining Hash Maps with Doubly Linked Lists for guaranteed O(1) operations." }
        ]
      },
      { 
        id: 3, 
        title: "Stacks & Queues", 
        completed: false,
        subTopics: [
          { id: "dsa-3-1", title: "Monotonic Stack Pattern", desc: "Next Greater Element, Next Smaller Element, and Largest Rectangle in Histogram in O(N)." },
          { id: "dsa-3-2", title: "Expression Evaluation", desc: "Infix to Postfix conversion, prefix parsing, and balanced multi-bracket validation." },
          { id: "dsa-3-3", title: "Circular Queues & Deques", desc: "Modulo arithmetic wrap-around, sliding window maximums using double-ended queues." }
        ]
      },
      { 
        id: 4, 
        title: "Binary Trees & BST", 
        completed: false,
        subTopics: [
          { id: "dsa-4-1", title: "Tree Traversals (DFS & BFS)", desc: "Preorder, Inorder, Postorder, and Level-Order traversals using recursion and queues." },
          { id: "dsa-4-2", title: "Lowest Common Ancestor (LCA)", desc: "Recursive and iterative node search, tree diameter, and maximum path sums." },
          { id: "dsa-4-3", title: "BST Invariants & Tree Balancing", desc: "Kth smallest element, BST validation, and AVL tree self-balancing rotations." },
          { id: "dsa-4-4", title: "Tree Serialization & Reconstruction", desc: "Serializing trees to byte streams with sentinels and rebuilding in linear time." }
        ]
      },
      { 
        id: 5, 
        title: "Heaps & Priority Queues", 
        completed: false,
        subTopics: [
          { id: "dsa-5-1", title: "Min-Heap & Max-Heap Invariants", desc: "Array-backed binary heaps, heapify in O(N), bubble-up and bubble-down." },
          { id: "dsa-5-2", title: "Top-K Elements & Streaming Median", desc: "Two-heap median maintenance (max-heap for lower half, min-heap for upper half)." },
          { id: "dsa-5-3", title: "K-Way Merge with Min-Heap", desc: "Merging K sorted lists/arrays in O(N log K) time with optimal space efficiency." }
        ]
      }
    ]
  },
  {
    id: "java-programming",
    title: "Java & Object Oriented Programming",
    level: "Intermediate",
    category: "Programming",
    modulesCount: 5,
    duration: "8h",
    progress: 0,
    modules: [
      { 
        id: 1, 
        title: "Java Syntax & Basics", 
        completed: false, 
        isCurrent: true,
        subTopics: [
          { id: "java-1-1", title: "JDK vs JRE vs JVM", desc: "Bytecode execution, platform independence, JIT tiered compilation, and memory areas." },
          { id: "java-1-2", title: "Primitive Types & Wrapper Caching", desc: "Stack storage, Integer constant caching (-128 to 127), and autoboxing overhead." },
          { id: "java-1-3", title: "String Constant Pool & Immutability", desc: "String literals vs new String(), StringBuilder, and Compact Strings in Java 9+." }
        ]
      },
      { 
        id: 2, 
        title: "OOP Principles & Classes", 
        completed: false,
        subTopics: [
          { id: "java-2-1", title: "Encapsulation & Access Modifiers", desc: "Private fields, public getters/setters, package-private, and defensive copying." },
          { id: "java-2-2", title: "Constructor Chaining & this()", desc: "Reusing constructor logic, super() initialization order, and preventing invalid states." },
          { id: "java-2-3", title: "Static vs Instance Members", desc: "Class-level shared state, static initialization blocks, and method hiding." }
        ]
      },
      { 
        id: 3, 
        title: "Inheritance & Polymorphism", 
        completed: false,
        subTopics: [
          { id: "java-3-1", title: "Dynamic Method Dispatch", desc: "Runtime method resolution, virtual method tables (vtable), and @Override checks." },
          { id: "java-3-2", title: "Abstract Classes vs Interfaces", desc: "Multiple interface implementation, default/static methods, and sealed hierarchies." },
          { id: "java-3-3", title: "equals() and hashCode() Contract", desc: "Ensuring hash-based collection integrity, reference equality vs logical equality." }
        ]
      },
      { 
        id: 4, 
        title: "Collections & Streams", 
        completed: false,
        subTopics: [
          { id: "java-4-1", title: "List, Set & Map Internals", desc: "ArrayList vs LinkedList, HashMap treeification under hash collisions (red-black trees)." },
          { id: "java-4-2", title: "Generics & PECS Principle", desc: "Producer Extends, Consumer Super, wildcards, and runtime Type Erasure limits." },
          { id: "java-4-3", title: "Functional Streams & Lambdas", desc: "Declarative filter, map, reduce, Collectors.toMap, and lazy evaluation pipelines." }
        ]
      },
      { 
        id: 5, 
        title: "Multithreading & Concurrency", 
        completed: false,
        subTopics: [
          { id: "java-5-1", title: "Java Memory Model & happens-before", desc: "Volatile visibility guarantees, instruction reordering, and race condition prevention." },
          { id: "java-5-2", title: "Locks, Monitors & ExecutorService", desc: "Synchronized blocks vs ReentrantLock, CountDownLatch, and ThreadPoolExecutor." },
          { id: "java-5-3", title: "Virtual Threads (Project Loom - Java 21)", desc: "Mounting lightweight JVM threads on carrier OS threads for massive I/O scaling." }
        ]
      }
    ]
  },
  {
    id: "cyber-security",
    title: "Cyber Security Fundamentals",
    level: "Beginner",
    category: "Cyber Security",
    modulesCount: 4,
    duration: "6h",
    progress: 0,
    modules: [
      { 
        id: 1, 
        title: "Security Principles (CIA Triad)", 
        completed: false, 
        isCurrent: true,
        subTopics: [
          { id: "sec-1-1", title: "Confidentiality, Integrity & Availability", desc: "Core pillars of security architecture, threat modeling, and defense-in-depth." },
          { id: "sec-1-2", title: "Authentication vs Authorization", desc: "Multi-factor authentication (MFA), OAuth2, JWTs, and Role-Based Access Control (RBAC)." }
        ]
      },
      { 
        id: 2, 
        title: "Network Defense & Firewalls", 
        completed: false,
        subTopics: [
          { id: "sec-2-1", title: "OSI Model Vulnerabilities", desc: "Packet sniffing, ARP spoofing, DNS poisoning, and TCP SYN flood mitigation." },
          { id: "sec-2-2", title: "Firewalls, WAFs & IDS/IPS", desc: "Stateful packet inspection, Web Application Firewalls, and intrusion detection systems." }
        ]
      },
      { 
        id: 3, 
        title: "Cryptography & SSL/TLS", 
        completed: false,
        subTopics: [
          { id: "sec-3-1", title: "Symmetric vs Asymmetric Encryption", desc: "AES-256 for data-at-rest, RSA & Elliptic Curve (ECC) for key exchange." },
          { id: "sec-3-2", title: "Hashing & Digital Signatures", desc: "SHA-256, bcrypt/argon2 for password storage, HMACs, and public key certificates." }
        ]
      },
      { 
        id: 4, 
        title: "Web App Security & OWASP Top 10", 
        completed: false,
        subTopics: [
          { id: "sec-4-1", title: "SQL Injection (SQLi) & Parameterization", desc: "Preventing query manipulation via parameterized prepared statements and ORMs." },
          { id: "sec-4-2", title: "Cross-Site Scripting (XSS) & CSRF", desc: "Stored/Reflected XSS, Content Security Policy (CSP), and SameSite cookie defense." }
        ]
      }
    ]
  },
  {
    id: "discrete-math",
    title: "Discrete Mathematics",
    level: "Advanced",
    category: "Mathematics",
    modulesCount: 4,
    duration: "12h",
    progress: 0,
    modules: [
      { 
        id: 1, 
        title: "Propositional & Predicate Logic", 
        completed: false, 
        isCurrent: true,
        subTopics: [
          { id: "math-1-1", title: "Truth Tables & Logical Equivalences", desc: "Conjunction, Disjunction, Implication, De Morgan's laws, and tautologies." },
          { id: "math-1-2", title: "Universal & Existential Quantifiers", desc: "Formalizing mathematical statements, negations of quantified formulas." }
        ]
      },
      { 
        id: 2, 
        title: "Set Theory & Relations", 
        completed: false,
        subTopics: [
          { id: "math-2-1", title: "Set Operations & Power Sets", desc: "Union, Intersection, Cartesian products, and cardinality calculations." },
          { id: "math-2-2", title: "Equivalence Relations & Partitions", desc: "Reflexivity, Symmetry, Transitivity, and partial ordering relations (Posets)." }
        ]
      },
      { 
        id: 3, 
        title: "Graph Theory Basics", 
        completed: false,
        subTopics: [
          { id: "math-3-1", title: "Graph Topologies & Trees", desc: "Vertices, edges, Handshaking Lemma, bipartite graphs, and spanning trees." },
          { id: "math-3-2", title: "Eulerian & Hamiltonian Paths", desc: "Conditions for Eulerian circuits, Travelling Salesperson graph reductions." }
        ]
      },
      { 
        id: 4, 
        title: "Combinatorics & Recurrences", 
        completed: false,
        subTopics: [
          { id: "math-4-1", title: "Permutations, Combinations & Pigeonhole", desc: "nPr, nCr, binomial theorem, and non-constructive existence proofs." },
          { id: "math-4-2", title: "Solving Recurrence Relations", desc: "Characteristic equation roots, Master Theorem for divide-and-conquer algorithms." }
        ]
      }
    ]
  }
];

export const INITIAL_STUDY_TASKS = [];

export const CODING_PROBLEMS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hash Maps",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    starterCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    tests: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] }
    ]
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stacks",
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      { input: "s = '()[]{}'", output: "true" },
      { input: "s = '(]'", output: "false" }
    ],
    starterCode: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (stack.pop() !== map[char]) {
      return false;
    }
  }
  return stack.length === 0;
}`,
    tests: [
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["([])"], expected: true }
    ]
  },
  {
    id: 3,
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked Lists",
    description: "Given the head of a singly linked list represented as an array, return the reversed list array.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" }
    ],
    starterCode: `function reverseList(arr) {
  return [...arr].reverse();
}`,
    tests: [
      { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
      { input: [[1, 2]], expected: [2, 1] }
    ]
  }
];

export const EVENTS_DATA = [
  {
    id: "1",
    dateDay: "15",
    dateMonth: "SEP",
    title: "National AI & Tech Hackathon 2026",
    type: "Hackathon",
    time: "09:00 AM",
    location: "Online / Virtual",
    seatsLeft: 50,
    organizer: "Engineering Council",
    isFeatured: true,
    enrolled: false
  },
  {
    id: "2",
    dateDay: "20",
    dateMonth: "SEP",
    title: "Tech Career & Placement Drive",
    type: "Career",
    time: "10:00 AM",
    location: "Main Campus Auditorium",
    seatsLeft: 120,
    organizer: "Placement Cell",
    isFeatured: false,
    enrolled: false
  }
];

export const RESOURCES_DATA = [
  {
    id: 1,
    title: "Data Structures & Algorithms Handbook",
    subject: "Computer Science",
    semester: "Semester 3",
    size: "2.4 MB",
    date: "Sep 2026",
    type: "Lecture Notes"
  },
  {
    id: 2,
    title: "AI & Machine Learning Foundations (PDF)",
    subject: "AI",
    semester: "Semester 4",
    size: "5.1 MB",
    date: "Sep 2026",
    type: "PDF"
  }
];

export const ACHIEVEMENTS_DATA = [
  {
    id: 1,
    title: "First Assessment",
    description: "Complete your first DOAP assessment",
    date: "",
    rarity: "Common",
    earned: false,
    icon: "🏆"
  },
  {
    id: 2,
    title: "7-Day Learning Streak",
    description: "Study for 7 consecutive days",
    date: "",
    rarity: "Uncommon",
    earned: false,
    icon: "🔥"
  },
  {
    id: 3,
    title: "Coding Explorer",
    description: "Solve your first 10 coding problems",
    date: "",
    rarity: "Common",
    earned: false,
    icon: "💻"
  },
  {
    id: 4,
    title: "Fast Learner",
    description: "Complete a module in under 60 minutes",
    date: "",
    rarity: "Common",
    earned: false,
    icon: "🚀"
  },
  {
    id: 5,
    title: "Interview Ready",
    description: "Complete 5 AI interview sessions",
    progress: "0 / 5",
    current: 0,
    total: 5,
    rarity: "Uncommon",
    earned: false,
    icon: "🎤"
  }
];

export const ASSESSMENTS_DATA = [];

export const INITIAL_CHAT_HISTORY = [];
