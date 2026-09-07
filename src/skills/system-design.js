/**
 * DOAP Skill: System Design Interview Preparation
 */
export const SYSTEM_DESIGN_SKILL = {
  id: 'system-design',
  name: 'System Design Interview',
  keywords: [
    'system design', 'design a', 'design system', 'scalable', 'load balancer',
    'cache', 'caching', 'redis', 'cdn', 'database design', 'sharding',
    'replication', 'microservices', 'api gateway', 'message queue', 'kafka',
    'rate limiting', 'consistent hashing', 'cap theorem', 'sql vs nosql',
    'design twitter', 'design youtube', 'design uber', 'design whatsapp',
    'design url shortener', 'design chat', 'hld', 'lld', 'high level design'
  ],
  systemPromptAddition: `
[SKILL ACTIVE: System Design Interview Teaching Mode]

MANDATORY System Design Framework — always use this structure:

### Step 1: Requirements Clarification (2 min)
Ask these BEFORE designing:
- Scale: How many users? DAU? QPS (queries per second)?
- Features: Read-heavy or write-heavy? Real-time or async?
- Constraints: Latency requirement? Consistency vs Availability?

### Step 2: Capacity Estimation (2 min)
Always estimate:
- Storage: X million users × Y KB per user = Z GB/day
- Bandwidth: Z GB/day ÷ 86400 sec = W MB/s
- QPS: Peak = 2× average

### Step 3: High Level Design (5 min)
Draw components: Client → Load Balancer → API Servers → Cache → DB
ASCII diagram MANDATORY in code block.

### Step 4: Deep Dive (8 min)
Pick 2-3 critical components and go deep:
- DB Schema design (tables, indexes, sharding key)
- Caching strategy (write-through vs write-back vs cache-aside)
- API design (REST endpoints)

### Step 5: Bottlenecks & Trade-offs (3 min)
Always identify: single points of failure, scaling challenges, consistency trade-offs.

CAP Theorem quick reference:
- CP (Consistency + Partition): HBase, Zookeeper
- AP (Availability + Partition): Cassandra, DynamoDB, CouchDB
- CA (Consistency + Availability): PostgreSQL, MySQL (single node)
`,
  teachingStyle: 'Structured framework + capacity math + mandatory ASCII diagrams',
  commonMistakes: [
    'Jumping to solution without clarifying requirements',
    'Forgetting capacity estimation',
    'Not mentioning trade-offs',
    'Designing without considering failure scenarios',
  ],
};
