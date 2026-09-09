// DOAP Production GitHub-Style Practical Industry Assignments & Take-Home Challenges
// Comprehensive suite of 36 authentic industry take-home engineering assignments

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
  },
  {
    "id": "github-kafka-broker",
    "title": "Distributed Append-Only Commit Log & Message Broker",
    "companyStyle": "Apache Kafka & Confluent Architecture",
    "category": "System Design & Backend",
    "level": "Advanced",
    "estimatedHours": "5 - 7 hours",
    "badge": "Tier-1 Take-Home Challenge",
    "githubRepo": "github.com/doap-org/distributed-commit-log-broker",
    "techStack": [
      "Rust / Go / Java",
      "TCP Sockets",
      "Zero-Copy sendfile",
      "Docker",
      "GitHub Actions"
    ],
    "summary": "Build an event-streaming message broker implementing partitioned commit logs, consumer group offsets, and high-throughput zero-copy batch delivery.",
    "overview": "Real-time streaming backends require relentless throughput and sequential disk efficiency. You are tasked with developing a lightweight distributed broker that stores messages as immutable sequential binary segments on disk, manages partition assignments, and coordinates consumer offsets with at-least-once delivery guarantees.",
    "requirements": [
      "Implement memory-mapped sequential disk segments (.log and .index files) with 4KB sparse indexing for O(1) binary seek.",
      "Support multiple topics with user-defined partition count and round-robin or hash-keyed partitioning.",
      "Implement Consumer Groups with cooperative rebalancing and persistent offset commit tracking in an internal __consumer_offsets topic.",
      "Utilize zero-copy Linux sendfile or splice system calls to stream raw message blocks directly from kernel page cache to TCP sockets.",
      "Provide CLI tools for producer publish, consumer poll, and topic partition inspection."
    ],
    "deliverables": [
      "Broker core daemon with asynchronous TCP networking protocol.",
      "High-throughput benchmark harness measuring sustained write/read IOPS and latency percentiles (p95/p99).",
      "docker-compose.yml launching a 3-node cluster with integration test verification.",
      "Detailed architectural design document explaining log segment roll and compaction strategy."
    ],
    "starterSnippet": "// commitLog.go - Segmented Log Storage Engine\npackage storage\n\nimport (\n  \"os\"\n  \"sync\"\n)\n\ntype Segment struct {\n  logFile   *os.File\n  indexFile *os.File\n  baseOffset uint64\n  size      uint64\n  mu        sync.RWMutex\n}\n\nfunc NewSegment(dir string, baseOffset uint64, maxBytes uint64) (*Segment, error) {\n  return &Segment{baseOffset: baseOffset}, nil\n}",
    "rubric": [
      {
        "aspect": "Segmented Disk Layout & Indexing Efficiency",
        "points": 30
      },
      {
        "aspect": "Consumer Group Coordination & Offset Commits",
        "points": 25
      },
      {
        "aspect": "Throughput & Zero-Copy I/O Performance",
        "points": 25
      },
      {
        "aspect": "Code Quality, Test Suite & Benchmarks",
        "points": 20
      }
    ]
  },
  {
    "id": "github-k8s-operator",
    "title": "Kubernetes Operator & Custom Resource Controller for Resilient Autoscaling",
    "companyStyle": "Red Hat & Datadog Infrastructure",
    "category": "DevOps & Cloud Infra",
    "level": "Advanced",
    "estimatedHours": "4 - 6 hours",
    "badge": "Cloud-Native Challenge",
    "githubRepo": "github.com/doap-org/k8s-predictive-scaler-operator",
    "techStack": [
      "Go (controller-runtime / Kubebuilder)",
      "Kubernetes Client-go",
      "Prometheus API",
      "Helm",
      "Kind"
    ],
    "summary": "Engineer a production Kubernetes Operator managing a Custom Resource Definition (CRD) that dynamically reconciles pod replicas based on real-time Prometheus telemetry.",
    "overview": "Standard HPA often reacts too slowly to sudden traffic spikes. Build an autonomous Kubernetes Operator with a custom controller reconciliation loop that observes workload metrics (RPS, latency percentiles, queue lag) from Prometheus and proactively adjusts deployment replicas while respecting disruption budgets.",
    "requirements": [
      "Define an OpenAPI v3 CRD 'PredictiveWorkloadScaler' with spec fields: targetDeployment, metricSource, minReplicas, maxReplicas, and scalingThresholds.",
      "Implement the idempotent Reconcile() loop using Kubebuilder and controller-runtime, including status updates and event recording.",
      "Implement exponential backoff retries and rate-limiting queue mechanics to prevent reconciliation thrashing.",
      "Respect PodDisruptionBudgets (PDB) and enforce gradual cooldown decay periods to avoid rapid scale-in churn.",
      "Automate deployment testing using KinD (Kubernetes in Docker) and envtest suite."
    ],
    "deliverables": [
      "Go codebase structured with Kubebuilder best practices.",
      "Helm chart packaging the CRD, Operator deployment, RBAC ClusterRoles, and ServiceAccount.",
      "End-to-end automated test script testing scale-out and scale-in scenarios on a KinD cluster.",
      "Grafana dashboard JSON visualizing operator reconciliation latency and scaling decisions."
    ],
    "starterSnippet": "// controllers/scaler_controller.go\npackage controllers\n\nimport (\n  \"context\"\n  ctrl \"sigs.k8s.io/controller-runtime\"\n  \"sigs.k8s.io/controller-runtime/pkg/client\"\n)\n\ntype PredictiveScalerReconciler struct {\n  client.Client\n}\n\nfunc (r *PredictiveScalerReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {\n  return ctrl.Result{}, nil\n}",
    "rubric": [
      {
        "aspect": "Reconciliation Idempotency & Level-Triggered Logic",
        "points": 30
      },
      {
        "aspect": "CRD Schema Design & Validation Webhooks",
        "points": 25
      },
      {
        "aspect": "KinD Integration Testing & Operator Resilience",
        "points": 25
      },
      {
        "aspect": "RBAC Security, Helm Packaging & Observability",
        "points": 20
      }
    ]
  },
  {
    "id": "github-vector-db",
    "title": "High-Dimensional Vector Search Engine with HNSW & SIMD Distance Metrics",
    "companyStyle": "Pinecone & Milvus AI Systems",
    "category": "AI & LLM Engineering",
    "level": "Advanced",
    "estimatedHours": "5 - 7 hours",
    "badge": "Vector AI Systems",
    "githubRepo": "github.com/doap-org/hnsw-vector-index-engine",
    "techStack": [
      "Rust / C++ / Python C-FFI",
      "SIMD (AVX2/NEON)",
      "gRPC / Protobuf",
      "OpenTelemetry",
      "Docker"
    ],
    "summary": "Develop an Approximate Nearest Neighbor (ANN) vector database implementing Hierarchical Navigable Small World (HNSW) graphs with hardware-accelerated cosine similarity.",
    "overview": "Modern generative AI and embedding retrieval require sub-10ms nearest neighbor queries across millions of 1536-dimensional vectors. Build an in-memory vector database that constructs a multi-layer hierarchical graph for logarithmic search and uses SIMD intrinsics for accelerated vector dot-product computations.",
    "requirements": [
      "Implement the HNSW index algorithm with configurable parameters: M (max connections per layer), efConstruction, and efSearch.",
      "Optimize inner product, cosine similarity, and L2 squared distance calculations using SIMD instructions (AVX-256 or ARM NEON).",
      "Support incremental vector insertions, batch upserts, and metadata filtering during graph traversal.",
      "Implement a thread-safe concurrent read-write lock policy permitting concurrent queries during background graph expansion.",
      "Expose a gRPC server supporting SearchNearest(query_vector, top_k, filter) returning nearest IDs, cosine distances, and metadata."
    ],
    "deliverables": [
      "High-performance HNSW index library with SIMD fallback for non-AVX architectures.",
      "gRPC server and Python client SDK.",
      "Recall vs QPS evaluation benchmark against standard SIFT1M or GloVe datasets comparing exact brute-force with HNSW.",
      "Complete test suite with deterministic seed verification."
    ],
    "starterSnippet": "// hnsw.rs - Hierarchical Navigable Small World Index\npub struct HNSWIndex {\n    dim: usize,\n    max_elements: usize,\n    m: usize,\n    ef_construction: usize,\n}\n\nimpl HNSWIndex {\n    pub fn search(&self, query: &[f32], top_k: usize) -> Vec<(usize, f32)> {\n        Vec::new()\n    }\n}",
    "rubric": [
      {
        "aspect": "HNSW Algorithmic Precision & Recall (>95% at high QPS)",
        "points": 30
      },
      {
        "aspect": "SIMD Hardware Acceleration & Inner Product Math",
        "points": 25
      },
      {
        "aspect": "Concurrent Read/Write Thread Safety",
        "points": 25
      },
      {
        "aspect": "Benchmark Suite, Profiling & Documentation",
        "points": 20
      }
    ]
  },
  {
    "id": "github-epoll-http-server",
    "title": "Zero-Copy Event-Driven HTTP/1.1 Web Server using Linux io_uring & epoll",
    "companyStyle": "Cloudflare & Nginx Core Engineering",
    "category": "Low-Level Systems & OS",
    "level": "Advanced",
    "estimatedHours": "5 - 8 hours",
    "badge": "Systems Kernel Challenge",
    "githubRepo": "github.com/doap-org/iouring-zero-copy-http",
    "techStack": [
      "C / Rust / Zig",
      "Linux io_uring / epoll",
      "HTTP Parser (llhttp)",
      "Valgrind",
      "GDB"
    ],
    "summary": "Architect a non-blocking, event-driven HTTP server utilizing Linux io_uring submission/completion rings to achieve extreme concurrency with zero kernel-space context switching.",
    "overview": "Challenge the limits of network I/O by implementing a web server directly on modern Linux kernel asynchronous primitives. Replace traditional per-thread blocking calls with ring buffers for zero-syscall asynchronous submission, serving static files and dynamic JSON with maximum memory efficiency.",
    "requirements": [
      "Initialize io_uring queue pairs (SQ and CQ rings) with fixed buffer registration to eliminate per-request page table pinning overhead.",
      "Implement an asynchronous connection accept loop, pipelined HTTP parsing, and keep-alive connection state machine.",
      "Handle static file transmission via registered buffers and splice/sendfile system calls without copying data to user space.",
      "Implement graceful shutdown on SIGINT/SIGTERM draining in-flight requests within a strict timeout.",
      "Demonstrate clean memory sanitation with Valgrind / AddressSanitizer (zero memory leaks or double frees)."
    ],
    "deliverables": [
      "C/Rust server source code adhering to kernel style guidelines.",
      "wrk / autocannon benchmark script verifying throughput against Nginx on multi-core VMs.",
      "Comprehensive unit test suite for chunked transfer encoding and pipelined HTTP requests.",
      "Technical report explaining io_uring vs epoll performance profiles under high connection counts."
    ],
    "starterSnippet": "// server_uring.c - io_uring Event Loop\n#include <liburing.h>\n#define QUEUE_DEPTH 256\nstruct io_uring ring;\nvoid init_server(int port) {\n    io_uring_queue_init(QUEUE_DEPTH, &ring, 0);\n}",
    "rubric": [
      {
        "aspect": "Kernel Primitive Mastery (io_uring SQ/CQ Rings)",
        "points": 35
      },
      {
        "aspect": "Zero-Copy File Streaming & HTTP Parsing Correctness",
        "points": 25
      },
      {
        "aspect": "Memory Safety, Valgrind Cleanliness & ASan Audit",
        "points": 20
      },
      {
        "aspect": "Benchmarked Throughput & Latency Distribution",
        "points": 20
      }
    ]
  },
  {
    "id": "github-graphql-gateway",
    "title": "Federated GraphQL Gateway with Query Planning & N+1 Dataloader Deduplication",
    "companyStyle": "Apollo & Netflix Platform Architecture",
    "category": "Full-Stack & APIs",
    "level": "Intermediate",
    "estimatedHours": "4 - 5 hours",
    "badge": "API Architecture Challenge",
    "githubRepo": "github.com/doap-org/federated-graphql-mesh-gateway",
    "techStack": [
      "TypeScript / Node.js / Go",
      "GraphQL AST",
      "DataLoader",
      "Redis",
      "Jest"
    ],
    "summary": "Construct a federated GraphQL gateway that dynamically merges downstream subgraph schemas, generates optimized execution plans, and solves the N+1 problem.",
    "overview": "Microservice organizations struggle with data aggregation across isolated domain boundaries. Build a federated GraphQL gateway that composes schema ASTs from downstream services (Users, Orders, Inventory), resolves entity cross-references using key directives, and batches requests via DataLoader.",
    "requirements": [
      "Implement schema composition merging multiple SDLs with @key, @extends, and @external federation directives.",
      "Build a query planner that decomposes an incoming GraphQL operation AST into minimum parallel fetch calls to downstream subgraphs.",
      "Implement a high-performance batching DataLoader ensuring zero N+1 database/HTTP queries for nested entity associations.",
      "Implement distributed tracing headers (W3C Trace Context / OpenTelemetry) propagated across all downstream queries.",
      "Enforce field-level role-based authorization (RBAC) and query complexity analysis to protect backend services from deeply nested denial-of-service queries."
    ],
    "deliverables": [
      "Federated gateway server with pluggable subgraph connectors.",
      "Sample downstream mock services (Product, Review, Customer) demonstrating cross-service entity resolution.",
      "Query planner test suite verifying execution graph dependency order.",
      "GraphQL Playground sandbox with preloaded test queries and mutations."
    ],
    "starterSnippet": "// queryPlanner.ts - Federated Query AST Decomposer\nexport class FederatedQueryPlanner {\n  buildExecutionPlan(documentNode: any, schema: any) {\n    return { steps: [] };\n  }\n}",
    "rubric": [
      {
        "aspect": "AST Decomposition & Query Plan Optimization",
        "points": 30
      },
      {
        "aspect": "N+1 Elimination with DataLoader Batching",
        "points": 25
      },
      {
        "aspect": "Query Complexity & Security Defenses",
        "points": 25
      },
      {
        "aspect": "Type Safety, Testing & Federation Compliance",
        "points": 20
      }
    ]
  },
  {
    "id": "github-wasm-sandbox",
    "title": "Isolated WebAssembly Runtime Sandbox with Memory Quotas & Capability Security",
    "companyStyle": "Fastly & Cloudflare Workers Architecture",
    "category": "Low-Level Systems & OS",
    "level": "Advanced",
    "estimatedHours": "5 - 7 hours",
    "badge": "Edge Compute Challenge",
    "githubRepo": "github.com/doap-org/wasm-tenant-sandbox-runtime",
    "techStack": [
      "Rust (wasmtime / wasmer)",
      "WASI",
      "Prometheus",
      "Docker",
      "Cargo Test"
    ],
    "summary": "Develop a secure multi-tenant serverless execution runtime capable of running untrusted WebAssembly user code with strict CPU cycle counting and memory quotas.",
    "overview": "Edge computing platforms run untrusted code on shared infrastructure. Build a hardened WebAssembly sandbox daemon that executes guest .wasm binaries, instruments bytecode for deterministic fuel consumption (halting infinite loops), limits heap memory to strict MB limits, and confines file/network access via capability-based WASI.",
    "requirements": [
      "Embed Wasmtime / Wasmer engine with deterministic epoch or fuel-based instruction interruption to terminate runaways.",
      "Enforce maximum memory quotas per instance (e.g. 64MB) with immediate trap generation on out-of-memory attempts.",
      "Implement capability-based WASI security: deny arbitrary disk/network access, allowing access only to explicitly pre-opened directories and whitelisted outgoing HTTP sockets.",
      "Support cold-start snapshot caching (AOT module pre-compilation) achieving sub-millisecond instance spin-up.",
      "Expose an HTTP invocation API allowing clients to upload a .wasm binary and receive execution output with resource telemetry."
    ],
    "deliverables": [
      "Rust runtime binary and library.",
      "Suite of adversarial guest WASM modules (infinite loop, memory bomb, unauthorized file access attempt) verifying runtime defenses.",
      "Benchmark testing cold-start vs warm-start latency across 10,000 requests.",
      "Architecture document detailing isolation invariants and WASI capabilities."
    ],
    "starterSnippet": "// runtime.rs - Capability-Secured WebAssembly Instance Runner\nuse wasmtime::*;\npub fn execute_sandboxed_module(wasm_bytes: &[u8], fuel_limit: u64) -> Result<String, Trap> {\n    Ok(\"execution completed\".to_string())\n}",
    "rubric": [
      {
        "aspect": "Sandbox Security & Capability Isolation",
        "points": 30
      },
      {
        "aspect": "Resource Quota Enforcement (Fuel & Memory Limits)",
        "points": 25
      },
      {
        "aspect": "Adversarial Stress Testing & Exploit Prevention",
        "points": 25
      },
      {
        "aspect": "Execution Latency & Clean Rust Architecture",
        "points": 20
      }
    ]
  },
  {
    "id": "github-distributed-cache",
    "title": "Peer-to-Peer Distributed Cache with Consistent Hashing & SWIM Gossip Failure Detection",
    "companyStyle": "Twitter Twemcache & Cassandra Architecture",
    "category": "System Design & Backend",
    "level": "Advanced",
    "estimatedHours": "5 - 7 hours",
    "badge": "Distributed Systems",
    "githubRepo": "github.com/doap-org/p2p-gossip-distributed-cache",
    "techStack": [
      "Go / Python / Java",
      "UDP / TCP",
      "Murmur3 Consistent Hashing",
      "Docker",
      "Pytest"
    ],
    "summary": "Engineer an autonomous peer-to-peer distributed in-memory cache cluster featuring virtual-node consistent hashing, SWIM gossip membership, and probabilistic failure detection.",
    "overview": "Distributed caches must scale horizontally without centralized cluster coordinators. Build a multi-node caching cluster where nodes discover each other and detect failures via SWIM gossip heartbeats, automatically rebalance key spaces using consistent hashing rings, and replicate keys for fault tolerance.",
    "requirements": [
      "Implement a Consistent Hashing ring with 256 virtual nodes per physical host using uniform MurmurHash3 distribution.",
      "Implement the SWIM (Structured Weakly-Consistent Infection-Style Membership) protocol with ping, ping-req, and suspect timeout transitions.",
      "Implement Read/Write quorum replication (N=3, R=2, W=2) ensuring read consistency across node restarts.",
      "Handle node addition and departure gracefully by migrating only affected partition key slices without cluster-wide downtime.",
      "Provide an interactive dashboard and Prometheus metrics showing ring distribution and gossip health."
    ],
    "deliverables": [
      "Node daemon with dual UDP (gossip) and TCP (client key-value protocol) sockets.",
      "Chaos testing script simulating network partitions, packet loss, and abrupt node kills.",
      "Visual hash ring distribution analyzer proving standard deviation of keys per server is <5%.",
      "Comprehensive test suite verifying quorum reconciliation."
    ],
    "starterSnippet": "// ring.go - Consistent Hashing Ring with Virtual Nodes\npackage ring\ntype HashRing struct {\n  vnodes int\n  ring   []uint32\n}",
    "rubric": [
      {
        "aspect": "SWIM Gossip Failure Detection Correctness",
        "points": 30
      },
      {
        "aspect": "Consistent Hashing Ring & Virtual Node Balancing",
        "points": 25
      },
      {
        "aspect": "Quorum Replication & Partition Fault Tolerance",
        "points": 25
      },
      {
        "aspect": "Chaos Automation & Cluster Telemetry",
        "points": 20
      }
    ]
  },
  {
    "id": "github-llm-agent-orchestrator",
    "title": "Autonomous Multi-Agent Task Orchestrator with Directed Acyclic Graph (DAG) Execution",
    "companyStyle": "LangChain & AutoGen Enterprise Systems",
    "category": "AI & LLM Engineering",
    "level": "Intermediate",
    "estimatedHours": "4 - 6 hours",
    "badge": "Autonomous AI Challenge",
    "githubRepo": "github.com/doap-org/multi-agent-dag-orchestrator",
    "techStack": [
      "Python / TypeScript",
      "OpenAI / Anthropic APIs",
      "Pydantic",
      "FastAPI",
      "React UI"
    ],
    "summary": "Construct an asynchronous multi-agent orchestrator that breaks complex natural-language software engineering prompts into parallel DAG tasks with automated reflection and tool calling.",
    "overview": "Single LLM queries fail on multifaceted engineering goals. Create an agentic orchestration platform that plans, executes, verifies, and self-corrects code generation tasks across specialized personas (Architect, Coder, Reviewer, Tester) organized in a stateful execution graph with human-in-the-loop approvals.",
    "requirements": [
      "Implement a dynamic DAG task planner generating topological dependency graphs from high-level user goals.",
      "Implement specialized subagent personas with strict prompt encapsulation and sandboxed tool-calling (e.g. bash execution, file editing, web search).",
      "Implement automated reflection: if a task fails unit tests, route back to the Coder agent with compiler errors for iterative repair (up to 3 attempts).",
      "Persist execution state and checkpoint snapshots to disk allowing resumption after crashes or pause-for-human approval.",
      "Stream real-time agent thought streams and tool calls over WebSockets to a web dashboard."
    ],
    "deliverables": [
      "Orchestration engine with pluggable LLM provider adapters.",
      "Interactive web UI showing live DAG node status (pending, executing, failed, completed).",
      "Test harness validating multi-step autonomous tasks (e.g. 'Build a React counter with tests and Dockerfile').",
      "Full documentation on cyclic retry limits and agent prompt governance."
    ],
    "starterSnippet": "# orchestrator.py - DAG Multi-Agent Runner\nclass DAGOrchestrator:\n    async def execute_graph(self, graph, context):\n        pass",
    "rubric": [
      {
        "aspect": "DAG Dependency Resolution & Concurrency",
        "points": 30
      },
      {
        "aspect": "Agent Tool-Calling & Error-Reflection Loops",
        "points": 25
      },
      {
        "aspect": "State Checkpointing & Resume Capabilities",
        "points": 25
      },
      {
        "aspect": "Real-time Telemetry, WebSocket Streaming & UI",
        "points": 20
      }
    ]
  },
  {
    "id": "github-terraform-provider",
    "title": "Custom Infrastructure-as-Code (IaC) Terraform Provider Plugin",
    "companyStyle": "HashiCorp & AWS Cloud Ecosystem",
    "category": "DevOps & Cloud Infra",
    "level": "Advanced",
    "estimatedHours": "4 - 6 hours",
    "badge": "Cloud Infrastructure",
    "githubRepo": "github.com/doap-org/terraform-provider-sandboxes",
    "techStack": [
      "Go (terraform-plugin-framework)",
      "Terraform CLI",
      "REST API",
      "Docker",
      "GitHub Actions"
    ],
    "summary": "Build an official HashiCorp-compatible Terraform Provider plugin managing cloud developer sandbox environments with full CRUD lifecycle and drift detection.",
    "overview": "Infrastructure teams need declarative management of proprietary internal platforms. Create a production Terraform provider using the modern terraform-plugin-framework to provision, inspect, modify, and delete ephemeral development cloud environments with robust state management and drift detection.",
    "requirements": [
      "Implement Resource schema for 'sandbox_environment' (CPU, RAM, storage, allowed_ports, auto_terminate_hours).",
      "Implement Create, Read, Update, and Delete (CRUD) operations adhering strictly to Terraform state reconciliation semantics.",
      "Implement state upgrade hooks and schema versioning to handle backward-incompatible state transformations safely.",
      "Implement automatic drift detection: when Read() detects out-of-band changes, update state so terraform plan reflects realistic diffs.",
      "Provide DataSource schemas to query active sandbox clusters and available hardware tiers."
    ],
    "deliverables": [
      "Go provider binary conforming to Terraform Provider registry protocol.",
      "Mock API server simulating the backend sandbox hypervisor.",
      "Acceptance test suite running actual terraform apply and terraform destroy commands.",
      "Terraform documentation auto-generated using tfplugindocs."
    ],
    "starterSnippet": "// internal/provider/resource_sandbox.go\npackage provider\ntype SandboxResource struct{}",
    "rubric": [
      {
        "aspect": "Terraform State Management & Schema Rigor",
        "points": 30
      },
      {
        "aspect": "Drift Detection & Accurate Plan Diffs",
        "points": 25
      },
      {
        "aspect": "End-to-End Terraform Acceptance Test Suite",
        "points": 25
      },
      {
        "aspect": "Plugin Architecture & Documentation Generation",
        "points": 20
      }
    ]
  },
  {
    "id": "github-b-plus-tree",
    "title": "Disk-Backed B+ Tree Indexing Engine with Page Buffer Pool & Concurrency",
    "companyStyle": "PostgreSQL & SQLite Internals",
    "category": "Low-Level Systems & OS",
    "level": "Advanced",
    "estimatedHours": "6 - 8 hours",
    "badge": "Database Internals",
    "githubRepo": "github.com/doap-org/disk-bplus-tree-engine",
    "techStack": [
      "C++ / Rust / Go",
      "POSIX mmap / O_DIRECT",
      "Buffer Pool Manager",
      "GTest",
      "Valgrind"
    ],
    "summary": "Implement a disk-backed B+ Tree storage engine featuring fixed-size page serialization, node splits/merges, and a clock-sweep buffer pool manager.",
    "overview": "Relational database engines depend on B+ Trees for ordered index scans and logarithmic point lookups on persistent disk pages. Construct a database storage layer that serializes fixed 4KB page frames, implements parent-child node splitting, and manages an LRU/Clock buffer pool with dirty page write-backs.",
    "requirements": [
      "Design binary page layout (Page Header, Slot Array, Free Space pointer, Cell Records) fitting exactly into 4096-byte blocks.",
      "Implement Search, Insert (with recursive node splitting), and Delete (with neighbor borrowing and merging).",
      "Build a Buffer Pool Manager with frame pin/unpin reference counting and Clock-Sweep or 2Q eviction policy.",
      "Implement forward and backward range scan iterators utilizing leaf node sibling pointers.",
      "Implement concurrency control: Crab Latching (lock coupling) down the tree to ensure thread safety during concurrent reader/writer access."
    ],
    "deliverables": [
      "C++ or Rust index library with zero memory leaks.",
      "Automated test harness inserting 500,000 randomized 64-bit keys and validating tree invariants (B+ Tree balance and node occupancy constraints).",
      "Visual page dumper utility printing internal node keys and leaf pointers.",
      "Stress test running 32 concurrent threads executing mixed point and range queries."
    ],
    "starterSnippet": "// btree_node.hpp - 4KB B+ Tree Node\n#define PAGE_SIZE 4096\nstruct PageHeader { uint16_t is_leaf; uint16_t num_keys; };",
    "rubric": [
      {
        "aspect": "B+ Tree Invariant Correctness (Split/Merge/Rebalance)",
        "points": 35
      },
      {
        "aspect": "Buffer Pool Manager & Dirty Page Eviction",
        "points": 25
      },
      {
        "aspect": "Thread-Safe Latch Crabbing Concurrency",
        "points": 20
      },
      {
        "aspect": "Data Integrity Across Random 500k Key Ingestion",
        "points": 20
      }
    ]
  },
  {
    "id": "github-api-gateway",
    "title": "Edge API Gateway with Dynamic Routing, JWT Authentication & Canary Traffic Splitting",
    "companyStyle": "Kong & Envoy Proxy Architecture",
    "category": "DevOps & Cloud Infra",
    "level": "Intermediate",
    "estimatedHours": "4 - 5 hours",
    "badge": "Cloud Gateway Challenge",
    "githubRepo": "github.com/doap-org/canary-edge-api-gateway",
    "techStack": [
      "Go / Node.js / Rust",
      "Reverse Proxy",
      "JWT / JWKS",
      "Prometheus",
      "Docker"
    ],
    "summary": "Architect an edge API gateway reverse proxy supporting hot configuration reloads, cryptographically verified JWT tokens, and weighted canary deployment traffic splitting.",
    "overview": "Modern cloud deployments roll out new services through gradual canary percentages. Build an API gateway that intercepts client traffic, validates RS256 JWT tokens against remote JWKS endpoints, applies IP rate limits, and splits upstream requests based on configurable percentage weights without dropping active connections.",
    "requirements": [
      "Implement non-blocking reverse proxy routing with round-robin and weighted canary upstream load balancing (e.g. 90% v1, 10% v2).",
      "Validate incoming Bearer tokens using asymmetric RS256/ES256 verification and cache public keys via JWKS background refresh.",
      "Support hot dynamic reload of routing rules via an admin REST API or YAML configuration watcher with zero downtime.",
      "Inject distributed tracing headers (X-Request-Id, traceparent) and calculate round-trip upstream response latencies.",
      "Expose /metrics endpoint in Prometheus format tracking requests_total, latency_seconds_bucket, and upstream_errors."
    ],
    "deliverables": [
      "Gateway binary with comprehensive configuration documentation.",
      "docker-compose stack spinning up the gateway, two mock backend versions (v1 blue, v2 green), and an OAuth identity mock.",
      "Load test demonstrating seamless dynamic traffic shift from 10% canary to 100% without restarting the gateway.",
      "Unit and integration test suites."
    ],
    "starterSnippet": "// proxy/router.go\npackage proxy\ntype UpstreamRoute struct { PathPrefix string; Weights []int }",
    "rubric": [
      {
        "aspect": "Dynamic Routing & Weighted Canary Accuracy",
        "points": 30
      },
      {
        "aspect": "Cryptographic JWT/JWKS Validation & Security",
        "points": 25
      },
      {
        "aspect": "Hot-Reload Zero-Downtime Reconfiguration",
        "points": 25
      },
      {
        "aspect": "Prometheus Observability & Dockerized Demo",
        "points": 20
      }
    ]
  },
  {
    "id": "github-cdc-debezium",
    "title": "Real-Time Change Data Capture (CDC) Pipeline from Postgres WAL to Event Bus",
    "companyStyle": "Debezium & Segment Data Engineering",
    "category": "System Design & Backend",
    "level": "Advanced",
    "estimatedHours": "5 - 7 hours",
    "badge": "Data Streaming Challenge",
    "githubRepo": "github.com/doap-org/postgres-wal-cdc-pipeline",
    "techStack": [
      "Go / Python / Java",
      "PostgreSQL Logical Replication",
      "Kafka / NATS",
      "Docker",
      "SQL"
    ],
    "summary": "Construct a streaming Change Data Capture service reading PostgreSQL write-ahead logs via logical decoding slots and publishing structured change events to an event stream.",
    "overview": "Distributed architectures must maintain read-model replicas and search indexes without dual-write race conditions. Build a CDC service that attaches to PostgreSQL via the pgoutput logical replication protocol, streams INSERT/UPDATE/DELETE events, handles table schema evolution, and guarantees exactly-once stream processing.",
    "requirements": [
      "Establish a replication connection to PostgreSQL using pglogrepl and the test_decoding or pgoutput plugin.",
      "Parse raw binary logical replication stream into strongly-typed change events (table name, operation, before/after row snapshots, transaction commit timestamp).",
      "Persist the Log Sequence Number (LSN) acknowledgement checkpoint to ensure resumption without message loss after consumer restart.",
      "Handle initial snapshot bootstrap: take a consistent point-in-time table dump before cutting over to live WAL streaming.",
      "Publish change events as CloudEvents-compliant JSON to a message broker (Kafka or NATS) with partitioning by primary key."
    ],
    "deliverables": [
      "Standalone CDC service and replication listener.",
      "docker-compose.yml setting up PostgreSQL with logical replication enabled and an event receiver.",
      "End-to-end integration test verifying that DML statements executed in SQL appear within <100ms on the output event topic.",
      "Disaster recovery documentation covering replication slot lag monitoring."
    ],
    "starterSnippet": "// cdc/listener.go\npackage cdc\nfunc StreamWAL(slotName string) error { return nil }",
    "rubric": [
      {
        "aspect": "Logical Decoding Protocol & LSN Checkpointing",
        "points": 30
      },
      {
        "aspect": "Initial Snapshot to Live WAL Cutover Invariants",
        "points": 25
      },
      {
        "aspect": "Primary-Key Partitioning & Exactly-Once Delivery",
        "points": 25
      },
      {
        "aspect": "Integration Verification & Schema Change Handling",
        "points": 20
      }
    ]
  },
  {
    "id": "github-semantic-rag-engine",
    "title": "Production Multi-Stage RAG Pipeline with Hybrid Search & Cross-Encoder Reranking",
    "companyStyle": "Anthropic & Cohere Enterprise AI",
    "category": "AI & LLM Engineering",
    "level": "Intermediate",
    "estimatedHours": "4 - 6 hours",
    "badge": "Production RAG Challenge",
    "githubRepo": "github.com/doap-org/hybrid-rerank-rag-pipeline",
    "techStack": [
      "Python",
      "FastAPI",
      "BM25",
      "HuggingFace / PyTorch",
      "Qdrant / ChromaDB",
      "Docker"
    ],
    "summary": "Engineer a high-precision Retrieval-Augmented Generation (RAG) system combining sparse keyword search (BM25), dense vector embeddings, and cross-encoder reranking.",
    "overview": "Standard vector RAG often fails on domain jargon and keyword queries. Build a production retrieval engine that executes reciprocal rank fusion (RRF) across both BM25 and dense neural vector indexes, filters candidate passages through a cross-encoder reranker, and constructs grounded prompts with source attribution.",
    "requirements": [
      "Implement multi-format document ingestion (PDF, Markdown, HTML) with semantic chunking respecting heading hierarchies and token boundaries.",
      "Execute hybrid retrieval: parallel BM25 sparse search and Dense Vector embedding search combined via Reciprocal Rank Fusion (RRF).",
      "Incorporate a cross-encoder reranking model (e.g. bge-reranker or Cohere API) to rescore top 50 candidates down to top 5 high-relevance chunks.",
      "Implement Hallucination Detection & Citation Validation: ensure every factual statement in the LLM response is supported by retrieved chunk spans.",
      "Expose an evaluation benchmark measuring Retrieval MRR@5, NDCG@10, and Faithfulness scores across a golden question-answer dataset."
    ],
    "deliverables": [
      "FastAPI server with /ingest and /query endpoints.",
      "Evaluation script calculating RAGAS or TruLens retrieval and generation metrics.",
      "Clean Streamlit / React web interface showing side-by-side dense vs sparse vs reranked results.",
      "Dockerized setup with local embedding models (Sentence-Transformers)."
    ],
    "starterSnippet": "# rag/pipeline.py\ndef reciprocal_rank_fusion(sparse_ranks, dense_ranks, k=60):\n    return []",
    "rubric": [
      {
        "aspect": "Hybrid Search Fusion & Semantic Chunking",
        "points": 30
      },
      {
        "aspect": "Cross-Encoder Reranking & Retrieval MRR Accuracy",
        "points": 25
      },
      {
        "aspect": "Citation Groundedness & Hallucination Guardrails",
        "points": 25
      },
      {
        "aspect": "Evaluation Benchmark Suite & Developer UX",
        "points": 20
      }
    ]
  },
  {
    "id": "github-crdt-rich-editor",
    "title": "Collaborative Rich Text Document Editor with CRDTs & Offline Synchronization",
    "companyStyle": "Notion & Google Docs Architecture",
    "category": "Full-Stack & APIs",
    "level": "Advanced",
    "estimatedHours": "5 - 7 hours",
    "badge": "Collaborative Realtime",
    "githubRepo": "github.com/doap-org/crdt-offline-rich-editor",
    "techStack": [
      "TypeScript",
      "React",
      "Yjs / Automerge",
      "WebSockets / WebRTC",
      "IndexedDB",
      "Tailwind CSS"
    ],
    "summary": "Develop a multiplayer rich text editor featuring Conflict-free Replicated Data Types (CRDTs), optimistic local editing, and seamless offline-to-online synchronization.",
    "overview": "Collaborative editors must allow multiple users to edit identical paragraphs concurrently, even during prolonged offline flights, without losing changes or requiring manual merge conflict dialogues. Build a collaborative editor where edits merge mathematically via CRDT state vectors and persist to local IndexedDB.",
    "requirements": [
      "Integrate a block-based rich text editor (Tiptap / Lexical / Slate) bound to a Yjs / Automerge CRDT document.",
      "Implement real-time awareness protocol: broadcast collaborator cursor locations, text selections, and user avatars over WebSockets.",
      "Implement offline-first persistence with IndexedDB: users can disconnect, edit documents offline, and automatically sync diff vectors upon reconnection.",
      "Build an interactive conflict simulator demonstrating three concurrent clients typing in the same sentence with zero divergence.",
      "Support revision history playback: scrub backwards through past document edit states using stored CRDT transaction snapshots."
    ],
    "deliverables": [
      "Client frontend application and Node.js WebSocket synchronization server.",
      "Interactive multi-window testing sandbox demonstrating live cursor tracking and typing synchronization.",
      "Automated unit test suite verifying deterministic convergence across out-of-order edit delivery.",
      "Performance report measuring bundle size and sync latency."
    ],
    "starterSnippet": "// editor/syncProvider.ts\nimport * as Y from 'yjs';\nexport function setupDocument(docId: string) { return new Y.Doc(); }",
    "rubric": [
      {
        "aspect": "CRDT State Convergence & Mathematical Determinism",
        "points": 30
      },
      {
        "aspect": "Offline Local-First Storage & Reconnection Sync",
        "points": 25
      },
      {
        "aspect": "Collaborative Presence (Cursors & Selections)",
        "points": 25
      },
      {
        "aspect": "Revision History Scrubbing & UI Performance",
        "points": 20
      }
    ]
  },
  {
    "id": "github-distributed-lock",
    "title": "Distributed Lock Manager with Monotonic Fencing Tokens & Lease Renewal",
    "companyStyle": "Google Chubby & etcd Architecture",
    "category": "System Design & Backend",
    "level": "Advanced",
    "estimatedHours": "4 - 6 hours",
    "badge": "Concurrency Challenge",
    "githubRepo": "github.com/doap-org/distributed-fencing-lock-manager",
    "techStack": [
      "Go / Java / Python",
      "Raft Consensus / Redis",
      "gRPC",
      "Docker",
      "Chaos Mesh"
    ],
    "summary": "Build an enterprise distributed lock service providing fault-tolerant mutual exclusion, heartbeat lease renewal, and monotonic fencing tokens to prevent split-brain writes.",
    "overview": "Naive distributed locks fail during JVM GC pauses or network delays when locks expire without the holder's knowledge. Engineer a distributed lock manager that assigns strictly increasing fencing tokens, runs asynchronous lease keep-alive heartbeats, and rejects stale writes at the storage layer.",
    "requirements": [
      "Implement AcquireLock(resourceId, ttlMs) returning a lease grant and an unsigned 64-bit monotonically increasing Fencing Token.",
      "Implement an asynchronous background KeepAlive() heartbeat loop continuously refreshing leases until explicitly released.",
      "Implement a Mock Storage Service that validates incoming writes against the highest observed fencing token and rejects out-of-order/stale writes with HTTP 409 Conflict.",
      "Handle node failure failover: if the lock master crashes, surviving quorum nodes elect a new leader and reconstruct active leases without double-allocation.",
      "Build a chaos test simulating a client freeze (SIGSTOP/SIGCONT) proving that the frozen client cannot corrupt storage after waking up."
    ],
    "deliverables": [
      "Lock server binary and client SDK with automatic lease heartbeats.",
      "End-to-end chaos test script demonstrating split-brain prevention via fencing tokens.",
      "Comprehensive test suite testing lock contention, expiration timeouts, and lock queue ordering.",
      "Formal technical note analyzing the Kleppmann vs Redlock distributed locking critique."
    ],
    "starterSnippet": "// lock/client.go\npackage lock\ntype LockHandle struct { ResourceID string; FencingToken uint64 }",
    "rubric": [
      {
        "aspect": "Monotonic Fencing Token Correctness & Stale Write Rejection",
        "points": 35
      },
      {
        "aspect": "Background Lease Renewal & Heartbeat Reliability",
        "points": 25
      },
      {
        "aspect": "Chaos Test Proving Correctness During Client Freezes",
        "points": 20
      },
      {
        "aspect": "High-Contention Throughput & Clean Client SDK API",
        "points": 20
      }
    ]
  },
  {
    "id": "github-ebpf-monitor",
    "title": "Linux eBPF Real-Time Network Packet & Syscall Security Analyzer",
    "companyStyle": "Cilium & Datadog Kernel Instrumentation",
    "category": "Low-Level Systems & OS",
    "level": "Advanced",
    "estimatedHours": "6 - 8 hours",
    "badge": "Kernel Engineering",
    "githubRepo": "github.com/doap-org/ebpf-network-security-probe",
    "techStack": [
      "C / Rust (Aya / Cilium ebpf-go)",
      "Linux eBPF (XDP / kprobes)",
      "Prometheus",
      "Docker"
    ],
    "summary": "Write kernel eBPF probes attached to XDP and kprobes to monitor TCP SYN floods, trace process execve syscalls, and stream security telemetry to userspace.",
    "overview": "High-performance security agents inspect network packets and suspicious host process spawns directly inside the Linux kernel without context-switch penalties. Write an eBPF program utilizing eXpress Data Path (XDP) for line-rate packet drops and BPF ring buffers for streaming kernel security events to userspace.",
    "requirements": [
      "Write an XDP (eXpress Data Path) program attached to the network interface filtering and dropping packets from banned IP ranges in BPF maps.",
      "Implement a kprobe or tracepoint on the sys_enter_execve syscall capturing binary paths, CLI arguments, parent PID, and UID.",
      "Utilize BPF ring buffers (BPF_MAP_TYPE_RINGBUF) to stream event records to the userspace daemon with minimum kernel memory usage.",
      "Expose Prometheus metrics counting dropped packets per second, active TCP connections, and security violations.",
      "Package the userspace agent in a Docker container equipped with appropriate CAP_BPF / CAP_NET_ADMIN capabilities."
    ],
    "deliverables": [
      "eBPF C kernel code verified by the Linux kernel BPF verifier.",
      "Userspace Go/Rust controller managing map configurations and metric exports.",
      "SYN flood simulation test demonstrating 1,000,000 packets/sec dropped at line-rate with <5% CPU usage.",
      "Detailed report explaining BPF verifier constraints and stack memory limits."
    ],
    "starterSnippet": "// xdp_filter.bpf.c\n#include <linux/bpf.h>\n#include <bpf/bpf_helpers.h>\nSEC(\"xdp\") int xdp_drop(struct xdp_md *ctx) { return XDP_PASS; }",
    "rubric": [
      {
        "aspect": "Kernel eBPF Verifier Compliance & XDP Efficiency",
        "points": 35
      },
      {
        "aspect": "Ring Buffer Event Streaming & Userspace Ingestion",
        "points": 25
      },
      {
        "aspect": "Line-Rate Packet Drop Performance Under Load",
        "points": 20
      },
      {
        "aspect": "Syscall Tracing Accuracy & Container Packaging",
        "points": 20
      }
    ]
  },
  {
    "id": "github-ci-cd-runner",
    "title": "Distributed Ephemeral CI/CD Job Runner with Docker Sandboxing & Artifact Cache",
    "companyStyle": "GitHub Actions & Buildkite Architecture",
    "category": "DevOps & Cloud Infra",
    "level": "Intermediate",
    "estimatedHours": "4 - 6 hours",
    "badge": "DevOps Platform",
    "githubRepo": "github.com/doap-org/ephemeral-cicd-job-runner",
    "techStack": [
      "Go / Python / Node.js",
      "Docker Engine API",
      "WebSockets",
      "MinIO / S3",
      "PostgreSQL"
    ],
    "summary": "Engineer a distributed CI/CD runner daemon that pulls queued workflow jobs, spins up isolated ephemeral Docker containers, and streams stdout/stderr in real-time.",
    "overview": "Continuous Integration platforms rely on worker daemons that pull jobs from a central queue, securely execute untrusted shell scripts inside isolated containers, handle artifact uploads/downloads, and enforce strict execution timeouts.",
    "requirements": [
      "Implement a central job queue service assigning pending workflow runs to connected worker agents via long-polling or WebSockets.",
      "Implement a worker daemon that pulls container images, creates ephemeral container instances, injects environment variables, and executes multi-step commands.",
      "Stream raw console logs (stdout and stderr) chunk-by-chunk in real-time with ANSI color preservation to the central database.",
      "Implement artifact caching: pack specified folders into tar.gz archives and upload to S3/MinIO using content-addressed hash keys.",
      "Enforce safety bounds: maximum job timeout (e.g. 15 minutes), container memory limits, and non-root execution."
    ],
    "deliverables": [
      "Coordinator server and Runner worker daemon binaries.",
      "Sample YAML workflow pipeline demonstrating build, test, and artifact caching steps.",
      "Web interface displaying live streaming logs with auto-scroll and step completion badges.",
      "Comprehensive test suite covering job cancellation and timeout enforcement."
    ],
    "starterSnippet": "// runner/executor.go\npackage runner\ntype StepExecutor struct{}\nfunc (e *StepExecutor) RunStep() error { return nil }",
    "rubric": [
      {
        "aspect": "Docker API Lifecycle & Container Isolation",
        "points": 30
      },
      {
        "aspect": "Real-time Log Streaming & ANSI Encoding",
        "points": 25
      },
      {
        "aspect": "Artifact Caching & Content-Addressable Storage",
        "points": 25
      },
      {
        "aspect": "Timeout Governance & Clean Error Propagation",
        "points": 20
      }
    ]
  },
  {
    "id": "github-fintech-matching-engine",
    "title": "Ultra-Low Latency Limit Order Book (LOB) Matching Engine with Price-Time Priority",
    "companyStyle": "Citadel & Jane Street Trading Systems",
    "category": "Low-Level Systems & OS",
    "level": "Advanced",
    "estimatedHours": "5 - 8 hours",
    "badge": "HFT Trading Engine",
    "githubRepo": "github.com/doap-org/low-latency-orderbook-matching-engine",
    "techStack": [
      "C++20 / Rust",
      "Lock-Free Ring Buffers",
      "Cache-Aligned Structs",
      "Benchmark Harness",
      "GTest"
    ],
    "summary": "Construct a nanosecond-scale financial Limit Order Book (LOB) implementing Price-Time Priority (FIFO), market/limit orders, and zero-allocation memory pools.",
    "overview": "Electronic stock exchanges process millions of orders per second with sub-microsecond tick-to-trade latency. Implement a limit order book matching engine that processes incoming Limit and Market orders, maintains dual buy/sell price ladders, performs matches, and emits execution trade reports without runtime heap allocations.",
    "requirements": [
      "Structure the order book using a doubly linked list of orders at each price limit and a fast lookup tree/hash map for price levels.",
      "Enforce strict Price-Time (FIFO) priority: better prices match first; identical prices match in chronological arrival order.",
      "Pre-allocate memory pools for Order objects to eliminate malloc/free heap allocations during the hot matching path.",
      "Support order types: Limit Buy/Sell, Market Buy/Sell, Cancel Order, and Immediate-or-Cancel (IOC).",
      "Benchmark latency distribution: achieve median order execution latency <250 nanoseconds and p99 latency <1 microsecond."
    ],
    "deliverables": [
      "C++ or Rust matching engine source code adhering to zero-allocation principles.",
      "High-frequency trade generator testing order ingestion with 1,000,000 randomized orders.",
      "Nanosecond benchmark suite measuring p50, p90, p99, and p99.9 latency percentiles.",
      "Correctness test suite verifying partial fills, full matches, cancellations, and order book depth snapshots."
    ],
    "starterSnippet": "// order_book.hpp\nclass OrderBook {\npublic:\n    void add_limit_order(uint64_t id, bool is_buy, uint32_t price, uint32_t qty);\n};",
    "rubric": [
      {
        "aspect": "Matching Engine Correctness & Price-Time FIFO Rule",
        "points": 35
      },
      {
        "aspect": "Zero-Allocation Hot Path & Memory Pool Design",
        "points": 25
      },
      {
        "aspect": "Nanosecond Latency Benchmarks (p99 < 1µs)",
        "points": 20
      },
      {
        "aspect": "Edge-Case Handling (Partial Fills, Empty Ladders, IOC)",
        "points": 20
      }
    ]
  },
  {
    "id": "github-audio-streaming",
    "title": "Adaptive Bitrate Audio Streaming Server with HLS Packaging & Dynamic Transmuxing",
    "companyStyle": "Spotify & SoundCloud Infrastructure",
    "category": "Full-Stack & APIs",
    "level": "Intermediate",
    "estimatedHours": "4 - 5 hours",
    "badge": "Media Systems Challenge",
    "githubRepo": "github.com/doap-org/adaptive-hls-audio-server",
    "techStack": [
      "Node.js / Go",
      "FFmpeg / libav",
      "HLS / m3u8",
      "React Web Audio API",
      "Docker"
    ],
    "summary": "Build an adaptive bitrate (ABR) audio streaming platform segmenting high-res audio into multi-tier HLS chunks (64kbps, 128kbps, 320kbps) with Web Audio waveform visualization.",
    "overview": "Music streaming services must deliver uninterrupted playback across volatile mobile networks. Engineer an audio ingestion and streaming pipeline that ingests uncompressed audio, segments files into multi-bitrate HLS streams with cryptographic AES-128 chunk encryption, and renders a synchronized audio waveform in the browser.",
    "requirements": [
      "Transcode source audio files into three distinct quality ladders (AAC 64k, 128k, 320k) with 6-second .ts/.aac segment chunks and master .m3u8 manifests.",
      "Implement HLS AES-128 segment encryption: generate rotating encryption keys and deliver keys via authenticated HTTP key delivery endpoints.",
      "Build a customized audio player using the HTML5 Web Audio API supporting smooth adaptive bitrate switching without audible clicks or buffer stutter.",
      "Render pre-computed audio waveform peaks (sound wave visualization) allowing users to seek to any point in the track instantaneously.",
      "Implement byte-range HTTP streaming fallback for clients that do not support HLS."
    ],
    "deliverables": [
      "Backend media processing pipeline using FFmpeg child processes or C bindings.",
      "React web application with real-time audio visualizer and bitrate selector.",
      "End-to-end test verifying manifest generation, encryption key retrieval, and segment playback.",
      "docker-compose.yml bundling sample music files and media servers."
    ],
    "starterSnippet": "// transcoder.ts\nexport function generateHLSVariants(inputPath: string, outputDir: string) { return Promise.resolve(); }",
    "rubric": [
      {
        "aspect": "HLS Multi-Bitrate Transcoding & Manifest Spec Compliance",
        "points": 30
      },
      {
        "aspect": "AES-128 Encryption & Key Management Security",
        "points": 25
      },
      {
        "aspect": "Web Audio Player Synchronization & Waveform Rendering",
        "points": 25
      },
      {
        "aspect": "Clean Codebase, Automated Verification & Docker Setup",
        "points": 20
      }
    ]
  },
  {
    "id": "github-model-serving",
    "title": "High-Throughput GPU/CPU Model Inference Server with Dynamic Batching & Quantization",
    "companyStyle": "Triton Inference Server & vLLM Architecture",
    "category": "AI & LLM Engineering",
    "level": "Advanced",
    "estimatedHours": "5 - 7 hours",
    "badge": "ML Inference Challenge",
    "githubRepo": "github.com/doap-org/dynamic-batching-inference-server",
    "techStack": [
      "Python / C++",
      "ONNX Runtime / TensorRT",
      "Asyncio / gRPC",
      "Prometheus",
      "Docker"
    ],
    "summary": "Architect a production machine learning inference server supporting dynamic queue batching, INT8/FP16 quantized model execution, and sub-10ms p95 latencies.",
    "overview": "Running individual ML inference requests one-by-one leaves hardware underutilized. Build a high-performance model serving engine that queues concurrent incoming queries, dynamically groups them into batch tensors within a microsecond window (e.g. max_batch_size=32, max_queue_delay_microseconds=5000), and serves predictions with maximum GPU saturation.",
    "requirements": [
      "Implement an asynchronous request queue with dynamic batching that merges individual inference payloads into a single contiguous batch tensor.",
      "Load and execute optimized ONNX Runtime or TensorRT models supporting FP16 and INT8 quantized weights.",
      "Implement request prioritization: high-priority requests jump the batch queue while preventing starvation of standard requests.",
      "Expose both gRPC (KServe v2 data plane standard) and REST /v1/models/{model_name}:predict APIs.",
      "Provide Prometheus metrics tracking queue_time_seconds, compute_time_seconds, and average_batch_size."
    ],
    "deliverables": [
      "Serving engine codebase with modular model engine backend (ONNX / PyTorch).",
      "Benchmark script showing 4x-8x throughput improvement with dynamic batching compared to single-item execution.",
      "Sample sentiment analysis / embedding model demonstrating end-to-end inference.",
      "Complete test suite with concurrent client load generation."
    ],
    "starterSnippet": "# server/batcher.py\nclass DynamicBatcher:\n    def __init__(self, max_batch_size=32):\n        pass",
    "rubric": [
      {
        "aspect": "Dynamic Batching Queue & Latency-Throughput Tradeoff",
        "points": 35
      },
      {
        "aspect": "ONNX/TensorRT Quantization & Hardware Execution",
        "points": 25
      },
      {
        "aspect": "KServe v2 Standard API Compliance & gRPC Interface",
        "points": 20
      },
      {
        "aspect": "Benchmarked Throughput Gains & Telemetry",
        "points": 20
      }
    ]
  },
  {
    "id": "github-dns-resolver",
    "title": "Recursive Caching DNS Resolver with DNSSEC Signature Validation",
    "companyStyle": "Google Public DNS & Cloudflare 1.1.1.1",
    "category": "Low-Level Systems & OS",
    "level": "Advanced",
    "estimatedHours": "5 - 7 hours",
    "badge": "Networking Protocol",
    "githubRepo": "github.com/doap-org/recursive-dnssec-caching-resolver",
    "techStack": [
      "Go / Rust / C",
      "UDP / TCP Socket Programming",
      "DNS Wire Format",
      "Crypto (RSA/ECDSA)",
      "Docker"
    ],
    "summary": "Develop a recursive DNS resolver that queries root, TLD, and authoritative name servers iteratively, verifies DNSSEC cryptographic signatures, and caches answers with TTLs.",
    "overview": "Understand internet fundamentals by building a recursive DNS resolver from scratch. Parse binary RFC 1035 wire-format DNS packets, walk the hierarchical DNS tree starting from the 13 root hints, validate RRSIG and DNSKEY records to prevent DNS spoofing, and cache records using a thread-safe LRU cache.",
    "requirements": [
      "Implement binary DNS message encoder and decoder handling Header, Question, Answer, Authority, and Additional sections.",
      "Implement full iterative resolution: start at ICANN root name servers (198.41.0.4, etc.), query TLD servers (.com, .org), and resolve at authoritative servers.",
      "Implement DNSSEC validation: verify the chain of trust from root DS keys down through DNSKEY and RRSIG records using SHA-256 and RSA/ECDSA verification.",
      "Maintain a thread-safe in-memory cache that respects minimum/maximum TTL values and evicts expired records automatically.",
      "Support both UDP (512-byte limit with EDNS0 extension) and TCP fallback when responses are truncated (TC bit set)."
    ],
    "deliverables": [
      "Standalone DNS daemon listening on 127.0.0.1:5353.",
      "dig integration test verifying correct resolution of real-world domains (e.g. google.com, cloudflare.com).",
      "DNSSEC test suite validating that domains with broken signatures return SERVFAIL.",
      "Documentation detailing DNS packet layout and cache eviction rules."
    ],
    "starterSnippet": "// dns/parser.go\npackage dns\ntype DNSHeader struct { ID uint16; Flags uint16 }",
    "rubric": [
      {
        "aspect": "Binary DNS Wire-Format Encoding & Pointer Compression",
        "points": 30
      },
      {
        "aspect": "Recursive Query Iteration & TCP Fallback",
        "points": 25
      },
      {
        "aspect": "DNSSEC Cryptographic Chain of Trust Validation",
        "points": 25
      },
      {
        "aspect": "Cache TTL Correctness & Dig Compliance Testing",
        "points": 20
      }
    ]
  },
  {
    "id": "github-s3-object-store",
    "title": "Distributed S3-Compatible Content-Addressable Object Storage Engine",
    "companyStyle": "MinIO & AWS S3 Architecture",
    "category": "System Design & Backend",
    "level": "Advanced",
    "estimatedHours": "5 - 8 hours",
    "badge": "Storage Engine Challenge",
    "githubRepo": "github.com/doap-org/distributed-s3-object-store",
    "techStack": [
      "Go / Rust / Java",
      "HTTP REST",
      "Reed-Solomon Erasure Coding",
      "SHA-256 CAS",
      "Docker"
    ],
    "summary": "Construct a multi-node S3-compatible object storage server featuring content-addressable storage (CAS), multipart chunked uploads, and Reed-Solomon erasure coding.",
    "overview": "Object storage is the foundation of modern cloud data lakes. Build an S3-compatible storage cluster that shards files into data and parity blocks using erasure coding, writes blocks across independent storage drives, and reconstructs damaged files automatically even if multiple drives fail.",
    "requirements": [
      "Implement S3 REST API subsets: PutObject, GetObject, DeleteObject, ListObjectsV2, and Multipart Upload initiation/completion.",
      "Implement Reed-Solomon Erasure Coding (e.g. 4 data blocks + 2 parity blocks): recover objects completely when any 2 disks fail.",
      "Store metadata (ETag, Content-Type, custom user metadata) alongside content-addressable SHA-256 chunk hashes.",
      "Support resumable Multipart Uploads allowing large file uploads in parallel 5MB chunks.",
      "Implement background bit-rot scrubbing that periodically verifies block checksums and heals corrupted chunks."
    ],
    "deliverables": [
      "Storage daemon capable of mounting multiple virtual disk directories.",
      "AWS CLI / AWS S3 SDK integration test demonstrating seamless upload and download.",
      "Disaster recovery test verifying that deleting 2 out of 6 chunk files does not corrupt GetObject output.",
      "Performance report detailing read/write throughput across chunk sizes."
    ],
    "starterSnippet": "// storage/erasure.go\npackage storage\ntype ErasureStorage struct{}",
    "rubric": [
      {
        "aspect": "Reed-Solomon Erasure Coding & Bit-Rot Self-Healing",
        "points": 35
      },
      {
        "aspect": "S3 API Compatibility & AWS CLI Verification",
        "points": 25
      },
      {
        "aspect": "Resumable Multipart Upload Handling",
        "points": 20
      },
      {
        "aspect": "Disk Failure Resilience & Test Automation",
        "points": 20
      }
    ]
  },
  {
    "id": "github-secret-vault",
    "title": "Zero-Knowledge Secret Vault & Dynamic Key Management Service",
    "companyStyle": "HashiCorp Vault & AWS KMS Architecture",
    "category": "DevOps & Cloud Infra",
    "level": "Advanced",
    "estimatedHours": "4 - 6 hours",
    "badge": "Security & Cryptography",
    "githubRepo": "github.com/doap-org/zero-knowledge-secret-vault",
    "techStack": [
      "Go / Rust",
      "AES-256-GCM",
      "Shamir's Secret Sharing",
      "mTLS",
      "Docker"
    ],
    "summary": "Engineer a hardened cryptographic secret vault implementing Shamir's Secret Sharing threshold unsealing, envelope encryption, and automatic key rotation.",
    "overview": "Enterprise infrastructures cannot store plaintext passwords or tokens in code. Build a secure secret management vault that boots into a sealed state, requires a threshold of unseal keys (e.g. 3 of 5) to reconstruct the master key via Shamir's Secret Sharing, and encrypts secrets with AES-256-GCM envelope encryption.",
    "requirements": [
      "Implement Shamir's Secret Sharing algorithm split/combine logic (k-of-n threshold unsealing).",
      "Envelope Encryption: master key encrypts per-secret Data Encryption Keys (DEKs); DEKs encrypt payload data using authenticated AES-256-GCM.",
      "Implement dynamic secret leases with automatic expiration TTLs and revocation callbacks.",
      "Enforce tamper-evident audit logging: every secret read/write is signed with a cryptographic HMAC hash chain to prevent log tampering.",
      "Provide secure CLI allowing operators to initialize, unseal, write secrets, and read secrets with role-based tokens."
    ],
    "deliverables": [
      "Vault daemon and client CLI with mutual TLS (mTLS) enforcement.",
      "Cryptographic test suite verifying Shamir polynomial reconstruction math.",
      "Tamper test proving that modifying audit logs breaks the HMAC verification chain.",
      "Security audit document outlining memory protection (preventing core dumps of secret keys)."
    ],
    "starterSnippet": "// crypto/shamir.go\npackage crypto\ntype SecretShare struct { X byte; Y []byte }",
    "rubric": [
      {
        "aspect": "Shamir's Secret Sharing & Threshold Unsealing Math",
        "points": 35
      },
      {
        "aspect": "AES-256-GCM Envelope Encryption & Memory Safety",
        "points": 25
      },
      {
        "aspect": "Tamper-Evident HMAC Audit Log Verification",
        "points": 20
      },
      {
        "aspect": "Dynamic Lease Lifecycle & Token RBAC",
        "points": 20
      }
    ]
  },
  {
    "id": "github-workflow-engine",
    "title": "Durable Execution Workflow Engine with Saga Pattern & Compensation Logic",
    "companyStyle": "Temporal & AWS Step Functions Architecture",
    "category": "System Design & Backend",
    "level": "Advanced",
    "estimatedHours": "5 - 7 hours",
    "badge": "Durable Execution",
    "githubRepo": "github.com/doap-org/durable-saga-workflow-engine",
    "techStack": [
      "TypeScript / Go / Java",
      "PostgreSQL",
      "Event Sourcing",
      "Docker",
      "Jest"
    ],
    "summary": "Develop a durable execution engine that survives server crashes during multi-step distributed business processes and rolls back state via Saga compensation.",
    "overview": "Distributed e-commerce transactions (Payment -> Inventory -> Shipping) cannot rely on simple HTTP try-catch blocks. If a server crashes midway, execution must resume from the exact step without re-executing already completed actions. Build a durable workflow orchestrator based on event sourcing that replays workflow history and invokes compensating transactions upon failure.",
    "requirements": [
      "Implement durable workflow execution: if the runner process is abruptly killed with SIGKILL, restarting it resumes from the last completed activity without re-running side effects.",
      "Implement the Saga Pattern: if activity N fails after multiple retries, automatically execute compensating rollback steps for activities N-1 down to 1 in reverse order.",
      "Event Sourcing history: record WorkflowStarted, ActivityScheduled, ActivityCompleted, ActivityFailed, and WorkflowCompleted events.",
      "Support deterministic workflow replay: enforce that workflow definitions use virtual deterministic clocks and random seeds.",
      "Provide web UI visualizing active workflows, event timelines, and retry attempts."
    ],
    "deliverables": [
      "Workflow server and client worker SDK.",
      "Sample e-commerce checkout saga (AuthorizePayment -> ReserveStock -> GenerateShippingLabel) with simulated failures triggering rollbacks.",
      "Process crash test demonstrating seamless recovery and completion after SIGKILL.",
      "Comprehensive test suite covering timeout and compensation edge cases."
    ],
    "starterSnippet": "// workflow/saga.ts\nexport class SagaBuilder {\n  addActivity(act: any) { return this; }\n}",
    "rubric": [
      {
        "aspect": "Durable Crash Recovery & Event Sourcing Replay",
        "points": 35
      },
      {
        "aspect": "Saga Pattern Compensation Execution Correctness",
        "points": 25
      },
      {
        "aspect": "Deterministic Workflow Execution Invariants",
        "points": 20
      },
      {
        "aspect": "Observability Timeline UI & Test Automation",
        "points": 20
      }
    ]
  },
  {
    "id": "github-fine-tuning-pipeline",
    "title": "Distributed LoRA LLM Fine-Tuning & Quantization Pipeline",
    "companyStyle": "Hugging Face & RunPod Infrastructure",
    "category": "AI & LLM Engineering",
    "level": "Advanced",
    "estimatedHours": "5 - 7 hours",
    "badge": "LLM Engineering",
    "githubRepo": "github.com/doap-org/distributed-lora-finetuning-pipeline",
    "techStack": [
      "Python",
      "PyTorch",
      "PEFT / LoRA",
      "BitsAndBytes",
      "Hugging Face Transformers",
      "Wandb"
    ],
    "summary": "Build an automated parameter-efficient fine-tuning (PEFT/LoRA) pipeline for open-weights LLMs with 4-bit QLoRA quantization and automated loss validation.",
    "overview": "Training custom domain models requires robust, reproducible pipelines that load base open-source models, apply low-rank adapter (LoRA) matrices, stream distributed batches, and evaluate against domain test sets while logging metrics to Weights & Biases.",
    "requirements": [
      "Implement 4-bit NormalFloat (NF4) quantization loading of base models (e.g. Llama-3-8B or Mistral-7B) via BitsAndBytes.",
      "Configure LoRA adapters on attention projection layers (q_proj, v_proj) with configurable rank (r), alpha, and dropout.",
      "Build a streaming dataset loader with instruction-tuning format templates, tokenization, and sequence packing to minimize padding tokens.",
      "Implement gradient accumulation, mixed-precision FP16/BF16 training, and cosine learning rate decay with linear warmup.",
      "Export merged adapter weights and generate GGUF format files for low-latency local execution in llama.cpp."
    ],
    "deliverables": [
      "Modular Python training package with CLI configuration via Hydra or Argparse.",
      "Wandb training loss and perplexity tracking integration.",
      "GGUF quantization export script and validation benchmark against a held-out test split.",
      "Technical report comparing LoRA rank 8 vs rank 64 parameter efficiency."
    ],
    "starterSnippet": "# train/finetune.py\ndef setup_qlora_model(model_name: str, lora_r: int = 16):\n    pass",
    "rubric": [
      {
        "aspect": "QLoRA Quantization & Gradient Accumulation Setup",
        "points": 30
      },
      {
        "aspect": "Dataset Packing & Tokenization Optimization",
        "points": 25
      },
      {
        "aspect": "Adapter Merging & GGUF Quantization Export",
        "points": 25
      },
      {
        "aspect": "Reproducibility, Evaluation Metrics & Documentation",
        "points": 20
      }
    ]
  },
  {
    "id": "github-spatial-geohash",
    "title": "Real-Time Geospatial Driver-Passenger Ride Dispatch Engine",
    "companyStyle": "Uber & Lyft Platform Architecture",
    "category": "System Design & Backend",
    "level": "Advanced",
    "estimatedHours": "4 - 6 hours",
    "badge": "Geospatial Systems",
    "githubRepo": "github.com/doap-org/geospatial-dispatch-engine",
    "techStack": [
      "Go / Python / Node.js",
      "Uber H3 / Geohash",
      "Redis Geospatial",
      "WebSockets",
      "Leaflet UI"
    ],
    "summary": "Architect a high-frequency geospatial location tracking and nearest-driver dispatch engine partitioning coordinate streams into hexagonal H3 spatial indexes.",
    "overview": "Ride-hailing backends ingest millions of live driver GPS coordinates per minute. Build a geospatial matching engine that indexes driver positions into hexagonal spatial cells (Uber H3), finds the k-nearest available drivers within a radius in sub-5ms, and dispatches trips using bipartite Hungarian matching.",
    "requirements": [
      "Ingest continuous GPS telemetry updates (driverId, lat, lon, bearing, timestamp) via WebSockets and update Redis geospatial indexes.",
      "Implement nearest-driver lookup using Uber H3 hexagonal hierarchical spatial indexes or Geohashes with neighbor ring expansion.",
      "Implement an optimal ride matching dispatch algorithm minimizing aggregate passenger wait times (ETA) across concurrent requests.",
      "Simulate driver movement along route vectors and dynamically broadcast live vehicle positions to subscribed rider clients.",
      "Build a real-time web map dashboard visualizing thousands of simulated moving drivers and live dispatch assignments."
    ],
    "deliverables": [
      "Geospatial dispatch service and driver telemetry simulator.",
      "Interactive map UI showing live moving vehicles and matched trip routes.",
      "Benchmark demonstrating 20,000 GPS updates/sec with <10ms lookup latency.",
      "Comprehensive test suite covering edge cases (zero drivers in radius, concurrent booking contention)."
    ],
    "starterSnippet": "// dispatch/geo.go\npackage dispatch\ntype GeoEngine struct { resolution int }",
    "rubric": [
      {
        "aspect": "Geospatial Indexing Performance (H3 / Geohash)",
        "points": 30
      },
      {
        "aspect": "Nearest-Driver Query Latency & Concurrent Dispatching",
        "points": 25
      },
      {
        "aspect": "High-Frequency GPS Ingestion & WebSocket Streaming",
        "points": 25
      },
      {
        "aspect": "Interactive Map Visualization & Benchmark Suite",
        "points": 20
      }
    ]
  },
  {
    "id": "github-apm-tracing-agent",
    "title": "Zero-Overhead OpenTelemetry Distributed Tracing & Profiling Agent",
    "companyStyle": "New Relic & Dynatrace APM Architecture",
    "category": "DevOps & Cloud Infra",
    "level": "Advanced",
    "estimatedHours": "5 - 7 hours",
    "badge": "Observability Systems",
    "githubRepo": "github.com/doap-org/opentelemetry-apm-profiling-agent",
    "techStack": [
      "Java / Node.js / Go",
      "OpenTelemetry (OTel)",
      "Bytecode Manipulation / Monkeypatching",
      "gRPC",
      "Jaeger"
    ],
    "summary": "Build an automated APM instrumentation agent that dynamically instruments HTTP and database calls, propagates W3C Trace Context, and exports spans to OpenTelemetry collectors.",
    "overview": "APM tools must monitor microservice latencies without requiring developers to manually write tracing code in every function. Construct an automated instrumentation agent that attaches to runtimes, instruments outgoing HTTP and database queries, measures execution spans, and exports traces via OTLP over gRPC.",
    "requirements": [
      "Implement runtime bytecode manipulation (Java ByteBuddy) or module wrapping (Node.js import hook) to automatically instrument HTTP clients and database drivers.",
      "Extract and inject W3C Trace Context headers (traceparent and tracestate) across network boundaries for end-to-end distributed span graphs.",
      "Implement head-based and tail-based probabilistic trace sampling to control storage overhead under high load.",
      "Capture unhandled errors and record error attributes, stack traces, and span status codes on failing spans.",
      "Batch and export spans via OpenTelemetry Protocol (OTLP/gRPC) to Jaeger or an OpenTelemetry Collector."
    ],
    "deliverables": [
      "Zero-code APM agent plugin.",
      "Three sample microservices demonstrating distributed trace propagation across multi-tier service hops.",
      "Jaeger UI visualization showing complete end-to-end waterfall span trees.",
      "Performance benchmark measuring CPU and latency overhead added by the agent (<2% overhead)."
    ],
    "starterSnippet": "// agent/tracer.ts\nexport function patchHttpModule() {}",
    "rubric": [
      {
        "aspect": "Automatic Instrumentation & Bytecode/Monkeypatch Purity",
        "points": 35
      },
      {
        "aspect": "W3C Trace Context Propagation Across Services",
        "points": 25
      },
      {
        "aspect": "Zero-Overhead Performance Benchmark (<2% overhead)",
        "points": 20
      },
      {
        "aspect": "OTLP gRPC Export & Jaeger Waterfall Visualization",
        "points": 20
      }
    ]
  },
  {
    "id": "github-webrtc-sfu",
    "title": "WebRTC Selective Forwarding Unit (SFU) Multi-Party Video Conferencing Server",
    "companyStyle": "Zoom & LiveKit Media Architecture",
    "category": "Full-Stack & APIs",
    "level": "Advanced",
    "estimatedHours": "5 - 8 hours",
    "badge": "Real-Time Video Challenge",
    "githubRepo": "github.com/doap-org/webrtc-sfu-video-server",
    "techStack": [
      "Go (Pion WebRTC) / C++",
      "RTP / RTCP",
      "WebSockets (Signaling)",
      "React",
      "Docker"
    ],
    "summary": "Develop a scalable WebRTC Selective Forwarding Unit (SFU) that receives media tracks from publishers and selectively relays RTP packets to subscribers with bandwidth estimation.",
    "overview": "Mesh video calls fail beyond 4 participants because each client must upload N-1 streams. Build an SFU server that terminates WebRTC PeerConnections, receives one upstream video track per client, and distributes RTP packets downstream while adapting video layers using RTCP feedback.",
    "requirements": [
      "Implement WebRTC signaling via WebSockets exchanging SDP Offer/Answer and trickle ICE candidates.",
      "Implement the SFU track routing core using Pion WebRTC: receive audio/video RTP tracks and forward them to subscribed peer connections with zero re-encoding.",
      "Handle RTCP feedback: process Picture Loss Indication (PLI) and Full Intra Request (FIR) to prompt keyframe generation upon new subscriber join.",
      "Implement simulcast or temporal layer switching to downgrade video quality for bandwidth-constrained subscribers based on REMB/TWCC.",
      "Build a multi-participant React video meeting client supporting grid layout, active speaker detection, and audio level meters."
    ],
    "deliverables": [
      "Go SFU server binary with WebSocket signaling endpoint.",
      "React video conference web client supporting 8+ concurrent camera streams.",
      "Stress test measuring CPU and bandwidth usage forwarding 100 simultaneous video tracks.",
      "Comprehensive test suite covering ICE reconnection and network renegotiation."
    ],
    "starterSnippet": "// sfu/room.go\npackage sfu\ntype Room struct {}",
    "rubric": [
      {
        "aspect": "WebRTC RTP/RTCP Forwarding & Keyframe Handling",
        "points": 35
      },
      {
        "aspect": "Signaling State Machine & Trickle ICE Exchange",
        "points": 25
      },
      {
        "aspect": "Multi-Client Video Grid & Active Speaker UX",
        "points": 20
      },
      {
        "aspect": "Server Resource Efficiency & Forwarding Benchmarks",
        "points": 20
      }
    ]
  }
];
