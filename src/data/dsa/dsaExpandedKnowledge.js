// DOAP Advanced DSA & Distributed Systems Knowledge Base Expansion
export const EXPANDED_KNOWLEDGE_BASE = [
  {
    "id": "kb-cache-eviction-internals",
    "title": "Cache Eviction Policies & Distributed Caching Internals (LRU, LFU, ARC)",
    "category": "Systems & Architecture",
    "subcategory": "Caching",
    "domain": "Systems & Distributed Computing",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. LRU (Least Recently Used): Discards least recently accessed items first. A production O(1) in-memory LRU combines a doubly linked list with a hash map. The hash map maps keys to linked list nodes. On get(key) or put(key, value), the referenced node is detached and spliced to the head. When capacity overflows, the node at the tail is evicted.\n\n2. LFU (Least Frequently Used) in O(1): Naive LFU with a min-heap costs O(log N) per update. The optimal O(1) algorithm maintains two linked structures: a frequency doubly linked list (each node represents a frequency count: 1, 2, 3...) holding a doubly linked list of items with that frequency, and a hash map pointing keys to their respective item nodes. When a key is accessed, its node moves from frequency list f to f+1. Eviction pops from the tail of minFrequency in O(1).\n\n3. ARC (Adaptive Replacement Cache): Dynamically tunes between LRU (recency) and LFU (frequency) based on workload recency vs frequency hits via two double-length lists (T1 for recent pages, T2 for frequent pages, plus ghost caches B1 and B2 tracking evicted metadata).\n\n4. Distributed Cache Mitigations: Cache Stampede (Thundering Herd) is mitigated with probabilistic early expiration (XFetch algorithm) or distributed mutex locks. Cache Penetration is solved via Bloom filters or caching null values with a short TTL."
  },
  {
    "id": "kb-lsm-trees-vs-b-trees",
    "title": "LSM-Tree (Log-Structured Merge-Tree) vs B+ Tree Storage Engine Architecture",
    "category": "Data Structures",
    "subcategory": "Storage Engines",
    "domain": "Database Internals",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Fundamental Design Difference: B+ Trees are optimized for read-heavy workloads with random in-place updates. LSM-Trees are optimized for high-throughput write-heavy workloads by transforming random writes into sequential disk I/O.\n\n2. LSM-Tree Anatomy: MemTable (in-memory Concurrent SkipList or Red-Black Tree) accepts all incoming writes and deletes (as tombstones). Write-Ahead Log (WAL) appends sequentially on disk for crash durability. Immutable MemTable flushes to Level 0 (L0) SSTables on disk. SSTables (Sorted String Tables) are immutable disk files containing sorted key-value pairs with block indexes and Bloom filters.\n\n3. Compaction Mechanics: Size-Tiered Compaction merges SSTables of similar sizes into larger ones (great write speed, higher space amplification). Leveled Compaction divides disk storage into levels (L0, L1, L2...) where L1+ SSTables have non-overlapping key ranges, minimizing read amplification."
  },
  {
    "id": "kb-consistent-hashing-ring",
    "title": "Consistent Hashing Ring & Virtual Node Partitioning",
    "category": "Distributed Systems",
    "subcategory": "System Design",
    "domain": "Distributed Architecture",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Problem with Modulo Hashing: Traditional hash(key) % N invalidates almost 100 percent of cached keys when N changes, causing catastrophic cache misses.\n\n2. Consistent Hashing Ring: Maps both servers and data keys onto a circular hash ring of size 2^32 - 1 using a uniform hash function (like MurmurHash3). Servers are placed onto points on the ring. A key is stored on the first server encountered clockwise. When a node is removed or added, only K/N keys are migrated across the cluster.\n\n3. Virtual Nodes (Vnodes): Physical servers are assigned multiple virtual nodes (e.g. 256 vnodes per physical node). Vnodes guarantee uniform statistical distribution of data keys, proportional load distribution matching hardware capacity, and disperse rebalancing load evenly across surviving nodes."
  },
  {
    "id": "kb-distributed-locking-fencing",
    "title": "Distributed Locks, Redlock Algorithm & Monotonic Fencing Tokens",
    "category": "Distributed Systems",
    "subcategory": "Concurrency",
    "domain": "Distributed Architecture",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Single-Instance Redis Lock: SET resource_name my_random_token NX PX 30000. Release safely using an atomic Lua script verifying token ownership before deleting.\n\n2. Redlock Algorithm: Acquires locks across N independent Redis nodes (typically 5). Requires acquiring majority (N/2 + 1) instances within total validity time.\n\n3. Martin Kleppmann Critique & Fencing Tokens: In asynchronous networks, stop-the-world GC pauses or network stalls can cause a client lease to expire without the client knowing. When it wakes up, it issues writes believing it still holds the lock. Solution: The lock service issues a strictly monotonically increasing Fencing Token with every lock acquisition. The storage tier rejects any request bearing a token lower than the highest token observed so far."
  },
  {
    "id": "kb-raft-consensus-protocol",
    "title": "Raft Distributed Consensus Protocol: Leader Election & Log Replication",
    "category": "Distributed Systems",
    "subcategory": "Consensus",
    "domain": "Distributed Architecture",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Leader Election: Nodes start as Followers. If no heartbeat is received within a randomized Election Timeout (150ms-300ms), follower becomes Candidate, increments term, and votes for itself. Upon majority votes, it becomes Leader and broadcasts heartbeats. Randomized timeouts prevent split votes.\n\n2. Log Replication: Leader appends client command to its log and sends AppendEntries RPC to followers. Once majority followers acknowledge appending, the entry is Committed and applied to state machine.\n\n3. Safety Invariants: Election Restriction ensures voters reject any candidate whose log is less up-to-date than their own. Leader Append-Only guarantees a leader never overwrites or truncates its own log entries."
  },
  {
    "id": "kb-probabilistic-data-structures",
    "title": "Probabilistic Data Structures: Bloom Filters, Count-Min Sketch & HyperLogLog",
    "category": "Data Structures",
    "subcategory": "Advanced",
    "domain": "Algorithms & Big Data",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Bloom Filter: Space-efficient set membership test. False positives are possible; false negatives are IMPOSSIBLE. An m-bit array with k independent hash functions. When adding x, set bits h_1(x)...h_k(x) to 1. When querying y, if any bit is 0, y is definitely absent. Optimal k = (m / n) * ln(2).\n\n2. Count-Min Sketch: 2D array of counters (d rows, w columns) with d independent hash functions. For each item, increment C[row][hash_i(item)]. Query returns min(C[row][hash_i(item)]), providing an upper bound on item frequency in massive streams.\n\n3. HyperLogLog: Estimates distinct cardinality of billions of unique elements using ~1.5 KB of memory by observing the maximum number of leading zeroes in hashed values and computing their harmonic mean across m registers with standard error ~1.04/sqrt(m)."
  },
  {
    "id": "kb-monotonic-stack-patterns",
    "title": "Monotonic Stack & Deque Algorithmic Patterns",
    "category": "Data Structures",
    "subcategory": "Stacks & Queues",
    "domain": "Algorithms & Problem Solving",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Monotonic Stack: Maintains elements in strictly increasing or decreasing order. Used for Next Greater Element, Next Smaller Element, and Largest Rectangle in Histogram in strictly O(N) time.\n\n2. Sliding Window Maximum via Monotonic Deque: Maintain a double-ended queue of indices in strictly decreasing order of element values. For each incoming index i: remove indices from front that fell out of window [i - k + 1, i]; pop from back while arr[deque.back()] <= arr[i]; push i; the front element is the window maximum in O(1) per step and O(N) overall."
  },
  {
    "id": "kb-disjoint-set-union-deep-dive",
    "title": "Disjoint Set Union (DSU) with Path Compression & Union by Rank",
    "category": "Data Structures",
    "subcategory": "Trees & Graphs",
    "domain": "Algorithms & Problem Solving",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. DSU Structure: Tracks disjoint partitioned sets with find(x) (find set representative) and union(x, y) (merge sets).\n\n2. Path Compression: Flattens the tree during find by setting parent[curr] = root for all nodes on search path.\n\n3. Union by Rank/Size: Attaches smaller tree beneath root of larger tree to prevent linear chains.\n\n4. Complexity: Combined, amortized cost per operation is O(alpha(N)) where alpha is inverse Ackermann function, essentially <= 4 for all practical inputs."
  },
  {
    "id": "kb-segment-tree-lazy-propagation",
    "title": "Segment Tree with Lazy Propagation for O(log N) Range Updates",
    "category": "Data Structures",
    "subcategory": "Range Queries",
    "domain": "Algorithms & Problem Solving",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Need for Lazy Propagation: Point updates take O(log N), but naive range updates on [L, R] update all leaves taking O(N log N). Lazy propagation defers updates to descendants until those nodes are actually accessed.\n\n2. Lazy Pushdown: Maintain a lazy[] array. Before descending into children during query or update, pushdown pending lazy tags to children and clear lazy[parent].\n\n3. Performance: Range Query: O(log N); Range Update: O(log N); Build: O(N); Auxiliary Space: 4*N."
  },
  {
    "id": "kb-aho-corasick-automaton",
    "title": "Aho-Corasick Multi-Pattern String Matching Automaton",
    "category": "Algorithms",
    "subcategory": "Strings",
    "domain": "Algorithms & Problem Solving",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Multi-Pattern Search: Matches k dictionary patterns in text of length M in linear O(M + Z) time where Z is number of matches.\n\n2. Construction: Combines a prefix Trie with KMP-style failure links via BFS. Each failure link points to the longest proper suffix that is a prefix in the Trie. Dictionary output links precompute matches to ancestral words.\n\n3. Applications: Antivirus signature scanning, network intrusion detection (Snort, Suricata), and bioinformatics DNA motif search."
  }
];

export const EXPANDED_QUIZZES = [
  {
    "id": "q-exp-001",
    "topic": "Systems & Caching",
    "difficulty": "Hard",
    "question": "In an optimal O(1) time complexity LFU (Least Frequently Used) cache, what data structure architecture must be maintained?",
    "options": [
      "A) A Min-Heap of frequency counters paired with a hash map",
      "B) A doubly linked list of frequency buckets, where each bucket contains a doubly linked list of nodes, paired with a node hash map",
      "C) A Skip List with randomized heights proportional to frequency counts",
      "D) A Red-Black Tree maintaining nodes keyed by timestamp and frequency"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "A Min-Heap yields O(log N) per access. To achieve strict O(1) get and put, LFU requires two nested doubly linked lists (frequency list holding node lists) alongside a hash map for instantaneous pointer access.",
    "skill": "architectural",
    "source": "expanded_expert_quizzes"
  },
  {
    "id": "q-exp-002",
    "topic": "Storage Engines",
    "difficulty": "Hard",
    "question": "Why do LSM-Tree storage engines like RocksDB and Cassandra offer significantly higher write throughput than traditional B+ Trees?",
    "options": [
      "A) They compress data in RAM before sending it over network sockets",
      "B) They eliminate ACID transaction requirements completely",
      "C) They turn random writes into sequential disk writes via an in-memory MemTable and append-only Write-Ahead Log (WAL)",
      "D) They do not store indexes on disk"
    ],
    "correct_answer": "C",
    "correctIndex": 2,
    "explanation": "B+ Trees perform random in-place page writes on disk. LSM-Trees append writes sequentially to a WAL and insert them into an in-memory MemTable, deferring and batching disk sorting via SSTable compactions.",
    "skill": "architectural",
    "source": "expanded_expert_quizzes"
  },
  {
    "id": "q-exp-003",
    "topic": "Distributed Systems",
    "difficulty": "Medium",
    "question": "In a consistent hashing ring with N physical nodes, what is the primary purpose of assigning multiple virtual nodes (vnodes) to each physical server?",
    "options": [
      "A) To encrypt keys before routing them to disk",
      "B) To ensure uniform distribution of keys and prevent load imbalance hotspots",
      "C) To enable multi-threaded execution within a single server core",
      "D) To reduce network round-trips when reading cached values"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Standard hashing on a ring can result in non-uniform cluster partitions. Assigning hundreds of virtual nodes per physical machine evenly distributes key ranges across the hash ring.",
    "skill": "system-design",
    "source": "expanded_expert_quizzes"
  },
  {
    "id": "q-exp-004",
    "topic": "Distributed Systems",
    "difficulty": "Hard",
    "question": "Why did Martin Kleppmann demonstrate that distributed locks (including naive Redlock) without fencing tokens cannot guarantee data safety in storage systems?",
    "options": [
      "A) Because SHA-256 tokens can experience cryptographic hash collisions",
      "B) Because client process pauses (such as GC pauses or network stalls) can cause lease expiration, allowing stale clients to write corrupt data after resumption",
      "C) Because Redis does not support replication across data centers",
      "D) Because clock drift always causes servers to restart unexpectedly"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "If a client holding a lock encounters an unexpected stop-the-world GC pause, its lock lease expires. Another client acquires the lock. When the first client resumes, it commits invalid writes unless the storage layer validates monotonically increasing fencing tokens.",
    "skill": "distributed-concurrency",
    "source": "expanded_expert_quizzes"
  },
  {
    "id": "q-exp-005",
    "topic": "Distributed Consensus",
    "difficulty": "Hard",
    "question": "In the Raft consensus protocol, how is split-vote livelock prevented when multiple followers timeout and seek leadership simultaneously?",
    "options": [
      "A) By delegating leadership to the node with the lowest MAC address",
      "B) By utilizing randomized election timeouts (e.g., 150ms to 300ms) for each follower",
      "C) By requiring all nodes to poll a central ZooKeeper coordinator",
      "D) By running Dijkstra algorithm across the cluster network topology"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Randomized election timeouts ensure one follower will timeout before the others, transition to candidate, and collect majority votes before any competing candidate starts an election in that term.",
    "skill": "consensus-protocols",
    "source": "expanded_expert_quizzes"
  },
  {
    "id": "q-exp-006",
    "topic": "Probabilistic Structures",
    "difficulty": "Medium",
    "question": "Which of the following statements regarding a Bloom Filter is strictly TRUE?",
    "options": [
      "A) It has zero false positives and zero false negatives",
      "B) It may return false positives, but it can never return a false negative",
      "C) It allows arbitrary deletion of elements in standard bit-array implementations",
      "D) Its space consumption grows linearly with the length of the string keys"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "A Bloom filter guarantees that if it reports an element is absent (0 bit found), it is 100% absent (no false negatives). If all k bits are 1, the element might be present or bits were set by collisions (false positive).",
    "skill": "data-structures",
    "source": "expanded_expert_quizzes"
  },
  {
    "id": "q-exp-007",
    "topic": "Probabilistic Structures",
    "difficulty": "Hard",
    "question": "How does HyperLogLog estimate the cardinality of a massive dataset with hundreds of millions of unique elements using only ~1.5 KB of memory?",
    "options": [
      "A) By compressing inverted indexes with LZ4 compression",
      "B) By tracking the maximum number of leading zeros in hashed representations and computing their harmonic mean across registers",
      "C) By maintaining a dynamic reservoir sample of prime numbers",
      "D) By storing binary search tree bounds of unique fingerprints"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "HyperLogLog hashes elements uniformly into binary strings and observes the maximum run of leading zeroes across m registers, using harmonic mean to discard outliers and produce an estimate with ~1.04/sqrt(m) standard error.",
    "skill": "algorithms",
    "source": "expanded_expert_quizzes"
  },
  {
    "id": "q-exp-008",
    "topic": "Monotonic Stack",
    "difficulty": "Medium",
    "question": "What is the optimal time complexity to compute the Sliding Window Maximum for an array of size N and window size K using a Monotonic Deque?",
    "options": [
      "A) O(N * K)",
      "B) O(N log K)",
      "C) O(N)",
      "D) O(K log N)"
    ],
    "correct_answer": "C",
    "correctIndex": 2,
    "explanation": "Using a doubly linked deque storing indices in decreasing order of element values, each element index is pushed once and popped at most once across the entire traversal, yielding strictly O(N) amortized time.",
    "skill": "problem-solving",
    "source": "expanded_expert_quizzes"
  },
  {
    "id": "q-exp-009",
    "topic": "Advanced Trees",
    "difficulty": "Hard",
    "question": "When both Path Compression and Union by Rank heuristics are employed in Disjoint Set Union (DSU), what is the amortized time complexity per operation?",
    "options": [
      "A) O(log N)",
      "B) O(alpha(N)), where alpha is the inverse Ackermann function",
      "C) O(sqrt(N))",
      "D) O(1) worst-case"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "The Tarjan-Van Leeuwen proof establishes that combining path compression with union by rank or size bounds the amortized cost to O(alpha(N)), effectively constant (<= 4) for all universe sizes.",
    "skill": "complexity-analysis",
    "source": "expanded_expert_quizzes"
  },
  {
    "id": "q-exp-010",
    "topic": "Advanced Trees",
    "difficulty": "Hard",
    "question": "In a Segment Tree with Lazy Propagation, why is the pushdown operation executed prior to querying or updating child intervals?",
    "options": [
      "A) To rebalance the tree using AVL rotations",
      "B) To propagate pending deferred modifications down to children before descending to prevent stale subtree data",
      "C) To sort the leaf nodes in descending order",
      "D) To rebuild the tree array in cache-aligned memory"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Lazy propagation holds updates at higher nodes without updating descendants. When a subsequent operation visits child nodes, pushdown ensures any accumulated pending changes are applied to children before reading or recursing.",
    "skill": "data-structures",
    "source": "expanded_expert_quizzes"
  },
  {
    "id": "q-exp-011",
    "topic": "String Algorithms",
    "difficulty": "Hard",
    "question": "What is the primary operational advantage of the Aho-Corasick automaton over searching multiple patterns independently using KMP?",
    "options": [
      "A) It uses zero memory pointers",
      "B) It locates all occurrences of all dictionary patterns simultaneously in a single pass of the text in O(Text Length + Matches) time",
      "C) It automatically translates Unicode into UTF-8",
      "D) It eliminates the need for string comparisons"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "By integrating a Trie with KMP-style failure links and output dictionary links, Aho-Corasick processes the input text in streaming linear time O(M + Z) regardless of how many patterns are in the dictionary.",
    "skill": "algorithms",
    "source": "expanded_expert_quizzes"
  },
  {
    "id": "q-exp-012",
    "topic": "Systems & Caching",
    "difficulty": "Medium",
    "question": "What is the Cache Stampede (or Thundering Herd) problem and how is it mitigated?",
    "options": [
      "A) RAM exhaustion caused by memory fragmentation; fixed with jemalloc",
      "B) Simultaneous expiration of a hot cache key causing hundreds of concurrent queries to hammer the database; mitigated by probabilistic early refresh (XFetch) or mutex locks",
      "C) Network switch buffer overflow; mitigated by TCP window scaling",
      "D) Serialization overhead; mitigated by Protocol Buffers"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "When a heavily accessed key expires, parallel requests all experience a cache miss and execute the heavy query simultaneously on the database. Mitigated by distributed locks or probabilistic early background refreshes.",
    "skill": "system-design",
    "source": "expanded_expert_quizzes"
  },
  {
    "id": "q-exp-013",
    "topic": "Concurrency",
    "difficulty": "Hard",
    "question": "In Go, Java, or C++, what hardware instruction primitive is commonly utilized by atomic variables (e.g. CompareAndSwap) to achieve lock-free synchronization?",
    "options": [
      "A) CAS (Compare-And-Swap) / CMPXCHG",
      "B) SIMD AVX-512 vector instruction",
      "C) Memory barrier TLB flush",
      "D) DMA direct memory copy"
    ],
    "correct_answer": "A",
    "correctIndex": 0,
    "explanation": "Compare-And-Swap (CAS) atomically compares the contents of a memory location to a given value and, only if they are identical, modifies the contents to a new given value. It forms the bedrock of lock-free data structures.",
    "skill": "concurrency",
    "source": "expanded_expert_quizzes"
  },
  {
    "id": "q-exp-014",
    "topic": "Dynamic Programming",
    "difficulty": "Hard",
    "question": "In the 0/1 Knapsack problem with weights W and values V, why must the inner loop iterate backwards from Capacity down to item weight when using a 1D DP state array?",
    "options": [
      "A) To ensure indices match memory cache line directions",
      "B) To prevent the current item from being counted multiple times within the same state transition (which would solve Unbounded Knapsack)",
      "C) To handle negative weights",
      "D) Because arrays in JavaScript allocate backwards"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Iterating backwards ensures that dp[w - weight] references values computed in the previous item iteration rather than a value already updated by the current item in the present pass.",
    "skill": "problem-solving",
    "source": "expanded_expert_quizzes"
  },
  {
    "id": "q-exp-015",
    "topic": "Graph Algorithms",
    "difficulty": "Hard",
    "question": "Why does Dijkstra single-source shortest path algorithm produce incorrect results when negative edge weights are present in the graph?",
    "options": [
      "A) Because min-heaps cannot store negative numbers",
      "B) Because Dijkstra greedy property assumes that once a vertex distance is finalized, no shorter path to it can ever be discovered by extending through another path",
      "C) Because negative edges cause infinite loops in DFS",
      "D) Because graph adjacency lists do not support signed numbers"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Dijkstra greedily finalizes the unsettled node with smallest tentative distance. A negative edge encountered later could lower the distance of an already-settled node, violating the greedy invariant. Bellman-Ford or SPFA is required instead.",
    "skill": "graph-theory",
    "source": "expanded_expert_quizzes"
  }
];
