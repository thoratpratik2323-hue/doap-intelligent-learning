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
    modulesCount: 16,
    duration: "24h",
    progress: 0,
    modules: [
      {
        id: 1,
        title: "Complexity Notation & Analysis",
        completed: false,
        isCurrent: true,
        subTopics: [
          { id: "dsa-1-1", title: "Asymptotic Upper & Lower Bounds (O, Ω, Θ)", desc: "Growth rates from O(1) to O(n!), ignoring lower-order terms and constants." },
          { id: "dsa-1-2", title: "Time vs Auxiliary Space Complexity", desc: "Distinguishing total memory, working memory, and call-stack allocations." },
          { id: "dsa-1-3", title: "Worst-Case vs Average vs Amortized Analysis", desc: "Accounting for dynamic array geometric doubling and hash table expansions." },
          { id: "dsa-1-4", title: "Core 7-Step Problem-Solving Workflow", desc: "Clarify inputs/outputs/constraints, choose representation, match patterns, test edge cases." }
        ]
      },
      {
        id: 2,
        title: "Arrays & Dynamic Arrays",
        completed: false,
        subTopics: [
          { id: "dsa-2-1", title: "Contiguous Random Access & In-Place Shifts", desc: "Constant-time indexing via base address offset; O(n) middle insertions." },
          { id: "dsa-2-2", title: "Two Pointer Convergence & Partitioning", desc: "Converging pointers for pair sums, in-place reversal, and Dutch National Flag." },
          { id: "dsa-2-3", title: "Prefix Sum & Difference Arrays", desc: "O(1) range sum answering with prefix accumulation; offline range additions in O(n+q)." },
          { id: "dsa-2-4", title: "Sliding Window Paradigms", desc: "Fixed and dynamic window adjustments for maximum subsegments and subarrays." }
        ]
      },
      {
        id: 3,
        title: "Strings & Pattern Matching",
        completed: false,
        subTopics: [
          { id: "dsa-3-1", title: "Frequency Mapping & Character Traversals", desc: "O(n) single-pass frequency tables, anagram validation, and first unique character." },
          { id: "dsa-3-2", title: "Two Pointers for Palindromes", desc: "Inward convergence ignoring non-alphanumerics and case normalization." },
          { id: "dsa-3-3", title: "KMP Prefix Function & Substring Search", desc: "Building the π table to skip redundant character comparisons in linear O(n) time." },
          { id: "dsa-3-4", title: "Substrings vs Subsequences", desc: "Contiguous window algorithms vs relative-order dynamic programming invariants." }
        ]
      },
      {
        id: 4,
        title: "Linked Lists",
        completed: false,
        subTopics: [
          { id: "dsa-4-1", title: "Singly & Doubly Linked List Traversal", desc: "Pointer manipulation, head/tail additions, and avoiding pointer dereference leaks." },
          { id: "dsa-4-2", title: "Floyd's Fast & Slow Pointer Mechanics", desc: "Detecting cycles, finding cycle entry points, and middle node retrieval." },
          { id: "dsa-4-3", title: "In-Place List Reversal & Node Merging", desc: "Iterative pointer swapping, merging two sorted lists, and k-group reversals." },
          { id: "dsa-4-4", title: "LRU Cache Architecture", desc: "Combining hash maps with doubly linked lists for O(1) get and put operations." }
        ]
      },
      {
        id: 5,
        title: "Stacks & Monotonic Patterns",
        completed: false,
        subTopics: [
          { id: "dsa-5-1", title: "LIFO Operations & Balanced Delimiters", desc: "Matching brackets with push, pop, and top; syntax parsing invariants." },
          { id: "dsa-5-2", title: "Postfix Expression Evaluation", desc: "Reverse Polish notation evaluation and operator precedence stack engines." },
          { id: "dsa-5-3", title: "Monotonic Stack Pattern", desc: "Next Greater Element, daily temperature wait times, and largest histogram area in O(n)." },
          { id: "dsa-5-4", title: "Min-Stack in O(1) Auxiliary Time", desc: "Maintaining minimum value history alongside primary element stack." }
        ]
      },
      {
        id: 6,
        title: "Queues & Deques",
        completed: false,
        subTopics: [
          { id: "dsa-6-1", title: "FIFO Discipline & Circular Arrays", desc: "Modulo capacity wrapping for efficient enqueue and dequeue without shifting." },
          { id: "dsa-6-2", title: "Queue Implementation using Two Stacks", desc: "Amortized O(1) enqueue and dequeue through lazy transfer mechanics." },
          { id: "dsa-6-3", title: "Monotonic Double-Ended Queue (Deque)", desc: "Sliding window maximum in O(n) by preserving elements in decreasing order." },
          { id: "dsa-6-4", title: "Breadth-First Queue Driving", desc: "Level-order traversal and shortest path exploration in unweighted graphs." }
        ]
      },
      {
        id: 7,
        title: "Hash Tables & Sets",
        completed: false,
        subTopics: [
          { id: "dsa-7-1", title: "Hash Functions & Uniform Distribution", desc: "Mapping arbitrary keys to bucket indices while minimizing collision clusters." },
          { id: "dsa-7-2", title: "Collision Resolution: Chaining vs Open Addressing", desc: "Separate chaining buckets vs linear/quadratic probing and Robin Hood hashing." },
          { id: "dsa-7-3", title: "Load Factors & Dynamic Resizing", desc: "Rehashing when ratio n/k exceeds threshold to maintain expected O(1) bounds." },
          { id: "dsa-7-4", title: "Two Sum & Longest Consecutive Subsequence", desc: "Complement lookup in O(1) and boundary set expansion in linear time." }
        ]
      },
      {
        id: 8,
        title: "Recursion & Backtracking",
        completed: false,
        subTopics: [
          { id: "dsa-8-1", title: "Base Cases & Call Stack Unwinding", desc: "Designing recursive state reductions, avoiding stack overflows and duplicate work." },
          { id: "dsa-8-2", title: "Combinations & Subsets Generation", desc: "Choose/exclude recursion trees, accumulating valid states at leaf nodes." },
          { id: "dsa-8-3", title: "Permutations & State Restoration", desc: "Backtracking template: choose, apply, recurse, undo choice, try next." },
          { id: "dsa-8-4", title: "Constrained Pruning: N-Queens & Sudoku", desc: "Early search tree pruning when partial configurations violate problem invariants." }
        ]
      },
      {
        id: 9,
        title: "Binary Search",
        completed: false,
        subTopics: [
          { id: "dsa-9-1", title: "Interval Halving & Monotonic Predicates", desc: "Discarding half the search space in sorted arrays in guaranteed O(log n) time." },
          { id: "dsa-9-2", title: "Lower Bound & Upper Bound Implementations", desc: "Finding first and last target occurrences without off-by-one boundary traps." },
          { id: "dsa-9-3", title: "Rotated Sorted Array Search", desc: "Identifying the sorted half to navigate pivot offsets and inflection points." },
          { id: "dsa-9-4", title: "Binary Search on Answer Range", desc: "Applying feasibility predicates to continuous or discrete parameter bounds." }
        ]
      },
      {
        id: 10,
        title: "Sorting Algorithms",
        completed: false,
        subTopics: [
          { id: "dsa-10-1", title: "Comparison Bounds & Sort Stability", desc: "Proof of Ω(n log n) comparison lower bound; stability of insertion sort." },
          { id: "dsa-10-2", title: "Merge Sort & Inversion Counting", desc: "Divide-and-conquer recursion, linear merging, and counting array inversions in O(n log n)." },
          { id: "dsa-10-3", title: "Quicksort & Partitioning Schemes", desc: "Lomuto vs Hoare partitioning, randomized pivot selection, and handling sorted inputs." },
          { id: "dsa-10-4", title: "Heap Sort & In-Place Operations", desc: "Building bottom-up heaps in O(n) and extracting elements with O(1) auxiliary space." }
        ]
      },
      {
        id: 11,
        title: "Binary Trees & BST",
        completed: false,
        subTopics: [
          { id: "dsa-11-1", title: "Tree Traversals (DFS & BFS)", desc: "Preorder, inorder, postorder recursive/iterative traversals and level-order width." },
          { id: "dsa-11-2", title: "Tree Height, Diameter & Path Sums", desc: "Postorder bottom-up aggregation computing maximum path between any two nodes." },
          { id: "dsa-11-3", title: "BST Ordering Invariant & Validation", desc: "Passing valid range bounds [low, high] downward to strictly validate BST integrity." },
          { id: "dsa-11-4", title: "Lowest Common Ancestor (LCA)", desc: "Branch convergence in general binary trees and ordered divergence in BSTs." }
        ]
      },
      {
        id: 12,
        title: "Heaps & Balanced Trees",
        completed: false,
        subTopics: [
          { id: "dsa-12-1", title: "Binary Heap Invariants & Array Storage", desc: "Children at 2i+1, 2i+2; parent at (i-1)//2; sift-up and sift-down mechanics." },
          { id: "dsa-12-2", title: "Bottom-Up Heapify in O(n)", desc: "Mathematical proof why building a heap from bottom up is linear O(n), not O(n log n)." },
          { id: "dsa-12-3", title: "Top-K & Streaming Median", desc: "Dual heap architecture (Max-Heap for low half, Min-Heap for high half) for live streams." },
          { id: "dsa-12-4", title: "AVL Tree Rotations", desc: "Balancing factor (-1, 0, +1); LL, RR, LR, and RL rotations for guaranteed O(log n)." }
        ]
      },
      {
        id: 13,
        title: "Graph Traversal & DAGs",
        completed: false,
        subTopics: [
          { id: "dsa-13-1", title: "Adjacency Matrix vs Adjacency List", desc: "Space trade-offs O(V²) vs O(V+E); edge existence checks vs neighbor iterations." },
          { id: "dsa-13-2", title: "Breadth-First Search (BFS)", desc: "Layer-by-layer exploration, visited markings, and shortest path in unweighted networks." },
          { id: "dsa-13-3", title: "Depth-First Search (DFS) & Components", desc: "Recursive exploration, connected components, and cycle detection in undirected graphs." },
          { id: "dsa-13-4", title: "Topological Sort (Kahn's Algorithm)", desc: "In-degree calculation, zero-indegree queue processing, and dependency feasibility." }
        ]
      },
      {
        id: 14,
        title: "Shortest Paths & Spanning Trees",
        completed: false,
        subTopics: [
          { id: "dsa-14-1", title: "Dijkstra's Algorithm with Min-Heap", desc: "Greedy relaxation for non-negative edge weights in O((V+E) log V) time." },
          { id: "dsa-14-2", title: "Bellman-Ford & Negative Cycles", desc: "V-1 relaxation passes, handling negative weights, and detecting reachable negative cycles." },
          { id: "dsa-14-3", title: "Floyd-Warshall All-Pairs Shortest Path", desc: "O(V³) dynamic programming considering intermediate vertices in matrix form." },
          { id: "dsa-14-4", title: "Disjoint Set Union (DSU / Union-Find)", desc: "Path compression and union-by-rank/size achieving O(α(n)) inverse-Ackermann time." },
          { id: "dsa-14-5", title: "Minimum Spanning Tree (Kruskal & Prim)", desc: "Sorting edges with DSU cycle avoidance vs priority queue vertex tree growth." }
        ]
      },
      {
        id: 15,
        title: "Greedy & Dynamic Programming",
        completed: false,
        subTopics: [
          { id: "dsa-15-1", title: "Greedy Choice Property & Substructure", desc: "Proving local choices yield global optima; activity selection and Huffman encoding." },
          { id: "dsa-15-2", title: "DP Foundations: Memoization vs Tabulation", desc: "Overlapping subproblems, state definition, base cases, and transition orders." },
          { id: "dsa-15-3", title: "0/1 Knapsack & 1D Space Optimization", desc: "Capacity iteration from W downward to prevent item reuse in O(nW) time and O(W) space." },
          { id: "dsa-15-4", title: "Longest Common Subsequence & Edit Distance", desc: "2D state transition matching prefixes in O(nm) time; reconstructing alignment solutions." },
          { id: "dsa-15-5", title: "Longest Increasing Subsequence (LIS)", desc: "O(n²) DP transitions optimized to O(n log n) using patience sorting and binary search." }
        ]
      },
      {
        id: 16,
        title: "Tries, Range Trees & Bits",
        completed: false,
        subTopics: [
          { id: "dsa-16-1", title: "Trie (Prefix Tree) Architecture", desc: "Character edge traversal for prefix lookups, dictionary autocomplete, and word search." },
          { id: "dsa-16-2", title: "Binary Trie for Maximum XOR Pairs", desc: "Greedy opposite-bit navigation at highest bit positions in O(31n) time." },
          { id: "dsa-16-3", title: "Segment Tree for Range Queries", desc: "Associative range aggregation (sum, min, max) and point updates in O(log n)." },
          { id: "dsa-16-4", title: "Fenwick Tree (Binary Indexed Tree)", desc: "Prefix sum accumulation using isolated lowest set bits: i -= i & -i." },
          { id: "dsa-16-5", title: "Bit Manipulation Primitives", desc: "Clearing lowest bit x & (x-1), testing power of two, and finding single elements with XOR." }
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
  },
  {
    id: "system-design",
    title: "System Design & Distributed Architecture",
    level: "Advanced",
    category: "System Design",
    modulesCount: 8,
    duration: "20h",
    progress: 0,
    modules: [
      {
        id: 1,
        title: "Scalability, Latency & Throughput",
        completed: false,
        isCurrent: true,
        subTopics: [
          { id: "sys-1-1", title: "Horizontal vs Vertical Scaling", desc: "Stateless server tiers, autoscaling groups, stateful persistence, and cost trade-offs." },
          { id: "sys-1-2", title: "Latency vs Throughput vs Availability", desc: "p95/p99 tail latency metrics, SLA/SLO/SLI definitions, and High Availability (99.999%)." },
          { id: "sys-1-3", title: "CAP Theorem & PACELC Theorem", desc: "Consistency vs Availability under network partitions, and latency vs consistency trade-offs." },
          { id: "sys-1-4", title: "Consistent Hashing & Virtual Nodes", desc: "Minimizing remapping on node joins/failures in distributed caches and DHTs." }
        ]
      },
      {
        id: 2,
        title: "Load Balancing & Reverse Proxies",
        completed: false,
        subTopics: [
          { id: "sys-2-1", title: "Layer 4 vs Layer 7 Load Balancing", desc: "TCP/UDP transport load balancing vs HTTP/HTTPS path-based intelligent routing." },
          { id: "sys-2-2", title: "Balancing Algorithms (Round Robin, Least Conn, IP Hash)", desc: "Selection criteria for diverse client workloads, sticky sessions, and health checks." },
          { id: "sys-2-3", title: "SSL/TLS Termination & Reverse Proxying", desc: "Offloading cryptographic overhead, request buffering, and Nginx/HAProxy setups." },
          { id: "sys-2-4", title: "DNS Routing & Anycast BGP", desc: "GeoDNS, latency-based routing, CDN edge resolution, and multi-region failover." }
        ]
      },
      {
        id: 3,
        title: "Caching Strategies & Distributed In-Memory Stores",
        completed: false,
        subTopics: [
          { id: "sys-3-1", title: "Cache-Aside, Read-Through, Write-Through & Write-Back", desc: "Consistency guarantees, write amplification, and dirty cache management." },
          { id: "sys-3-2", title: "Cache Invalidation & Eviction (LRU, LFU, FIFO)", desc: "TTL strategies, event-driven cache invalidation, and memory pressure policies." },
          { id: "sys-3-3", title: "Thundering Herd & Cache Stampede Defense", desc: "Probabilistic early expiration (XFetch), mutex locking, and warm-up pipelines." },
          { id: "sys-3-4", title: "Redis vs Memcached Distributed Topologies", desc: "Redis Cluster sharding, sentinel failover, persistence (RDB/AOF), and data structures." }
        ]
      },
      {
        id: 4,
        title: "Data Partitioning, Sharding & Replication",
        completed: false,
        subTopics: [
          { id: "sys-4-1", title: "Horizontal Sharding vs Vertical Partitioning", desc: "Shard key selection, hot-spotting prevention, and range vs hash partitioning." },
          { id: "sys-4-2", title: "Leader-Follower (Master-Slave) Replication", desc: "Synchronous vs asynchronous replication, read scaling, and replication lag." },
          { id: "sys-4-3", title: "Multi-Leader & Leaderless Replication (Dynamo-Style)", desc: "Quorum reads/writes (R + W > N), Sloppy Quorum, Hinted Handoff, and Anti-Entropy." },
          { id: "sys-4-4", title: "Cross-Shard Queries & Distributed Transactions", desc: "Two-Phase Commit (2PC), Saga pattern, and eventual consistency reconciliations." }
        ]
      },
      {
        id: 5,
        title: "Message Queues & Event-Driven Architecture",
        completed: false,
        subTopics: [
          { id: "sys-5-1", title: "Point-to-Point Queues vs Publish/Subscribe", desc: "RabbitMQ AMQP exchange routing vs Kafka partitioned log stream consumer groups." },
          { id: "sys-5-2", title: "Message Delivery Semantics", desc: "At-least-once, at-most-once, exactly-once delivery guarantees and idempotent consumers." },
          { id: "sys-5-3", title: "Backpressure & Dead Letter Queues (DLQ)", desc: "Graceful degradation, poison pill handling, and exponential backoff retries." },
          { id: "sys-5-4", title: "Event Sourcing & CQRS Pattern", desc: "Separating read and write models with append-only audit event ledgers." }
        ]
      },
      {
        id: 6,
        title: "API Gateways, Rate Limiting & Resilience",
        completed: false,
        subTopics: [
          { id: "sys-6-1", title: "Token Bucket vs Leaky Bucket vs Sliding Window Counter", desc: "Mathematical rate-limiting algorithms and distributed Redis implementation." },
          { id: "sys-6-2", title: "Circuit Breaker & Bulkhead Patterns", desc: "Preventing cascading failures with Netflix Hystrix / Resilience4j state machines." },
          { id: "sys-6-3", title: "API Gateway Responsibilities", desc: "Authentication, authorization, rate limiting, request transformation, and telemetry." },
          { id: "sys-6-4", title: "Idempotency Keys in Distributed Payment Systems", desc: "Safe retries of financial mutations using unique idempotency tokens." }
        ]
      },
      {
        id: 7,
        title: "Distributed Consensus & Coordination",
        completed: false,
        subTopics: [
          { id: "sys-7-1", title: "Raft Consensus Algorithm", desc: "Leader election, log replication, safety guarantees, and term changes." },
          { id: "sys-7-2", title: "Paxos & Byzantine Fault Tolerance", desc: "Basic Paxos, Multi-Paxos, and handling malicious / arbitrary faulty nodes." },
          { id: "sys-7-3", title: "Distributed Coordination with ZooKeeper & etcd", desc: "Distributed locks, leader election recipes, and cluster configuration synchronization." },
          { id: "sys-7-4", title: "Vector Clocks & Version Vectors", desc: "Tracking causality and detecting concurrent conflicting updates in distributed nodes." }
        ]
      },
      {
        id: 8,
        title: "Real-World System Design Case Studies",
        completed: false,
        subTopics: [
          { id: "sys-8-1", title: "Design YouTube / Netflix Video Streaming", desc: "Chunked encoding, adaptive bitrate (HLS/DASH), CDN architecture, and metadata DB." },
          { id: "sys-8-2", title: "Design WhatsApp / Messenger Real-Time Chat", desc: "WebSocket gateways, presence servers, message store, and push notification services." },
          { id: "sys-8-3", title: "Design Uber / Grab Geospatial Ride-Hailing", desc: "QuadTree / Google S2 geospatial indexing, driver location streaming, and dispatch." },
          { id: "sys-8-4", title: "Design Twitter / X Real-Time News Feed", desc: "Fan-out on write vs fan-out on read for celebrity users, Redis timeline caching." }
        ]
      }
    ]
  },
  {
    id: "full-stack-web",
    title: "Full-Stack Web Architecture & Engineering",
    level: "Intermediate",
    category: "Programming",
    modulesCount: 6,
    duration: "18h",
    progress: 0,
    modules: [
      {
        id: 1,
        title: "Modern JavaScript Engine & TypeScript Mastery",
        completed: false,
        isCurrent: true,
        subTopics: [
          { id: "fs-1-1", title: "V8 Engine Internals & JIT Pipeline", desc: "Ignition interpreter, Sparkplug, TurboFan optimizing compiler, and Hidden Classes." },
          { id: "fs-1-2", title: "Event Loop, Microtasks & Macrotasks", desc: "Promise resolution order, process.nextTick, requestAnimationFrame, and starvation." },
          { id: "fs-1-3", title: "Advanced TypeScript Type System", desc: "Generics, mapped types, conditional types, template literal types, and type guards." },
          { id: "fs-1-4", title: "Memory Leaks & V8 Garbage Collection", desc: "Mark-and-sweep, generational GC (Scavenge vs Mark-Compact), heap profiling." }
        ]
      },
      {
        id: 2,
        title: "Modern React Architecture & Next.js App Router",
        completed: false,
        subTopics: [
          { id: "fs-2-1", title: "React 19 Server Components (RSC) vs Client Components", desc: "Zero-bundle-size server components, streaming SSR, and Suspense boundaries." },
          { id: "fs-2-2", title: "Concurrent Rendering & Fiber Architecture", desc: "Time-slicing, interruptible rendering, useTransition, and useDeferredValue hooks." },
          { id: "fs-2-3", title: "Next.js App Router & Server Actions", desc: "Nested layouts, route handlers, server mutations, revalidation, and caching tiers." },
          { id: "fs-2-4", title: "Global State: Zustand vs Redux Toolkit vs TanStack Query", desc: "Server state vs client UI state, cache deduplication, optimistic updates." }
        ]
      },
      {
        id: 3,
        title: "Backend API Engineering (REST, GraphQL & gRPC)",
        completed: false,
        subTopics: [
          { id: "fs-3-1", title: "RESTful API Best Practices & HATEOAS", desc: "Idempotent verbs, standard error contracts, semantic HTTP status codes, versioning." },
          { id: "fs-3-2", title: "GraphQL Schema Design & N+1 DataLoader", desc: "Queries, mutations, subscriptions, solving the N+1 problem with batching/caching." },
          { id: "fs-3-3", title: "High-Performance gRPC & Protocol Buffers", desc: "Binary serialization, HTTP/2 multiplexing, bidirectional streaming, and microservice IPC." },
          { id: "fs-3-4", title: "Real-Time WebSockets & Server-Sent Events (SSE)", desc: "Stateful persistent connections, heartbeat ping/pong, reconnect backoff, and SSE streams." }
        ]
      },
      {
        id: 4,
        title: "Enterprise Authentication & Security",
        completed: false,
        subTopics: [
          { id: "fs-4-1", title: "OAuth 2.0 & OpenID Connect (OIDC)", desc: "Authorization Code Flow with PKCE, token refresh rotations, and ID tokens." },
          { id: "fs-4-2", title: "JWT Deep Dive: Signatures, Algorithms & Pitfalls", desc: "RS256 vs HS256, expiration, revocation strategies, and httpOnly cookie storage." },
          { id: "fs-4-3", title: "Role-Based (RBAC) & Attribute-Based (ABAC) Access Control", desc: "Fine-grained permission matrices, policy decision points, and tenant isolation." },
          { id: "fs-4-4", title: "Web Security Hardening", desc: "CSP headers, CORS preflight policies, CSRF tokens, and subresource integrity (SRI)." }
        ]
      },
      {
        id: 5,
        title: "Database Integration & Query Optimization",
        completed: false,
        subTopics: [
          { id: "fs-5-1", title: "Prisma & Drizzle ORM Architecture", desc: "Type-safe schemas, automated migrations, connection pooling, and raw query escape hatches." },
          { id: "fs-5-2", title: "Preventing N+1 Queries & Index Tuning", desc: "EXPLAIN ANALYZE interpretation, compound indices, index-only scans, and eager joins." },
          { id: "fs-5-3", title: "Database Connection Pooling with PgBouncer", desc: "Managing high-concurrency client connections and server thread exhaustion." },
          { id: "fs-5-4", title: "Transactions & Isolation Levels in Production", desc: "Dirty reads, non-repeatable reads, phantom reads, and SERIALIZABLE isolation." }
        ]
      },
      {
        id: 6,
        title: "Web Performance, Observability & Testing",
        completed: false,
        subTopics: [
          { id: "fs-6-1", title: "Core Web Vitals Optimization (LCP, INP, CLS)", desc: "Code splitting, dynamic imports, image optimization, and font preloading." },
          { id: "fs-6-2", title: "End-to-End Testing with Playwright", desc: "Automated browser tests, network mocking, visual regression, and CI execution." },
          { id: "fs-6-3", title: "Unit & Integration Testing with Vitest / Jest", desc: "Test-driven development (TDD), mocking modules, snapshot testing, and code coverage." },
          { id: "fs-6-4", title: "Application Performance Monitoring (APM)", desc: "Distributed tracing with OpenTelemetry, error tracking with Sentry, and log aggregation." }
        ]
      }
    ]
  },
  {
    id: "cloud-devops",
    title: "Cloud Native DevOps & Kubernetes",
    level: "Advanced",
    category: "Cloud & DevOps",
    modulesCount: 6,
    duration: "16h",
    progress: 0,
    modules: [
      {
        id: 1,
        title: "Linux Systems & Production Shell Scripting",
        completed: false,
        isCurrent: true,
        subTopics: [
          { id: "cd-1-1", title: "Process Management & Systemd Services", desc: "PID lifecycle, daemons, signals (SIGTERM/SIGKILL), and systemd unit configurations." },
          { id: "cd-1-2", title: "Linux Networking & Firewall Controls", desc: "iptables, netfilter, DNS resolution (/etc/resolv.conf), and socket inspection with ss/lsof." },
          { id: "cd-1-3", title: "Production Bash Scripting & Automation", desc: "Strict error handling (set -euo pipefail), trap cleanup, cron scheduling, and stdout/stderr redirection." },
          { id: "cd-1-4", title: "SSH Hardening & Key Management", desc: "ED25519 keys, disabling root password login, bastion jump hosts, and agent forwarding." }
        ]
      },
      {
        id: 2,
        title: "Docker Containerization & Image Optimization",
        completed: false,
        subTopics: [
          { id: "cd-2-1", title: "Linux Namespaces & Cgroups Internals", desc: "How container isolation works: PID/NET/MNT namespaces and CPU/memory limits." },
          { id: "cd-2-2", title: "Multi-Stage Dockerfile Builds", desc: "Minimizing production images using Alpine/Distroless bases and caching build layers." },
          { id: "cd-2-3", title: "Container Security & Non-Root Execution", desc: "Preventing container breakout, dropping Linux capabilities, and scanning with Trivy." },
          { id: "cd-2-4", title: "Docker Compose Multi-Container Stacks", desc: "Networking, persistent volumes, environment interpolation, and dependency health checks." }
        ]
      },
      {
        id: 3,
        title: "Kubernetes Core Architecture & Orchestration",
        completed: false,
        subTopics: [
          { id: "cd-3-1", title: "Control Plane Architecture (API Server, etcd, Kubelet)", desc: "Controller Manager, Scheduler, etcd state store, and node-level Kubelet reconciliation." },
          { id: "cd-3-2", title: "Pods, Deployments & ReplicaSets", desc: "Rolling updates, zero-downtime deployments, rollback strategies, and Pod disruption budgets." },
          { id: "cd-3-3", title: "Networking: ClusterIP, NodePort, LoadBalancer & Ingress", desc: "Overlay networks (Calico/Flannel), kube-proxy iptables, and Nginx Ingress controllers." },
          { id: "cd-3-4", title: "ConfigMaps, Secrets & External Secret Operators", desc: "Decoupling configuration, KMS encryption at rest, and secret rotation workflows." }
        ]
      },
      {
        id: 4,
        title: "Kubernetes Storage, Autoscaling & Helm",
        completed: false,
        subTopics: [
          { id: "cd-4-1", title: "Persistent Volumes (PV) & PVCs (CSI)", desc: "Dynamic storage provisioning, storage classes, and stateful workload persistence." },
          { id: "cd-4-2", title: "Horizontal Pod Autoscaling (HPA) & KEDA", desc: "Autoscaling based on CPU/memory utilization and custom event metrics (Kafka/Redis queues)." },
          { id: "cd-4-3", title: "Helm Charts Packaging & Release Management", desc: "Templating manifests, values.yaml overrides, chart dependencies, and rollback hooks." },
          { id: "cd-4-4", title: "StatefulSets vs DaemonSets", desc: "Ordered deployment of stateful clusters vs node-level agent log collectors." }
        ]
      },
      {
        id: 5,
        title: "Infrastructure as Code (IaC) with Terraform",
        completed: false,
        subTopics: [
          { id: "cd-5-1", title: "Terraform Providers, Resources & State Files", desc: "Declarative infrastructure, remote state locking with S3 and DynamoDB, state migrations." },
          { id: "cd-5-2", title: "Modular Infrastructure & Reusability", desc: "Creating VPC, subnet, security group, and managed Kubernetes cluster (EKS/GKE) modules." },
          { id: "cd-5-3", title: "Terraform Plan, Apply & Drift Detection", desc: "Safe execution workflows, resource lifecycle meta-arguments, and automated drift alerts." },
          { id: "cd-5-4", title: "Zero Trust Cloud Networking Architecture", desc: "Private subnets, NAT gateways, VPC peering, Transit Gateways, and Bastion bastions." }
        ]
      },
      {
        id: 6,
        title: "CI/CD Automation & Observability",
        completed: false,
        subTopics: [
          { id: "cd-6-1", title: "GitHub Actions Enterprise Pipelines", desc: "Multi-job workflows, caching dependencies, matrix testing, OIDC AWS/GCP auth." },
          { id: "cd-6-2", title: "GitOps Continuous Deployment with ArgoCD", desc: "Declarative cluster synchronization, automated reconciliation, and canary deployments." },
          { id: "cd-6-3", title: "Prometheus Metrics & Alertmanager", desc: "Pull-based scraping, PromQL queries, SLO alerting rules, and Grafana dashboarding." },
          { id: "cd-6-4", title: "Centralized Logging with FluentBit & OpenSearch", desc: "Log shipping pipelines, structured JSON logging, and distributed correlation IDs." }
        ]
      }
    ]
  },
  {
    id: "os-internals",
    title: "Operating Systems & Concurrency Internals",
    level: "Advanced",
    category: "Computer Science",
    modulesCount: 5,
    duration: "15h",
    progress: 0,
    modules: [
      {
        id: 1,
        title: "Processes, Threads & CPU Scheduling",
        completed: false,
        isCurrent: true,
        subTopics: [
          { id: "os-1-1", title: "Process Control Block (PCB) & Context Switching", desc: "Register preservation, stack pointer updates, TLB flush overhead, and cache misses." },
          { id: "os-1-2", title: "User Space vs Kernel Space & Syscall Transition", desc: "CPU privilege rings (Ring 0 vs Ring 3), software interrupts, and trap handlers." },
          { id: "os-1-3", title: "CPU Scheduling Algorithms", desc: "CFS (Completely Fair Scheduler), Round Robin, Multi-Level Feedback Queue (MLFQ)." },
          { id: "os-1-4", title: "Threads: User-Level vs Kernel-Level vs Green/Virtual Threads", desc: "1:1 OS threading vs M:N hybrid fibers (Go goroutines, Java Project Loom)." }
        ]
      },
      {
        id: 2,
        title: "Synchronization, Locks & Deadlocks",
        completed: false,
        subTopics: [
          { id: "os-2-1", title: "Race Conditions & Critical Section Problem", desc: "Mutual exclusion, progress, and bounded waiting requirements." },
          { id: "os-2-2", title: "Hardware Primitives: Test-And-Set & Compare-And-Swap (CAS)", desc: "Atomic operations, memory barriers, acquire-release semantics, lock-free programming." },
          { id: "os-2-3", title: "Mutexes, Semaphores & Condition Variables", desc: "Futexes in Linux, binary/counting semaphores, and monitor synchronization." },
          { id: "os-2-4", title: "Coffman's Four Deadlock Conditions & Prevention", desc: "Mutual exclusion, Hold & Wait, No Preemption, Circular Wait; Banker's Algorithm." }
        ]
      },
      {
        id: 3,
        title: "Virtual Memory & Memory Management",
        completed: false,
        subTopics: [
          { id: "os-3-1", title: "Paging, Page Tables & Multi-Level Paging", desc: "Virtual-to-physical address translation, CR3 register, and page table walks." },
          { id: "os-3-2", title: "Translation Lookaside Buffer (TLB) & Page Faults", desc: "TLB hit/miss latency, hardware page table walker, and handling minor/major page faults." },
          { id: "os-3-3", title: "Page Replacement Algorithms (LRU, Clock, Belady's Anomaly)", desc: "Optimal offline page replacement vs Clock second-chance approximation." },
          { id: "os-3-4", title: "Memory Allocation: Malloc, Brk & Mmap", desc: "Heap expansion via brk/sbrk, anonymous mmap for large allocations, memory fragmentation." }
        ]
      },
      {
        id: 4,
        title: "File Systems & Storage Architecture",
        completed: false,
        subTopics: [
          { id: "os-4-1", title: "Inodes, Directories & Hard/Soft Links", desc: "File metadata representation, directory entries, reference counting, and dangling links." },
          { id: "os-4-2", title: "VFS (Virtual File System) Abstraction Layer", desc: "Standardized POSIX file API across Ext4, ZFS, Btrfs, and network file systems (NFS)." },
          { id: "os-4-3", title: "Journaling File Systems & Crash Consistency", desc: "Write-ahead logging in file systems, write ordering, and fsck recovery." },
          { id: "os-4-4", title: "Page Cache & Buffer Cache", desc: "Dirty page flushing (sync/fsync), read-ahead heuristic, and Direct I/O (O_DIRECT)." }
        ]
      },
      {
        id: 5,
        title: "High-Performance I/O & Network Stack",
        completed: false,
        subTopics: [
          { id: "os-5-1", title: "I/O Multiplexing: Select, Poll, Epoll & Kqueue", desc: "Solving the C10K problem with event-driven O(1) file descriptor notifications." },
          { id: "os-5-2", title: "Linux io_uring Asynchronous I/O", desc: "Submission and completion ring buffers, avoiding syscall overhead, zero-copy transfers." },
          { id: "os-5-3", title: "Linux TCP/IP Socket Lifecycle", desc: "SYN/ACK 3-way handshake, socket states (ESTABLISHED, TIME_WAIT), epoll integration." },
          { id: "os-5-4", title: "Zero-Copy Data Transfer (sendfile, splice)", desc: "Bypassing user-space memory copies between socket buffers and file caches." }
        ]
      }
    ]
  },
  {
    id: "db-internals",
    title: "Database Internals & Advanced SQL Engine Design",
    level: "Intermediate",
    category: "Computer Science",
    modulesCount: 5,
    duration: "14h",
    progress: 0,
    modules: [
      {
        id: 1,
        title: "Storage Engines: B+ Trees vs LSM-Trees",
        completed: false,
        isCurrent: true,
        subTopics: [
          { id: "db-1-1", title: "B+ Tree Index Architecture", desc: "Node fan-out, root-to-leaf searches, range scan sequential links, and page splits/merges." },
          { id: "db-1-2", title: "LSM-Tree (Log-Structured Merge-Tree) Storage", desc: "Memtable in RAM, Write-Ahead Log, SSTables on disk, and Bloom filters for fast misses." },
          { id: "db-1-3", title: "Compaction Strategies: Size-Tiered vs Leveled Compaction", desc: "Managing write amplification, space amplification, and read amplification in RocksDB." },
          { id: "db-1-4", title: "Row-Oriented vs Column-Oriented Storage", desc: "OLTP row storage (Postgres/MySQL) vs OLAP columnar projection & vectorization (ClickHouse/BigQuery)." }
        ]
      },
      {
        id: 2,
        title: "Query Processing & Cost-Based Optimizer (CBO)",
        completed: false,
        subTopics: [
          { id: "db-2-1", title: "SQL Parsing, AST & Logical Query Plan", desc: "Grammar parsing, semantic catalog checks, query rewrite rules, and predicate pushdown." },
          { id: "db-2-2", title: "Physical Plan Generation & Cost Estimation", desc: "Table statistics, histogram selectivity calculations, CPU vs I/O cost modeling." },
          { id: "db-2-3", title: "Join Algorithms: Nested Loop, Hash Join & Merge Join", desc: "Algorithm selection based on table sizes, available indices, and sort orders." },
          { id: "db-2-4", title: "Analyzing EXPLAIN & EXPLAIN ANALYZE Output", desc: "Diagnosing sequential scans, sorting bottlenecks, and inaccurate planner estimates." }
        ]
      },
      {
        id: 3,
        title: "ACID Transactions & Concurrency Control (MVCC)",
        completed: false,
        subTopics: [
          { id: "db-3-1", title: "Multi-Version Concurrency Control (MVCC) in Postgres", desc: "xmin/xmax row headers, snapshot isolation, non-blocking reads, and VACUUM cleanup." },
          { id: "db-3-2", title: "Two-Phase Locking (2PL) & Deadlock Detection", desc: "Strict 2PL, shared vs exclusive row locks, lock upgrade deadlocks, and wait-for graphs." },
          { id: "db-3-3", title: "Transaction Isolation Levels (Read Committed to Serializable)", desc: "Preventing write skew, phantom reads, and SSI (Serializable Snapshot Isolation)." },
          { id: "db-3-4", title: "Pessimistic vs Optimistic Concurrency Control (OCC)", desc: "SELECT FOR UPDATE vs version column compare-and-set in distributed environments." }
        ]
      },
      {
        id: 4,
        title: "Crash Recovery & Write-Ahead Logging (WAL)",
        completed: false,
        subTopics: [
          { id: "db-4-1", title: "WAL (Write-Ahead Logging) Principles", desc: "Append-only durability logging before flushing dirty buffer pool pages to disk." },
          { id: "db-4-2", title: "ARIES Crash Recovery Algorithm", desc: "Analysis pass, Redo pass (repeating history), and Undo pass (rolling back uncommitted work)." },
          { id: "db-4-3", title: "Checkpoints: Fuzzy Checkpointing & Dirty Pages", desc: "Limiting crash recovery duration without locking database transactions." },
          { id: "db-4-4", title: "Physical vs Logical Replication Streams", desc: "WAL byte-level shipping vs logical decoding of row mutations." }
        ]
      },
      {
        id: 5,
        title: "Advanced SQL Mastery & Analytical Queries",
        completed: false,
        subTopics: [
          { id: "db-5-1", title: "Window Functions: ROW_NUMBER, RANK, DENSE_RANK & LEAD/LAG", desc: "Partitioned computations, running totals, and moving averages without self-joins." },
          { id: "db-5-2", title: "Common Table Expressions (CTEs) & Recursive SQL", desc: "Hierarchical tree/graph traversal, organizational charts, and dependency paths in SQL." },
          { id: "db-5-3", title: "Lateral Joins & JSONB Semi-Structured Indexing", desc: "Correlated subqueries with LATERAL and GIN indexing for fast nested JSON search." },
          { id: "db-5-4", title: "Database Partitioning: Range, List & Hash", desc: "Partition pruning by query planner, declarative table partitioning, and data retention drops." }
        ]
      }
    ]
  },
  {
    id: "modern-llm-systems",
    title: "Modern AI & LLM Systems Engineering",
    level: "Advanced",
    category: "Artificial Intelligence",
    modulesCount: 5,
    duration: "16h",
    progress: 0,
    modules: [
      {
        id: 1,
        title: "Transformer Deep Architecture & Attention Mechanisms",
        completed: false,
        isCurrent: true,
        subTopics: [
          { id: "llm-1-1", title: "Multi-Head, Multi-Query & Grouped-Query Attention (GQA)", desc: "Optimizing KV-cache memory bandwidth during auto-regressive token generation." },
          { id: "llm-1-2", title: "RoPE (Rotary Position Embeddings) & Context Extension", desc: "Relative positional encoding, YaRN, and scaling context windows to 1M+ tokens." },
          { id: "llm-1-3", title: "FlashAttention & GPU Hardware Acceleration", desc: "Tiling attention computations to fit in SRAM, avoiding high-bandwidth memory (HBM) latency." },
          { id: "llm-1-4", title: "Mixture-of-Experts (MoE) Architectures", desc: "Sparse routing, top-k expert selection, load balancing loss, and inference efficiency." }
        ]
      },
      {
        id: 2,
        title: "Production RAG (Retrieval-Augmented Generation)",
        completed: false,
        subTopics: [
          { id: "llm-2-1", title: "Dense vs Sparse Retrieval & Hybrid Search", desc: "Combining vector embeddings with BM25 keyword search using Reciprocal Rank Fusion (RRF)." },
          { id: "llm-2-2", title: "Chunking Strategies: Semantic, Recursive & Document-Aware", desc: "Optimal chunk overlap, markdown structure preservation, and parent-document retrieval." },
          { id: "llm-2-3", title: "Cross-Encoder Re-Ranking Models (Cohere, BGE)", desc: "Scoring document relevancy with deep cross-attention before LLM synthesis." },
          { id: "llm-2-4", title: "Query Transformation & Hypothetical Document Embeddings (HyDE)", desc: "Generating pseudo-answers to bridge semantic gap between question and corpus." }
        ]
      },
      {
        id: 3,
        title: "Fine-Tuning & Parameter-Efficient Tuning (PEFT)",
        completed: false,
        subTopics: [
          { id: "llm-3-1", title: "LoRA (Low-Rank Adaptation) & QLoRA", desc: "Freezing base weights, decomposing weight updates into rank matrices (W = W0 + B*A)." },
          { id: "llm-3-2", title: "Supervised Fine-Tuning (SFT) Dataset Preparation", desc: "Instruction formatting, prompt-completion pairs, data deduplication, and quality filtering." },
          { id: "llm-3-3", title: "Direct Preference Optimization (DPO) vs PPO", desc: "Aligning models with human preferences using closed-form policy loss without separate reward model." },
          { id: "llm-3-4", title: "Quantization: AWQ, GPTQ, GGUF & FP8 Precision", desc: "Weight-only vs weight-and-activation quantization, inference on edge devices and consumer GPUs." }
        ]
      },
      {
        id: 4,
        title: "Autonomous Agent Architectures & Tool Use",
        completed: false,
        subTopics: [
          { id: "llm-4-1", title: "Function Calling & Structured JSON Schemas", desc: "Constrained decoding, Pydantic tool definitions, and zero-shot tool selection." },
          { id: "llm-4-2", title: "ReAct (Reasoning + Acting) Agent Loops", desc: "Thought-Action-Observation cognitive cycles, self-correction, and termination conditions." },
          { id: "llm-4-3", title: "Multi-Agent Orchestration (Supervisor & Swarm Models)", desc: "Role specialization, shared memory buses, and agent-to-agent negotiation protocols." },
          { id: "llm-4-4", title: "Long-Term Memory & Working Memory Management", desc: "Session compaction, vector recall of user profile facts, and context window pruning." }
        ]
      },
      {
        id: 5,
        title: "High-Throughput LLM Serving & Observability",
        completed: false,
        subTopics: [
          { id: "llm-5-1", title: "vLLM & PagedAttention Memory Management", desc: "Eliminating KV cache memory fragmentation with virtual memory page tables." },
          { id: "llm-5-2", title: "Continuous Batching & Speculative Decoding", desc: "Scheduling dynamic prompt arrivals and draft model verification for 2x-3x speedup." },
          { id: "llm-5-3", title: "LLM Guardrails & Hallucination Detection", desc: "NeMo Guardrails, regex output validators, and automated Ragas evaluation metrics." },
          { id: "llm-5-4", title: "Latency Tracking: TTFT (Time to First Token) & Token/s", desc: "Benchmarking streaming throughput, GPU compute utilization, and concurrency scaling." }
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
    type: "Lecture Notes",
    readingTime: "35 min",
    summary: "Complete reference for Big-O notation, amortized analysis, Trees (AVL, Red-Black), Graphs (BFS/DFS, Dijkstra, Bellman-Ford), and Dynamic Programming tabulation patterns.",
    keyTopics: ["Time & Space Complexities", "Tree Rebalancing", "Graph Traversals", "DP Memoization & Tabulation"]
  },
  {
    id: 2,
    title: "AI & Machine Learning Foundations (PDF)",
    subject: "AI",
    semester: "Semester 4",
    size: "5.1 MB",
    date: "Sep 2026",
    type: "PDF",
    readingTime: "50 min",
    summary: "Core mathematical and practical foundations of ML: Gradient Descent algorithms, Cross-Entropy loss, Backpropagation derivation, Regularization (L1/L2), and Evaluation metrics (ROC-AUC, F1).",
    keyTopics: ["Optimizer Math (SGD, Adam)", "Backprop Math", "Regularization", "Confusion Matrix & ROC-AUC"]
  },
  {
    id: 3,
    title: "Operating Systems & Concurrency Deep Dive",
    subject: "Computer Science",
    semester: "Semester 3",
    size: "3.8 MB",
    date: "Sep 2026",
    type: "Lecture Notes",
    readingTime: "40 min",
    summary: "Comprehensive exploration of Process Scheduling, Virtual Memory & Paging, Semaphore/Mutex Synchronization, Deadlock Coffman Conditions, and POSIX thread models.",
    keyTopics: ["Paging & Page Faults", "Mutex vs Semaphore", "Banker's Algorithm", "CPU Scheduling (CFS, Round Robin)"]
  },
  {
    id: 4,
    title: "Full-Stack System Design: High-Availability Microservices",
    subject: "Computer Science",
    semester: "Semester 4",
    size: "4.2 MB",
    date: "Sep 2026",
    type: "PDF",
    readingTime: "45 min",
    summary: "Architecting web systems that scale to millions: Load Balancing strategies, Database Sharding & Read Replicas, Redis Caching (Cache-Aside, Write-Through), and Kafka Event Queues.",
    keyTopics: ["CAP Theorem & PACELC", "Consistent Hashing", "Redis Caching Strategies", "Idempotent API Design"]
  },
  {
    id: 5,
    title: "Deep Learning & Transformer Architectures Handbook",
    subject: "AI",
    semester: "Semester 4",
    size: "6.7 MB",
    date: "Sep 2026",
    type: "PDF",
    readingTime: "60 min",
    summary: "Inside modern Generative AI: Scaled Dot-Product Attention, Multi-Head Attention equations, Positional Encodings (RoPE), Quantization (AWQ/GPTQ), and Fine-tuning with LoRA.",
    keyTopics: ["Self-Attention Math (Q, K, V)", "Rotary Position Embeddings", "KV Caching & FlashAttention", "LoRA & QLoRA"]
  },
  {
    id: 6,
    title: "Database Internals: B-Trees, WAL & ACID Guarantees",
    subject: "Computer Science",
    semester: "Semester 3",
    size: "3.1 MB",
    date: "Sep 2026",
    type: "Lecture Notes",
    readingTime: "30 min",
    summary: "Under the hood of relational engines: B+ Tree branch splitting, Write-Ahead Logging (WAL) for durability, MVCC isolation levels, and Query Optimizer EXPLAIN plans.",
    keyTopics: ["B+ Tree vs LSM Tree", "Write-Ahead Logging", "MVCC & Read Commits", "Clustered vs Secondary Indexes"]
  },
  {
    id: 7,
    title: "Linear Algebra & Probability for Machine Learning",
    subject: "Mathematics",
    semester: "Semester 2",
    size: "4.5 MB",
    date: "Sep 2026",
    type: "Book",
    readingTime: "55 min",
    summary: "The essential mathematics powering modern algorithms: Eigenvalues & SVD, Matrix decomposition, Bayes' Theorem, Maximum Likelihood Estimation, and Covariance matrices.",
    keyTopics: ["Eigenvectors & PCA", "Singular Value Decomposition (SVD)", "Bayes' Theorem", "Multivariate Normal Distribution"]
  },
  {
    id: 8,
    title: "FAANG Technical Interview Mastery Guide",
    subject: "Career",
    semester: "Semester 4",
    size: "5.8 MB",
    date: "Sep 2026",
    type: "PDF",
    readingTime: "65 min",
    summary: "Curated blueprint for breaking into top-tier tech firms: High-frequency LeetCode patterns, System Design interview frameworks, Google XYZ resume bullet writing, and STAR behavioral answers.",
    keyTopics: ["Two-Pointer & Sliding Window", "Monotonic Stacks", "System Design 4-Step Framework", "STAR Behavioral Stories"]
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
