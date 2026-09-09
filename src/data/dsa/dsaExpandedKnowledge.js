// DOAP Advanced DSA & Distributed Systems Knowledge Base Expansion
// Total Expanded Articles: 30 | Total Expanded Quizzes: 31

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
  },
  {
    "id": "kb-mesi-cache-coherency",
    "title": "MESI Cache Coherency Protocol, False Sharing & CPU Memory Barriers",
    "category": "Low-Level Systems",
    "subcategory": "Computer Architecture",
    "domain": "Hardware & Memory Systems",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. The Cache Coherency Problem: In multi-core symmetric multiprocessing (SMP), each CPU core has its own private L1/L2 caches. When core A writes to variable X and core B reads X, a hardware coherency protocol is required to prevent stale reads.\n\n2. MESI Protocol States:\n- Modified (M): Cache line is present only in current cache and is dirty (diverged from main memory). The core has exclusive write permission.\n- Exclusive (E): Cache line is present only in current cache and is clean (matches main memory).\n- Shared (S): Cache line may be present in multiple cores' caches and is clean. Read-only.\n- Invalid (I): Cache line data is invalid and unusable.\n\n3. State Transitions & Bus Snooping: When a core wants to write to a Shared line, it broadcasts a Read With Intent to Modify (RWITM) or Invalidate message across the bus. Other cores transition their copy to Invalid. Only after receiving all invalidation acknowledgements can the core transition to Modified.\n\n4. False Sharing: Occurs when two threads on separate cores modify independent variables that happen to reside within the same 64-byte cache line. Even though the variables are logically independent, the cache line constantly bounces between cores in Invalid/Modified states, degrading multi-threaded throughput by orders of magnitude. Solution: Align independent struct fields or pad with 64 bytes (e.g., alignas(64) in C++ or @Contended in Java).\n\n5. Memory Barriers / Fences: Out-of-order execution and Store Buffers can cause memory writes to become visible out of program order. Memory barriers (Acquire, Release, Full Fence) force the CPU and compiler to preserve memory ordering invariants across cores."
  },
  {
    "id": "kb-lock-free-ring-buffer",
    "title": "Lock-Free Single-Producer Single-Consumer (SPSC) & Multi-Producer Ring Buffers (Disruptor)",
    "category": "Data Structures",
    "subcategory": "Concurrency",
    "domain": "Low-Latency Computing",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. The Cost of Mutex Queues: Standard blocking queues use OS mutexes and condition variables, incurring context switch penalties (~1-3 microseconds), thread descheduling, and cache line invalidation.\n\n2. SPSC Lock-Free Ring Buffer: A circular array of fixed power-of-two size (allowing bitwise index wrapping: index & (capacity - 1)). Maintained via two atomic sequence counters: head (write cursor) and tail (read cursor).\n- Producer writes to array[head & mask], then executes an atomic store with MemoryOrder::Release on head.\n- Consumer executes atomic load with MemoryOrder::Acquire on head, reads array[tail & mask], then stores tail with Release.\n- This achieves completely lock-free, zero-allocation FIFO messaging in under 20 nanoseconds per message.\n\n3. LMAX Disruptor Pattern: Solves Multi-Producer Multi-Consumer (MPMC) contention through pre-allocated ring buffers and Sequence Barriers. Producers claim slots using atomic Compare-And-Swap (CAS) on a single cursor without locking. Consumers track batch sequences, processing thousands of events per CPU cache hit.\n\n4. Cache Line Padding in Ring Buffers: Head and tail pointers must be isolated onto separate 64-byte cache lines using padding bytes to prevent false sharing between producer and consumer cores."
  },
  {
    "id": "kb-distributed-transactions-saga",
    "title": "Distributed Transactions: Two-Phase Commit (2PC) vs Three-Phase Commit (3PC) vs Saga Pattern",
    "category": "Distributed Systems",
    "subcategory": "Transactions",
    "domain": "Distributed Architecture",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Two-Phase Commit (2PC):\n- Phase 1 (Prepare): Coordinator sends PREPARE to all cohort participants. Cohorts acquire local locks, write undo/redo logs, and vote YES or NO.\n- Phase 2 (Commit): If all vote YES, coordinator logs COMMIT and broadcasts COMMIT. If any vote NO, coordinator broadcasts ROLLBACK.\n- Fatal Flaw: 2PC is a blocking protocol. If the coordinator crashes while cohorts hold locks after voting YES, participants remain blocked indefinitely, holding critical database resources.\n\n2. Three-Phase Commit (3PC): Adds a 'PreCommit' phase between Prepare and Commit with timeouts to eliminate indefinite blocking. However, 3PC cannot maintain consistency in asynchronous networks during network partitions (split-brain).\n\n3. Saga Pattern (Compensating Transactions): Replaces distributed locking with a sequence of local ACID transactions. If local transaction T_i fails, the saga orchestrator invokes compensating rollback transactions C_{i-1} ... C_1 in reverse order.\n- Orchestrated Saga: Central coordinator state machine sends commands and listens for completion events.\n- Choreographed Saga: Services listen to domain event topics and trigger next steps autonomously.\n\n4. Transactional Outbox Pattern: Solves the dual-write problem (writing to a database and publishing a message). The message is written atomically to an 'outbox' table in the same local DB transaction, and a CDC background worker streams outbox rows to the message broker."
  },
  {
    "id": "kb-vector-search-hnsw",
    "title": "Vector Search Foundations: Hierarchical Navigable Small World (HNSW) & Inverted File Index (IVF)",
    "category": "Data Structures",
    "subcategory": "Vector Indexing",
    "domain": "Machine Learning & Search",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. The Vector Search Challenge: Finding the nearest neighbor among N high-dimensional vectors (e.g. 1536-dim OpenAI embeddings) via brute-force cosine distance requires O(N * D) floating-point operations, which is unusable at scale.\n\n2. HNSW Graph Architecture: Inspired by Skip Lists, HNSW constructs a multi-layered proximity graph where each layer is a Delaunay-like graph.\n- Top layers have few vectors and long-range highway links across the vector space.\n- Bottom layers have all vectors and dense local cluster links.\n- Greedy Search: Search begins at top layer, greedily jumping to the neighbor closest to the query vector. When local minimum is reached, search drops to the next layer down and resumes until reaching Layer 0, where beam search (efSearch) explores nearest candidates.\n- Complexity: Logarithmic search time O(log N) with empirical recall >98%.\n\n3. Inverted File with Product Quantization (IVF-PQ): Partitions vector space into Voronoi cells via k-means clustering. Searches only the closest centroids. Vectors are compressed via Product Quantization (splitting 128D into 16 8D sub-vectors), drastically reducing RAM usage at the expense of slight precision loss."
  },
  {
    "id": "kb-time-series-gorilla-compression",
    "title": "Time-Series Database Internals: Gorilla Floating-Point XOR Compression & Delta-of-Delta",
    "category": "Database Internals",
    "subcategory": "Compression",
    "domain": "Storage & Big Data",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Time-Series Workload Characteristics: Metrics (CPU, memory, sensor telemetry) consist of regular timestamp-value pairs (t_i, v_i). Storing naive 64-bit timestamps and 64-bit doubles requires 16 bytes per point, consuming terabytes per day.\n\n2. Delta-of-Delta Timestamp Compression (Facebook Gorilla):\n- Most timestamps arrive at fixed intervals (e.g. every 60s). Delta d_i = t_i - t_{i-1} is approximately 60.\n- Delta-of-delta D = d_i - d_{i-1} is usually 0.\n- If D == 0: Store a single '0' bit (1 bit total!).\n- If -63 <= D <= 64: Store '10' followed by 7 bits.\n- If -255 <= D <= 256: Store '110' followed by 9 bits.\n- Average timestamp storage drops from 8 bytes to under 1.37 bits per point!\n\n3. Floating-Point Value XOR Compression: Consecutive float values change very little. XORing v_i ^ v_{i-1} yields a 64-bit word with many leading and trailing zeros.\n- If XOR == 0: Store a single '0' bit.\n- If XOR != 0: Store '1', followed by whether the leading/trailing zero count matches the previous value, followed by variable-length meaningful bits.\n- Reduces float storage from 8 bytes to an average of 1.3 bytes per metric value."
  },
  {
    "id": "kb-columnar-storage-parquet",
    "title": "Columnar Storage Architecture: Apache Parquet, Apache Arrow & Vectorized Execution",
    "category": "Database Internals",
    "subcategory": "Storage Formats",
    "domain": "Analytics & Data Engineering",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Row-Oriented vs Column-Oriented: Row-oriented engines (Postgres, MySQL) store entire tuples contiguously (row1_colA, row1_colB, row2_colA...). Ideal for OLTP point lookups and single-row inserts. In analytical OLAP queries calculating sum(revenue), row stores must read all irrelevant columns from disk into memory.\n\n2. Parquet On-Disk Layout: Data is partitioned horizontally into Row Groups (typically 128MB-512MB). Within each row group, data is written by Column Chunks. Each column chunk is broken into Pages containing dictionary encoding, run-length encoding (RLE), and bit-packing.\n- Projection Pushdown: Queries selecting only 2 of 100 columns read only the 2 physical column chunk byte ranges from disk/S3.\n- Predicate Pushdown: Page and Row Group headers store min/max statistics. If query has 'WHERE age > 65' and page max is 50, the entire page is skipped without reading or decompressing.\n\n3. Apache Arrow (In-Memory Columnar): Standardizes contiguous in-memory columnar memory buffers across languages (Python, C++, Java, Rust). Eliminates serialization/deserialization overhead when passing data between Spark, Pandas, and PyTorch via zero-copy shared memory."
  },
  {
    "id": "kb-linux-epoll-vs-iouring",
    "title": "Linux I/O Architecture: select, poll, epoll vs io_uring Kernel Submission Rings",
    "category": "Low-Level Systems",
    "subcategory": "Operating Systems",
    "domain": "Kernel & Network Programming",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Evolution of Network Multiplexing:\n- select() / poll(): O(N) linear scan over all file descriptors on every invocation. Inefficient for tens of thousands of connections.\n- epoll(): O(1) stateful event notification. The kernel maintains a Red-Black tree of monitored FDs and a Ready List linked list. When network packets arrive, hardware NIC interrupts wake the socket, and the kernel appends the ready event to the list in O(1).\n\n2. Limitations of epoll: While epoll handles network sockets asynchronously, it CANNOT do asynchronous disk file I/O (files always block in read/write syscalls). Additionally, handling 100,000 requests still requires 200,000 syscall context switches (epoll_wait -> read -> write).\n\n3. io_uring Architecture (Linux 5.1+): Provides true asynchronous I/O for both network and disk files using two shared ring buffers between kernel and userspace:\n- Submission Queue (SQ): Userspace writes I/O requests directly into ring buffer without syscalls.\n- Completion Queue (CQ): Kernel writes completion events into ring buffer without blocking.\n- SQPOLL Mode: A dedicated kernel thread continuously polls the submission ring, achieving millions of I/O operations per second with ZERO system calls!"
  },
  {
    "id": "kb-consensus-paxos-raft",
    "title": "Distributed Consensus: Multi-Paxos vs Raft Protocol Invariants & Safety Proofs",
    "category": "Distributed Systems",
    "subcategory": "Consensus",
    "domain": "Distributed Theory",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Consensus Fundamentals: In an asynchronous network where messages can be delayed, reordered, or duplicated, and nodes can crash, reaching agreement on a single state machine log requires distributed consensus. (FLM Impossibility: Consensus is impossible in pure asynchronous systems with even one unannounced crash failure; protocols rely on partial synchrony and timeouts).\n\n2. Paxos (Leslie Lamport): Splits consensus into rounds. Each round has a Proposer, Acceptors, and Learners. Phase 1 (Prepare/Promise) discovers previous chosen values and establishes ballot leadership. Phase 2 (Accept/Accepted) commits the value. Multi-Paxos bypasses Phase 1 once a stable leader is established, achieving 1 RTT commits.\n\n3. Raft (Ongaro & Ousterhout): Deconstructs consensus into three independent sub-problems: Leader Election, Log Replication, and Safety.\n- Strong Leader Principle: Log entries only flow from the Leader to Followers.\n- Election Safety: At most one leader can be elected in a given term.\n- Leader Completeness: If a log entry is committed in a given term, that entry will be present in the logs of the leaders for all higher-numbered terms.\n- Log Matching: If two logs contain an entry with the same index and term, then the logs are identical in all entries up through the given index."
  },
  {
    "id": "kb-bloom-filter-math",
    "title": "Bloom Filter Mathematical Analysis: False Positive Probability & Optimal Hash Count",
    "category": "Data Structures",
    "subcategory": "Probabilistic Data Structures",
    "domain": "Algorithms & Big Data",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Structure: A Bloom filter consists of an m-bit array initialized to all zeros and k independent, uniformly distributed hash functions {h_1, h_2, ..., h_k}.\n\n2. Insertion: To insert element x, compute h_i(x) for i=1..k and set bit array[h_i(x) % m] = 1.\n\n3. Membership Query: To test if y is in the set, check if all array[h_i(y) % m] == 1. If any bit is 0, y is definitively NOT in the set (zero false negatives). If all bits are 1, y is probably in the set (potential false positive).\n\n4. False Positive Probability (p): After inserting n elements, the probability that a specific bit is 0 is (1 - 1/m)^{kn} ≈ e^{-kn/m}. The probability of a false positive is p ≈ (1 - e^{-kn/m})^k.\n\n5. Optimal k: To minimize p for a given bit size m and element count n, choose k = (m/n) * ln(2) ≈ 0.693 * (m/n). For p = 1% (0.01), m/n ≈ 9.6 bits per element with k = 7 hash functions."
  },
  {
    "id": "kb-cuckoo-filter",
    "title": "Cuckoo Filters vs Bloom Filters: Deletions, Fingerprints & Cache Locality",
    "category": "Data Structures",
    "subcategory": "Probabilistic Data Structures",
    "domain": "Algorithms & Systems",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. The Bloom Filter Limitation: Standard Bloom filters cannot delete items because multiple keys may share identical bit indices; clearing a bit can cause false negatives for other items.\n\n2. Cuckoo Filter Architecture: Stores small constant-sized fingerprints (e.g. 8-bit hash f = fingerprint(x)) in a bucketed hash table utilizing Cuckoo Hashing.\n- Each item x has two candidate bucket locations calculated via partial-key cuckoo hashing: i_1 = hash(x) and i_2 = i_1 ⊕ hash(f).\n- Because XOR is self-inverting (i_1 = i_2 ⊕ hash(f)), any bucket index can compute the alternate bucket index knowing only the fingerprint, without needing the original key!\n\n3. Dynamic Deletion: Removing an item simply looks for its fingerprint f in bucket i_1 or i_2 and deletes one matching instance, enabling true dynamic insertions and deletions.\n\n4. Performance & Memory: Cuckoo filters outperform Bloom filters in lookup throughput due to superior CPU cache locality (searching only 2 contiguous buckets) and consume less space for false positive targets under 3%."
  },
  {
    "id": "kb-hyperloglog-cardinality",
    "title": "HyperLogLog (HLL) Cardinality Estimation: Leading Zeros & Harmonic Mean",
    "category": "Data Structures",
    "subcategory": "Probabilistic Algorithms",
    "domain": "Big Data & Telemetry",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. The Cardinality Problem: Counting unique active visitors (UV) across billions of web hits using a hash set requires gigabytes of RAM. HyperLogLog estimates cardinality with standard error of ~1.04 / sqrt(m) using just 1.5 KB of memory.\n\n2. The Core Intuition: Hash each item to a uniform 64-bit binary integer. The probability of observing a hash starting with k consecutive zeros is (1/2)^k. Observing a maximum run of k leading zeros suggests approximately 2^k distinct elements have been hashed.\n\n3. Bucket Averaging & Harmonic Mean: To eliminate high variance from a single lucky hash, HLL uses the first p bits of the hash to index into m = 2^p registers (e.g. p=14 -> 16,384 registers). Each register records the maximum count of leading zeros observed among elements mapped to that bucket. The overall estimate uses the Harmonic Mean across all registers to suppress the influence of outlier spikes.\n\n4. Union Operation: Combining HLL sketches across distributed map-reduce workers is trivially exact and associative: register_union[i] = max(register_A[i], register_B[i])."
  },
  {
    "id": "kb-treap-cartesian-tree",
    "title": "Treap (Cartesian Tree): Randomized Binary Search Tree with Min-Heap Priority",
    "category": "Data Structures",
    "subcategory": "Trees",
    "domain": "Advanced Data Structures",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Definition: A Treap (Tree + Heap) is a binary tree where each node holds two attributes: a search Key satisfying the Binary Search Tree (BST) property (left.key < node.key < right.key) and a randomly assigned Priority satisfying the Heap property (node.priority <= children.priority).\n\n2. Self-Balancing Invariant: By assigning priorities randomly from a uniform distribution, the Treap simulates inserting keys in random order into an ordinary BST, guaranteeing O(log N) expected tree depth without complex Red-Black or AVL coloring rules.\n\n3. Core Operations: Split & Merge:\n- Split(root, key) -> (LeftTreap, RightTreap): Divides a Treap into two separate Treaps where all keys in Left are <= key, and all keys in Right are > key in O(log N).\n- Merge(LeftTreap, RightTreap) -> MergedTreap: Merges two Treaps (assuming all keys in Left < all keys in Right) by comparing root priorities and recursing in O(log N).\n\n4. Implicit Treap: Using node subtree sizes instead of explicit keys turns the Treap into a powerful dynamic array supporting range reverse, range insert, and range sum queries in O(log N)."
  },
  {
    "id": "kb-segment-tree-lazy-propagation",
    "title": "Segment Trees with Lazy Propagation for Range Updates and Range Queries",
    "category": "Data Structures",
    "subcategory": "Trees",
    "domain": "Competitive Programming & Algorithmic Patterns",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. The Range Query Challenge: In an array of N numbers, answering range minimum queries (RMQ) or range sum queries in O(1) with prefix arrays fails when frequent range updates (add V to all elements in [L, R]) occur, costing O(N) per update.\n\n2. Segment Tree Structure: A full binary tree of 4N nodes where each node represents a contiguous interval [start, end]. Leaf nodes represent individual elements. Internal nodes store the aggregate result of their left and right children (sum, min, max, gcd).\n\n3. Lazy Propagation: Updating an entire range [L, R] naively requires visiting all leaves in O(N). Lazy propagation postpones child updates by storing a 'lazy' tag at ancestor nodes that completely fall within [L, R] in O(log N).\n- When a subsequent query or update descends into a node with a pending lazy tag, it pushes the tag down to its immediate left and right children before recursing.\n- Both range updates and range queries achieve optimal O(log N) time."
  },
  {
    "id": "kb-disjoint-set-union-find",
    "title": "Disjoint Set Union (DSU / Union-Find): Path Compression & Union by Rank",
    "category": "Data Structures",
    "subcategory": "Graphs",
    "domain": "Algorithmic Graph Theory",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. The Dynamic Connectivity Problem: Given N elements, efficiently perform two operations: Union(u, v) to merge sets containing u and v, and Find(u) to determine the canonical representative of u's set.\n\n2. Naive Tree Representation: Each element points to its parent. Root points to itself. Without balancing, trees degenerate into linked lists of depth O(N), yielding O(N) per find.\n\n3. Two Critical Optimizations:\n- Path Compression: During Find(u), flatten the tree by making every visited node point directly to the root: parent[u] = Find(parent[u]).\n- Union by Rank / Size: When attaching two roots, attach the shallower tree under the deeper tree (or smaller set under larger set) to minimize tree depth growth.\n\n4. Inverse Ackermann Complexity: Combining Path Compression with Union by Rank guarantees that any sequence of M operations on N elements runs in O(M * α(N)) time, where α(N) is the inverse Ackermann function. For all practical universe sizes (N < 10^{80}), α(N) <= 4, making each operation effectively O(1) amortized."
  },
  {
    "id": "kb-aho-corasick-automaton",
    "title": "Aho-Corasick Multi-Pattern String Matching Automaton",
    "category": "Algorithms",
    "subcategory": "String Algorithms",
    "domain": "Pattern Matching & Automata",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. The Multi-Pattern Search Problem: Given text T of length N and K keywords {P_1, P_2, ..., P_K} of total length M, finding all occurrences of all keywords via naive sliding window costs O(N * M).\n\n2. Aho-Corasick Construction: Generalizes the KMP (Knuth-Morris-Pratt) failure function to a Trie of patterns.\n- Trie Construction: Build standard Trie containing all K keywords.\n- Suffix / Failure Links (fail links): For each node representing string S, its fail link points to the node representing the longest proper suffix of S that exists in the Trie. Computed via BFS level-order traversal.\n- Dictionary / Output Links: Points to the nearest ancestor node that represents a complete matching keyword.\n\n3. Linear Time Search: Traverses text T character-by-character. If no transition exists for character c, follow fail links until a transition exists or the root is reached. The entire search runs in O(N + M + total_matches) time."
  },
  {
    "id": "kb-binary-lifting-lca",
    "title": "Lowest Common Ancestor (LCA) in Trees via Binary Lifting",
    "category": "Algorithms",
    "subcategory": "Trees",
    "domain": "Competitive Algorithmic Patterns",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. The LCA Problem: In a rooted tree of N nodes, find the Lowest Common Ancestor of any two nodes u and v across Q queries. Naively walking parent pointers costs O(N) per query.\n\n2. Binary Lifting Table: Precompute an ancestor table up[node][i] representing the 2^i-th ancestor of node. \n- Recurrence: up[node][i] = up[ up[node][i-1] ][i-1] for i = 1..log2(N).\n- Preprocessing takes O(N log N) time and space via DFS.\n\n3. Query Execution in O(log N):\n- Step 1: Ensure both nodes are at the same tree depth by lifting the deeper node upward using binary decomposition of the depth difference.\n- Step 2: If u == v, return u.\n- Step 3: Iterate i from log2(N) down to 0. If up[u][i] != up[v][i], lift both u = up[u][i] and v = up[v][i]. At the end, both nodes are direct children of the LCA. Return up[u][0]."
  },
  {
    "id": "kb-tarjan-strongly-connected-components",
    "title": "Tarjan's Strongly Connected Components (SCC) Algorithm via DFS Low-Links",
    "category": "Algorithms",
    "subcategory": "Graphs",
    "domain": "Graph Theory",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Definition: In a directed graph, a Strongly Connected Component (SCC) is a maximal subgraph where every vertex is reachable from every other vertex within the component.\n\n2. Tarjan's Single-Pass DFS: Tarjan's algorithm finds all SCCs in a single DFS traversal in O(V + E) time, outperforming Kosaraju's algorithm which requires two full graph passes (forward and transposed graph).\n\n3. DFS State Variables: For each vertex u:\n- discovery_time[u]: The timestamp when u was first visited.\n- low_link[u]: The smallest discovery timestamp reachable from u via DFS tree edges and back edges to vertices currently on the recursion stack.\n- recursion_stack: Maintains candidate vertices of the current SCC.\n\n4. SCC Identification: When DFS finishes exploring u's neighbors, if low_link[u] == discovery_time[u], u is the root of an SCC! All vertices on the stack above u (inclusive) belong to this SCC and are popped together."
  },
  {
    "id": "kb-tombstone-compaction-mechanics",
    "title": "LSM-Tree Tombstones, Delete Compaction & Write Amplification",
    "category": "Database Internals",
    "subcategory": "Storage Engines",
    "domain": "Database Systems",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Deletes as Inserts: In append-only LSM-Tree engines (RocksDB, Cassandra), deleting a key cannot immediately erase bytes from immutable SSTable files on disk. Instead, an explicit marker called a 'Tombstone' is appended as a write record.\n\n2. The Tombstone Problem: If a user deletes 10,000,000 keys, queries scanning that range must read and filter millions of tombstones, causing severe read latency degradation and disk bloat until compaction runs.\n\n3. Compaction Mechanics: During background Leveled Compaction, an SSTable containing a tombstone for key K merges with overlapping SSTables in the next lower level. The tombstone cancels out previous versions of K. If K does not exist in any deeper disk levels, the tombstone itself can finally be purged from disk.\n\n4. Write Amplification Factor (WAF): The ratio of bytes written to persistent storage versus bytes requested by user writes. Compaction repeatedly rewrites data, producing WAF typically between 10x to 30x in production."
  },
  {
    "id": "kb-tcp-bbr-congestion-control",
    "title": "TCP Congestion Control: Loss-Based (Cubic) vs Model-Based BBR (Bottleneck Bandwidth and RTT)",
    "category": "Networking Internals",
    "subcategory": "Transport Protocols",
    "domain": "Computer Networking",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Bufferbloat in Loss-Based Congestion Control (Reno / Cubic): Traditional TCP algorithms treat packet loss as the sole indicator of congestion. They continuously inflate the congestion window until intermediate router buffers fill completely and drop packets, creating high queuing delays (bufferbloat).\n\n2. Kleinrock's Optimal Operating Point: True network capacity is reached when delivery rate equals the bottleneck bandwidth (BtlBw) and inflight data equals the Bandwidth-Delay Product (BDP = BtlBw * RTprop), achieving maximum throughput with zero queue backlog.\n\n3. BBR Architecture (Google): Model-based congestion control that probes and explicitly estimates two independent physical parameters: Bottleneck Bandwidth (maximum filter over a 10-round window) and Round-Trip Propagation Delay (minimum filter over a 10-second window).\n\n4. Advantages: BBR maintains high throughput even across lossy wireless links with 1-5% random packet loss, where Cubic would erroneously collapse its window by 50%."
  },
  {
    "id": "kb-quic-connection-migration",
    "title": "QUIC & HTTP/3 Transport: 0-RTT Handshakes, UDP Multiplexing & Connection Migration",
    "category": "Networking Internals",
    "subcategory": "Transport Protocols",
    "domain": "Computer Networking",
    "source": "DOAP Advanced Curriculum",
    "type": "architectural_knowledge",
    "content": "1. Head-of-Line (HoL) Blocking in TCP: In HTTP/2 over TCP, all application streams share a single TCP sequence byte stream. If a single packet is lost on the network, the OS TCP stack pauses delivery of all multiplexed streams until the missing segment is retransmitted.\n\n2. QUIC over UDP: QUIC runs in user-space on top of UDP. Each stream has independent packet offsets. A lost packet on Stream A only pauses Stream A; Streams B, C, and D continue processing without delay.\n\n3. 0-RTT Connection Resumption: QUIC combines transport and TLS 1.3 cryptographic handshakes into a single round-trip (1-RTT). Returning clients with cached session tickets can transmit encrypted application requests in the very first packet (0-RTT).\n\n4. Connection Migration via 64-bit Connection IDs: Traditional TCP connections are bound to a 4-tuple (src_ip, src_port, dst_ip, dst_port). When a smartphone switches from Wi-Fi to 5G cellular, all active TCP connections break. QUIC identifies connections via an opaque Connection ID (CID), allowing connections to survive IP address changes seamlessly without re-handshaking."
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
  },
  {
    "id": "quiz-mesi-false-sharing",
    "question": "Two threads running on separate CPU cores concurrently increment adjacent integers located in the same 64-byte cache line. What performance phenomenon occurs?",
    "options": [
      "Deadlock, because the hardware memory bus permanently halts instruction pipelines.",
      "False Sharing, causing the cache line to continuously bounce between cores via invalidation traffic (MESI protocol).",
      "Linear speedup, because modern L1 caches automatically parallelize byte offsets within a single line.",
      "Race condition leading to a CPU kernel panic and trap exception."
    ],
    "correctAnswer": 1,
    "explanation": "False sharing occurs when independent threads modify distinct variables located within the same 64-byte hardware cache line. The MESI cache coherency protocol forces each core to invalidate the other core's cache line upon write, causing severe cache thrashing and bus contention.",
    "topic": "Computer Architecture",
    "difficulty": "Hard"
  },
  {
    "id": "quiz-spsc-memory-order",
    "question": "In a lock-free Single-Producer Single-Consumer (SPSC) ring buffer, what C++ memory ordering must the producer use when publishing the updated write cursor to ensure the consumer observes the written payload?",
    "options": [
      "std::memory_order_relaxed",
      "std::memory_order_consume",
      "std::memory_order_release",
      "std::memory_order_seq_cst (mandatory; no other order is safe)"
    ],
    "correctAnswer": 2,
    "explanation": "std::memory_order_release guarantees that all prior memory writes (including the ring buffer element payload) are visible to any thread that acquires the same atomic variable with std::memory_order_acquire. This establishes a synchronized-with relationship without the heavy overhead of full memory fences.",
    "topic": "Concurrency",
    "difficulty": "Hard"
  },
  {
    "id": "quiz-hnsw-search-complexity",
    "question": "What is the expected asymptotic search time complexity to find the nearest neighbor in an HNSW (Hierarchical Navigable Small World) index containing N high-dimensional vectors?",
    "options": [
      "O(N * log N)",
      "O(log N)",
      "O(sqrt(N))",
      "O(N^2)"
    ],
    "correctAnswer": 1,
    "explanation": "HNSW builds a multi-layered hierarchical graph inspired by Skip Lists. Navigating from sparse top layers to dense bottom layers via greedy routing achieves logarithmic O(log N) expected search time while maintaining high empirical recall.",
    "topic": "Vector Search",
    "difficulty": "Medium"
  },
  {
    "id": "quiz-parquet-predicate-pushdown",
    "question": "How does Apache Parquet's Predicate Pushdown optimization accelerate analytical SQL queries containing WHERE clauses?",
    "options": [
      "It converts the SQL query into WebAssembly and executes it directly on the storage disk controller.",
      "It inspects min/max column statistics stored in row group and page headers to skip entire blocks without reading or decompressing them.",
      "It rewrites all floating-point numbers into 8-bit integers before executing the scan.",
      "It forces the query optimizer to convert the table into a hash map."
    ],
    "correctAnswer": 1,
    "explanation": "Parquet embeds metadata statistics (min value, max value, null count) in each page and row group header. When evaluating a filter like 'WHERE salary > 100000', if the page max is 80000, the engine skips the entire chunk without performing disk I/O or decompression.",
    "topic": "Database Internals",
    "difficulty": "Medium"
  },
  {
    "id": "quiz-iouring-syscall-advantage",
    "question": "What is the primary architectural advantage of Linux io_uring over epoll for high-throughput I/O intensive services?",
    "options": [
      "io_uring runs entirely in user-space without involving the Linux kernel.",
      "io_uring utilizes shared circular ring buffers (SQ and CQ) allowing asynchronous I/O submission and completion with zero system calls in polled mode.",
      "io_uring guarantees 100% loss-free network packet buffering even during hardware disconnects.",
      "io_uring replaces TCP/IP with UDP automatically."
    ],
    "correctAnswer": 1,
    "explanation": "io_uring establishes two lock-free ring buffers (Submission Queue and Completion Queue) shared between the kernel and application. Applications place I/O requests directly in the SQ ring. In SQPOLL mode, a kernel worker thread drains requests without needing syscall context switches, drastically reducing CPU overhead.",
    "topic": "Operating Systems",
    "difficulty": "Hard"
  },
  {
    "id": "quiz-raft-election-split-vote",
    "question": "In the Raft distributed consensus algorithm, what mechanism prevents continuous split votes when multiple candidate nodes timeout and start elections simultaneously?",
    "options": [
      "Deterministic alphabetical priority based on server node IDs.",
      "Randomized election timeouts chosen uniformly from an interval such as 150ms - 300ms.",
      "A centralized master clock synchronizing node heartbeat intervals via GPS NTP.",
      "The leader is selected by whoever has the smallest IP address."
    ],
    "correctAnswer": 1,
    "explanation": "Raft utilizes randomized election timeouts (e.g. 150-300ms) to ensure split votes are rare. One node will usually time out before the others, increment its term, and collect majority votes before any competing follower triggers an election.",
    "topic": "Distributed Systems",
    "difficulty": "Medium"
  },
  {
    "id": "quiz-gorilla-delta-of-delta",
    "question": "In Facebook Gorilla time-series compression, why does Delta-of-Delta timestamp compression achieve an average of ~1.37 bits per timestamp?",
    "options": [
      "Because timestamps are compressed with gzip using Lempel-Ziv dictionaries.",
      "Because most time-series data points arrive at fixed regular intervals, making the difference between consecutive time deltas exactly zero (stored as a single '0' bit).",
      "Because timestamps are discarded and inferred from array indexes.",
      "Because timestamps are truncated to 16-bit Unix seconds."
    ],
    "correctAnswer": 1,
    "explanation": "Metrics are collected on strict intervals (e.g. every 10s). The first delta D1 = t1 - t0 = 10. The next delta D2 = t2 - t1 = 10. The delta-of-delta is D2 - D1 = 0. Gorilla encodes a delta-of-delta of zero with a single '0' bit, dramatically reducing timestamp overhead.",
    "topic": "Compression",
    "difficulty": "Hard"
  },
  {
    "id": "quiz-saga-compensating-failure",
    "question": "In an Orchestrated Saga handling an e-commerce order (Payment -> Inventory -> Shipping), if the Shipping service fails, what must the orchestrator do?",
    "options": [
      "Immediately crash and leave Payment and Inventory in their current committed states.",
      "Trigger distributed Two-Phase Commit rollback on all nodes.",
      "Execute the compensating transactions for Inventory and Payment in reverse order to undo their effects.",
      "Retry the Shipping transaction indefinitely until it succeeds, blocking all other customers."
    ],
    "correctAnswer": 2,
    "explanation": "The Saga pattern maintains eventual consistency across services without distributed locking. If a downstream step fails and cannot be recovered, the saga coordinator sequentially invokes compensating transactions (e.g. ReleaseInventory, RefundPayment) in reverse order.",
    "topic": "Distributed Systems",
    "difficulty": "Medium"
  },
  {
    "id": "quiz-cuckoo-filter-xor",
    "question": "In a Cuckoo Filter, how is the secondary bucket index i2 computed from primary bucket index i1 and fingerprint f?",
    "options": [
      "i2 = (i1 + hash(f)) % table_size",
      "i2 = i1 ⊕ hash(f)",
      "i2 = hash(i1) * f",
      "i2 = (i1 * 31) + hash(f)"
    ],
    "correctAnswer": 1,
    "explanation": "Partial-key cuckoo hashing calculates i2 = i1 ⊕ hash(f). Because XOR is its own inverse, i1 = i2 ⊕ hash(f). This allows an item kicked out of bucket i2 to find its way back to bucket i1 knowing only the stored fingerprint f, without needing the original item key.",
    "topic": "Probabilistic Data Structures",
    "difficulty": "Hard"
  },
  {
    "id": "quiz-dsu-complexity",
    "question": "What is the worst-case amortized time complexity per operation for Disjoint Set Union (DSU) using both Path Compression and Union by Rank across M operations on N elements?",
    "options": [
      "O(log N)",
      "O(sqrt(N))",
      "O(α(N)) where α is the inverse Ackermann function (effectively O(1))",
      "O(N)"
    ],
    "correctAnswer": 2,
    "explanation": "Combining path compression with union by rank guarantees that any sequence of M operations on N elements executes in O(M * α(N)) total time. Because the inverse Ackermann function α(N) <= 4 for any conceivable input size, it is practically constant time O(1).",
    "topic": "Graph Algorithms",
    "difficulty": "Medium"
  },
  {
    "id": "quiz-treap-random-priority",
    "question": "Why do Treaps (Cartesian Trees) assign random priorities to inserted keys?",
    "options": [
      "To encrypt keys stored on the heap against memory inspection.",
      "To simulate inserting keys in a uniformly random order into a binary search tree, guaranteeing O(log N) expected depth.",
      "To ensure that all leaf nodes have identical memory addresses.",
      "To enable constant-time O(1) sorting without comparisons."
    ],
    "correctAnswer": 1,
    "explanation": "A standard BST is balanced if keys are inserted in random order. By assigning random priority values from a continuous uniform distribution and maintaining the heap property, a Treap mathematically mimics random insertion order, yielding O(log N) expected search, insert, and delete times.",
    "topic": "Data Structures",
    "difficulty": "Medium"
  },
  {
    "id": "quiz-segment-tree-lazy-tag",
    "question": "In a Segment Tree with Lazy Propagation, what action must occur before descending into the children of a node during a query or update?",
    "options": [
      "The entire tree must be re-balanced using AVL tree rotations.",
      "Any pending lazy update tag on the current node must be pushed down to its children.",
      "All leaf nodes must be flushed to disk via memory mapping.",
      "The query interval must be truncated to prime numbers."
    ],
    "correctAnswer": 1,
    "explanation": "Lazy propagation defers updates to subtrees until their data is actually needed. When traversing downward, the current node pushes its accumulated lazy value to its immediate left and right children and clears its own tag, preserving tree invariants.",
    "topic": "Range Queries",
    "difficulty": "Medium"
  },
  {
    "id": "quiz-quic-head-of-line",
    "question": "How does QUIC solve the TCP Head-of-Line (HoL) blocking problem when transmitting multiple streams?",
    "options": [
      "By using optical fiber lasers instead of copper cables.",
      "By running over UDP and maintaining independent packet offset sequences for each stream, so a lost packet only delays its own stream.",
      "By requiring all network packets to be encrypted with 4096-bit RSA keys.",
      "By disallowing packet retransmissions completely."
    ],
    "correctAnswer": 1,
    "explanation": "In HTTP/2 over TCP, all streams are multiplexed onto a single monolithic byte stream, so one lost TCP packet stops delivery of all streams. QUIC runs over UDP and tracks packet loss per-stream independently; packet loss on one stream does not block unrelated concurrent streams.",
    "topic": "Networking Internals",
    "difficulty": "Medium"
  },
  {
    "id": "quiz-tarjan-scc-root",
    "question": "In Tarjan's Strongly Connected Components algorithm, what condition indicates that vertex u is the root of a strongly connected component?",
    "options": [
      "discovery_time[u] == low_link[u]",
      "low_link[u] == 0",
      "u has no outgoing edges",
      "u has greater than 3 incoming back edges"
    ],
    "correctAnswer": 0,
    "explanation": "In Tarjan's algorithm, low_link[u] tracks the earliest discovery time reachable from u. When low_link[u] == discovery_time[u], no node in u's DFS subtree can reach an ancestor higher than u. Therefore, u and all nodes above it on the stack form a complete maximal SCC.",
    "topic": "Graph Algorithms",
    "difficulty": "Hard"
  },
  {
    "id": "quiz-binary-lifting-table",
    "question": "What is the recurrence relation used to construct the Binary Lifting ancestor table up[node][i] representing the 2^i-th ancestor of node?",
    "options": [
      "up[node][i] = up[node][i-1] + up[node][i-2]",
      "up[node][i] = up[ up[node][i-1] ][i-1]",
      "up[node][i] = up[node][i-1] * 2",
      "up[node][i] = up[parent[node]][i]"
    ],
    "correctAnswer": 1,
    "explanation": "The 2^i-th ancestor is the 2^(i-1)-th ancestor of the 2^(i-1)-th ancestor (since 2^(i-1) + 2^(i-1) = 2^i). The recurrence is up[node][i] = up[ up[node][i-1] ][i-1], precomputable in O(N log N) via dynamic programming.",
    "topic": "Tree Algorithms",
    "difficulty": "Medium"
  },
  {
    "id": "quiz-lsm-tombstone-purge",
    "question": "In an LSM-Tree storage engine, when can a Tombstone marker for key K be safely purged from disk?",
    "options": [
      "Immediately upon writing the tombstone to the MemTable.",
      "As soon as the MemTable flushes to Level 0 (L0) SSTable.",
      "Only when compaction merges the tombstone into the deepest level containing K, and K does not exist in any deeper levels.",
      "Tombstones can never be deleted from disk under any circumstances."
    ],
    "correctAnswer": 2,
    "explanation": "If a tombstone were purged while an older version of key K still existed in a deeper, uncompacted level of the LSM-Tree, subsequent reads would mistakenly resurrect the old deleted value! The tombstone can only be purged when all older versions in deeper levels have been merged and obliterated.",
    "topic": "Storage Engines",
    "difficulty": "Hard"
  }
];
