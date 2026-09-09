// DOAP Industry-Grade Comprehensive Learning Curriculum
// Real-world, first-principles courses covering High-Performance Systems, Rust, AppSec, Networking, ML Math, Competitive DSA & MLOps

export const ADDITIONAL_COURSES = [
  {
    id: "golang-systems",
    title: "Go High-Performance Systems & Concurrency",
    level: "Advanced",
    category: "Programming",
    modulesCount: 6,
    duration: "18h",
    progress: 0,
    modules: [
      {
        id: 1,
        title: "Go Memory Model, Pointers & Escape Analysis",
        completed: false,
        isCurrent: true,
        subTopics: [
          { id: "go-1-1", title: "Stack vs Heap Allocations & Escape Analysis", desc: "Profiling compiler escapes with go build -gcflags='-m', pointer rules, and eliminating runtime heap allocations." },
          { id: "go-1-2", title: "Struct Memory Layout & Cache Alignment", desc: "Field ordering, struct padding, false sharing across CPU L1/L2 cache lines, and unsafe.Alignof." },
          { id: "go-1-3", title: "Slices & Arrays Internal Header Architecture", desc: "SliceHeader (Data pointer, Len, Cap), append reallocation mechanics, and 3-index slicing to avoid memory leaks." },
          { id: "go-1-4", title: "String Immutability & Zero-Copy Byte Conversions", desc: "Converting []byte to string with unsafe.String and zero-copy string buffer builders (strings.Builder)." }
        ]
      },
      {
        id: 2,
        title: "Goroutines, GMP Scheduler & Channel Internals",
        completed: false,
        subTopics: [
          { id: "go-2-1", title: "GMP Scheduler Architecture (Goroutine, Machine, Processor)", desc: "M:N scheduling model, run queues, work stealing algorithm, and sysmon background preemption." },
          { id: "go-2-2", title: "Channel Internal Data Structures (hchan, waitq, sudog)", desc: "Ring buffer synchronization, lock contention, channel state transitions, and channel closure rules." },
          { id: "go-2-3", title: "Select Statement Multiplexing & Non-Blocking Channels", desc: "Randomized select case evaluation, default fallbacks, and non-blocking channel polling patterns." },
          { id: "go-2-4", title: "Context Package & Cascading Cancellation", desc: "context.WithTimeout, context.WithCancel, propagating deadlines, and preventing goroutine leaks." }
        ]
      },
      {
        id: 3,
        title: "Advanced Concurrency & Lock-Free Synchronization",
        completed: false,
        subTopics: [
          { id: "go-3-1", title: "sync.Mutex vs sync.RWMutex Internals", desc: "Starvation mode vs normal mode, reader-writer lock contention, and benchmarking high-read mutexes." },
          { id: "go-3-2", title: "sync.Pool Object Recycling & GC Pressure Reduction", desc: "Local P caches, victim caches, reducing allocations in high-throughput network handlers." },
          { id: "go-3-3", title: "sync/atomic & Lock-Free Data Structures", desc: "atomic.CompareAndSwap, atomic.Pointer, memory barriers, and lock-free ring buffers." },
          { id: "go-3-4", title: "Errgroup & Worker Pool Pipelines", desc: "Managing fan-out/fan-in pipelines, bounded concurrency workers, and capturing first non-nil error." }
        ]
      },
      {
        id: 4,
        title: "High-Performance Network I/O & Netpoller",
        completed: false,
        subTopics: [
          { id: "go-4-1", title: "Go Netpoller Internals (epoll/kqueue)", desc: "How Go integrates OS non-blocking I/O with goroutine sleep/wake cycles without thread context switching." },
          { id: "go-4-2", title: "Zero-Copy I/O & Linux sendfile", desc: "Bypassing user-space memory copies with io.Copy, splice, and TCP buffer management." },
          { id: "go-4-3", title: "HTTP/2 & gRPC Server Performance Tuning", desc: "Flow control window sizes, concurrent stream limits, connection reuse, and keepalive probes." },
          { id: "go-4-4", title: "Custom TCP Protocols with Byte Buffers", desc: "Binary framing, length-prefixed packet encoders/decoders, and CRC32 checksum verification." }
        ]
      },
      {
        id: 5,
        title: "Garbage Collector Mechanics & Runtime Tuning",
        completed: false,
        subTopics: [
          { id: "go-5-1", title: "Tricolor Concurrent Mark-and-Sweep", desc: "White, grey, black object states, write barriers (Yuasa + Dijkstra hybrid), and concurrent phase pacing." },
          { id: "go-5-2", title: "GOGC & GOMEMLIMIT Production Tuning", desc: "Dynamic target heap limits, preventing OOM kills in memory-constrained containers, and ballast memory." },
          { id: "go-5-3", title: "Stack Growth & Split Stacks (Contiguous Stacks)", desc: "2KB initial stack allocation, stack copying on overflow, and avoiding deep call frame thrashing." },
          { id: "go-5-4", title: "Finalizers vs runtime.KeepAlive", desc: "Object lifecycle hooks, GC reclamation ordering, and preventing premature pointer deallocations." }
        ]
      },
      {
        id: 6,
        title: "Production Profiling, Tracing & Benchmarking",
        completed: false,
        subTopics: [
          { id: "go-6-1", title: "pprof CPU & Memory Allocation Profiling", desc: "Flame graphs, alloc_space vs inuse_space, identifying hotspot routines, and memory leak analysis." },
          { id: "go-6-2", title: "Execution Tracer (go tool trace)", desc: "Visualizing goroutine blocking, syscall latency, GC pauses, and scheduler latency in browser UI." },
          { id: "go-6-3", title: "Micro-benchmarks & Compiler Inlining", desc: "Writing robust testing.B benchmarks, b.ReportAllocs(), and preventing dead-code elimination." },
          { id: "go-6-4", title: "Data Race Detector (go test -race)", desc: "ThreadSanitizer integration, detecting concurrent map writes, and fixing benign race hazards." }
        ]
      }
    ]
  },
  {
    id: "rust-systems",
    title: "Modern Rust & Memory Safety Systems Engineering",
    level: "Advanced",
    category: "Programming",
    modulesCount: 6,
    duration: "22h",
    progress: 0,
    modules: [
      {
        id: 1,
        title: "Ownership, Borrowing & Lifetimes Deep Dive",
        completed: false,
        isCurrent: true,
        subTopics: [
          { id: "rs-1-1", title: "Affine Type System & Move Semantics", desc: "Single ownership, resource reclamation at scope exit, copy vs move types, and compiler borrow checker." },
          { id: "rs-1-2", title: "Exclusive (&mut T) vs Shared (&T) References", desc: "Aliasing XOR Mutability theorem, preventing data races at compile-time without runtime locks." },
          { id: "rs-1-3", title: "Lifetime Annotations & Lifetime Elision Rules", desc: "Compiler elision rules for function signatures, multiple lifetime parameters, and struct lifetime bounds." },
          { id: "rs-1-4", title: "Static ('static) vs Named Lifetimes & Variance", desc: "Subtyping, variance (covariance, contravariance, invariance) in reference lifetimes." }
        ]
      },
      {
        id: 2,
        title: "Smart Pointers & Custom Memory Layouts",
        completed: false,
        subTopics: [
          { id: "rs-2-1", title: "Box<T> Heap Allocation & Deref Coercion", desc: "Recursive data structures, unboxed sized types, and custom Deref and DerefMut implementations." },
          { id: "rs-2-2", title: "Rc<T> & Arc<T> Reference Counting Internals", desc: "Strong vs weak count, cyclic memory leak prevention with Weak<T>, and atomic operations in Arc." },
          { id: "rs-2-3", title: "RefCell<T> & The Interior Mutability Pattern", desc: "Dynamic borrow checking at runtime, borrow() vs borrow_mut(), and panic safety on borrow violations." },
          { id: "rs-2-4", title: "The Drop Trait & RAII Resource Cleanup", desc: "Deterministic destruction order, preventing double-free, and std::mem::forget for foreign resources." }
        ]
      },
      {
        id: 3,
        title: "Traits, Generics & Zero-Cost Abstractions",
        completed: false,
        subTopics: [
          { id: "rs-3-1", title: "Static Dispatch via Monomorphization", desc: "Zero-cost generic functions, compiler code generation, binary size impact, and inline optimization." },
          { id: "rs-3-2", title: "Dynamic Dispatch via Trait Objects (dyn Trait)", desc: "Fat pointers (data pointer + vtable pointer), runtime method resolution, and object safety rules." },
          { id: "rs-3-3", title: "Associated Types vs Generic Traits", desc: "Iterator and Add trait design, reducing boilerplate type parameters, and type equality constraints." },
          { id: "rs-3-4", title: "Marker Traits (Send, Sync, Unpin, Sized)", desc: "Auto-traits, thread-boundary safety checks by compiler, and !Send/!Sync opt-outs." }
        ]
      },
      {
        id: 4,
        title: "Unsafe Rust & FFI Interoperability",
        completed: false,
        subTopics: [
          { id: "rs-4-1", title: "The 5 Unsafe Superpowers", desc: "Dereferencing raw pointers, calling unsafe functions/methods, implementing unsafe traits, mutating static mut." },
          { id: "rs-4-2", title: "Undefined Behavior (UB) & Miri Validation", desc: "Stacked Borrows and Tree Borrows model, detecting dangling pointers and aliasing violations with Miri." },
          { id: "rs-4-3", title: "C ABI & FFI (Foreign Function Interface)", desc: "extern 'C', repr(C) memory layout, passing pointers across language boundaries, and bindgen." },
          { id: "rs-4-4", title: "Building Safe Abstractions over Unsafe Internals", desc: "Writing safe wrappers (like Vec or Mutex) that preserve sound invariants for library consumers." }
        ]
      },
      {
        id: 5,
        title: "Asynchronous Rust & Tokio Runtime Internals",
        completed: false,
        subTopics: [
          { id: "rs-5-1", title: "Future Trait & State Machine Compilation", desc: "poll(cx: &mut Context) -> Poll<T>, compiler-generated async state machines without allocations." },
          { id: "rs-5-2", title: "Pinning & Pin<&mut T> Mechanics", desc: "Self-referential structs in async state machines, address stability, and Unpin safety guarantees." },
          { id: "rs-5-3", title: "Tokio Multi-Threaded Work-Stealing Reactor", desc: "Task spawning, cooperative scheduling, yield_now, and non-blocking network socket drivers." },
          { id: "rs-5-4", title: "Async Channels (mpsc, oneshot, broadcast, watch)", desc: "Backpressure, channel capacity limits, and building fault-tolerant actor systems." }
        ]
      },
      {
        id: 6,
        title: "Lock-Free Data Structures & Multithreading",
        completed: false,
        subTopics: [
          { id: "rs-6-1", title: "std::sync::Mutex vs parking_lot Mutex", desc: "OS futex synchronization, lock poisoning on panic, and cache-friendly 1-byte mutexes." },
          { id: "rs-6-2", title: "Atomic Memory Ordering (Relaxed, Acquire, Release, SeqCst)", desc: "Hardware memory barriers, happens-before relationships, and lock-free flag synchronization." },
          { id: "rs-6-3", title: "Lock-Free Stacks & Queues (Treiber Stack)", desc: "CAS (Compare-And-Swap) loops, ABA problem mitigation with epoch-based memory reclamation (crossbeam-epoch)." },
          { id: "rs-6-4", title: "SIMD Vectorization & Rayon Data Parallelism", desc: "Auto-vectorization with portable-simd, work-stealing parallel iterators with Rayon." }
        ]
      }
    ]
  },
  {
    id: "appsec-engineering",
    title: "Advanced Application Security (AppSec) & Ethical Hacking",
    level: "Advanced",
    category: "Cyber Security",
    modulesCount: 6,
    duration: "20h",
    progress: 0,
    modules: [
      {
        id: 1,
        title: "Modern Web Exploits & OWASP Deep Dives",
        completed: false,
        isCurrent: true,
        subTopics: [
          { id: "sec-1-1", title: "Server-Side Request Forgery (SSRF) in Cloud Environments", desc: "Cloud metadata endpoint (169.254.169.254) theft, DNS rebinding attacks, and egress firewall filtering." },
          { id: "sec-1-2", title: "SQL Injection & Second-Order Injection Defense", desc: "Parameterized queries, ORM injection hazards, blind boolean/time-based exfiltration, and escaping." },
          { id: "sec-1-3", title: "Cross-Site Scripting (XSS) & Content Security Policy (CSP)", desc: "DOM-based vs Stored XSS, strict CSP nonces, Trusted Types API, and modern frontend sanitization." },
          { id: "sec-1-4", title: "CSRF & Modern SameSite Cookie Defenses", desc: "Anti-CSRF tokens, SameSite=Strict vs Lax, Double Submit Cookie pattern, and Origin header verification." }
        ]
      },
      {
        id: 2,
        title: "Authentication Protocols & Token Security",
        completed: false,
        subTopics: [
          { id: "sec-2-1", title: "OAuth 2.0 & OIDC Flow Security (PKCE)", desc: "Authorization Code Flow with PKCE, state parameter protection against CSRF, and redirect URI validation." },
          { id: "sec-2-2", title: "JWT Architecture & Vulnerabilities (alg: none, weak keys)", desc: "Signature verification, asymmetric RS256/ES256 vs symmetric HS256, key rotation, and jwks_uri spoofing." },
          { id: "sec-2-3", title: "Session Management & Invalidation at Scale", desc: "Distributed session revocation with Redis bloom filters, sliding session timeouts, and token rotation." },
          { id: "sec-2-4", title: "Multi-Factor Authentication (MFA) & WebAuthn / Passkeys", desc: "FIDO2 / WebAuthn public-key credentials, phishing-resistant hardware tokens, and TOTP algorithms." }
        ]
      },
      {
        id: 3,
        title: "Applied Cryptography & Key Management",
        completed: false,
        subTopics: [
          { id: "sec-3-1", title: "Symmetric Encryption: AES-256-GCM & ChaCha20-Poly1305", desc: "Authenticated Encryption with Associated Data (AEAD), nonce reuse catastrophes, and ciphertext integrity." },
          { id: "sec-3-2", title: "Asymmetric Cryptography: RSA vs Ed25519 / Curve25519", desc: "Public-key signatures, key exchange (ECDHE), performance comparisons, and quantum-resistant algorithms." },
          { id: "sec-3-3", title: "Password Hashing: Argon2id, bcrypt & PBKDF2", desc: "Memory-hard functions, time cost, parallelism parameters, and preventing GPU/ASIC brute-forcing." },
          { id: "sec-3-4", title: "Key Management Systems (KMS) & Envelope Encryption", desc: "Data Encryption Keys (DEKs) vs Key Encryption Keys (KEKs), AWS KMS / Vault, and automated key rotation." }
        ]
      },
      {
        id: 4,
        title: "API Gateway Security & Microservice Protection",
        completed: false,
        subTopics: [
          { id: "sec-4-1", title: "mTLS (Mutual TLS) Service Mesh Authentication", desc: "Zero-trust pod-to-pod identity with SPIFFE/SPIRE, certificate renewal, and Istio Envoy proxies." },
          { id: "sec-4-2", title: "API Rate Limiting & DoS Defense Strategies", desc: "Distributed token bucket algorithms, IP reputation lists, Cloudflare WAF, and CAPTCHA challenge escalation." },
          { id: "sec-4-3", title: "GraphQL Security: Depth Limiting & Query Complexity", desc: "Preventing recursive batching denial-of-service, disabling introspection in production, and query whitelisting." },
          { id: "sec-4-4", title: "Input Validation & Mass Assignment Vulnerabilities", desc: "Strict schema contracts with Zod/Pydantic, preventing parameter pollution and unpermitted field mutation." }
        ]
      },
      {
        id: 5,
        title: "Cloud & Infrastructure Security (AWS / GCP / K8s)",
        completed: false,
        subTopics: [
          { id: "sec-5-1", title: "IAM Least Privilege & Privilege Escalation Paths", desc: "IAM policy evaluation logic, PassRole vulnerabilities, session policy boundaries, and service control policies (SCPs)." },
          { id: "sec-5-2", title: "Kubernetes Security: Pod Security Admission & Network Policies", desc: "Restricting root containers, dropping Linux capabilities, read-only root filesystems, and default deny network policies." },
          { id: "sec-5-3", title: "Secrets Management: HashiCorp Vault & AWS Secrets Manager", desc: "Dynamic database credentials, ephemeral secret leases, and injecting secrets via Kubernetes CSI drivers." },
          { id: "sec-5-4", title: "Container Image Security & Supply Chain (SLSA)", desc: "Software Bill of Materials (SBOM), container signing with Cosign, and vulnerability scanning with Trivy." }
        ]
      },
      {
        id: 6,
        title: "DevSecOps & Automated Security Pipelines",
        completed: false,
        subTopics: [
          { id: "sec-6-1", title: "SAST (Static Application Security Testing) with Semgrep", desc: "Writing custom abstract syntax tree (AST) rules to catch insecure functions and hardcoded secrets." },
          { id: "sec-6-2", title: "DAST (Dynamic Analysis) & API Fuzzing", desc: "Automated OWASP ZAP scans in GitHub Actions, fuzzing API endpoints with random payloads." },
          { id: "sec-6-3", title: "Dependency Security & Software Supply Chain Attacks", desc: "Typosquatting prevention, npm/PyPI lockfile integrity, automated Dependabot PRs, and license compliance." },
          { id: "sec-6-4", title: "Incident Response & SIEM Log Audit Engineering", desc: "Centralized audit trails with OpenSearch/Datadog, detecting anomalous user logins, and automated account lockdown." }
        ]
      }
    ]
  },
  {
    id: "networking-internals",
    title: "Computer Networking Internals & Distributed Transport Protocols",
    level: "Intermediate",
    category: "Computer Science",
    modulesCount: 6,
    duration: "16h",
    progress: 0,
    modules: [
      {
        id: 1,
        title: "Physical & Data Link Layers",
        completed: false,
        isCurrent: true,
        subTopics: [
          { id: "net-1-1", title: "Ethernet Frames, MAC Addresses & ARP Protocol", desc: "MAC frame format, Address Resolution Protocol (ARP) cache poisoning, and collision domains." },
          { id: "net-1-2", title: "VLANs, Trunking (802.1Q) & Network Switches", desc: "Broadcast domain isolation, VLAN tagging, switch MAC learning tables, and Spanning Tree Protocol (STP)." },
          { id: "net-1-3", title: "MTU (Maximum Transmission Unit) & Path MTU Discovery", desc: "IP packet fragmentation, DF (Don't Fragment) bit, ICMP Destination Unreachable, and MSS negotiation." },
          { id: "net-1-4", title: "Network Interface Cards (NIC), Ring Buffers & DMA", desc: "Packet reception interrupts, NAPI polling, ring buffer packet drops, and hardware offloading (TSO/GSO)." }
        ]
      },
      {
        id: 2,
        title: "Internet Layer: IPv4, IPv6 & BGP Anycast Routing",
        completed: false,
        subTopics: [
          { id: "net-2-1", title: "IPv4 vs IPv6 Packet Header Architecture", desc: "32-bit vs 128-bit address space, header checksum removal, extension headers, and SLAAC autoconfiguration." },
          { id: "net-2-2", title: "CIDR Subnetting & Longest Prefix Match Routing", desc: "Subnet masks (/24, /16), routing table lookups with Trie data structures, and default gateways." },
          { id: "net-2-3", title: "BGP (Border Gateway Protocol) & Anycast IP Architecture", desc: "Autonomous Systems (AS), path vector routing, route flapping, and routing traffic to nearest CDN edge." },
          { id: "net-2-4", title: "NAT (Network Address Translation) & Carrier-Grade NAT", desc: "PAT (Port Address Translation), STUN/TURN traversal, and connection tracking tables (conntrack)." }
        ]
      },
      {
        id: 3,
        title: "Deep TCP Internals & Congestion Control",
        completed: false,
        subTopics: [
          { id: "net-3-1", title: "TCP 3-Way Handshake & State Machine", desc: "SYN, SYN-ACK, ACK sequence numbers, ISN randomization, SYN flood defense via SYN Cookies." },
          { id: "net-3-2", title: "TCP Flow Control & Window Scaling", desc: "Sliding window protocol, TCP Receive Window (rwnd), Zero Window probes, and Nagle's algorithm (TCP_NODELAY)." },
          { id: "net-3-3", title: "Congestion Control: Tahoe, Reno, Cubic vs Google BBR", desc: "Slow Start, Congestion Avoidance, Fast Retransmit, and bottleneck bandwidth round-trip propagation time (BBR)." },
          { id: "net-3-4", title: "Connection Teardown & The TIME_WAIT State", desc: "FIN/ACK handshakes, 2*MSL (Maximum Segment Lifetime), socket reuse (SO_REUSEADDR), and port exhaustion." }
        ]
      },
      {
        id: 4,
        title: "UDP, QUIC & HTTP/3 Transport Architecture",
        completed: false,
        subTopics: [
          { id: "net-4-1", title: "UDP Simplicity & Header Architecture", desc: "Connectionless, 8-byte minimal header, unreliable datagram delivery, and real-time media streaming." },
          { id: "net-4-2", title: "The Head-of-Line Blocking Problem in TCP", desc: "Why single packet loss halts all multiplexed streams in HTTP/2, and how QUIC solves this per-stream." },
          { id: "net-4-3", title: "QUIC Protocol & Integrated TLS 1.3 Handshake", desc: "0-RTT connection establishment, encrypted packet headers, and forward error correction." },
          { id: "net-4-4", title: "Connection Migration over WiFi & Cellular", desc: "Connection IDs replacing 4-tuple IP/port addresses, enabling seamless network handover without disconnect." }
        ]
      },
      {
        id: 5,
        title: "Application Layer: HTTP/2, WebSockets & gRPC",
        completed: false,
        subTopics: [
          { id: "net-5-1", title: "HTTP/1.1 Pipelining vs HTTP/2 Binary Framing", desc: "Binary framing layer, stream prioritization, HPACK header compression, and server push." },
          { id: "net-5-2", title: "WebSockets Protocol & Full-Duplex Framing", desc: "HTTP 101 Switching Protocols upgrade, WebSocket masking key, ping/pong heartbeats, and frame headers." },
          { id: "net-5-3", title: "gRPC & Protocol Buffers Wire Format", desc: "Protobuf binary serialization, varint encoding, unary vs streaming RPCs, and gRPC deadline propagation." },
          { id: "net-5-4", title: "DNS Resolution Architecture & DNS-over-HTTPS (DoH)", desc: "Recursive vs iterative resolvers, root servers, TLD servers, DNS TTL caching, and encrypted DNS queries." }
        ]
      },
      {
        id: 6,
        title: "Linux Kernel Socket Programming & epoll",
        completed: false,
        subTopics: [
          { id: "net-6-1", title: "BSD Sockets API: socket, bind, listen, accept", desc: "File descriptor table, backlog queues (SYN queue vs Accept queue), and socket buffers." },
          { id: "net-6-2", title: "I/O Multiplexing: select, poll vs Linux epoll", desc: "O(N) descriptor scans vs epoll O(1) red-black tree registration and ready list notifications." },
          { id: "net-6-3", title: "Edge-Triggered (ET) vs Level-Triggered (LT) epoll", desc: "EAGAIN non-blocking drain loops, preventing missed event starvation, and high-performance server loops." },
          { id: "net-6-4", title: "Modern Linux io_uring Asynchronous I/O", desc: "Shared memory submission and completion rings, eliminating syscall overhead for millions of IOPS." }
        ]
      }
    ]
  },
  {
    id: "ml-mathematics",
    title: "Linear Algebra & Probability for Machine Learning",
    level: "Intermediate",
    category: "Mathematics",
    modulesCount: 6,
    duration: "15h",
    progress: 0,
    modules: [
      {
        id: 1,
        title: "Vector Spaces, Orthogonality & Projections",
        completed: false,
        isCurrent: true,
        subTopics: [
          { id: "mat-1-1", title: "Vector Spaces, Linear Independence & Span", desc: "Basis vectors, dimension of vector space, and span of training feature vectors." },
          { id: "mat-1-2", title: "Inner Products, Dot Products & Cosine Similarity", desc: "Geometric interpretation, vector projections, and computing semantic similarity in embedding spaces." },
          { id: "mat-1-3", title: "Vector Norms: L1, L2, and L-Infinity", desc: "Manhattan distance, Euclidean distance, L1 sparsity induction (Lasso), and L2 weight shrinkage (Ridge)." },
          { id: "mat-1-4", title: "Orthogonal Projections & Gram-Schmidt Process", desc: "Projecting data onto lower-dimensional subspaces, orthogonal matrices (Q^T * Q = I), and QR decomposition." }
        ]
      },
      {
        id: 2,
        title: "Matrix Decompositions & Dimensionality Reduction",
        completed: false,
        subTopics: [
          { id: "mat-2-1", title: "Matrix Rank, Null Space & Column Space", desc: "Full rank matrices, rank deficiency in feature datasets, and the Rank-Nullity theorem." },
          { id: "mat-2-2", title: "Eigenvalues & Eigenvectors Mathematics", desc: "Characteristic polynomial det(A - lambda*I) = 0, invariant directions, and eigendecomposition of symmetric matrices." },
          { id: "mat-2-3", title: "Singular Value Decomposition (SVD)", desc: "A = U * Sigma * V^T, singular values, best low-rank matrix approximation (Eckart-Young theorem)." },
          { id: "mat-2-4", title: "Principal Component Analysis (PCA) Derivation", desc: "Maximizing variance of projected points, covariance matrix eigendecomposition, and scree plots." }
        ]
      },
      {
        id: 3,
        title: "Multivariable Calculus & Optimization Mathematics",
        completed: false,
        subTopics: [
          { id: "mat-3-1", title: "Gradient Vectors & Directional Derivatives", desc: "Steepest descent direction, partial derivatives, and multi-variable chain rule in backpropagation." },
          { id: "mat-3-2", title: "Jacobian & Hessian Matrices", desc: "First-order derivatives of vector functions, second-order curvature, positive semi-definite Hessians." },
          { id: "mat-3-3", title: "Convex Optimization & Saddle Points", desc: "Convex sets and functions, Jensen's inequality, global minima guarantees, and non-convex neural landscapes." },
          { id: "mat-3-4", title: "Gradient Descent, Momentum & Adam Math", desc: "First and second moment estimation, exponential moving averages, and adaptive learning rate formulas." }
        ]
      },
      {
        id: 4,
        title: "Probability Distributions & Random Variables",
        completed: false,
        subTopics: [
          { id: "mat-4-1", title: "Probability Axioms, Conditional Probability & Independence", desc: "Sample spaces, law of total probability, and independent vs conditionally independent events." },
          { id: "mat-4-2", title: "Expectation, Variance & Covariance Matrices", desc: "Expected values of discrete/continuous variables, variance properties, and covariance matrix structure." },
          { id: "mat-4-3", title: "Multivariate Gaussian (Normal) Distribution", desc: "Probability density function, covariance contour ellipses, and properties of linear transformations." },
          { id: "mat-4-4", title: "The Central Limit Theorem & Law of Large Numbers", desc: "Asymptotic normality of sample averages, sample mean variance decay, and hypothesis test foundations." }
        ]
      },
      {
        id: 5,
        title: "Statistical Estimation & Bayesian Inference",
        completed: false,
        subTopics: [
          { id: "mat-5-1", title: "Maximum Likelihood Estimation (MLE)", desc: "Log-likelihood functions, maximizing parameters over observed data, and deriving Ordinary Least Squares." },
          { id: "mat-5-2", title: "Bayes' Theorem & Prior/Posterior Probabilities", desc: "P(Theta|X) = P(X|Theta) * P(Theta) / P(X), prior beliefs, evidence, and posterior updates." },
          { id: "mat-5-3", title: "Maximum A Posteriori (MAP) & Regularization Equivalence", desc: "Proving Gaussian prior yields L2 regularization (Ridge) and Laplace prior yields L1 regularization (Lasso)." },
          { id: "mat-5-4", title: "Markov Chains & Monte Carlo (MCMC) Sampling", desc: "Transition probability matrices, stationary distributions, Metropolis-Hastings algorithm, and Gibbs sampling." }
        ]
      },
      {
        id: 6,
        title: "Information Theory & Loss Function Derivations",
        completed: false,
        subTopics: [
          { id: "mat-6-1", title: "Shannon Entropy & Surprise Measure", desc: "H(X) = -sum(p(x) * log p(x)), bit entropy, data compression limits, and uncertainty quantification." },
          { id: "mat-6-2", title: "Kullback-Leibler (KL) Divergence", desc: "Measuring relative entropy between true distribution P and model distribution Q, non-negativity proof." },
          { id: "mat-6-3", title: "Cross-Entropy Loss Derivation", desc: "Equivalence of minimizing cross-entropy and maximizing likelihood in classification and LLM next-token loss." },
          { id: "mat-6-4", title: "Mutual Information & Feature Selection", desc: "Quantifying information shared between variables, applications in non-linear feature ranking." }
        ]
      }
    ]
  },
  {
    id: "advanced-competitive-dsa",
    title: "Advanced Competitive Data Structures & Algorithmic Patterns",
    level: "Advanced",
    category: "Data Structures",
    modulesCount: 6,
    duration: "24h",
    progress: 0,
    modules: [
      {
        id: 1,
        title: "Range Query Powerhouses",
        completed: false,
        isCurrent: true,
        subTopics: [
          { id: "cdsa-1-1", title: "Segment Tree with Lazy Propagation", desc: "O(log N) range updates and range queries, deferred tag propagation, associative operations." },
          { id: "cdsa-1-2", title: "Fenwick Tree (Binary Indexed Tree) Range Updates", desc: "Point updates, prefix sums, and difference array BIT for range update and point query in O(log N)." },
          { id: "cdsa-1-3", title: "Sparse Table for O(1) Range Minimum Queries", desc: "Power-of-two jump tables, idempotent operations (Min, Max, GCD), and O(N log N) preprocessing." },
          { id: "cdsa-1-4", title: "Square Root Decomposition (Mo's Algorithm)", desc: "Offline query sorting by blocks, expanding and shrinking range boundaries in O((N + Q) * sqrt(N))." }
        ]
      },
      {
        id: 2,
        title: "Advanced Tree Algorithms & Decompositions",
        completed: false,
        subTopics: [
          { id: "cdsa-2-1", title: "Lowest Common Ancestor (LCA) via Binary Lifting", desc: "Up-table jumping 2^k ancestors, tree path queries, and distance between arbitrary nodes in O(log N)." },
          { id: "cdsa-2-2", title: "Heavy-Light Decomposition (HLD)", desc: "Decomposing trees into heavy and light paths, flattening trees onto segment trees for O(log^2 N) path updates." },
          { id: "cdsa-2-3", title: "Tree Centroid Decomposition", desc: "Finding tree centroids (subtrees size <= N/2), divide-and-conquer on tree paths in O(N log N) overall time." },
          { id: "cdsa-2-4", title: "Euler Tour Technique (Tree Flattening)", desc: "Subtree mapping to contiguous array intervals using entry and exit timestamps." }
        ]
      },
      {
        id: 3,
        title: "Advanced String Algorithms",
        completed: false,
        subTopics: [
          { id: "cdsa-3-1", title: "Knuth-Morris-Pratt (KMP) Prefix Function", desc: "Building pi table in linear time, skipping unnecessary comparisons in O(N + M) single-pattern search." },
          { id: "cdsa-3-2", title: "Z-Algorithm for Substring Matching", desc: "Z-array computing longest common prefix between S and suffixes of S in strictly O(N) time." },
          { id: "cdsa-3-3", title: "Aho-Corasick Multi-Pattern Search Automaton", desc: "Trie with failure links and dictionary output links, finding all k keywords in O(N + total matches)." },
          { id: "cdsa-3-4", title: "Suffix Automaton (SAM) & Suffix Arrays", desc: "Minimal DFA recognizing all suffixes of a string in O(N) states, distinct substring counting." }
        ]
      },
      {
        id: 4,
        title: "Network Flows & Advanced Graph Theorems",
        completed: false,
        subTopics: [
          { id: "cdsa-4-1", title: "Bridges & Articulation Points (Tarjan's Algorithm)", desc: "Discovery time, low-link values, back-edges, and critical network bottleneck detection in O(V + E)." },
          { id: "cdsa-4-2", title: "Max Flow & Min Cut with Dinic's Algorithm", desc: "Level graphs, blocking flows via DFS, layered network push in O(V^2 * E) and O(E * sqrt(V)) on unit networks." },
          { id: "cdsa-4-3", title: "Bipartite Matching (Hopcroft-Karp Algorithm)", desc: "Finding maximum cardinality matching in bipartite graphs in O(E * sqrt(V)) time." },
          { id: "cdsa-4-4", title: "2-SAT (Boolean Satisfiability with Implication Graphs)", desc: "Constructing directed implication graphs, finding Strongly Connected Components (SCCs), and linear solvability." }
        ]
      },
      {
        id: 5,
        title: "Advanced Dynamic Programming Optimizations",
        completed: false,
        subTopics: [
          { id: "cdsa-5-1", title: "Digit DP for Counting Numbers with Properties", desc: "dp[index][tight][leading_zeros], memoizing prefix constraints over number base representations." },
          { id: "cdsa-5-2", title: "Bitmask DP & SOS (Sum Over Subsets) DP", desc: "Traveling Salesperson O(2^N * N^2), subset sum aggregation, and O(N * 2^N) multidimensional SOS DP." },
          { id: "cdsa-5-3", title: "Convex Hull Trick & Line Container", desc: "Optimizing DP transitions of form dp[i] = min(m_j * x_i + c_j) from O(N^2) to O(N log N) using envelope lines." },
          { id: "cdsa-5-4", title: "Matrix Exponentiation for Linear Recurrences", desc: "Solving k-term linear recurrences (like large Nth Fibonacci) in O(k^3 * log N) time." }
        ]
      },
      {
        id: 6,
        title: "Randomized & Balanced Search Structures",
        completed: false,
        subTopics: [
          { id: "cdsa-6-1", title: "Treap (Randomized Binary Search Tree)", desc: "Combining BST key ordering with max-heap priority ordering, split and merge operations in O(log N)." },
          { id: "cdsa-6-2", title: "Skip List Concurrent Architecture", desc: "Multi-level linked lists with probabilistic height promotion, O(log N) lock-free search and insert." },
          { id: "cdsa-6-3", title: "Reservoir Sampling & Stream Select", desc: "Selecting uniform random sample of K items from infinite stream in single pass with O(K) memory." },
          { id: "cdsa-6-4", title: "Randomized Quickselect & Median-of-Medians", desc: "Expected O(N) selection of Kth smallest element, worst-case linear selection guarantees." }
        ]
      }
    ]
  },
  {
    id: "mlops-engineering",
    title: "Production Machine Learning Engineering (MLOps)",
    level: "Advanced",
    category: "Artificial Intelligence",
    modulesCount: 5,
    duration: "18h",
    progress: 0,
    modules: [
      {
        id: 1,
        title: "Feature Engineering & Feature Stores",
        completed: false,
        isCurrent: true,
        subTopics: [
          { id: "ops-1-1", title: "Feast Open-Source Feature Store Architecture", desc: "Entity definitions, feature views, online (Redis) low-latency retrieval vs offline (BigQuery/Snowflake) historical batch." },
          { id: "ops-1-2", title: "Point-in-Time Correctness & Time Travel Joins", desc: "Preventing data leakage in training datasets by joining features as of the exact label observation timestamp." },
          { id: "ops-1-3", title: "Data Drift & Schema Validation with Evidently AI", desc: "Kolmogorov-Smirnov test, Wasserstein distance, schema enforcement, and detecting feature distribution changes." },
          { id: "ops-1-4", title: "Real-Time Streaming Feature Pipelines (Kafka + Flink)", desc: "Windowed aggregations (count of logins in past 10 minutes) pushed directly to low-latency key-value stores." }
        ]
      },
      {
        id: 2,
        title: "Model Training Pipelines & Experiment Tracking",
        completed: false,
        subTopics: [
          { id: "ops-2-1", title: "MLflow Tracking & Model Registry", desc: "Logging hyperparameters, metrics, artifacts, model staging environments (Staging -> Production), and webhooks." },
          { id: "ops-2-2", title: "Data Version Control (DVC) & Git Integration", desc: "Versioning multi-gigabyte training datasets on S3/GCS while maintaining Git commit hashes." },
          { id: "ops-2-3", title: "Distributed Training with PyTorch DDP", desc: "DistributedDataParallel, gradient synchronization with Ring-AllReduce, NCCL communication backend." },
          { id: "ops-2-4", title: "Kubeflow & Vertex AI Pipeline Orchestration", desc: "Declarative DAG pipelines, containerized pipeline components, and automated artifact lineage tracking." }
        ]
      },
      {
        id: 3,
        title: "Model Optimization & Hardware Compilation",
        completed: false,
        subTopics: [
          { id: "ops-3-1", title: "ONNX (Open Neural Network Exchange) Runtime", desc: "Cross-platform model export, graph optimizations, operator fusion, and running ONNX on CPU/GPU." },
          { id: "ops-3-2", title: "NVIDIA TensorRT GPU Acceleration", desc: "Layer and tensor fusion, kernel auto-tuning, dynamic tensor memory allocation, and FP16/INT8 calibration." },
          { id: "ops-3-3", title: "Post-Training Quantization (PTQ) vs QAT", desc: "Quantization-Aware Training, INT8 symmetric quantization, and maintaining model accuracy metrics." },
          { id: "ops-3-4", title: "Structured & Unstructured Model Pruning", desc: "Magnitude-based pruning, channel pruning for convolutional nets, and sparse matrix inference." }
        ]
      },
      {
        id: 4,
        title: "Production Model Serving & High-Throughput Microservices",
        completed: false,
        subTopics: [
          { id: "ops-4-1", title: "Triton Inference Server Architecture", desc: "Dynamic batching, concurrent model execution, model ensembling, and shared memory IPC." },
          { id: "ops-4-2", title: "FastAPI Async Inference Endpoints", desc: "Non-blocking async request processing, connection pooling, and payload validation with Pydantic." },
          { id: "ops-4-3", title: "Canary Deployments & Shadow Traffic Routing", desc: "Dark launching new model versions with Envoy/Nginx, comparing shadow outputs without user impact." },
          { id: "ops-4-4", title: "Multi-Armed Bandits for Online Model Selection", desc: "Epsilon-greedy and Thompson Sampling for dynamic traffic allocation to highest-converting model variants." }
        ]
      },
      {
        id: 5,
        title: "Continuous Monitoring & Automated Retraining",
        completed: false,
        subTopics: [
          { id: "ops-5-1", title: "Concept Drift & Prediction Drift Monitoring", desc: "Detecting changes in relationship between input features and target labels P(Y|X) using PSI." },
          { id: "ops-5-2", title: "Prometheus & Grafana ML Telemetry Metrics", desc: "Inference latency p99, request volume, error rates, GPU temperature, and memory utilization dashboards." },
          { id: "ops-5-3", title: "Automated Retraining Triggers & CI/CD Pipelines", desc: "GitHub Actions triggered by performance degradation alerts, automated test evaluation, and artifact deployment." },
          { id: "ops-5-4", title: "A/B Testing & Offline-to-Online Metric Correlation", desc: "Statistical significance testing, p-values, sample size calculations, and avoiding false discoveries." }
        ]
      }
    ]
  }
];
