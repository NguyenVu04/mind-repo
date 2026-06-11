<div align="center">

<img src="https://img.shields.io/badge/status-in%20development-yellow?style=flat-square" alt="Status" />
<img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License" />
<img src="https://img.shields.io/badge/go-1.22+-00ADD8?style=flat-square&logo=go" alt="Go" />
<img src="https://img.shields.io/badge/python-3.12+-3776AB?style=flat-square&logo=python" alt="Python" />
<img src="https://img.shields.io/badge/next.js-14-black?style=flat-square&logo=next.js" alt="Next.js" />
<img src="https://img.shields.io/badge/contributions-welcome-brightgreen?style=flat-square" alt="Contributions" />

<br />
<br />

# 🧠 MindRepo

### The living knowledge layer for any field.

**Organize documents into repos. Build learning paths. Ask an AI tutor that actually knows your content. Let the community make it better.**

<br />

[**Live Demo**](https://mindrep.io) · [**Documentation**](https://docs.mindrep.io) · [**Report Bug**](https://github.com/yourusername/mindrep/issues) · [**Request Feature**](https://github.com/yourusername/mindrep/discussions)

<br />

</div>

---

## 📖 Table of Contents

- [What is MindRepo?](#-what-is-mindrep)
- [The Problem](#-the-problem)
- [Key Features](#-key-features)
- [Architecture Overview](#️-architecture-overview)
- [Tech Stack](#-tech-stack)
- [Service Breakdown](#-service-breakdown)
- [RAG Pipeline](#-rag-pipeline)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌱 What is MindRepo?

MindRepo is an **open-source knowledge platform** that transforms scattered documents into structured, interactive learning experiences. Think of it as GitHub for knowledge — where documents are version-controlled, community-reviewed, and powered by a per-repo AI tutor that understands exactly what's inside.

> This project is built as an academic learning exercise to practice **AI/ML infrastructure**, **RAG system design**, and **service-based backend architecture**. Every architectural decision prioritizes learning depth over operational simplicity.

### Who is it for?

| User | Use case |
|---|---|
| 📚 Researchers & academics | Organize paper collections, build reading curricula, ask questions across a corpus |
| 🏫 Educators & course creators | Structure course materials into guided learning paths with AI-assisted Q&A |
| 👥 Engineering teams | Internal knowledge base with version control, contribution workflows, and AI search |
| 🧑‍💻 Self-learners | Follow community-curated repos in any domain, track progress, get instant explanations |
| ✍️ Content contributors | Annotate and improve existing knowledge repos without modifying the source |

---

## 🔥 The Problem

Most teams and learners are currently stitching together 5+ tools to do what MindRepo does in one place:

```
Notion       → document storage (no structure, no AI, no versioning)
GitHub       → versioning (for code only, not knowledge)
Google Drive → file sharing (no learning path, no community)
YouTube      → video explanations (disconnected from documents)
ChatGPT      → Q&A (no knowledge of your specific documents)
```

The result: **documents get uploaded and never used again.** There's no structured path to learn from them, no AI that understands their content, and no community mechanism to improve quality over time.

---

## ✨ Key Features

### 📁 Document Repos with Version Control
Organize documents (PDF, DOCX, Markdown) into **versioned repositories** — like GitHub but for knowledge. Track when documents were last updated, manage contributor permissions, and maintain a full change history.

```
📦 machine-learning-fundamentals/
├── 01-linear-regression.pdf       (v2.1, updated 3 days ago)
├── 02-gradient-descent.pdf        (v1.0)
├── 03-neural-networks.md          (v3.4, community annotated)
└── learning-path.json             (2 paths: Beginner, Advanced)
```

### 🗺️ Learning Path Builder
Turn a collection of documents into a **structured curriculum** with:
- Drag-and-drop ordering with prerequisite dependencies
- Estimated reading time per document
- Personal progress tracking per user
- Multiple parallel paths per repo (e.g. Beginner / Advanced)

### 🤖 Per-Repo AI Tutor — the core differentiator
Every repo gets its own **RAG-powered AI tutor** trained exclusively on that repo's content. Unlike general-purpose chatbots, MindRepo's AI tutor:

- **Answers only from your documents** — no hallucinated facts from external knowledge
- **Cites exact sources** — "According to *03-neural-networks.md*, page 4..."
- **Generates flashcards automatically** from key concepts
- **Knows where you are** in the learning path and adjusts context accordingly
- **Handles off-topic gracefully** — "I couldn't find this in the repo. Search general knowledge instead?"

```
You:  "Why does learning rate matter in gradient descent?"

AI:   Based on 02-gradient-descent.pdf (section 3.2):
      A learning rate that's too high causes the optimizer to overshoot
      the minimum, while one too low leads to extremely slow convergence...
      
      [Source: 02-gradient-descent.pdf · page 7]
      [💾 Save as flashcard?]
```

### 🏷️ Community Annotation Layer
Contributors add **inline annotations** on top of documents without modifying the original — similar to a pull request, but for knowledge:

- **Types:** Explanation · Example · Correction · Question
- Annotations live in a separate layer — originals are never touched
- Authors can **Approve → merge** annotations into the official version
- Low-quality annotations are automatically hidden after community downvotes

### ⭐ Reputation-Weighted Peer Review
Document quality ratings are **not equal** — a review from a domain expert carries more weight:

```
Weighted Score = Σ(rating × weight) / Σ(weight)

Weight tiers:
  Tier 0 (0–4 pts)   → weight 1.0   (new user)
  Tier 1 (5–19 pts)  → weight 1.5
  Tier 2 (20–49 pts) → weight 2.0
  Tier 3 (50–99 pts) → weight 2.5
  Tier 4 (100+ pts)  → weight 3.0   (+0.5 bonus for domain match)
```

### 🎬 Video + Document Sync
Link YouTube/Vimeo videos to your repo with **timestamp-level linking** — when reading page 12 of a whitepaper, see the exact video timestamp that explains that concept. No video hosting costs; pure intelligence layer on top of existing platforms.

### 🔍 Semantic Search Across Repos
Search across all public repos using **hybrid search** — combining dense vector similarity (semantic meaning) with BM25 keyword matching, fused via Reciprocal Rank Fusion (RRF) for best-of-both-worlds results.

---

## 🏗️ Architecture Overview

MindRepo uses a **service-based architecture** with a clear separation between Go services (business logic) and Python services (AI/ML pipeline). This is intentional — the entire AI ecosystem lives natively in Python, while Go handles I/O-bound operations efficiently with goroutines.

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│              Next.js 14 — App Router + SSE               │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS
┌────────────────────────▼────────────────────────────────┐
│                  Nginx (Reverse Proxy)                   │
│         TLS termination · Rate limiting · Routing        │
└──┬──────────┬──────────┬──────────┬──────────┬──────────┘
   │          │          │          │          │
┌──▼──┐  ┌───▼──┐  ┌────▼──┐  ┌───▼──┐  ┌────▼──┐
│User │  │Repo  │  │Comm-  │  │Notif │  │Pay-   │
│svc  │  │svc   │  │unity  │  │svc   │  │ment   │
│:8081│  │:8082 │  │svc    │  │:8084 │  │svc    │
│ Go  │  │ Go   │  │:8083  │  │ Go   │  │:8085  │
└──┬──┘  └───┬──┘  │ Go    │  └───┬──┘  │ Go    │
   │         │     └───────┘      │     └───────┘
   │    ┌────▼──────────────────────────────┐
   │    │        Redis (Pub/Sub + Queue)     │
   │    └──────┬──────────────────┬─────────┘
   │           │                  │
   │    ┌──────▼──────┐    ┌──────▼──────────┐
   │    │  AI Service  │    │ Indexing Worker  │
   │    │  :8090       │    │  Celery          │
   │    │  Python      │    │  Python          │
   │    │  FastAPI     │    │  (no HTTP port)  │
   │    └──────┬───────┘    └──────┬───────────┘
   │           │                   │
┌──▼───────────▼───────────────────▼──────────────────┐
│                    Data Layer                         │
│  PostgreSQL 16   │  Qdrant        │  MinIO           │
│  (5 schemas)     │  (vector DB)   │  (file storage)  │
│                  │                │                  │
│  Redis           │  Auth0 (IAM)   │                  │
│  (cache/queue)   │  (managed)     │                  │
└──────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Backend language | **Go** (services) + **Python** (AI) | Go for efficient I/O-bound services; Python for AI ecosystem (no bridges needed) |
| Architecture style | **Service-based** | Clear boundaries per business capability; loose coupling; independent failure domains |
| Vector DB | **Qdrant** over pgvector | HNSW tuning, hybrid search built-in, multi-tenancy patterns, richer learning surface |
| LLM | **Claude API** (swappable) | No GPU infra cost at MVP stage; OpenAI-compatible interface allows swap to vLLM |
| Auth | **Auth0** (managed) | Offload auth complexity; focus budget on AI/ML infra |
| File storage | **MinIO** (self-hosted) | S3-compatible API; full control over data; runs in Docker alongside other services |
| Search | **Qdrant hybrid** over Elasticsearch | Dense + sparse vectors with RRF built-in; one less service to operate |
| Database | **PostgreSQL** with per-service schemas | Schema-level isolation without full database-per-service overhead |
| Payment | **Stripe** (test mode) | Industry-standard; teaches webhook idempotency, subscription lifecycle |

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | React framework with server components and streaming |
| TypeScript | Type safety across the full frontend |
| Tailwind CSS | Utility-first styling |
| Auth0 SDK | Authentication flow and token management |

### Backend — Go Services
| Technology | Purpose |
|---|---|
| Go 1.22+ | User, Repo, Community, Notification, Payment services |
| `golang-jwt/jwt` | JWT validation with Auth0 JWKS |
| `pgx/v5` | PostgreSQL driver — direct, no ORM |
| `go-redis/redis` | Redis client for cache, pub/sub, queue |
| `gobreaker` | Circuit breaker for inter-service calls |
| Stripe Go SDK | Payment processing |

### Backend — Python / AI
| Technology | Purpose |
|---|---|
| FastAPI | AI service HTTP layer with async streaming |
| Celery | Distributed task queue for document indexing |
| LangChain | RAG pipeline orchestration |
| Qdrant client | Vector store: dense + sparse hybrid search |
| Unstructured.io | Document parsing — PDF, DOCX, preserves structure |
| BGE-reranker | Cross-encoder reranking for retrieval quality |
| RAGAS | RAG evaluation: faithfulness, answer relevancy, context recall |
| LangFuse | LLM observability: traces, token costs, latency per step |
| `text-embedding-3-small` | OpenAI embedding model (swappable to BGE-M3 for self-hosted) |

### Infrastructure
| Technology | Purpose |
|---|---|
| Docker + Docker Compose | Local development — full stack in one command |
| PostgreSQL 16 | Primary database with per-service schemas |
| Qdrant | Vector database — per-repo collections |
| Redis | Celery broker · session cache · pub/sub events |
| MinIO | S3-compatible object storage — self-hosted, runs in Docker |
| Nginx | Reverse proxy, TLS, rate limiting |
| Auth0 | Managed IAM — JWT, OIDC, social login |

---

## 🔩 Service Breakdown

### User Service `:8081` — Go
Manages user identity, profile, onboarding, and reputation.

- **Provisioning flow:** Auth0 webhook → create PostgreSQL record → sync `pg_user_id` back to Auth0 `app_metadata`
- **Onboarding gate:** middleware blocks all routes until `username` and `domains` are set
- **Reputation engine:** calculates tier (0–4) based on completed repos, approved annotations, quality reviews
- **Owns:** `user_svc.users`, `user_svc.user_preferences`

### Repo Service `:8082` — Go
Core content management — the GitHub-like layer.

- CRUD for repos, documents, learning paths, contributor permissions
- Tracks document version history and last-updated timestamps
- On document upload: stores file metadata, pushes `indexing_job` to Redis queue
- **Does not store files** — only metadata; files go to MinIO
- **Owns:** `repo_svc.repos`, `repo_svc.documents`, `repo_svc.learning_paths`, `repo_svc.contributors`

### Community Service `:8083` — Go
Annotation layer and reputation-weighted review system.

- Annotation types: Explanation, Example, Correction, Question
- Inline annotations stored separately — never mutates source documents
- Weighted review scoring using User service reputation (circuit-breaker protected)
- Fallback to Tier 0 weight if User service is unavailable — reviews still saved, recalculated later
- **Owns:** `community_svc.annotations`, `community_svc.reviews`, `community_svc.votes`

- Subscribes to Redis pub/sub channels: `document.indexed`, `annotation.approved`, `subscription.changed`, `invoice.payment_failed`
- Sends email via SendGrid and in-app notifications
- **Owns:** `notif_svc.notifications`

### Payment Service `:8084` — Go
Stripe orchestration layer — never handles card data directly.

- Creates Stripe Checkout Sessions for subscription upgrades
- Validates webhook signatures on every inbound event
- **Idempotency guaranteed:** `stripe_webhook_events` table prevents double-processing
- Publishes `subscription.activated` / `subscription.canceled` to Redis for other services to react
- **Owns:** `payment_svc.subscriptions`, `payment_svc.invoices`, `payment_svc.stripe_webhook_events`

### AI Service `:8090` — Python / FastAPI
The core differentiator — all intelligence lives here.

- Exposes `/query` endpoint with **Server-Sent Events** for token streaming
- Runs full RAG pipeline on each query (see [RAG Pipeline](#-rag-pipeline) below)
- Generates flashcards from key concepts via structured LLM output
- Exposes `/evaluate` endpoint using RAGAS for pipeline quality measurement
- All requests traced via LangFuse — latency per step, token costs, retrieval quality
- **Owns:** Qdrant collections (one per repo), `ai_svc.ai_sessions`, `ai_svc.flashcards`

### Indexing Worker — Python / Celery
Background document processor — triggered by Repo service, no HTTP interface.

- Parses documents with Unstructured.io (preserves headers, tables, lists)
- Applies multiple chunking strategies (recursive, semantic, parent-child)
- Generates embeddings and upserts to Qdrant collection
- Reports status back via Redis: `indexing.started`, `indexing.completed`, `indexing.failed`
- Retries failed jobs with exponential backoff (3 attempts: 2m → 10m → 30m)

---

## 🔬 RAG Pipeline

MindRepo implements a **multi-stage retrieval pipeline** designed for high accuracy over raw documents. Each stage is measurable via RAGAS evaluation.

```
User Query
    │
    ▼
[Query Analysis]
    Detect query type: factual / conceptual / comparison
    HyDE expansion for ambiguous queries
    (generate hypothetical answer → embed → search)
    │
    ▼
[Hybrid Retrieval]
    Dense search:  Qdrant HNSW cosine similarity (top-20)
    Sparse search: BM25 via FastEmbed (top-20)
    Fusion:        Reciprocal Rank Fusion → top-10 candidates
    Filter:        payload filter by repo_id (collection isolation)
    │
    ▼
[Reranking]
    BGE-reranker cross-encoder scores all 10 candidates
    Select top-4 by reranker score
    Apply parent-child expansion:
      retrieve child chunk (precision) → return parent context (recall)
    │
    ▼
[Generation]
    Build prompt with retrieved context + conversation history
    Stream response via Claude API (SSE to client)
    Extract citation references → link to source document + page
    Detect key concepts → offer flashcard generation
    │
    ▼
[Evaluation] (async, sampled 10%)
    RAGAS metrics: faithfulness · answer_relevancy · context_recall
    Log to LangFuse with full trace
```

### Retrieval strategies implemented

| Strategy | When it helps |
|---|---|
| **Naive top-k** | Baseline — dense similarity only |
| **Hybrid search** | Technical terms, proper nouns, code snippets |
| **HyDE** | Vague or exploratory questions |
| **Cross-encoder reranking** | Precision after broad recall |
| **Parent-child chunking** | Long-form explanations needing context |

---

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose v2
- Node.js 20+ (for frontend)
- Go 1.22+ (for backend services)
- Python 3.12+ (for AI services)
- An Auth0 account (free tier)
- A Stripe account in test mode (free)
- An Anthropic API key (Claude)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/mindrep.git
cd mindrep

# 2. Copy environment files
cp .env.example .env
# Edit .env with your API keys (see Environment Variables below)

# 3. Start all infrastructure services
docker compose up postgres redis qdrant minio -d

# 4. Run database migrations
make migrate-up

# 5. Start all backend services
docker compose up -d

# 6. Start frontend (development mode)
cd frontend && npm install && npm run dev

# 7. Open http://localhost:3000
```

### Using Stripe CLI for webhook testing

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Forward webhooks to local Payment service
stripe listen --forward-to localhost:8085/payments/webhook

# Trigger test events
stripe trigger customer.subscription.created
stripe trigger invoice.payment_failed
```

### Running the AI service standalone

```bash
cd services/ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8090

# Test the RAG pipeline
curl -X POST http://localhost:8090/query \
  -H "Content-Type: application/json" \
  -d '{"repo_id": "test-repo", "query": "What is gradient descent?"}'
```

---

## 🔐 Environment Variables

```bash
# ── Auth0 ──────────────────────────────────────────
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_AUDIENCE=https://api.mindrep.io
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
AUTH0_MGMT_TOKEN=your_management_api_token   # for app_metadata updates

# ── Database ───────────────────────────────────────
POSTGRES_URL=postgres://mindrep:password@localhost:5432/mindrep
REDIS_URL=redis://localhost:6379
QDRANT_URL=http://localhost:6333

# ── Storage (MinIO) ────────────────────────────────
MINIO_ENDPOINT=http://localhost:9000
MINIO_BUCKET=mindrep-documents
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_CONSOLE_PORT=9001

# ── AI ─────────────────────────────────────────────
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...                        # for text-embedding-3-small
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_PUBLIC_KEY=pk-lf-...

# ── Payment ────────────────────────────────────────
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_TEAM_PRICE_ID=price_...
```

---

## 📁 Project Structure

```
mindrep/
├── frontend/                        # Next.js 14 application
│   ├── app/                         # App Router pages
│   │   ├── (auth)/                  # Login, onboarding
│   │   ├── dashboard/               # User dashboard
│   │   ├── repos/[id]/              # Repo view + AI tutor
│   │   └── settings/                # Profile, billing
│   └── components/
│       ├── ai-tutor/                # Streaming chat UI
│       ├── document-reader/         # PDF viewer + annotations
│       └── learning-path/           # Progress tracker
│
├── services/
│   ├── user-service/                # Go — :8081
│   │   ├── cmd/main.go
│   │   ├── internal/
│   │   │   ├── handler/             # HTTP handlers
│   │   │   ├── service/             # Business logic
│   │   │   └── repository/          # DB queries
│   │   └── Dockerfile
│   │
│   ├── repo-service/                # Go — :8082
│   ├── community-service/           # Go — :8083
│   ├── payment-service/             # Go — :8084
│   │
│   ├── ai-service/                  # Python — :8090
│   │   ├── main.py                  # FastAPI app
│   │   ├── rag/
│   │   │   ├── pipeline.py          # Full RAG pipeline
│   │   │   ├── retrieval.py         # Hybrid search + reranking
│   │   │   ├── generation.py        # Streaming generation
│   │   │   └── evaluation.py        # RAGAS metrics
│   │   ├── indexing/
│   │   │   ├── worker.py            # Celery tasks
│   │   │   ├── chunking.py          # Chunking strategies
│   │   │   └── embedding.py         # Embedding pipeline
│   │   └── Dockerfile
│   │
│   └── indexing-worker/             # Python — Celery
│
├── infra/
│   ├── nginx/
│   │   └── nginx.conf
│   ├── migrations/                  # PostgreSQL migrations (per service schema)
│   │   ├── user_svc/
│   │   ├── repo_svc/
│   │   ├── community_svc/
│   │   ├── notif_svc/
│   │   ├── payment_svc/
│   │   └── ai_svc/
│   └── docker-compose.yml
│
├── docs/
│   ├── architecture/
│   │   ├── decisions/               # Architecture Decision Records (ADRs)
│   │   └── diagrams/
│   ├── api/                         # OpenAPI specs per service
│   └── rag-pipeline.md              # Deep dive on retrieval strategies
│
├── scripts/
│   ├── seed.sh                      # Seed test data
│   └── eval-rag.py                  # Run RAGAS evaluation suite
│
└── Makefile                         # Common commands
```

---

## 🗺️ Roadmap

### MVP v1.0 — In Progress
- [x] Architecture design and service boundaries
- [x] Use case specification
- [ ] User service + Auth0 integration + onboarding flow
- [ ] Repo service + document upload + MinIO storage
- [ ] Indexing worker — chunking + Qdrant embedding pipeline
- [ ] AI service — naive RAG baseline
- [ ] Learning path builder UI
- [ ] Public repo discovery + search
- [ ] Community annotation layer
- [ ] Payment service + Stripe integration

### v1.1 — RAG Quality
- [ ] Hybrid search (dense + sparse vectors)
- [ ] Cross-encoder reranking (BGE-reranker)
- [ ] HyDE for ambiguous queries
- [ ] Parent-child chunking strategy
- [ ] RAGAS evaluation dashboard
- [ ] LangFuse tracing + observability

### v1.2 — Community & Content
- [ ] Reputation-weighted review system
- [ ] Video + document timestamp linking
- [ ] Completion badges
- [ ] Repo forking (learning path only, not documents)

### v2.0 — Advanced (Planned)
- [ ] Cross-repo concept linking
- [ ] Knowledge graph visualization
- [ ] vLLM self-hosted option (swap Claude API)
- [ ] BGE-M3 self-hosted embeddings
- [ ] Mobile web optimization
- [ ] Public API for third-party integrations

---

## 🤝 Contributing

MindRepo is an open learning project and contributions are genuinely welcome — whether you're fixing a bug, improving the RAG pipeline, or adding documentation.

### Ways to contribute

- 🐛 **Bug reports** — open an issue with reproduction steps
- 💡 **Feature discussions** — start a GitHub Discussion before coding
- 📖 **Documentation** — improve setup guides, add ADRs for architecture decisions
- 🧪 **RAG experiments** — try a new retrieval strategy and share RAGAS benchmark results
- 🌐 **Translations** — README and UI in other languages

### Development setup

```bash
# Run a specific service in watch mode
cd services/user-service && air        # Go hot reload

cd services/ai-service && uvicorn main:app --reload  # Python hot reload

# Run all Go tests
make test-go

# Run RAG evaluation suite
python scripts/eval-rag.py --repo test-corpus --strategy hybrid

# Lint everything
make lint
```

### Commit convention

```
feat(ai): add cross-encoder reranking to retrieval pipeline
fix(repo): handle concurrent document uploads with idempotency key
docs(rag): add parent-child chunking explanation to pipeline docs
test(payment): add webhook idempotency test cases
```

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a pull request.

---

## 📚 Learning Resources

This project was built with the intent to learn deeply. Here are the key resources that informed the design:

| Topic | Resource |
|---|---|
| RAG evaluation | [RAGAS paper](https://arxiv.org/abs/2309.15217) |
| Hybrid search | [Qdrant hybrid search docs](https://qdrant.tech/documentation/concepts/hybrid-queries/) |
| HyDE retrieval | [Precise Zero-Shot Dense Retrieval (arxiv)](https://arxiv.org/abs/2212.10496) |
| LLM serving | [vLLM paper — PagedAttention](https://arxiv.org/abs/2309.06180) |
| Service architecture | [Sam Newman — Building Microservices](https://samnewman.io/books/building_microservices/) |
| Go patterns | [Jon Bodner — Learning Go](https://www.oreilly.com/library/view/learning-go/9781492077206/) |

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

You are free to use, modify, and distribute this project. Attribution appreciated but not required.

---

<div align="center">

Built with curiosity · Powered by open source · Made for learners

<br />

⭐ **Star this repo** if you find it useful — it helps others discover the project.

</div>