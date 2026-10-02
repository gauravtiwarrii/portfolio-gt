import { Database, Server, Box, Cloud, Lock, Workflow, Split } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   Project data
   ───────────────────────────────────────────────────────────────
   Every claim here traces to Gaurav's CV or the project brief.
   No metric, user count, revenue figure or link is invented.

   `github` and `demo` are optional on purpose: projects without a
   published repository render no link rather than a dead one.
   ═══════════════════════════════════════════════════════════════ */

/** A stage in a project's architecture, rendered as a diagram node. */
export interface FlowNode {
  /** Short label shown in the node. */
  label: string;
  /** What this stage is responsible for. */
  role: string;
  /** One-line explanation revealed on hover/focus. */
  note: string;
  /** Optional branch labels, for nodes that fork (e.g. approve / reject). */
  branches?: string[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  github?: string;
  demo?: string;
  featured: boolean;
  /** Editorial category line, e.g. "Security · Real-Time Systems". */
  category: string;
  year: string;
  status: "Live" | "Building" | "Archived";
  /** Ordering index within Selected Work. */
  order?: number;
  problem: string;
  /** Engineering depth — the substance of each case study. */
  highlights: string[];
  /** Architecture stages, used by the diagram component. */
  flow?: FlowNode[];
  /** Caveat rendered alongside the case study when data is synthetic. */
  dataNote?: string;
  details: {
    challenge: string;
    solution: string;
    architecture: { description: string };
    techStackJustification: { tech: string; reason: string }[];
    performance: string[];
    engineeringPractices: string[];
    features: string[];
  };
}

/* ───────────────────────────────────────────────────────────────
   Selected Work — six featured case studies
   ─────────────────────────────────────────────────────────────── */

export const projects: Project[] = [
  {
    slug: "splitsmart",
    title: "SplitSmart",
    subtitle: "Shared-expense settlement with an auditable ledger",
    description:
      "A shared-expense platform where the hard part is not the arithmetic but the invariants: members join and leave over time, four different split modes have to agree, and every mutation has to stay auditable.",
    tags: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Neon", "NextAuth", "Tailwind"],
    icon: Split,
    featured: true,
    order: 1,
    category: "Full-Stack Product · Distributed Business Logic",
    year: "2026",
    status: "Building",
    problem:
      "Splitting expenses across a group stops being simple the moment membership changes. An expense recorded in March must not be reapportioned because someone joined in June, and any correction has to remain traceable.",
    highlights: [
      "10-model PostgreSQL schema covering groups, members, expenses, splits and audit history",
      "Active/inactive member timeline invariant, so historical expenses are never reapportioned",
      "Four expense split modes — equal, exact, percentage and share-weighted",
      "Greedy debt simplification that collapses circular balances into the fewest transfers",
      "CSV import wizard with fuzzy member-name matching against existing members",
      "12 anomaly detection rules run over imported rows before they are committed",
      "Append-only audit log storing JSON old/new value diffs for every mutation",
      "Route protection through NextAuth session checks on every authenticated path",
    ],
    flow: [
      { label: "Users", role: "Client", note: "Authenticated group members acting on shared state." },
      { label: "Next.js", role: "App Router", note: "Server components and route handlers; session-gated paths." },
      { label: "Business Logic", role: "Domain layer", note: "Split modes, timeline invariant, debt simplification, anomaly rules." },
      { label: "Prisma", role: "Data access", note: "Typed schema and migrations over the 10-model design." },
      { label: "PostgreSQL", role: "Storage", note: "Neon-hosted Postgres holding ledger state and the append-only audit log." },
    ],
    details: {
      challenge:
        "Keeping settlement correct while group membership changes over time, and keeping every correction traceable rather than silently overwritten.",
      solution:
        "Modelled membership as a timeline rather than a flag, so an expense is always apportioned against the members active at its date. Balances are reduced with a greedy debt-simplification pass, and every mutation is written to an append-only audit log with JSON old/new value diffs.",
      architecture: {
        description: "Users → Next.js → Business Logic → Prisma → PostgreSQL (Neon)",
      },
      techStackJustification: [
        { tech: "PostgreSQL", reason: "Relational integrity and transactional guarantees for ledger state." },
        { tech: "Prisma", reason: "Type-safe access across a 10-model schema, with migration history." },
        { tech: "NextAuth", reason: "Session handling wired into route protection rather than bolted on." },
        { tech: "Neon", reason: "Managed Postgres with branching, suited to schema iteration." },
      ],
      performance: [],
      engineeringPractices: [
        "Append-only audit log — corrections are new records, never overwrites.",
        "Anomaly rules run before import is committed, not after.",
        "Invariant enforced in the domain layer rather than in the UI.",
      ],
      features: [
        "Four split modes with a shared settlement path.",
        "Debt simplification into the fewest transfers.",
        "CSV import with fuzzy member matching.",
        "Full audit history with value-level diffs.",
      ],
    },
  },

  {
    slug: "investiq",
    title: "InvestIQ",
    subtitle: "A reviewed research pipeline, not a single model call",
    description:
      "An equity-research system built as an explicit state graph. Research fans out into parallel analysis, a thesis is drafted, and a reviewer node can send it back — a bounded critique loop rather than one prompt and a hope.",
    tags: ["Next.js", "TypeScript", "LangGraph.js", "Google Gemini", "Tavily", "Supabase", "SSE"],
    icon: Workflow,
    featured: true,
    order: 2,
    category: "AI Research Infrastructure",
    year: "2026",
    status: "Building",
    problem:
      "A single language-model call produces confident research with no mechanism for catching its own weaknesses. Quality control has to be part of the graph, not a manual step afterwards.",
    highlights: [
      "5-node LangGraph.js state graph with explicit transitions between stages",
      "Live research data retrieved through Tavily rather than model recall",
      "Yahoo Finance integration supplying quantitative market context",
      "Parallel analysis fan-out, so independent angles are evaluated concurrently",
      "Reviewer node that critiques the drafted thesis against the gathered evidence",
      "Bounded critique loop — revision is capped, so the graph always terminates",
      "Conditional rejection edge that routes a failed thesis back for revision",
      "Server-Sent Events streaming each node transition to the client as it happens",
      "Persistent report history in Supabase",
    ],
    flow: [
      { label: "Research", role: "Retrieval", note: "Tavily search plus Yahoo Finance data, so the graph reasons over live sources." },
      { label: "Analysis Fan-out", role: "Parallel nodes", note: "Independent analytical angles evaluated concurrently." },
      { label: "Investment Thesis", role: "Synthesis", note: "Gemini drafts a thesis from the gathered evidence." },
      { label: "Reviewer", role: "Critique", note: "Evaluates the thesis against its sources and decides whether it holds." },
      { label: "Approved / Rejected", role: "Conditional edge", note: "Rejection routes back for revision; the loop is bounded so it terminates.", branches: ["Approved", "Rejected"] },
      { label: "Final Report", role: "Output", note: "Streamed over SSE and persisted to Supabase." },
    ],
    details: {
      challenge:
        "Getting reviewable output out of a language model, and giving the user visibility into a multi-stage process that takes time to run.",
      solution:
        "Modelled the workflow as a LangGraph.js state graph with a reviewer node and a conditional rejection edge, so a weak thesis is sent back for revision inside a bounded loop. Node transitions stream to the client over Server-Sent Events, making a slow pipeline legible while it runs.",
      architecture: {
        description: "Research → Analysis Fan-out → Investment Thesis → Reviewer → Approved / Rejected → Final Report",
      },
      techStackJustification: [
        { tech: "LangGraph.js", reason: "Explicit state machine for agent flow — inspectable transitions instead of opaque chaining." },
        { tech: "Tavily", reason: "Retrieval over live sources rather than relying on model recall." },
        { tech: "Server-Sent Events", reason: "One-way streaming fits progress updates without WebSocket overhead." },
        { tech: "Supabase", reason: "Persistence for report history and auth in one managed service." },
      ],
      performance: [],
      engineeringPractices: [
        "Critique loop is bounded — the graph is guaranteed to terminate.",
        "Retrieval is separated from synthesis, so sources stay attributable.",
        "Streamed transitions make long-running work observable.",
      ],
      features: [
        "Five-stage reviewed research graph.",
        "Parallel analysis fan-out.",
        "Live streaming of graph progress.",
        "Persistent report history.",
      ],
    },
  },

  {
    slug: "chatpulse",
    title: "ChatPulse",
    subtitle: "A messaging server that cannot read its own traffic",
    description:
      "End-to-end encrypted messaging where the private key never leaves the browser. The server relays ciphertext and wrapped session keys, and holds nothing it could decrypt.",
    tags: ["Node.js", "Express", "Socket.io", "MongoDB", "WebCrypto", "IndexedDB"],
    icon: Lock,
    featured: true,
    order: 3,
    category: "Security · Real-Time Systems",
    year: "2026",
    status: "Building",
    problem:
      "Most chat applications encrypt in transit and then store readable messages. If the server can read the conversation, a server compromise is a conversation compromise.",
    highlights: [
      "RSA-OAEP key pair generated in the browser via WebCrypto",
      "Private key stored only in IndexedDB — it is never transmitted",
      "Per-message AES-256-GCM encryption with a fresh session key",
      "RSA key wrapping, so the session key travels encrypted to the recipient",
      "Server receives ciphertext only and has no path to plaintext",
      "Zero-knowledge server architecture as a structural property, not a policy",
      "MongoDB TTL indexes expiring ephemeral data automatically",
    ],
    flow: [
      { label: "Sender", role: "Client", note: "Generates the RSA-OAEP key pair in-browser; the private key stays in IndexedDB." },
      { label: "AES-GCM", role: "Encryption", note: "A fresh AES-256-GCM session key encrypts each message." },
      { label: "Ciphertext + Wrapped Key", role: "Payload", note: "The session key is RSA-wrapped for the recipient and travels beside the ciphertext." },
      { label: "Socket.io", role: "Transport", note: "Real-time delivery over a persistent connection." },
      { label: "Server", role: "Relay", note: "Routes and stores ciphertext only — it holds no key capable of decrypting it." },
      { label: "Recipient", role: "Client", note: "Unwraps the session key with its private key, then decrypts locally." },
    ],
    details: {
      challenge:
        "Delivering real-time messaging while making it structurally impossible for the server — or anyone who compromises it — to read message contents.",
      solution:
        "Key generation happens in the browser with WebCrypto and the private key is persisted only to IndexedDB. Each message is encrypted with a fresh AES-256-GCM session key, which is then RSA-wrapped for the recipient. The server relays ciphertext and wrapped keys, and MongoDB TTL indexes expire ephemeral records without intervention.",
      architecture: {
        description:
          "Sender → AES-GCM → Ciphertext + Wrapped Session Key → Socket.io → Server → Recipient",
      },
      techStackJustification: [
        { tech: "WebCrypto", reason: "Native browser primitives — no hand-rolled cryptography, no key material in application code." },
        { tech: "IndexedDB", reason: "Origin-scoped local persistence for a private key that must not be transmitted." },
        { tech: "AES-256-GCM", reason: "Authenticated encryption — tampering is detected, not just hidden." },
        { tech: "Socket.io", reason: "Bidirectional real-time transport with reconnection handling." },
      ],
      performance: [],
      engineeringPractices: [
        "Threat model stated first; the architecture follows from it.",
        "Server trust minimised by design rather than by configuration.",
        "Ephemeral data expires through TTL indexes, not cleanup scripts.",
      ],
      features: [
        "Browser-generated RSA-OAEP key pairs.",
        "Per-message AES-256-GCM with RSA key wrapping.",
        "Ciphertext-only server storage.",
        "TTL-expired ephemeral records.",
      ],
    },
  },

  {
    slug: "flight-delay-prediction",
    title: "Flight Delay Data Pipeline",
    subtitle: "Six stages from raw rows to a served model",
    description:
      "A six-stage pipeline that generates, cleans, models and serves flight-delay predictions. Every stage is idempotent, so a rerun converges instead of duplicating.",
    tags: ["Python", "Pandas", "PostgreSQL", "Scikit-Learn", "XGBoost", "Flask", "Streamlit"],
    icon: Database,
    github: "https://github.com/gauravtiwarrii/Flight-Delay-Prediction-System",
    featured: true,
    order: 4,
    category: "Data Engineering · Machine Learning",
    year: "2026",
    status: "Live",
    problem:
      "A model is only as reproducible as the pipeline feeding it. Reruns that double-insert rows or silently change feature definitions make evaluation meaningless.",
    dataNote:
      "Built on a synthetic 100,000-row dataset whose delay labels come from a known generator formula, so the reported score describes model fit on generated data — not real-world operational performance.",
    highlights: [
      "6-stage pipeline: generate → clean → feature engineer → load → train → evaluate",
      "100,000-row dataset",
      "4-table PostgreSQL model separating raw, cleaned and feature data",
      "Idempotent reruns — re-executing a stage converges rather than duplicating rows",
      "Data cleaning and feature engineering as discrete, inspectable stages",
      "XGBoost classifier, ROC-AUC 0.710 on the generated dataset",
      "Flask REST API serving predictions",
      "Streamlit dashboard for exploration",
    ],
    flow: [
      { label: "Generate", role: "Source", note: "Produces the 100,000-row synthetic dataset from a known formula." },
      { label: "Clean", role: "Validation", note: "Type coercion, null handling and range checks before anything downstream." },
      { label: "Feature Engineer", role: "Transform", note: "Derives model inputs as a separate, inspectable stage." },
      { label: "Load", role: "Persistence", note: "Writes into a 4-table Postgres model; reruns are idempotent." },
      { label: "Train", role: "Modelling", note: "XGBoost classifier fit on the engineered features." },
      { label: "Evaluate", role: "Measurement", note: "ROC-AUC 0.710 on the generated dataset; served via Flask and Streamlit." },
    ],
    details: {
      challenge:
        "Making a multi-stage pipeline safe to rerun, so that evaluation reflects the data and features actually intended rather than accumulated duplicates.",
      solution:
        "Split the pipeline into six discrete stages with a 4-table Postgres model separating raw, cleaned and feature data. Loads are idempotent, so any stage can be re-executed without corrupting downstream state. The trained XGBoost model is served through a Flask REST API with a Streamlit dashboard for exploration.",
      architecture: {
        description: "Generate → Clean → Feature Engineer → Load → Train → Evaluate → Flask API / Streamlit",
      },
      techStackJustification: [
        { tech: "PostgreSQL", reason: "A 4-table model keeps raw, cleaned and feature data separable and queryable." },
        { tech: "XGBoost", reason: "Gradient boosting handles the mixed categorical and numeric feature set well." },
        { tech: "Flask", reason: "Minimal surface for serving a single prediction endpoint." },
        { tech: "Streamlit", reason: "Fast exploratory interface over the same model without building a frontend." },
      ],
      performance: ["ROC-AUC 0.710 on the synthetic evaluation set."],
      engineeringPractices: [
        "Idempotent stage reruns.",
        "Cleaning and feature engineering kept separate from training.",
        "Dataset provenance stated alongside the metric.",
      ],
      features: [
        "Six-stage reproducible pipeline.",
        "Four-table Postgres model.",
        "Flask prediction API.",
        "Streamlit dashboard.",
      ],
    },
  },

  {
    slug: "real-time-retail-data-pipeline",
    title: "Real-Time Retail Data Pipeline",
    subtitle: "Streaming ingestion with a replayable staging layer",
    description:
      "Retail transactions streamed through Kafka into Spark Structured Streaming, staged on S3 so batches can be replayed, then loaded into Redshift under Airflow orchestration.",
    tags: ["Python", "Apache Kafka", "Spark Structured Streaming", "Airflow", "Amazon S3", "Redshift"],
    icon: Cloud,
    github: "https://github.com/gauravtiwarrii/Real-Time-Retail-Data-Pipeline",
    featured: true,
    order: 5,
    category: "Streaming Data Engineering",
    year: "2026",
    status: "Live",
    problem:
      "Streaming pipelines that write straight to a warehouse have no recovery story. When a transformation is wrong, the source events are already gone.",
    highlights: [
      "Kafka → Spark Structured Streaming → S3 → Redshift",
      "Micro-batch processing through Spark Structured Streaming",
      "Replayable S3 staging layer — batches can be reprocessed after a logic fix",
      "Airflow orchestration across the load and transform steps",
      "Task-level retries, so one transient failure does not fail the run",
    ],
    flow: [
      { label: "Kafka", role: "Ingestion", note: "Durable event log for retail transactions, with retention that permits replay." },
      { label: "Spark Streaming", role: "Processing", note: "Micro-batch structured streaming applies cleaning and aggregation." },
      { label: "Amazon S3", role: "Staging", note: "Processed batches land here first, so they can be replayed after a fix." },
      { label: "Redshift", role: "Warehouse", note: "Columnar MPP store for analytical queries." },
      { label: "Airflow", role: "Orchestration", note: "Schedules and retries each task independently." },
    ],
    details: {
      challenge:
        "Handling continuous transaction volume while keeping a path back to the source data when a transformation turns out to be wrong.",
      solution:
        "Kafka retains the event log, Spark Structured Streaming processes it in micro-batches, and every processed batch lands on S3 before Redshift. That staging layer makes reprocessing possible without re-ingesting. Airflow orchestrates the downstream steps with task-level retries.",
      architecture: {
        description: "Retail events → Kafka → Spark Structured Streaming → Amazon S3 (staging) → Redshift → Airflow orchestration",
      },
      techStackJustification: [
        { tech: "Apache Kafka", reason: "Durable, replayable event log rather than a fire-and-forget queue." },
        { tech: "Spark Structured Streaming", reason: "Micro-batch semantics with checkpointing and fault tolerance." },
        { tech: "Amazon S3", reason: "Cheap, immutable staging that makes reprocessing a normal operation." },
        { tech: "Apache Airflow", reason: "DAG orchestration with retries and failure visibility at task granularity." },
      ],
      performance: [],
      engineeringPractices: [
        "Staging before warehouse load, so batches remain replayable.",
        "Stream checkpointing for fault tolerance.",
        "Retries scoped to the task, not the whole DAG.",
      ],
      features: [
        "Kafka ingestion of transaction events.",
        "Micro-batch Spark transformation.",
        "Replayable S3 staging.",
        "Airflow-orchestrated Redshift loads.",
      ],
    },
  },

  {
    slug: "distributed-web-crawler",
    title: "Distributed Web Crawler",
    subtitle: "Coordinating five workers over shared Redis state",
    description:
      "A multi-worker crawler where the interesting problem is coordination: a shared frontier, a shared visited set, and politeness rules that must hold across every worker at once.",
    tags: ["Python", "Redis", "MongoDB", "BeautifulSoup", "Docker Compose", "Streamlit"],
    icon: Box,
    featured: true,
    order: 6,
    category: "Distributed Systems",
    year: "2026",
    status: "Building",
    problem:
      "Parallel crawlers duplicate work and hammer hosts unless the queue, the visited set and the rate limit are shared state rather than per-worker state.",
    highlights: [
      "5 worker threads pulling from one shared frontier",
      "Redis sorted-set frontier providing priority ordering across workers",
      "Shared visited-set coordination, so no URL is fetched twice",
      "robots.txt compliance checked before fetching",
      "1-second per-domain request gap enforced across all workers",
      "MongoDB persistence for crawled documents",
      "Docker Compose deployment of workers, Redis and MongoDB together",
      "Live queue monitoring through a Streamlit dashboard",
    ],
    flow: [
      { label: "Frontier", role: "Redis sorted set", note: "Priority-ordered URL queue shared by every worker." },
      { label: "Workers", role: "5 threads", note: "Pull from the frontier, fetch, parse with BeautifulSoup, enqueue discoveries." },
      { label: "Politeness", role: "Coordination", note: "robots.txt checks plus a 1-second per-domain gap enforced across all workers." },
      { label: "Visited Set", role: "Deduplication", note: "Shared Redis set preventing two workers fetching the same URL." },
      { label: "MongoDB", role: "Persistence", note: "Stores extracted documents." },
      { label: "Monitor", role: "Observability", note: "Streamlit dashboard showing live queue depth and worker activity." },
    ],
    details: {
      challenge:
        "Keeping five concurrent workers from duplicating fetches or violating per-domain politeness, when the constraint has to hold globally rather than per worker.",
      solution:
        "Moved queue state, deduplication and rate limiting into Redis so all workers share one view. The frontier is a sorted set giving priority ordering, the visited set prevents duplicate fetches, and the 1-second per-domain gap is enforced centrally. The whole topology runs under Docker Compose.",
      architecture: {
        description: "Redis frontier → 5 workers → politeness gate → visited set → MongoDB → Streamlit monitor",
      },
      techStackJustification: [
        { tech: "Redis", reason: "Sorted sets give a priority frontier; shared sets give cheap cross-worker deduplication." },
        { tech: "MongoDB", reason: "Schema-flexible storage for heterogeneous crawled documents." },
        { tech: "Docker Compose", reason: "Reproducible multi-service topology in one definition." },
        { tech: "Streamlit", reason: "Minimal live view of queue depth without building an admin UI." },
      ],
      performance: [],
      engineeringPractices: [
        "Coordination state centralised rather than duplicated per worker.",
        "Politeness enforced before fetch, not as a retry.",
        "Whole topology reproducible from one Compose file.",
      ],
      features: [
        "Redis sorted-set frontier.",
        "Cross-worker deduplication.",
        "robots.txt and rate-limit compliance.",
        "Live queue monitoring.",
      ],
    },
  },
];

/* ───────────────────────────────────────────────────────────────
   Additional Systems — earlier data-engineering work.
   Kept as evidence of range, deliberately not competing with the
   featured case studies for attention.
   ─────────────────────────────────────────────────────────────── */

export interface SecondaryProject {
  title: string;
  summary: string;
  stack: string[];
  year: string;
  github?: string;
}

export const additionalSystems: SecondaryProject[] = [
  {
    title: "End-to-End Flight Data Warehouse",
    summary:
      "Snowflake warehouse integrating flight operations and passenger data, transformed with dbt and orchestrated by Airflow over a star schema.",
    stack: ["Snowflake", "dbt", "Airflow", "SQL"],
    year: "2026",
    github: "https://github.com/gauravtiwarrii/End-to-End-Data-Warehouse-for-Flight-Analytics",
  },
  {
    title: "Retail ETL Pipeline",
    summary: "Automated batch ETL moving retail data from source extracts through transformation into an analytical store.",
    stack: ["Python", "Pandas", "SQL"],
    year: "2026",
    github: "https://github.com/gauravtiwarrii/retail-etl",
  },
  {
    title: "Big Data Processing with PySpark",
    summary: "Distributed processing of large datasets using PySpark, covering partitioning and aggregation across a cluster.",
    stack: ["PySpark", "Python"],
    year: "2026",
    github: "https://github.com/gauravtiwarrii/pyspark-processing",
  },
  {
    title: "Streaming Transaction Pipeline",
    summary: "Live transaction ingestion and processing, an earlier iteration of the retail streaming architecture.",
    stack: ["Kafka", "Python"],
    year: "2026",
    github: "https://github.com/gauravtiwarrii/streaming-pipeline",
  },
  {
    title: "E-Commerce Data Warehouse Design",
    summary: "Dimensional model for e-commerce analytics — fact and dimension design following Kimball methodology.",
    stack: ["SQL", "Dimensional Modelling"],
    year: "2026",
    github: "https://github.com/gauravtiwarrii/dw-design",
  },
];

/** Featured case studies in editorial order. */
export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
