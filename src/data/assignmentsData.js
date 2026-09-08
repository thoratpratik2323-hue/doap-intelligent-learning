// DOAP Production GitHub-Style Practical Industry Assignments & Take-Home Challenges

export const GITHUB_ASSIGNMENTS = [
  {
    "id": "github-rate-limiter",
    "title": "High-Throughput Distributed Rate Limiter Service",
    "companyStyle": "Stripe & Cloudflare Architecture",
    "category": "System Design & Backend",
    "level": "Advanced",
    "estimatedHours": "4 - 6 hours",
    "badge": "Tier-1 Take-Home Challenge",
    "githubRepo": "github.com/doap-org/distributed-token-bucket-limiter",
    "techStack": [
      "Node.js / Go",
      "Redis",
      "Docker",
      "Jest / Pytest",
      "GitHub Actions"
    ],
    "summary": "Build an enterprise-grade, low-latency API rate limiting middleware using the Token Bucket and Sliding Window Log algorithms backed by Redis cluster.",
    "overview": "You are tasked with engineering a production-ready rate limiting service for an API gateway processing up to 50,000 requests per second. The service must prevent denial-of-service, protect downstream microservices, and enforce tier-based quotas (Free vs Pro tiers) with sub-millisecond overhead.",
    "requirements": [
      "Implement the Token Bucket and Sliding Window Counter rate-limiting algorithms with atomic Redis Lua scripts to eliminate race conditions.",
      "Support tiered client quotas (e.g. Free: 60 req/min, Pro: 1,000 req/min) identified via API key or JWT bearer token.",
      "Return standard HTTP headers on every response: X-RateLimit-Limit, X-RateLimit-Remaining, and X-RateLimit-Reset.",
      "Return HTTP 429 Too Many Requests with Retry-After header and structured JSON error payload when quota is exhausted.",
      "Ensure graceful degradation: if the Redis cluster becomes temporarily unreachable, fall back safely to in-memory local cache without crashing."
    ],
    "deliverables": [
      "Clean, modular source code with strict separation of concerns (controller, rate limiter engine, Redis client).",
      "Comprehensive test suite achieving >90% code coverage including concurrent load simulation tests.",
      "Dockerfile with multi-stage build and docker-compose.yml setting up the API and Redis instance.",
      ".github/workflows/ci.yml running linting, formatting, and automated test runners on push."
    ],
    "starterSnippet": "// rateLimiter.js - Token Bucket Implementation using Redis Lua Script\nconst REDIS_LUA_TOKEN_BUCKET = `\n  local key = KEYS[1]\n  local capacity = tonumber(ARGV[1])\n  local refillRate = tonumber(ARGV[2])\n  local now = tonumber(ARGV[3])\n  local requested = tonumber(ARGV[4])\n\n  local data = redis.call(\"HMGET\", key, \"tokens\", \"lastRefill\")\n  local tokens = tonumber(data[1])\n  local lastRefill = tonumber(data[2])\n\n  if not tokens then\n    tokens = capacity\n    lastRefill = now\n  else\n    local elapsed = math.max(0, now - lastRefill)\n    tokens = math.min(capacity, tokens + elapsed * refillRate)\n    lastRefill = now\n  end\n\n  if tokens >= requested then\n    tokens = tokens - requested\n    redis.call(\"HMSET\", key, \"tokens\", tokens, \"lastRefill\", lastRefill)\n    redis.call(\"EXPIRE\", key, math.ceil(capacity / refillRate) * 2)\n    return {1, tokens}\n  else\n    return {0, tokens}\n  end\n`;\n\nexport async function checkRateLimit(redisClient, clientId, tierConfig) {\n  const now = Date.now() / 1000;\n  const key = `ratelimit:${clientId}`;\n  const [allowed, remaining] = await redisClient.eval(\n    REDIS_LUA_TOKEN_BUCKET,\n    1,\n    key,\n    tierConfig.capacity,\n    tierConfig.refillRate,\n    now,\n    1\n  );\n  return { isAllowed: allowed === 1, remainingTokens: remaining };\n}",
    "rubric": [
      {
        "aspect": "Algorithmic Correctness & Race Condition Prevention",
        "points": 30
      },
      {
        "aspect": "System Resilience & Graceful Fallback",
        "points": 25
      },
      {
        "aspect": "Automated Testing & Edge-Case Coverage",
        "points": 25
      },
      {
        "aspect": "Code Cleanliness, Dockerization & CI Automation",
        "points": 20
      }
    ]
  },
  {
    "id": "github-kv-store",
    "title": "Persistent Key-Value Storage Engine with WAL & Compaction",
    "companyStyle": "Datadog & CockroachDB Architecture",
    "category": "Low-Level Systems & OS",
    "level": "Advanced",
    "estimatedHours": "6 - 8 hours",
    "badge": "Systems Engineering Project",
    "githubRepo": "github.com/doap-org/bitcask-wal-kv-store",
    "techStack": [
      "Rust / C++ / Python",
      "POSIX File API",
      "Binary Protocol",
      "Docker"
    ],
    "summary": "Architect an append-only log structured key-value storage engine inspired by Bitcask, featuring Write-Ahead Logging (WAL), in-memory hash indexing, and offline segment compaction.",
    "overview": "Modern distributed databases rely on append-only storage engines to achieve predictable high write throughput on NVMe SSDs. In this assignment, you will construct a crash-resilient key-value store from scratch implementing the Bitcask design pattern.",
    "requirements": [
      "Implement an append-only log file on disk where all writes (put/delete) write fixed binary headers: [crc32, timestamp, key_size, value_size, key, value].",
      "Maintain an in-memory KeyDir hash table storing each active key's file_id, value_size, and byte offset for O(1) random reads.",
      "Support atomic crash recovery: on server boot, replay the log file to reconstruct the KeyDir without data loss.",
      "Implement background segment compaction (merge process) to discard superseded keys and tombstones, reclaiming disk space.",
      "Handle data corruption detection using CRC32 checksum verification on every read operation."
    ],
    "deliverables": [
      "Storage engine core library with clear API: put(key, val), get(key), delete(key), compact().",
      "Benchmark script demonstrating throughput under 100,000 sequential writes and random reads.",
      "Crash recovery integration tests killing the process mid-write and verifying data integrity on restart.",
      "README documenting file format specifications and disk layout diagrams."
    ],
    "starterSnippet": "# storage_engine.py - Bitcask Binary Log Entry Packing\nimport struct\nimport time\nimport zlib\nimport os\n\nHEADER_FORMAT = \"<IIII\"\nHEADER_SIZE = struct.calcsize(HEADER_FORMAT)\n\nclass StorageEngine:\n    def __init__(self, data_dir=\"./data\"):\n        self.data_dir = data_dir\n        os.makedirs(data_dir, exist_ok=True)\n        self.active_file_path = os.path.join(data_dir, \"active.db\")\n        self.active_file = open(self.active_file_path, \"a+b\", buffering=0)\n        self.keydir = {}\n        self._rebuild_index()\n\n    def put(self, key: str, value: bytes) -> bool:\n        key_bytes = key.encode(\"utf-8\")\n        timestamp = int(time.time())\n        key_len = len(key_bytes)\n        val_len = len(value)\n\n        payload = key_bytes + value\n        crc = zlib.crc32(payload)\n        header = struct.pack(HEADER_FORMAT, crc, timestamp, key_len, val_len)\n\n        offset = self.active_file.tell()\n        self.active_file.write(header + payload)\n        self.keydir[key] = (offset, val_len, timestamp)\n        return True",
    "rubric": [
      {
        "aspect": "Binary Serialization & File Format Safety",
        "points": 30
      },
      {
        "aspect": "Crash Recovery & Index Reconstruction",
        "points": 25
      },
      {
        "aspect": "Background Compaction & Disk Reclamation",
        "points": 25
      },
      {
        "aspect": "Throughput Benchmarking & Code Quality",
        "points": 20
      }
    ]
  },
  {
    "id": "github-task-orchestrator",
    "title": "Distributed Asynchronous Job Queue with Worker Pool",
    "companyStyle": "Uber & Airbnb Infrastructure",
    "category": "System Design & Backend",
    "level": "Advanced",
    "estimatedHours": "5 - 7 hours",
    "badge": "Distributed Systems Project",
    "githubRepo": "github.com/doap-org/distributed-task-orchestrator",
    "techStack": [
      "Node.js / Python / Go",
      "Redis / RabbitMQ",
      "Docker Compose",
      "Prometheus"
    ],
    "summary": "Construct a reliable distributed background job worker pool with priority scheduling, exponential backoff retries, and dead-letter queues.",
    "overview": "Background asynchronous tasks (sending emails, video transcoding, PDF generation, webhook delivery) must be resilient to transient network glitches and machine crashes. Build an industrial-strength task execution engine modeled after Celery and BullMQ.",
    "requirements": [
      "Job Producer & Consumer architecture with priority queues (CRITICAL, HIGH, NORMAL, LOW).",
      "Worker pool concurrency control: workers execute tasks concurrently up to a configurable concurrency limit.",
      "Dead Letter Queue (DLQ): tasks failing after N retries (e.g. 5 attempts) are automatically moved to DLQ with full stack trace.",
      "Exponential backoff with jitter algorithm for retry delays: delay = min(max_delay, base * 2^attempt + jitter).",
      "Graceful worker shutdown: on SIGTERM/SIGINT, workers finish currently executing jobs without losing uncommitted tasks."
    ],
    "deliverables": [
      "Producer SDK and Worker daemon executable.",
      "Docker compose topology orchestrating Redis, 3 worker containers, and an API service.",
      "Prometheus metrics endpoint exporting jobs_completed_total, jobs_failed_total, and queue_latency_seconds.",
      "Chaos testing suite simulating worker crashes during job execution."
    ],
    "starterSnippet": "// workerPool.js - Graceful Task Execution Loop\nclass WorkerPool {\n  constructor(queueClient, concurrency = 4) {\n    this.queue = queueClient;\n    this.concurrency = concurrency;\n    this.activeWorkers = 0;\n    this.isShuttingDown = false;\n  }\n\n  async start() {\n    process.on('SIGTERM', () => this.gracefulShutdown());\n    process.on('SIGINT', () => this.gracefulShutdown());\n\n    while (!this.isShuttingDown) {\n      if (this.activeWorkers < this.concurrency) {\n        const job = await this.queue.popNextPriorityJob();\n        if (job) {\n          this.activeWorkers++;\n          this.processJob(job).finally(() => {\n            this.activeWorkers--;\n          });\n        }\n      }\n      await new Promise(r => setTimeout(r, 50));\n    }\n  }\n\n  async processJob(job) {\n    try {\n      await job.handler(job.payload);\n      await this.queue.acknowledgeSuccess(job.id);\n    } catch (err) {\n      await this.queue.handleFailure(job, err);\n    }\n  }\n}",
    "rubric": [
      {
        "aspect": "Concurrency Safety & Worker Management",
        "points": 30
      },
      {
        "aspect": "Exponential Backoff & Dead Letter Handling",
        "points": 25
      },
      {
        "aspect": "Graceful Signal Handling & Zero Data Loss",
        "points": 25
      },
      {
        "aspect": "Observability & Production Containerization",
        "points": 20
      }
    ]
  },
  {
    "id": "github-realtime-docs",
    "title": "Real-Time Collaborative Document Sync Engine",
    "companyStyle": "Figma & Google Docs Engineering",
    "category": "Full-Stack & APIs",
    "level": "Advanced",
    "estimatedHours": "5 - 7 hours",
    "badge": "Real-Time Systems Project",
    "githubRepo": "github.com/doap-org/realtime-collaborative-sync",
    "techStack": [
      "TypeScript / React",
      "WebSockets",
      "Operational Transformation (OT) / CRDT",
      "Node.js"
    ],
    "summary": "Implement real-time multi-client text document collaboration using Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs).",
    "overview": "Collaborative editing platforms must allow multiple remote engineers to type into the exact same document simultaneously without cursor jumping, character loss, or state divergence. Build the synchronization core for real-time document consensus.",
    "requirements": [
      "WebSocket server managing active document rooms, user presence, and versioned edit logs.",
      "Operational Transformation engine handling concurrent INSERT and DELETE operations on strings.",
      "Client-side optimistic updates: local keystrokes render instantaneously, with server acknowledgments reconciling revisions.",
      "Live user presence indicators: render remote collaborators' color-coded cursor positions and selection highlights.",
      "Full reconnection resilience: when client loses internet for 10 seconds, queued changes sync cleanly on reconnect."
    ],
    "deliverables": [
      "Frontend React rich-text editor connected via WebSockets to Node.js backend.",
      "Unit test suite proving mathematical convergence for arbitrary concurrent insertion and deletion permutations.",
      "Live multi-tab demonstration script validating conflict resolution.",
      "Architecture document explaining transform(op1, op2) mathematical properties."
    ],
    "starterSnippet": "// otEngine.ts - String Operational Transformation Invariant\nexport interface TextOperation {\n  type: 'INSERT' | 'DELETE' | 'RETAIN';\n  position: number;\n  text?: string;\n  length?: number;\n  revision: number;\n}\n\nexport function transform(opA: TextOperation, opB: TextOperation): [TextOperation, TextOperation] {\n  if (opA.type === 'INSERT' && opB.type === 'INSERT') {\n    if (opA.position <= opB.position) {\n      const transformedB: TextOperation = {\n        ...opB,\n        position: opB.position + (opA.text?.length || 0)\n      };\n      return [opA, transformedB];\n    }\n  }\n  return [opA, opB];\n}",
    "rubric": [
      {
        "aspect": "OT / CRDT Convergence Correctness",
        "points": 35
      },
      {
        "aspect": "WebSocket Protocol & Presence Tracking",
        "points": 25
      },
      {
        "aspect": "Reconnection & Offline Reconciliation",
        "points": 20
      },
      {
        "aspect": "Interactive UI & Automated Unit Tests",
        "points": 20
      }
    ]
  },
  {
    "id": "github-custom-allocator",
    "title": "Custom High-Performance Memory Allocator in C",
    "companyStyle": "Google Systems & Game Engine Design",
    "category": "Low-Level Systems & OS",
    "level": "Advanced",
    "estimatedHours": "6 - 8 hours",
    "badge": "Systems Architecture Project",
    "githubRepo": "github.com/doap-org/custom-memory-allocator",
    "techStack": [
      "C (C11)",
      "POSIX mmap / brk",
      "Valgrind",
      "GDB",
      "Makefile"
    ],
    "summary": "Develop a custom replacement for malloc, free, and realloc using segregated free lists, boundary tags, and 16-byte CPU memory alignment.",
    "overview": "High-frequency trading platforms and game engines bypass general-purpose glibc malloc in favor of custom memory allocators tailored to minimize heap fragmentation and eliminate lock contention. Build your own user-space heap allocator.",
    "requirements": [
      "Implement my_malloc(size_t size), my_free(void* ptr), and my_realloc(void* ptr, size_t size) using mmap/sbrk.",
      "Enforce 16-byte memory alignment on all allocated payloads to satisfy modern SIMD (AVX-512) memory access constraints.",
      "Segregated free list architecture: maintain multiple size-class linked lists for fast O(1) allocation of small blocks.",
      "Boundary tags and immediate coalescing: when freeing a memory chunk, instantly merge with adjacent unallocated blocks to defeat fragmentation.",
      "Zero memory leaks and heap corruption: verified using Valgrind and custom fuzz-testing scripts."
    ],
    "deliverables": [
      "Clean ANSI C library compiled with -Wall -Wextra -Werror flags.",
      "Benchmark executable comparing allocation latency against glibc malloc across 1,000,000 randomized allocations.",
      "Detailed Makefile with targets: make, make test, make valgrind, make clean.",
      "Documentation detailing block header structure and free list invariants."
    ],
    "starterSnippet": "// allocator.c - 16-Byte Aligned Boundary Tag Header\n#include <stddef.h>\n#include <stdint.h>\n#include <sys/mman.h>\n\n#define ALIGNMENT 16\n#define ALIGN(size) (((size) + (ALIGNMENT - 1)) & ~(ALIGNMENT - 1))\n\ntypedef struct BlockHeader {\n    size_t size;\n    int is_free;\n    struct BlockHeader* next;\n    struct BlockHeader* prev;\n} BlockHeader;\n\n#define BLOCK_HEADER_SIZE ALIGN(sizeof(BlockHeader))\n\nvoid* my_malloc(size_t size) {\n    if (size == 0) return NULL;\n    size_t total_size = ALIGN(size + BLOCK_HEADER_SIZE);\n    \n    BlockHeader* block = (BlockHeader*)mmap(\n        NULL, total_size, PROT_READ | PROT_WRITE, \n        MAP_PRIVATE | MAP_ANONYMOUS, -1, 0\n    );\n    if (block == MAP_FAILED) return NULL;\n\n    block->size = total_size;\n    block->is_free = 0;\n    return (void*)((char*)block + BLOCK_HEADER_SIZE);\n}",
    "rubric": [
      {
        "aspect": "Memory Alignment & Header Bitwise Arithmetic",
        "points": 30
      },
      {
        "aspect": "Block Coalescing & Fragmentation Defense",
        "points": 25
      },
      {
        "aspect": "Valgrind Memory Cleanliness & Valgrind Reports",
        "points": 25
      },
      {
        "aspect": "Benchmarking & Allocation Speedup",
        "points": 20
      }
    ]
  },
  {
    "id": "github-rag-inference-service",
    "title": "Production RAG Pipeline & LLM Inference Microservice",
    "companyStyle": "OpenAI & Anthropic Applied AI",
    "category": "AI & LLM Engineering",
    "level": "Advanced",
    "estimatedHours": "4 - 6 hours",
    "badge": "GenAI Production Architecture",
    "githubRepo": "github.com/doap-org/production-rag-inference-service",
    "techStack": [
      "Python 3.11",
      "FastAPI",
      "ChromaDB / Qdrant",
      "HuggingFace",
      "Docker"
    ],
    "summary": "Architect an enterprise RAG microservice with hybrid search (dense embeddings + BM25), semantic chunking, cross-encoder re-ranking, and streaming responses.",
    "overview": "Enterprise GenAI applications fail without grounding. Build a production-grade document ingestion and question-answering microservice equipped with hybrid search, hallucination guardrails, and streaming token delivery.",
    "requirements": [
      "Document ingestion endpoint accepting PDF/Markdown files, applying semantic boundary chunking with configurable overlap.",
      "Hybrid retrieval pipeline: combine dense cosine similarity (all-MiniLM-L6-v2) with sparse BM25 keyword matching via Reciprocal Rank Fusion (RRF).",
      "Cross-encoder re-ranking stage: score top 20 candidate chunks down to top 4 highest-relevance context passages.",
      "Streaming SSE (Server-Sent Events) API endpoint delivering generated tokens in real-time with citation source links.",
      "Confidence scoring and hallucination guardrail: reject answering queries when retrieval similarity falls below threshold."
    ],
    "deliverables": [
      "FastAPI microservice with OpenAPI / Swagger documentation.",
      "Pytest suite testing ingestion, embedding generation, and retrieval precision.",
      "Containerized Docker setup with volume-mounted vector index.",
      "Evaluation report benchmarking answer accuracy against ground-truth QA dataset."
    ],
    "starterSnippet": "# rag_service.py - Hybrid Retrieval & Reciprocal Rank Fusion\nfrom fastapi import FastAPI\nfrom fastapi.responses import StreamingResponse\n\napp = FastAPI(title=\"DOAP Enterprise RAG Service\")\n\ndef reciprocal_rank_fusion(dense_ranks, sparse_ranks, k=60):\n    rrf_scores = {}\n    for doc_id, rank in dense_ranks.items():\n        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0) + 1.0 / (k + rank)\n    for doc_id, rank in sparse_ranks.items():\n        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0) + 1.0 / (k + rank)\n    return sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)",
    "rubric": [
      {
        "aspect": "Hybrid Search & Re-Ranking Implementation",
        "points": 30
      },
      {
        "aspect": "Streaming Latency & Async API Performance",
        "points": 25
      },
      {
        "aspect": "Evaluation Metrics & Hallucination Guardrails",
        "points": 25
      },
      {
        "aspect": "Code Architecture, Dockerization & Testing",
        "points": 20
      }
    ]
  },
  {
    "id": "github-k8s-iac-pipeline",
    "title": "Multi-Region Cloud Infrastructure & GitOps Pipeline",
    "companyStyle": "AWS & Netflix Cloud Engineering",
    "category": "DevOps & Cloud Infra",
    "level": "Advanced",
    "estimatedHours": "5 - 7 hours",
    "badge": "Cloud Infrastructure Project",
    "githubRepo": "github.com/doap-org/terraform-kubernetes-gitops",
    "techStack": [
      "Terraform",
      "Kubernetes",
      "Helm",
      "GitHub Actions",
      "ArgoCD"
    ],
    "summary": "Write modular Terraform code provisioning a multi-AZ VPC, managed Kubernetes cluster, and deploy an automated GitOps delivery pipeline with Prometheus monitoring.",
    "overview": "Enterprise cloud platforms demand zero-downtime deployments and reproducible infrastructure as code. In this project, you will write declarative infrastructure blueprints and setup continuous GitOps deployment.",
    "requirements": [
      "Terraform modules for multi-AZ VPC, public/private subnets, NAT gateways, and Kubernetes cluster (EKS/GKE).",
      "Remote state locking configuration using S3 bucket and DynamoDB table.",
      "Helm chart for a microservice with configurable replicas, Horizontal Pod Autoscaler (HPA), and Pod Disruption Budget (PDB).",
      "GitHub Actions CI workflow: lints Terraform with tflint, runs security scans with tfsec, and verifies plans on PR.",
      "ArgoCD Application manifest enabling automated reconciliation and self-healing for Kubernetes deployments."
    ],
    "deliverables": [
      "Modular Terraform repository structured into modules/ and environments/ (dev/prod).",
      "Production-grade Helm chart with values.yaml templates.",
      "GitHub Actions workflow pipeline with automated status checks.",
      "Architecture diagram detailing network topology and GitOps flow."
    ],
    "starterSnippet": "# main.tf - Production Modular VPC Blueprint\nterraform {\n  required_version = \">= 1.5.0\"\n  backend \"s3\" {\n    bucket         = \"doap-terraform-state-prod\"\n    key            = \"platform/k8s-cluster.tfstate\"\n    region         = \"us-east-1\"\n    dynamodb_table = \"terraform-locks\"\n    encrypt        = true\n  }\n}\n\nmodule \"vpc\" {\n  source  = \"terraform-aws-modules/vpc/aws\"\n  version = \"5.0.0\"\n\n  name = \"doap-production-vpc\"\n  cidr = \"10.0.0.0/16\"\n\n  azs             = [\"us-east-1a\", \"us-east-1b\", \"us-east-1c\"]\n  private_subnets = [\"10.0.1.0/24\", \"10.0.2.0/24\", \"10.0.3.0/24\"]\n  public_subnets  = [\"10.0.101.0/24\", \"10.0.102.0/24\", \"10.0.103.0/24\"]\n\n  enable_nat_gateway   = true\n  single_nat_gateway   = false\n  enable_dns_hostnames = true\n}",
    "rubric": [
      {
        "aspect": "Terraform Modularity, Security & State Locking",
        "points": 30
      },
      {
        "aspect": "Kubernetes Manifests, Autoscaling & HPA",
        "points": 25
      },
      {
        "aspect": "GitHub Actions CI & Static Security Scanning",
        "points": 25
      },
      {
        "aspect": "GitOps Declarative Deployment Architecture",
        "points": 20
      }
    ]
  },
  {
    "id": "github-virtual-data-grid",
    "title": "High-Throughput Virtualized Data Grid Component",
    "companyStyle": "Bloomberg & Meta Frontend Architecture",
    "category": "Full-Stack & APIs",
    "level": "Intermediate",
    "estimatedHours": "4 - 5 hours",
    "badge": "Frontend System Design",
    "githubRepo": "github.com/doap-org/virtualized-datagrid-react",
    "techStack": [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Vitest",
      "Playwright"
    ],
    "summary": "Architect a 60 FPS virtualized data table rendering 100,000+ data rows with keyboard navigation, sortable columns, and windowed DOM recycling.",
    "overview": "Rendering thousands of unvirtualized DOM nodes crashes browser tabs and introduces severe scroll jank. Build a high-performance windowing data grid capable of rendering 100,000 rows seamlessly at 60 FPS.",
    "requirements": [
      "Custom virtualization engine: dynamically calculate visible row slice based on container scrollTop and item heights.",
      "DOM recycling: only render visible rows plus a small overscan buffer (e.g. 5 rows above and below), maintaining constant DOM node count.",
      "Multi-column sorting (ascending, descending, neutral) with memoized comparator algorithms.",
      "Full keyboard accessibility: navigate grid cells with arrow keys, select rows with Spacebar, and announce updates via ARIA roles.",
      "Column resizing and pinning (sticky left/right columns) with zero cumulative layout shift (CLS)."
    ],
    "deliverables": [
      "Publishable React component library in TypeScript.",
      "Storybook / demo playground showcasing 100,000 live streaming rows.",
      "Vitest component test suite verifying virtual window slice calculations.",
      "Playwright end-to-end performance test measuring smooth 60 FPS scrolling."
    ],
    "starterSnippet": "// VirtualDataGrid.tsx - High-Performance Windowing Core\nimport React, { useState, useMemo } from 'react';\n\nexport function VirtualDataGrid({ data, rowHeight = 40, containerHeight = 600, overscan = 5, renderRow }) {\n  const [scrollTop, setScrollTop] = useState(0);\n  const totalHeight = data.length * rowHeight;\n\n  const { startIndex, endIndex } = useMemo(() => {\n    const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);\n    const visibleCount = Math.ceil(containerHeight / rowHeight);\n    const end = Math.min(data.length, start + visibleCount + overscan * 2);\n    return { startIndex: start, endIndex: end };\n  }, [scrollTop, rowHeight, containerHeight, overscan, data.length]);\n\n  return (\n    <div \n      style={{ height: containerHeight, overflowY: 'auto', position: 'relative' }}\n      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}\n    >\n      <div style={{ height: totalHeight, position: 'relative' }}>\n        <div style={{ transform: `translateY(${startIndex * rowHeight}px)` }}>\n          {data.slice(startIndex, endIndex).map((item, i) => renderRow(item, startIndex + i))}\n        </div>\n      </div>\n    </div>\n  );\n}",
    "rubric": [
      {
        "aspect": "DOM Windowing Math & Frame Rate (60 FPS)",
        "points": 30
      },
      {
        "aspect": "Keyboard Accessibility (a11y) & ARIA Compliance",
        "points": 25
      },
      {
        "aspect": "Sorting Performance & State Memoization",
        "points": 25
      },
      {
        "aspect": "Automated Vitest & E2E Testing Suite",
        "points": 20
      }
    ]
  }
];
