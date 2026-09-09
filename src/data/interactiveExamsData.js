// DOAP Master Interactive Exams & Assessment Catalog
// Total Interactive Tests & Certification Exams: 28
// Total Questions: 482

export const INTERACTIVE_EXAMS_CATALOG = [
  {
    "id": "dsa-master",
    "title": "DSA Master Certification Exam (Trees, Graphs, DP, Arrays, Heaps & Systems)",
    "category": "Core DSA",
    "badge": "⭐ DSA MASTER BENCHMARK",
    "badgeColor": "cyan",
    "description": "Comprehensive 15-question adaptive assessment dynamically sampled across all 15 authoritative DSA domains.",
    "duration": "⏱ 15 Questions",
    "tag": "346 Question Bank",
    "featured": true
  },
  {
    "id": "hackerrank-cert",
    "title": "HackerRank Problem Solving Mock (Basic & Intermediate)",
    "category": "Core DSA",
    "badge": "🟩 HACKERRANK CERTIFICATION",
    "badgeColor": "emerald",
    "description": "Authentic HackerRank certification problems testing string hashing, frequency counters, and dynamic programming.",
    "duration": "⏱ 6 Questions",
    "tag": "Problem Solving Track"
  },
  {
    "id": "dsa-practice",
    "title": "DSA: Trees & Graphs Practice Test",
    "category": "Core DSA",
    "badge": "PRACTICE TEST",
    "badgeColor": "cyan",
    "description": "Focus on binary search trees, graph traversals (BFS/DFS), AVL balancing, and shortest path algorithms.",
    "duration": "⏱ 10 Questions",
    "tag": "Trees & Graphs"
  },
  {
    "id": "dsa-numericals",
    "title": "DSA Complexity & Math Calculations Benchmark",
    "category": "Core DSA",
    "badge": "NUMERICAL BENCHMARK",
    "badgeColor": "emerald",
    "description": "Master Theorem calculations, loop iteration bounds, tree heights, and combinatorial subarray formulas.",
    "duration": "⏱ 5 Questions",
    "tag": "Big-O & Calculations"
  },
  {
    "id": "c-systems",
    "title": "C Language & Memory Internals",
    "category": "Programming Languages",
    "badge": "C SYSTEMS EXAM",
    "badgeColor": "cyan",
    "description": "Pointer arithmetic, memory layout, struct padding, stack vs heap, and undefined behavior.",
    "duration": "⏱ 5 Questions",
    "tag": "Systems & Pointers"
  },
  {
    "id": "python-internals",
    "title": "Python GIL, OOP & Metaclasses",
    "category": "Programming Languages",
    "badge": "PYTHON ARCHITECTURE",
    "badgeColor": "amber",
    "description": "CPython memory model, Global Interpreter Lock (GIL), dunder methods, closures, and generators.",
    "duration": "⏱ 5 Questions",
    "tag": "CPython Mastery"
  },
  {
    "id": "java-mastery",
    "title": "Java 21, Loom & JVM Internals",
    "category": "Programming Languages",
    "badge": "JAVA 21 & JVM",
    "badgeColor": "rose",
    "description": "Virtual Threads (Project Loom), JIT escape analysis, Garbage Collection tuning, and concurrency.",
    "duration": "⏱ 5 Questions",
    "tag": "JVM & Concurrency"
  },
  {
    "id": "golang-systems",
    "title": "Go High-Performance Systems & Concurrency Master Exam",
    "category": "Programming Languages",
    "badge": "GO SYSTEMS & CONCURRENCY",
    "badgeColor": "cyan",
    "description": "Goroutines, GMP scheduler work-stealing, escape analysis, channels, sync.Pool, and tri-color GC.",
    "duration": "⏱ 5 Questions",
    "tag": "GMP & Netpoller"
  },
  {
    "id": "rust-systems",
    "title": "Rust Systems & Memory Safety Master Exam",
    "category": "Programming Languages",
    "badge": "RUST & MEMORY SAFETY",
    "badgeColor": "amber",
    "description": "Affine type system, borrow checker, lifetimes, smart pointers (Rc/Arc/RefCell), and Tokio async reactor.",
    "duration": "⏱ 5 Questions",
    "tag": "Borrow Checker & Tokio"
  },
  {
    "id": "typescript-advanced",
    "title": "Advanced TypeScript Type System & Metaprogramming Exam",
    "category": "Programming Languages",
    "badge": "TYPESCRIPT TYPE SYSTEM",
    "badgeColor": "blue",
    "description": "Conditional types, template literal types, infer keyword, mapped types, and branded nominal types.",
    "duration": "⏱ 5 Questions",
    "tag": "Type-Level Programming"
  },
  {
    "id": "system-design",
    "title": "System Design & Distributed Scalability Exam",
    "category": "Systems & OS",
    "badge": "DISTRIBUTED SYSTEMS",
    "badgeColor": "purple",
    "description": "CAP Theorem, consistent hashing, caching strategies, circuit breakers, and idempotency keys.",
    "duration": "⏱ 5 Questions",
    "tag": "CAP, Caching & Queues"
  },
  {
    "id": "linux-kernel-posix",
    "title": "Linux Kernel Internals, POSIX & Syscalls Exam",
    "category": "Systems & OS",
    "badge": "LINUX KERNEL & POSIX",
    "badgeColor": "emerald",
    "description": "VFS inode abstraction, fork vs clone vs vfork, signals, shared memory, and io_uring vs epoll.",
    "duration": "⏱ 5 Questions",
    "tag": "Kernel & Syscalls"
  },
  {
    "id": "networking-internals",
    "title": "Computer Networking & Transport Protocols Exam",
    "category": "Systems & OS",
    "badge": "NETWORKING & PROTOCOLS",
    "badgeColor": "blue",
    "description": "TCP 3-way handshake, TCP Cubic vs BBR congestion control, QUIC/HTTP/3, BGP Anycast, and MTU fragmentation.",
    "duration": "⏱ 5 Questions",
    "tag": "TCP, QUIC & BGP"
  },
  {
    "id": "microservices-patterns",
    "title": "Microservices Architecture & Resilience Patterns Exam",
    "category": "Systems & OS",
    "badge": "MICROSERVICES RESILIENCE",
    "badgeColor": "purple",
    "description": "Saga compensation, Transactional Outbox, CQRS, event sourcing, API gateways, and distributed tracing.",
    "duration": "⏱ 5 Questions",
    "tag": "Saga & Event Sourcing"
  },
  {
    "id": "cloud-devops",
    "title": "Kubernetes, Docker & GitOps Master Exam",
    "category": "Cloud & DevOps",
    "badge": "CLOUD NATIVE DEVOPS",
    "badgeColor": "blue",
    "description": "Cgroups & Namespaces, Deployments vs StatefulSets, Ingress, Terraform state locking, and ArgoCD.",
    "duration": "⏱ 5 Questions",
    "tag": "Infra & Containers"
  },
  {
    "id": "docker-container-security",
    "title": "Container Security & Runtime Hardening Exam",
    "category": "Cloud & DevOps",
    "badge": "CONTAINER SECURITY",
    "badgeColor": "rose",
    "description": "Rootless Docker, Linux Capabilities dropping, Seccomp profiles, AppArmor, and CVE vulnerability scanning.",
    "duration": "⏱ 5 Questions",
    "tag": "Seccomp & Capabilities"
  },
  {
    "id": "kafka-event-streaming",
    "title": "Apache Kafka & Event-Driven Architecture Exam",
    "category": "Cloud & DevOps",
    "badge": "EVENT STREAMING",
    "badgeColor": "amber",
    "description": "Partition keys, consumer rebalance protocol, ISR replicas, exactly-once semantics, and log compaction.",
    "duration": "⏱ 5 Questions",
    "tag": "Kafka & Commit Logs"
  },
  {
    "id": "job-readiness",
    "title": "Full Job Readiness & Engineering Fundamentals Assessment",
    "category": "Cloud & DevOps",
    "badge": "JOB READINESS",
    "badgeColor": "cyan",
    "description": "Reverse proxies, HTTP status codes, relational database ACID guarantees, indexing tradeoffs, and SSR hydration.",
    "duration": "⏱ 5 Questions",
    "tag": "Full-Stack Industry Ready"
  },
  {
    "id": "appsec-engineering",
    "title": "Application Security & OWASP Top 10 Engineering Exam",
    "category": "Security & Networking",
    "badge": "APPSEC & ETHICAL HACKING",
    "badgeColor": "rose",
    "description": "SSRF, prototype pollution, OAuth 2.0 PKCE, JWT security flaws, SQL injection prevention, and CSRF tokens.",
    "duration": "⏱ 5 Questions",
    "tag": "OWASP & OAuth PKCE"
  },
  {
    "id": "cryptography-pki",
    "title": "Applied Cryptography, PKI & Zero Trust Exam",
    "category": "Security & Networking",
    "badge": "APPLIED CRYPTOGRAPHY",
    "badgeColor": "purple",
    "description": "AES-256-GCM AEAD, RSA vs Ed25519, Diffie-Hellman key exchange, TLS 1.3 0-RTT, and Argon2id password hashing.",
    "duration": "⏱ 5 Questions",
    "tag": "AES-GCM & TLS 1.3"
  },
  {
    "id": "ai-readiness",
    "title": "Full AI Readiness & Machine Learning Assessment",
    "category": "AI & Data",
    "badge": "AI READINESS",
    "badgeColor": "cyan",
    "description": "Transformers, Adam optimizer, self-attention, L2 regularization, imbalanced metrics, and RAG architectures.",
    "duration": "⏱ 5 Questions",
    "tag": "AI & Neural Networks"
  },
  {
    "id": "database-internals",
    "title": "Database Storage Engines & Query Optimization Exam",
    "category": "AI & Data",
    "badge": "DATABASE ENGINES",
    "badgeColor": "emerald",
    "description": "LSM-Trees, B+ Trees, PostgreSQL MVCC, Write-Ahead Logging (WAL), and EXPLAIN query plan analysis.",
    "duration": "⏱ 5 Questions",
    "tag": "Storage & Query Plans"
  },
  {
    "id": "redis-in-depth",
    "title": "Redis Data Structures, Memory & Sentinel Internals Exam",
    "category": "AI & Data",
    "badge": "REDIS IN-DEPTH",
    "badgeColor": "rose",
    "description": "SkipLists, HyperLogLog, ziplist/listpack memory optimization, atomic Lua scripts, and Sentinel failover.",
    "duration": "⏱ 5 Questions",
    "tag": "SkipLists & Redis Lua"
  },
  {
    "id": "nosql-distributed-db",
    "title": "NoSQL & Distributed Key-Value Databases Exam",
    "category": "AI & Data",
    "badge": "NOSQL ARCHITECTURE",
    "badgeColor": "amber",
    "description": "Dynamo paper principles, quorum replication (N, R, W), vector clocks, SSTables, and tunable consistency.",
    "duration": "⏱ 5 Questions",
    "tag": "Dynamo & Quorum"
  },
  {
    "id": "vector-search-ai",
    "title": "Vector Databases & Dense Semantic Search Exam",
    "category": "AI & Data",
    "badge": "VECTOR DATABASES",
    "badgeColor": "purple",
    "description": "HNSW multi-layer graphs, Product Quantization (PQ), cosine distance vs dot product, and Reciprocal Rank Fusion.",
    "duration": "⏱ 5 Questions",
    "tag": "HNSW & Embeddings"
  },
  {
    "id": "mlops-engineering",
    "title": "Production MLOps, Model Serving & Drift Monitoring Exam",
    "category": "AI & Data",
    "badge": "MLOPS ENGINEERING",
    "badgeColor": "emerald",
    "description": "Feature stores (Feast), Population Stability Index (PSI) drift, ONNX runtime, dynamic batching, and canary rollout.",
    "duration": "⏱ 5 Questions",
    "tag": "Feast & Model Serving"
  },
  {
    "id": "distributed-caching",
    "title": "Distributed Caching, Eviction & Stampede Mitigation Exam",
    "category": "AI & Data",
    "badge": "DISTRIBUTED CACHING",
    "badgeColor": "cyan",
    "description": "O(1) LRU & LFU mechanics, Adaptive Replacement Cache (ARC), cache penetration Bloom filters, and XFetch.",
    "duration": "⏱ 5 Questions",
    "tag": "LRU, LFU & Stampede"
  },
  {
    "id": "react-internals",
    "title": "React Fiber Architecture & Modern Performance Exam",
    "category": "AI & Data",
    "badge": "REACT INTERNALS",
    "badgeColor": "blue",
    "description": "Fiber reconciliation tree, concurrent rendering, lane-based priority scheduling, and hydration mismatches.",
    "duration": "⏱ 5 Questions",
    "tag": "Fiber & Concurrent"
  }
];

export const INTERACTIVE_EXAMS_DATA = {
  "ai-readiness": {
    "title": "Full AI Readiness Assessment",
    "category": "AI & Data",
    "questions": [
      {
        "q": "Which algorithm is commonly used for gradient-based optimization in deep neural networks?",
        "options": [
          "Adam Optimizer",
          "Dijkstra Algorithm",
          "Binary Search",
          "Bubble Sort"
        ],
        "correct": 0
      },
      {
        "q": "What is the purpose of the Transformer self-attention mechanism?",
        "options": [
          "To sort tokens by length",
          "To dynamically weigh the contextual relationship between any two tokens in a sequence",
          "To compress the model weights into 8-bit integers",
          "To prevent memory leaks in the GPU"
        ],
        "correct": 1
      },
      {
        "q": "In Machine Learning, what problem does L2 regularization (Ridge) primarily address?",
        "options": [
          "Underfitting",
          "Overfitting by penalizing large model weights",
          "Data missingness",
          "GPU memory exhaustion"
        ],
        "correct": 1
      },
      {
        "q": "Which metric is most suitable for evaluating highly imbalanced classification datasets?",
        "options": [
          "Accuracy",
          "F1-Score / Area Under Precision-Recall Curve",
          "Mean Absolute Error",
          "R-Squared"
        ],
        "correct": 1
      },
      {
        "q": "What is the key advantage of Retrieval-Augmented Generation (RAG)?",
        "options": [
          "It replaces the LLM with a SQL database",
          "It grounds LLM responses with external verified facts without retraining the model",
          "It increases network latency",
          "It removes the need for vector embeddings"
        ],
        "correct": 1
      }
    ]
  },
  "dsa-practice": {
    "title": "DSA Practice Test — Trees & Graphs",
    "category": "Core DSA",
    "questions": [
      {
        "q": "What is the worst-case time complexity of searching in an unbalanced Binary Search Tree (BST)?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        "correct": 2
      },
      {
        "q": "Which traversal of a Binary Search Tree produces values in strictly sorted ascending order?",
        "options": [
          "Pre-order",
          "In-order",
          "Post-order",
          "Level-order"
        ],
        "correct": 1
      },
      {
        "q": "What data structure is standardly used to implement Breadth-First Search (BFS) in a graph?",
        "options": [
          "Stack",
          "Queue",
          "Priority Queue",
          "Trie"
        ],
        "correct": 1
      },
      {
        "q": "In an AVL tree, what is the maximum permissible difference in height between left and right subtrees?",
        "options": [
          "0",
          "1",
          "2",
          "log N"
        ],
        "correct": 1
      },
      {
        "q": "Dijkstra single-source shortest path algorithm cannot handle:",
        "options": [
          "Dense graphs",
          "Negative edge weights",
          "Directed acyclic graphs",
          "Trees"
        ],
        "correct": 1
      }
    ]
  },
  "job-readiness": {
    "title": "Job Readiness Assessment",
    "category": "Cloud & DevOps",
    "questions": [
      {
        "q": "In system design, what is the primary role of a Reverse Proxy (e.g. Nginx)?",
        "options": [
          "To compile JavaScript code",
          "Load balancing, SSL termination, and caching",
          "To store user passwords",
          "To act as a database index"
        ],
        "correct": 1
      },
      {
        "q": "Which HTTP status code signifies that the client is not authenticated?",
        "options": [
          "200 OK",
          "401 Unauthorized",
          "403 Forbidden",
          "404 Not Found"
        ],
        "correct": 1
      },
      {
        "q": "What does the ACID acronym stand for in relational databases?",
        "options": [
          "Atomicity, Consistency, Isolation, Durability",
          "Access, Control, Integrity, Data",
          "Asynchronous, Concurrent, Indexed, Distributed",
          "Authorization, Cipher, Identity, Defense"
        ],
        "correct": 0
      },
      {
        "q": "What is the key benefit of database indexing on frequently queried columns?",
        "options": [
          "Speeds up SELECT queries at the cost of slight INSERT/UPDATE overhead",
          "Decreases storage size",
          "Guarantees 100% uptime",
          "Encrypts user data"
        ],
        "correct": 0
      },
      {
        "q": "In modern frontend architecture, what is hydration?",
        "options": [
          "Cooling down the server CPU",
          "Attaching event listeners to server-rendered HTML markup in the client browser",
          "Minifying CSS files",
          "Removing unused npm packages"
        ],
        "correct": 1
      }
    ]
  },
  "c-systems": {
    "title": "C Language & Memory Internals",
    "category": "Programming Languages",
    "questions": [
      {
        "q": "What is the memory size of `sizeof('A')` in standard C vs C++?",
        "options": [
          "4 bytes in C (promoted to int), 1 byte in C++ (char literal)",
          "1 byte in both",
          "2 bytes in both",
          "8 bytes in C, 4 bytes in C++"
        ],
        "correct": 0
      },
      {
        "q": "What happens if you invoke `free(ptr)` twice on the same allocated heap pointer?",
        "options": [
          "Undefined Behavior (Double Free vulnerability / crash)",
          "The second call is safely ignored by glibc",
          "Memory is automatically cleared to zero",
          "The OS allocates a new memory block"
        ],
        "correct": 0
      },
      {
        "q": "What does the `volatile` keyword prevent in C?",
        "options": [
          "Prevents the compiler from caching the variable in registers across reads",
          "Prevents variable mutation (makes it const)",
          "Prevents stack overflow",
          "Encrypts variable contents in RAM"
        ],
        "correct": 0
      },
      {
        "q": "In pointer arithmetic, what does `ptr + 1` actually add to the raw memory address?",
        "options": [
          "`sizeof(*ptr)` bytes (the size of the pointed-to type)",
          "Exactly 1 byte always",
          "4 bytes always",
          "8 bytes always"
        ],
        "correct": 0
      },
      {
        "q": "Why does `struct { char c; int i; };` typically occupy 8 bytes rather than 5 on a 64-bit architecture?",
        "options": [
          "Due to compiler structure padding for CPU alignment requirements",
          "Because of memory fragmentation",
          "Because of garbage collection headers",
          "Because C pointers always require 16 bytes"
        ],
        "correct": 0
      }
    ]
  },
  "python-internals": {
    "title": "Python Architecture & CPython Master Exam",
    "category": "Programming Languages",
    "questions": [
      {
        "q": "If a = [1, 2, 3] and b = a; b.append(4). What is the value of a?",
        "options": [
          "[1, 2, 3, 4] (both share the same list reference)",
          "[1, 2, 3]",
          "TypeError: mutated alias",
          "[4]"
        ],
        "correct": 0
      },
      {
        "q": "Why does Python multithreading fail to speed up CPU-bound tasks in CPython?",
        "options": [
          "Due to the Global Interpreter Lock (GIL) serializing bytecode execution",
          "Because Python does not support multi-core CPUs",
          "Due to recursion limit exhaustion",
          "Because Python cannot allocate heap memory across threads"
        ],
        "correct": 0
      },
      {
        "q": "What is the key difference between __new__ and __init__ in Python?",
        "options": [
          "__new__ is the static constructor creating the instance; __init__ initializes fields",
          "__new__ is for classes, __init__ is for functions",
          "They are identical and interchangeable",
          "__init__ runs before __new__"
        ],
        "correct": 0
      },
      {
        "q": "What does the @property decorator do in Python?",
        "options": [
          "Allows a method to be accessed like an attribute without ()",
          "Converts a function to C bytecode",
          "Makes the variable immutable forever",
          "Registers a class in the global metaclass registry"
        ],
        "correct": 0
      },
      {
        "q": "Why is `def add(item, bucket=[])` dangerous in Python?",
        "options": [
          "The default list is created once at def-time and shared across all calls",
          "Python raises a SyntaxError for mutable default arguments",
          "It causes an immediate memory leak",
          "It crashes during garbage collection"
        ],
        "correct": 0
      }
    ]
  },
  "java-mastery": {
    "title": "Java 21 & JVM Concurrency Master Assessment",
    "category": "Programming Languages",
    "questions": [
      {
        "q": "What are Virtual Threads (Project Loom) finalized in Java 21?",
        "options": [
          "Lightweight JVM-managed threads scheduled onto carrier OS threads",
          "GPU-based parallel compute units",
          "A single-threaded event loop like Node.js",
          "Thread pools with a fixed size of 1"
        ],
        "correct": 0
      },
      {
        "q": "In Java Generics, what does PECS stand for?",
        "options": [
          "Producer Extends, Consumer Super",
          "Private Extends, Concrete Super",
          "Polymorphic Extension, Class Super",
          "Parameterized Encapsulation, Custom Scope"
        ],
        "correct": 0
      },
      {
        "q": "Why does volatile not make i++ thread-safe?",
        "options": [
          "Because increment is a 3-step read-modify-write compound operation",
          "Because volatile is only for boolean variables",
          "Because volatile is ignored by the JIT compiler",
          "Because i++ runs exclusively in the CPU cache"
        ],
        "correct": 0
      },
      {
        "q": "What optimization does JIT Escape Analysis perform when an object does not escape a method?",
        "options": [
          "Scalar replacement — allocates fields on the stack/registers, avoiding heap allocation",
          "Encrypts the object in RAM",
          "Transfers the object to disk cache",
          "Converts Java code to C++ at runtime"
        ],
        "correct": 0
      },
      {
        "q": "Why is ArrayDeque preferred over legacy Stack in modern Java?",
        "options": [
          "ArrayDeque is faster and avoids unnecessary Vector synchronized lock contention",
          "Stack cannot store generic objects",
          "ArrayDeque uses zero memory",
          "Stack throws checked exceptions on pop"
        ],
        "correct": 0
      }
    ]
  },
  "dsa-numericals": {
    "title": "DSA Complexity & Numerical Benchmark",
    "category": "Core DSA",
    "questions": [
      {
        "q": "A loop starts at n = 128 and divides n by 2 in every iteration until n = 1. How many iterations occur?",
        "options": [
          "7 iterations (log2(128) = 7)",
          "8 iterations",
          "6 iterations",
          "14 iterations"
        ],
        "correct": 0
      },
      {
        "q": "An array contains 20 elements. How many total non-empty contiguous subarrays does it have?",
        "options": [
          "210 (Formula: n*(n+1)/2 = 20*21/2)",
          "400",
          "190",
          "1024"
        ],
        "correct": 0
      },
      {
        "q": "A balanced BST contains 1,023 nodes. What is its height if the root is at level 0?",
        "options": [
          "9 (log2(1024) - 1)",
          "10",
          "11",
          "8"
        ],
        "correct": 0
      },
      {
        "q": "A hash table has 100 slots and contains 75 elements. How many additional elements can be inserted before reaching a load factor of 0.9?",
        "options": [
          "15 (90 - 75 = 15)",
          "25",
          "10",
          "90"
        ],
        "correct": 0
      },
      {
        "q": "For a recurrence relation T(n) = 2T(n/2) + n, what is its asymptotic time complexity (Master Theorem)?",
        "options": [
          "O(n log n)",
          "O(n)",
          "O(n²)",
          "O(log n)"
        ],
        "correct": 0
      }
    ]
  },
  "hackerrank-cert": {
    "title": "HackerRank Problem Solving Certification Mock",
    "category": "Core DSA",
    "questions": [
      {
        "q": "In HackerRank's 'Sales by Match' problem, given n socks with color numbers, what data structure yields the optimal O(n) solution?",
        "options": [
          "Hash Map / Frequency Counter or Set to track pairs",
          "Nested loops with O(n²) comparisons",
          "Binary Search Tree with O(n log n) lookups",
          "Matrix Transposition"
        ],
        "correct": 0
      },
      {
        "q": "In 'Counting Valleys', a hiker steps U (up) and D (down). When exactly is a completed valley recorded?",
        "options": [
          "When taking a 'U' step that brings current sea level back to 0 from -1",
          "When taking a 'D' step from 0 to -1",
          "Whenever the altitude is negative",
          "At the highest peak"
        ],
        "correct": 0
      },
      {
        "q": "For HackerRank's 'Sherlock and Anagrams', what is the fundamental technique to detect if two substrings are anagrams in linear time?",
        "options": [
          "Sort each substring's characters or count character frequencies as a canonical hash key",
          "Compare their lengths only",
          "Check first and last characters",
          "Calculate ASCII product"
        ],
        "correct": 0
      },
      {
        "q": "In 'Balanced Brackets' ({[]}), which data structure is required to ensure brackets close in correct reverse chronological order?",
        "options": [
          "LIFO Stack",
          "FIFO Queue",
          "Max Heap",
          "Disjoint Set Union (DSU)"
        ],
        "correct": 0
      },
      {
        "q": "In HackerRank's 'Max Array Sum' (non-adjacent subset sum), what is the dynamic programming state transition for dp[i]?",
        "options": [
          "dp[i] = max(arr[i], dp[i-1], dp[i-2] + arr[i])",
          "dp[i] = dp[i-1] + arr[i]",
          "dp[i] = max(arr[i], arr[i-1])",
          "dp[i] = dp[i-1] * arr[i]"
        ],
        "correct": 0
      },
      {
        "q": "In 'Common Child' (longest string that can be formed from two strings without rearranging), which classical algorithmic pattern is this equivalent to?",
        "options": [
          "Longest Common Subsequence (LCS) using 2D DP",
          "Longest Increasing Subsequence (LIS)",
          "Edit Distance (Levenshtein)",
          "Knapsack 0/1"
        ],
        "correct": 0
      }
    ]
  },
  "system-design": {
    "title": "System Design & Distributed Scalability Exam",
    "category": "Systems & OS",
    "questions": [
      {
        "q": "In the CAP Theorem, why can a distributed system partitioned across a network (P) not be both fully Consistent (C) and fully Available (A)?",
        "options": [
          "Because nodes unable to communicate must choose between returning stale data (Available) or refusing reads (Consistent)",
          "Because network latency cannot be measured in distributed systems",
          "Because distributed systems require quantum computers for consensus",
          "Because disk I/O is slower than CPU memory caches"
        ],
        "correct": 0
      },
      {
        "q": "How does Consistent Hashing with virtual nodes prevent the 'hot-spotting' problem when a cache server crashes?",
        "options": [
          "By distributing keys evenly across multiple virtual token ranges on a ring, remapping only ~K/N keys",
          "By duplicating all keys across every single server in the fleet",
          "By switching from SHA-256 to MD5 hashing",
          "By converting key lookups into SQL binary joins"
        ],
        "correct": 0
      },
      {
        "q": "What is the primary architectural difference between Kafka and RabbitMQ?",
        "options": [
          "Kafka is an append-only distributed commit log with consumer-managed offsets; RabbitMQ is an AMQP broker tracking message acknowledgments",
          "RabbitMQ is written in C++ while Kafka is written in Python",
          "Kafka cannot handle more than 10 messages per second",
          "RabbitMQ persists all messages forever on disk"
        ],
        "correct": 0
      },
      {
        "q": "What is the primary role of a Circuit Breaker pattern (e.g. Netflix Hystrix) in microservices?",
        "options": [
          "To stop dispatching requests to a failing dependency once a failure threshold is crossed, preventing cascading outages",
          "To encrypt HTTP request payloads with AES-256",
          "To compress video files in the browser",
          "To auto-restart Docker containers on the host"
        ],
        "correct": 0
      },
      {
        "q": "In high-throughput distributed payment processing, what mechanism guarantees that a duplicate network retry does not charge a customer twice?",
        "options": [
          "Idempotency Keys stored with unique mutation constraints in an atomic database transaction",
          "Increasing the client HTTP request timeout to 60 seconds",
          "Using UDP instead of TCP for payments",
          "Disabling browser cookies"
        ],
        "correct": 0
      }
    ]
  },
  "cloud-devops": {
    "title": "Cloud Native, Docker & Kubernetes Master Exam",
    "category": "Cloud & DevOps",
    "questions": [
      {
        "q": "In Docker containerization, what Linux kernel features provide process isolation and resource limits respectively?",
        "options": [
          "Namespaces (isolation) and Cgroups (resource limits like CPU/Memory)",
          "Syscalls and Inodes",
          "IPTables and Swap memory",
          "Chroot and Crontab"
        ],
        "correct": 0
      },
      {
        "q": "What is the fundamental difference between a Kubernetes Deployment and a StatefulSet?",
        "options": [
          "StatefulSets provide stable, unique network identifiers and ordered persistent storage for stateful databases",
          "Deployments run only on Windows nodes",
          "StatefulSets cannot be scaled horizontally",
          "Deployments require dedicated bare-metal servers"
        ],
        "correct": 0
      },
      {
        "q": "In Kubernetes networking, how does an Ingress Controller differ from a NodePort Service?",
        "options": [
          "Ingress operates at Layer 7 (HTTP/HTTPS) providing host/path routing and SSL termination; NodePort opens a static port on each node",
          "NodePort supports SSL certificates while Ingress does not",
          "Ingress runs only inside Pod network namespaces",
          "They are identical concepts with different names"
        ],
        "correct": 0
      },
      {
        "q": "In Terraform Infrastructure as Code, why is remote state locking with DynamoDB/S3 critical?",
        "options": [
          "To prevent concurrent Terraform apply executions from corrupting the shared infrastructure state file",
          "To speed up AWS internet bandwidth",
          "To compile HCL into machine code",
          "To encrypt Docker images on Docker Hub"
        ],
        "correct": 0
      },
      {
        "q": "What is the core principle of GitOps (e.g. ArgoCD)?",
        "options": [
          "Git is the single source of truth; automated agents continuously reconcile actual cluster state with git declarations",
          "Developers must run kubectl apply manually in production terminals",
          "All Kubernetes clusters must be hosted on GitHub servers",
          "Dockerfiles are replaced with Git commit hashes"
        ],
        "correct": 0
      }
    ]
  },
  "database-internals": {
    "title": "Database Storage Engines & Query Optimization Exam",
    "category": "AI & Data",
    "questions": [
      {
        "q": "Why do OLTP write-heavy databases like Cassandra and RocksDB use Log-Structured Merge (LSM) Trees instead of B+ Trees?",
        "options": [
          "LSM Trees convert random disk writes into sequential append-only writes in memory and WAL, maximizing SSD write throughput",
          "B+ Trees cannot store string data types",
          "LSM Trees require zero disk space",
          "B+ Trees only work on single-core CPUs"
        ],
        "correct": 0
      },
      {
        "q": "In PostgreSQL, how does Multi-Version Concurrency Control (MVCC) ensure non-blocking reads during concurrent writes?",
        "options": [
          "Readers inspect row tuple versions (xmin/xmax) matching their transaction snapshot, avoiding shared read locks",
          "Postgres locks the entire table during every update",
          "Postgres converts all updates into in-memory Redis caches",
          "By executing all transactions sequentially on one core"
        ],
        "correct": 0
      },
      {
        "q": "What is Write-Ahead Logging (WAL) and why must WAL records be flushed to disk before committing a transaction?",
        "options": [
          "To guarantee Durability (ACID) so crash recovery can replay the log even if dirty buffer pool pages were not yet written",
          "To reduce CPU clock temperatures",
          "To allow web browsers to read the database directly",
          "To prevent SQL injection attacks"
        ],
        "correct": 0
      },
      {
        "q": "When running EXPLAIN ANALYZE on a SQL query, what indicates that an index is NOT being effectively utilized?",
        "options": [
          "Seq Scan (Sequential Scan) on a large table with high cost and filtering rows after table scan",
          "Index Only Scan",
          "Bitmap Index Scan",
          "Hash Aggregate"
        ],
        "correct": 0
      },
      {
        "q": "What is the purpose of Bloom Filters in LSM-tree storage engines?",
        "options": [
          "To quickly determine if a key definitely does NOT exist in an SSTable file without performing expensive disk I/O",
          "To compress text columns using gzip",
          "To auto-generate primary key UUIDs",
          "To encrypt rows before writing to disk"
        ],
        "correct": 0
      }
    ]
  },
  "golang-systems": {
    "title": "Go High-Performance Systems & Concurrency Master Exam",
    "category": "Programming Languages",
    "questions": [
      {
        "q": "In Go runtime GMP scheduling model, what do G, M, and P represent?",
        "options": [
          "G = Goroutine (stack + IP), M = Machine (OS thread), P = Processor (logical context with local run queue)",
          "G = Garbage Collector, M = Mutex, P = Pointer",
          "G = Global state, M = Main routine, P = Process",
          "G = Generator, M = Memory pool, P = Port"
        ],
        "correct": 0
      },
      {
        "q": "What triggers Go's compiler to escape a variable from the stack to the heap?",
        "options": [
          "Returning a pointer to a locally declared variable outside the function scope",
          "Declaring an integer with value greater than 1000",
          "Using a for loop with more than 10 iterations",
          "Importing the fmt package"
        ],
        "correct": 0
      },
      {
        "q": "What happens when sending to an unbuffered Go channel with no active receiving goroutine?",
        "options": [
          "The sending goroutine blocks indefinitely until a receiver is ready",
          "The message is silently dropped",
          "Go panics with ErrChannelFull",
          "The channel converts to buffered automatically"
        ],
        "correct": 0
      },
      {
        "q": "Why should sync.Pool never be used for long-term state persistence?",
        "options": [
          "Items in sync.Pool may be cleared automatically without notice on every GC cycle",
          "sync.Pool consumes 100% CPU",
          "sync.Pool only stores string types",
          "sync.Pool is deprecated in Go 1.21"
        ],
        "correct": 0
      },
      {
        "q": "How does Go's tri-color concurrent mark-and-sweep garbage collector prevent allocating during GC from creating memory leaks?",
        "options": [
          "Write barriers intercept pointer updates in gray/black objects during marking",
          "By freezing the entire operating system kernel",
          "By forcing all memory to be allocated on GPU VRAM",
          "By running GC only on program exit"
        ],
        "correct": 0
      }
    ]
  },
  "rust-systems": {
    "title": "Rust Systems & Memory Safety Master Exam",
    "category": "Programming Languages",
    "questions": [
      {
        "q": "What fundamental rule of the Rust Borrow Checker prevents data races at compile time?",
        "options": [
          "You may have any number of immutable references (&T), OR exactly one mutable reference (&mut T), but never both simultaneously",
          "Variables cannot be passed into functions",
          "All structs must be allocated with Box::new()",
          "Pointers are completely forbidden in the language"
        ],
        "correct": 0
      },
      {
        "q": "In Rust, what is the difference between Rc<T> and Arc<T>?",
        "options": [
          "Arc uses atomic CPU operations for thread-safe reference counting; Rc is non-atomic and single-threaded only",
          "Rc is for arrays; Arc is for strings",
          "Arc is garbage-collected by the OS",
          "Rc cannot be cloned"
        ],
        "correct": 0
      },
      {
        "q": "What does `RefCell<T>` provide in Rust?",
        "options": [
          "Interior mutability by enforcing borrow rules at runtime instead of compile time (panics on violation)",
          "Zero-copy network serialization",
          "Automatic encryption of memory",
          "Converts Rust code to WebAssembly"
        ],
        "correct": 0
      },
      {
        "q": "How does Tokio async/await execute asynchronous tasks in Rust?",
        "options": [
          "The compiler transforms async functions into cooperative state machines driven by an epoll/kqueue reactor-executor",
          "Tokio spawns one OS thread per await keyword",
          "Tokio disables the Rust borrow checker",
          "Tokio runs an embedded Node.js V8 runtime"
        ],
        "correct": 0
      },
      {
        "q": "What tool in the Rust ecosystem detects undefined behavior, out-of-bounds pointer reads, and memory leaks in unsafe code?",
        "options": [
          "Miri (Rust intermediate representation interpreter)",
          "Cargo Clippy (linters only)",
          "Rustfmt",
          "GDB without debug symbols"
        ],
        "correct": 0
      }
    ]
  },
  "typescript-advanced": {
    "title": "Advanced TypeScript Type System & Metaprogramming Exam",
    "category": "Programming Languages",
    "questions": [
      {
        "q": "In TypeScript, what does the `infer` keyword do inside a conditional type?",
        "options": [
          "Introduces a type variable to be deduced within the true branch of a conditional type",
          "Forces TypeScript to disable strict mode",
          "Converts types into JavaScript runtime objects",
          "Auto-generates SQL queries from interfaces"
        ],
        "correct": 0
      },
      {
        "q": "What is a 'Branded Type' (Nominal Typing) in TypeScript?",
        "options": [
          "Intersecting a primitive type with a unique symbol/tag to prevent accidental structural interchangeability (e.g. UserId vs OrderId)",
          "A type registered on npm",
          "A type exported from React",
          "A class with a private constructor only"
        ],
        "correct": 0
      },
      {
        "q": "How does the `never` type behave in a distributive conditional type union?",
        "options": [
          "It acts as the empty union and is pruned/eliminated from the distribution",
          "It converts the entire union to any",
          "It throws a compiler error",
          "It forces all union members to undefined"
        ],
        "correct": 0
      },
      {
        "q": "What does the `satisfies` operator introduced in TypeScript 4.9 achieve that type annotations do not?",
        "options": [
          "Validates that an expression matches a type while preserving the expression's most specific literal type",
          "Runs unit tests at compile time",
          "Enables multithreading in Node.js",
          "Removes all null values at runtime"
        ],
        "correct": 0
      },
      {
        "q": "What is the result of `type Flatten<T> = T extends (infer U)[] ? U : T; Flatten<string[]>`?",
        "options": [
          "string",
          "string[]",
          "any",
          "never"
        ],
        "correct": 0
      }
    ]
  },
  "linux-kernel-posix": {
    "title": "Linux Kernel Internals, POSIX & Syscalls Exam",
    "category": "Systems & OS",
    "questions": [
      {
        "q": "In Linux VFS (Virtual File System), what is an Inode?",
        "options": [
          "A metadata data structure storing file size, permissions, owner, and physical disk block pointers, but NOT file name",
          "The directory path string",
          "The network socket buffer",
          "The CPU instruction register"
        ],
        "correct": 0
      },
      {
        "q": "What is Copy-on-Write (CoW) during a Linux `fork()` syscall?",
        "options": [
          "Child and parent share the same physical memory pages marked read-only; duplicate pages are allocated only when written to",
          "The kernel writes child memory directly to disk swap space",
          "The child process copies the entire RAM immediately",
          "Files opened by parent are deleted"
        ],
        "correct": 0
      },
      {
        "q": "Which signal CANNOT be caught, blocked, or ignored by a user-space process?",
        "options": [
          "SIGKILL (9) and SIGSTOP (19)",
          "SIGTERM (15)",
          "SIGINT (2)",
          "SIGSEGV (11)"
        ],
        "correct": 0
      },
      {
        "q": "What does `O_DIRECT` flag do when opening a file in Linux?",
        "options": [
          "Bypasses the OS page cache, transferring data directly between user buffer and block device",
          "Deletes the file upon closing",
          "Encrypts the file with AES-256",
          "Compresses the file in real-time"
        ],
        "correct": 0
      },
      {
        "q": "What happens when a child process terminates before its parent calls `wait()` or `waitpid()`?",
        "options": [
          "The child becomes a Zombie process retaining an entry in the process table to hold its exit status",
          "The parent process is immediately killed by the kernel",
          "The child process memory is leaked permanently",
          "The child is automatically adopted by PID 0"
        ],
        "correct": 0
      }
    ]
  },
  "networking-internals": {
    "title": "Computer Networking & Transport Protocols Exam",
    "category": "Systems & OS",
    "questions": [
      {
        "q": "In the TCP 3-way handshake, what packet flags are exchanged in sequence?",
        "options": [
          "SYN -> SYN-ACK -> ACK",
          "ACK -> SYN -> FIN",
          "SYN -> ACK -> RST",
          "PING -> PONG -> ACK"
        ],
        "correct": 0
      },
      {
        "q": "Why does TCP BBR congestion control outperform loss-based algorithms like Cubic on lossy Wi-Fi/cellular links?",
        "options": [
          "BBR models the bottleneck bandwidth and RTT directly rather than treating random packet loss as congestion",
          "BBR converts TCP into UDP",
          "BBR skips the TCP handshake",
          "BBR requires specialized router hardware"
        ],
        "correct": 0
      },
      {
        "q": "How does BGP Anycast allow DNS providers (like 8.8.8.8 and 1.1.1.1) to serve queries globally from the closest datacenter?",
        "options": [
          "Multiple distinct edge servers across the globe advertise the exact same IP address via BGP, routing clients to the nearest topological node",
          "By sending every DNS query to a satellite orbiting the Earth",
          "By running a centralized database in California",
          "By assigning unique IPs to every client"
        ],
        "correct": 0
      },
      {
        "q": "What causes Path MTU Black Hole issues in IPv4/IPv6 networks?",
        "options": [
          "Firewalls blocking ICMP 'Fragmentation Needed' (Type 3, Code 4) packets, preventing clients from discovering smaller MTU limits",
          "Corrupted fiber cables",
          "Outdated browser software",
          "Overheating DNS root servers"
        ],
        "correct": 0
      },
      {
        "q": "What is the key advantage of QUIC (HTTP/3) 0-RTT connection resumption?",
        "options": [
          "Clients with cached credentials can send application data in the very first flight without waiting for a round-trip handshake",
          "It eliminates the need for encryption",
          "It works without an IP address",
          "It doubles download bandwidth automatically"
        ],
        "correct": 0
      }
    ]
  },
  "microservices-patterns": {
    "title": "Microservices Architecture & Resilience Patterns Exam",
    "category": "Systems & OS",
    "questions": [
      {
        "q": "In distributed microservices, how does the Transactional Outbox pattern solve the dual-write problem?",
        "options": [
          "State changes and outbound events are written to the same local database in a single atomic transaction; a CDC process streams outbox rows to the broker",
          "By using two-phase commit across all microservices",
          "By writing directly to Redis without a database",
          "By disabling microservice message retries"
        ],
        "correct": 0
      },
      {
        "q": "What is the core principle of Command Query Responsibility Segregation (CQRS)?",
        "options": [
          "Separating the write model (commands that mutate state) from read models (optimized denormalized query views)",
          "Writing all database tables in uppercase letters",
          "Splitting databases by user age",
          "Using two separate internet providers"
        ],
        "correct": 0
      },
      {
        "q": "What is a major trade-off when using Event Sourcing instead of traditional state persistence?",
        "options": [
          "High auditability and time-travel debugging at the cost of eventual consistency and complex schema evolution across event versions",
          "Event sourcing uses zero disk space",
          "Event sourcing eliminates the need for unit testing",
          "Event sourcing works only with MySQL"
        ],
        "correct": 0
      },
      {
        "q": "How does the Bulkhead pattern increase microservice resilience?",
        "options": [
          "Isolates thread pools and resource quotas so that failure in one downstream service cannot exhaust threads for other critical services",
          "Backs up all databases to tape storage",
          "Encrypts network packets between pods",
          "Requires all services to run on a single host"
        ],
        "correct": 0
      },
      {
        "q": "In distributed tracing, what are TraceId and SpanId in the W3C Trace Context standard?",
        "options": [
          "TraceId identifies the entire end-to-end user request across services; SpanId identifies a specific timed unit of work within a service",
          "TraceId is the user ID; SpanId is the database password",
          "They are randomly generated UUIDs with no relationship",
          "TraceId is for HTTP; SpanId is for gRPC only"
        ],
        "correct": 0
      }
    ]
  },
  "appsec-engineering": {
    "title": "Application Security & OWASP Top 10 Engineering Exam",
    "category": "Security & Networking",
    "questions": [
      {
        "q": "How does Server-Side Request Forgery (SSRF) allow an attacker to breach cloud infrastructure?",
        "options": [
          "By tricking the server into making unintended requests to internal endpoints (e.g. AWS IMDS at 169.254.169.254 to steal IAM role credentials)",
          "By stealing browser cookies via JavaScript",
          "By guessing the database root password",
          "By overloading the web server with UDP packets"
        ],
        "correct": 0
      },
      {
        "q": "Why does the OAuth 2.0 Authorization Code Flow with PKCE (Proof Key for Code Exchange) prevent authorization code interception?",
        "options": [
          "The client generates a random code_verifier and sends code_challenge = SHA256(verifier); the token endpoint verifies the secret during code exchange",
          "PKCE requires biometric fingerprints",
          "PKCE encrypts the entire internet connection",
          "PKCE replaces access tokens with passwords"
        ],
        "correct": 0
      },
      {
        "q": "What critical security risk occurs when a JWT verification library accepts `alg: 'none'` in the token header?",
        "options": [
          "An attacker can craft arbitrary unsigned JWT tokens and bypass authentication entirely",
          "The token expiration date is doubled",
          "The token is converted to base64",
          "The server returns HTTP 500 automatically"
        ],
        "correct": 0
      },
      {
        "q": "What is the primary mechanism to protect web applications against Cross-Site Request Forgery (CSRF)?",
        "options": [
          "Using SameSite=Strict cookies and unpredictable anti-CSRF synchronizer tokens validated on state-changing requests",
          "Validating input lengths",
          "Using SSL certificates on the domain",
          "Disabling CORS in the backend"
        ],
        "correct": 0
      },
      {
        "q": "How do Parameterized Queries (Prepared Statements) prevent SQL Injection attacks?",
        "options": [
          "SQL code and user data are sent in separate protocol phases; user input is treated strictly as literal data, never executed as SQL grammar",
          "By stripping all spaces from input",
          "By converting SQL into Python",
          "By running queries in an isolated Docker container"
        ],
        "correct": 0
      }
    ]
  },
  "cryptography-pki": {
    "title": "Applied Cryptography, PKI & Zero Trust Exam",
    "category": "Security & Networking",
    "questions": [
      {
        "q": "Why is AES-256-GCM classified as Authenticated Encryption with Associated Data (AEAD)?",
        "options": [
          "It simultaneously encrypts data for confidentiality and computes an authentication tag (GMAC) to guarantee integrity and detect tampering",
          "It uses two separate 512-bit keys",
          "It requires an internet connection to decrypt",
          "It is mathematically unbreakable even with quantum computers"
        ],
        "correct": 0
      },
      {
        "q": "What is the catastrophic danger of reusing an Initialisation Vector (IV / Nonce) with the same AES-GCM key?",
        "options": [
          "Nonce reuse destroys the authenticity tag, allows forgery of messages, and reveals plaintext XOR relationships",
          "The CPU overheats",
          "The encryption key is printed to system logs",
          "The file size doubles"
        ],
        "correct": 0
      },
      {
        "q": "Why is Argon2id recommended over legacy MD5 or SHA-256 for password hashing?",
        "options": [
          "Argon2id is memory-hard and time-hard, resisting brute-force attacks from ASICs and GPU clusters, and protects against side-channel timing attacks",
          "Argon2id produces 10-character passwords",
          "Argon2id is built into the Linux kernel",
          "Argon2id is reversible by administrators"
        ],
        "correct": 0
      },
      {
        "q": "In the TLS 1.3 handshake, how is Perfect Forward Secrecy (PFS) achieved?",
        "options": [
          "Session keys are negotiated via Ephemeral Diffie-Hellman (ECDHE); compromise of the server private key does not compromise past recorded sessions",
          "All past traffic is stored on secure blockchain ledgers",
          "By rotating IP addresses on every packet",
          "By requiring client certificates for every user"
        ],
        "correct": 0
      },
      {
        "q": "In Public Key Infrastructure (PKI), what is an OCSP Stapling optimization?",
        "options": [
          "The web server caches a cryptographically signed certificate revocation status from the CA and delivers it directly to clients in the TLS handshake",
          "The CA emails revocation notices to users",
          "Certificates never expire",
          "The client downloads the entire CRL database on every request"
        ],
        "correct": 0
      }
    ]
  },
  "redis-in-depth": {
    "title": "Redis Data Structures, Memory & Sentinel Internals Exam",
    "category": "AI & Data",
    "questions": [
      {
        "q": "Which probabilistic data structure in Redis is used to count unique elements with constant 12KB memory overhead regardless of dataset size?",
        "options": [
          "HyperLogLog (PFADD / PFCOUNT)",
          "Sorted Set (ZSET)",
          "GeoHash",
          "Bloom Filter"
        ],
        "correct": 0
      },
      {
        "q": "What underlying data structures compose a Redis Sorted Set (ZSET)?",
        "options": [
          "A SkipList for logarithmic range queries paired with a Hash Table for O(1) score lookups by member",
          "A B+ Tree and a Red-Black Tree",
          "A doubly linked list only",
          "A contiguous binary array"
        ],
        "correct": 0
      },
      {
        "q": "Why are Lua scripts executed inside Redis guaranteed to be atomic?",
        "options": [
          "Redis executes scripts on its single-threaded event loop without interleaving any other commands until the script completes",
          "Redis takes a full disk snapshot before running Lua",
          "Lua scripts compile to machine code on the GPU",
          "Redis locks the operating system kernel"
        ],
        "correct": 0
      },
      {
        "q": "What is the primary difference between Redis RDB snapshots and AOF (Append-Only File) persistence?",
        "options": [
          "RDB is a compact point-in-time binary snapshot; AOF logs every write command sequentially, offering higher durability",
          "RDB is in-memory only; AOF writes to tape storage",
          "AOF cannot be restored after a crash",
          "RDB is only available in Redis Enterprise"
        ],
        "correct": 0
      },
      {
        "q": "How does Redis Sentinel achieve automated master failover?",
        "options": [
          "A quorum of Sentinel instances detects master failure via SDOWN/ODOWN heartbeat consensus and promotes a replica with minimum replication lag",
          "By rebooting the physical server hardware",
          "By assigning a new IP address to the master server",
          "By deleting all data in the cluster"
        ],
        "correct": 0
      }
    ]
  },
  "nosql-distributed-db": {
    "title": "NoSQL & Distributed Key-Value Databases Exam",
    "category": "AI & Data",
    "questions": [
      {
        "q": "In Amazon's Dynamo architecture, what configuration guarantees Strong Consistency across N replicas?",
        "options": [
          "R + W > N (Read quorum + Write quorum > Total replicas, ensuring read and write sets always overlap by at least one replica)",
          "R + W < N",
          "W = 1 and R = 1 regardless of N",
          "N must always be an even number"
        ],
        "correct": 0
      },
      {
        "q": "What mechanism do Dynamo-style distributed databases use to detect concurrent conflicting updates without centralized clocks?",
        "options": [
          "Vector Clocks (causality tracking counters per node)",
          "GPS atomic satellite clocks",
          "System timestamp milliseconds",
          "Random number generators"
        ],
        "correct": 0
      },
      {
        "q": "In Apache Cassandra, what is a Read Repair operation?",
        "options": [
          "When a background or client read discovers replica divergence, it reconciles versions using timestamps and updates stale replicas asynchronously",
          "Rebuilding corrupted disk sectors",
          "Re-indexing SQL queries",
          "Restarting node JVMs"
        ],
        "correct": 0
      },
      {
        "q": "What is the purpose of Hinted Handoff in distributed NoSQL clusters?",
        "options": [
          "When a replica node is temporarily unreachable, another node stores the mutation locally as a hint and delivers it once the target node recovers",
          "To suggest SQL indexes to developers",
          "To auto-correct syntax errors in client queries",
          "To terminate slow queries"
        ],
        "correct": 0
      },
      {
        "q": "How does wide-column storage (Cassandra/ScyllaDB) physically store partitions on disk?",
        "options": [
          "SSTables (Sorted String Tables) where data is sorted by Clustering Key within each Partition Key hash range",
          "Single flat CSV files",
          "Relational B-Tree page slots",
          "Unordered JSON files"
        ],
        "correct": 0
      }
    ]
  },
  "vector-search-ai": {
    "title": "Vector Databases & Dense Semantic Search Exam",
    "category": "AI & Data",
    "questions": [
      {
        "q": "Why is exact k-Nearest Neighbors (k-NN) impractical for search across 10 million 1536-dimensional embeddings?",
        "options": [
          "Brute-force requires calculating 10,000,000 vector distances in O(N * D) operations for every single query, taking seconds per request",
          "Vectors cannot be stored in RAM",
          "GPU floats can only represent 3 dimensions",
          "Cosine similarity requires quantum computing"
        ],
        "correct": 0
      },
      {
        "q": "What is Product Quantization (PQ) in vector search engines?",
        "options": [
          "Compressing high-dimensional vectors by breaking them into sub-vectors and mapping each to the nearest cluster centroid (codebook), drastically reducing memory",
          "Multiplying vectors by a product discount factor",
          "Sorting vectors alphabetically",
          "Converting vectors to PNG images"
        ],
        "correct": 0
      },
      {
        "q": "In HNSW graphs, what parameter controls the trade-off between search recall accuracy and query latency at runtime?",
        "options": [
          "efSearch (the size of the dynamic candidate priority queue during Layer 0 beam search)",
          "M (number of layers)",
          "learning_rate",
          "batch_size"
        ],
        "correct": 0
      },
      {
        "q": "When comparing normalized unit embeddings (magnitude = 1), how does Cosine Similarity relate to Dot Product?",
        "options": [
          "Cosine similarity is mathematically identical to Dot Product (A · B / (||A|| * ||B||) = A · B)",
          "Cosine similarity is the square root of dot product",
          "They have opposite signs",
          "There is no mathematical relationship"
        ],
        "correct": 0
      },
      {
        "q": "How does Reciprocal Rank Fusion (RRF) merge ranking lists from BM25 sparse keyword search and dense vector search?",
        "options": [
          "Computes RRF Score(d) = Σ 1 / (k + rank_i(d)), avoiding arbitrary score normalization issues between disparate ranking algorithms",
          "Multiplies the two scores together",
          "Takes the minimum score of both lists",
          "Alternates items one by one"
        ],
        "correct": 0
      }
    ]
  },
  "mlops-engineering": {
    "title": "Production MLOps, Model Serving & Drift Monitoring Exam",
    "category": "AI & Data",
    "questions": [
      {
        "q": "What is the primary function of a Feature Store (such as Feast) in an enterprise ML platform?",
        "options": [
          "Provides a unified, consistent feature definition interface serving low-latency online inference (Redis) and point-in-time correct offline training (Data Lake)",
          "Stores model weights as binary files",
          "Automates GPU fan speeds",
          "Encrypts training code"
        ],
        "correct": 0
      },
      {
        "q": "What is the difference between Data Drift and Concept Drift in production ML?",
        "options": [
          "Data Drift is a shift in the distribution of input features P(X); Concept Drift is a change in the relationship between inputs and targets P(Y|X)",
          "Data Drift is for images; Concept Drift is for text",
          "Data drift means database corruption; concept drift means model deletion",
          "They are identical concepts"
        ],
        "correct": 0
      },
      {
        "q": "What statistical metric is standardly used in production MLOps to quantify feature drift between training and inference baseline?",
        "options": [
          "Population Stability Index (PSI) or Kolmogorov-Smirnov (KS) test",
          "R-Squared",
          "Mean Squared Error",
          "F1 Score"
        ],
        "correct": 0
      },
      {
        "q": "How does ONNX (Open Neural Network Exchange) format benefit ML production deployment?",
        "options": [
          "Decouples models from specific training frameworks (PyTorch/TensorFlow), allowing hardware-accelerated execution via ONNX Runtime and TensorRT",
          "Increases model accuracy automatically by 10%",
          "Converts models into HTML web pages",
          "Eliminates the need for GPUs"
        ],
        "correct": 0
      },
      {
        "q": "What is Dynamic Batching in model inference servers (like Triton or TorchServe)?",
        "options": [
          "Server-side queuing that groups individual asynchronous client requests into a single tensor batch within a small microsecond window to maximize GPU utilization",
          "Splitting training data into chunks",
          "Dropping requests during peak hours",
          "Running inference on multiple CPUs"
        ],
        "correct": 0
      }
    ]
  },
  "distributed-caching": {
    "title": "Distributed Caching, Eviction & Stampede Mitigation Exam",
    "category": "AI & Data",
    "questions": [
      {
        "q": "What is Cache Stampede (Thundering Herd) and how does probabilistic early expiration (XFetch) prevent it?",
        "options": [
          "When a hot cache key expires, thousands of concurrent requests simultaneously hit the database; XFetch probabilistically triggers background recomputation before expiration",
          "When cache memory runs out and crashes the server",
          "When network switches drop packets due to bufferbloat",
          "When user sessions are invalidated by a hacker"
        ],
        "correct": 0
      },
      {
        "q": "How does an O(1) in-memory LRU (Least Recently Used) cache achieve constant-time lookup and eviction?",
        "options": [
          "By pairing a Hash Map (for O(1) key-to-node lookup) with a Doubly Linked List (for O(1) node splicing and tail eviction)",
          "By sorting an array on every get() call",
          "By using a Binary Min-Heap",
          "By scanning the entire array sequentially"
        ],
        "correct": 0
      },
      {
        "q": "What advantage does LFU (Least Frequently Used) have over LRU for workloads with periodic batch scans?",
        "options": [
          "LRU flushes frequently accessed items out of cache during a sequential scan of cold items; LFU preserves items with high cumulative access counts",
          "LFU uses zero memory",
          "LFU requires no hash functions",
          "LFU works only with integer keys"
        ],
        "correct": 0
      },
      {
        "q": "What is Cache Penetration and how is it mitigated?",
        "options": [
          "Queries request keys that exist neither in cache nor in the database, continuously hammering the database; mitigated via Bloom Filters or caching null results with short TTL",
          "Hardware overheating in memory chips",
          "Network packet interception on the wire",
          "SQL injection via cached cookies"
        ],
        "correct": 0
      },
      {
        "q": "How does the Adaptive Replacement Cache (ARC) algorithm balance recency and frequency?",
        "options": [
          "Dynamically tunes cache partition size between recent pages and frequent pages based on hits on ghost cache eviction history lists",
          "Randomly flips coins on every cache access",
          "Uses neural networks to predict cache misses",
          "Evicts all items every 10 minutes"
        ],
        "correct": 0
      }
    ]
  },
  "react-internals": {
    "title": "React Fiber Architecture & Modern Performance Exam",
    "category": "AI & Data",
    "questions": [
      {
        "q": "What problem in React's legacy Stack Reconciler did the Fiber Architecture solve?",
        "options": [
          "The Stack Reconciler was synchronous and recursive; Fiber broke reconciliation into interruptible units of work to prevent dropping animation frames",
          "Fiber allowed React to run on Windows 95",
          "The Stack reconciler could not render images",
          "Fiber replaced JavaScript with WebAssembly"
        ],
        "correct": 0
      },
      {
        "q": "In React Fiber, what are the two main phases of component updates?",
        "options": [
          "Render Phase (asynchronous, interruptible diffing that produces the effect list) and Commit Phase (synchronous DOM mutations)",
          "Compilation phase and Execution phase",
          "Network phase and Storage phase",
          "Parsing phase and Evaluation phase"
        ],
        "correct": 0
      },
      {
        "q": "Why should you never mutate state objects directly in React (e.g. state.user.name = 'Bob')?",
        "options": [
          "React uses shallow reference equality checks (Object.is) to detect state changes; mutating in-place prevents re-renders and breaks memoization",
          "Direct mutation causes a JavaScript SyntaxError",
          "Direct mutation crashes the browser tab",
          "React encrypts state in memory"
        ],
        "correct": 0
      },
      {
        "q": "What does the `useDeferredValue` hook do in React 18?",
        "options": [
          "Defers updating a non-urgent part of the UI (like a large filtered search list) until urgent updates (like typing in an input) have rendered",
          "Delays HTTP fetch requests by 5 seconds",
          "Caches values in localStorage",
          "Runs code in a Web Worker"
        ],
        "correct": 0
      },
      {
        "q": "What causes a React Server-Side Rendering (SSR) Hydration Mismatch error?",
        "options": [
          "The HTML generated on the server differs from the initial virtual DOM tree rendered in the client browser (e.g. using window or Date.now() during render)",
          "The server runs Node.js while the client runs Chrome",
          "CSS stylesheets are missing",
          "The database is down"
        ],
        "correct": 0
      }
    ]
  },
  "docker-container-security": {
    "title": "Container Security & Runtime Hardening Exam",
    "category": "Cloud & DevOps",
    "questions": [
      {
        "q": "Why is running container processes as non-root (e.g. USER 1001) a critical security best practice?",
        "options": [
          "If a container escape vulnerability is exploited, the attacker lands on the host system as an unprivileged user rather than root",
          "Root containers consume twice as much RAM",
          "Root containers cannot communicate over TCP",
          "Docker automatically terminates root containers after 1 hour"
        ],
        "correct": 0
      },
      {
        "q": "What Linux security module restricts the system calls (syscalls) a container can execute?",
        "options": [
          "Seccomp (Secure Computing Mode) filtering syscalls with BPF rules",
          "Cgroups",
          "IPTables",
          "Cron"
        ],
        "correct": 0
      },
      {
        "q": "What does dropping `ALL` Linux capabilities (`--cap-drop=ALL`) and adding only `--cap-add=NET_BIND_SERVICE` achieve?",
        "options": [
          "Strips all root capabilities (raw sockets, module loading, ptrace) except permission to bind to ports < 1024, minimizing attack surface",
          "Forces containers to run offline",
          "Prevents Docker images from being downloaded",
          "Encrypts container file systems"
        ],
        "correct": 0
      },
      {
        "q": "What is a major security risk of mounting `/var/run/docker.sock` inside a container?",
        "options": [
          "Grants full administrative control over the host Docker daemon, allowing trivial root compromise of the entire host machine",
          "Slows down internet download speeds",
          "Deletes all host log files",
          "Invalidates SSL certificates"
        ],
        "correct": 0
      },
      {
        "q": "What is the purpose of read-only root filesystems (`--read-only`) in container hardening?",
        "options": [
          "Prevents attackers from writing malicious binaries, scripts, or rootkits to disk during a remote code execution exploit",
          "Makes container startup instantaneous",
          "Reduces Docker image pull times",
          "Compresses container memory"
        ],
        "correct": 0
      }
    ]
  },
  "kafka-event-streaming": {
    "title": "Apache Kafka & Event-Driven Architecture Exam",
    "category": "Cloud & DevOps",
    "questions": [
      {
        "q": "In Apache Kafka, what guarantees strict in-order message processing for a given entity (e.g. Order ID)?",
        "options": [
          "Producing all messages for that entity with the same Partition Key, ensuring they land in the same partition",
          "Increasing the consumer group size to 100",
          "Setting replication factor to 1",
          "Using round-robin partitioning"
        ],
        "correct": 0
      },
      {
        "q": "What does `acks=all` (or `acks=-1`) mean for a Kafka Producer?",
        "options": [
          "The leader waits for the full set of in-sync replicas (ISR) to acknowledge the write before responding success, guaranteeing maximum durability",
          "The message is acknowledged as soon as it enters network buffers",
          "Only the partition leader writes the message",
          "All consumers have processed the message"
        ],
        "correct": 0
      },
      {
        "q": "What occurs during a Kafka Consumer Group Rebalance?",
        "options": [
          "Partitions are dynamically reassigned among group members when a consumer joins, leaves, or crashes, briefly pausing consumption",
          "Kafka deletes all partitions in the topic",
          "Brokers reboot their JVMs",
          "Consumer offset numbers reset to zero"
        ],
        "correct": 0
      },
      {
        "q": "How does Kafka Log Compaction work?",
        "options": [
          "Retains the latest record for each key within a partition, discarding older versions of the same key during background segment cleanup",
          "Compresses all messages with gzip",
          "Deletes messages older than 7 days unconditionally",
          "Truncates message payload strings to 100 characters"
        ],
        "correct": 0
      },
      {
        "q": "How does Kafka achieve Exactly-Once Semantics (EOS) across Read-Process-Write streams?",
        "options": [
          "By combining idempotent producers (sequence numbers per PID) with transactional two-phase commit across topic partitions and consumer offsets",
          "By using UDP packet verification",
          "By requiring all consumers to be single-threaded",
          "By dropping duplicate messages in memory"
        ],
        "correct": 0
      }
    ]
  }
};
