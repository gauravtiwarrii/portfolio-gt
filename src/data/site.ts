/* ═══════════════════════════════════════════════════════════════
   Site constants — one source of truth for identity and links.
   Every value here is real. Nothing is placeholder.
   ═══════════════════════════════════════════════════════════════ */

export const SITE = {
  name: "Gaurav Tiwari",
  monogram: "GT",
  role: "Software Engineer · Data Engineer · AI Systems Builder",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://gauravtiwari.dev",
  email: "igauravtiwari1096@gmail.com",
  github: "https://github.com/gauravtiwarrii",
  githubHandle: "gauravtiwarrii",
  linkedin: "https://linkedin.com/in/gauravtiwarrii",
  available: true,
  availableLabel: "Available for opportunities",
} as const;

export const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Systems", href: "/#systems" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
] as const;

/* ───────────────────────────────────────────────────────────────
   Résumés
   Both engineering directions are supported. A résumé only renders
   when its file exists in /public — drop the second PDF in and set
   `available: true` to light up the button. No dead links.
   ─────────────────────────────────────────────────────────────── */
export const RESUMES = [
  {
    label: "Software Engineer Resume",
    href: "/resume.pdf",
    note: "Full-stack, product and systems engineering",
    available: true,
  },
  {
    label: "Data Engineer Resume",
    href: "/resume-data-engineer.pdf",
    note: "Pipelines, warehousing and streaming",
    available: false,
  },
] as const;

export const EDUCATION = {
  degree: "B.Tech, Computer Science & Engineering",
  institution: "Lovely Professional University",
  graduation: "2027",
  cgpa: "7.26",
} as const;

/* ───────────────────────────────────────────────────────────────
   Engineering philosophy
   ─────────────────────────────────────────────────────────────── */
export const PRINCIPLES = [
  {
    index: "01",
    title: "Systems First",
    body: "Understand the architecture before writing the implementation.",
  },
  {
    index: "02",
    title: "Reliability by Design",
    body: "Retries, validation, idempotency, observability and failure recovery should be intentional.",
  },
  {
    index: "03",
    title: "Security Is a Feature",
    body: "Protect data at the architecture level rather than adding security as an afterthought.",
  },
  {
    index: "04",
    title: "Ship, Measure, Improve",
    body: "Build real systems, evaluate their behaviour and iterate based on evidence.",
  },
] as const;

/* ───────────────────────────────────────────────────────────────
   Technology — grouped by layer, no self-rated levels.
   ─────────────────────────────────────────────────────────────── */
export const TECH_GROUPS = [
  {
    name: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "Java", "C++"],
  },
  {
    name: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Express", "Flask", "REST", "Socket.io", "SSE"],
  },
  {
    name: "Data",
    items: ["PostgreSQL", "MongoDB", "Redis", "Snowflake", "Redshift", "SQLite"],
  },
  {
    name: "Data Engineering",
    items: ["Kafka", "Spark", "Airflow", "dbt", "S3"],
  },
  {
    name: "AI / ML",
    items: ["LangGraph", "Gemini", "Scikit-Learn", "XGBoost"],
  },
  {
    name: "Infrastructure",
    items: ["Docker", "Docker Compose", "Git", "Linux", "Vercel", "Render"],
  },
] as const;

/* ───────────────────────────────────────────────────────────────
   Data systems capability areas
   ─────────────────────────────────────────────────────────────── */
export const DATA_CAPABILITIES = [
  { name: "Batch Processing", note: "Scheduled transformation over bounded datasets." },
  { name: "Stream Processing", note: "Continuous micro-batch handling of event data." },
  { name: "ETL / ELT", note: "Extract and load patterns chosen per warehouse target." },
  { name: "Data Modeling", note: "Star schemas, fact and dimension design." },
  { name: "Orchestration", note: "DAG scheduling with task-level retries." },
  { name: "Data Quality", note: "Validation and anomaly rules before commit." },
  { name: "Analytics", note: "Query-ready models serving reporting layers." },
] as const;

/* ───────────────────────────────────────────────────────────────
   Certifications — real credentials only.
   ─────────────────────────────────────────────────────────────── */
export const CERTIFICATIONS = [
  {
    name: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
    issuer: "Oracle",
    detail: null as string | null,
    link: null as string | null,
  },
  {
    name: "Cloud Computing",
    issuer: "NPTEL",
    detail: null as string | null,
    link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs107/Course/NPTEL25CS107S145870128310531614.pdf",
  },
  {
    name: "CodeQuest DSA Summer Bootcamp",
    issuer: "CodeQuest",
    detail: "100+ problems across arrays, graphs and dynamic programming",
    link: null as string | null,
  },
] as const;

/* ───────────────────────────────────────────────────────────────
   Hero architecture visual — a generic request path, the shape
   most of these systems share.
   ─────────────────────────────────────────────────────────────── */
export const HERO_FLOW = [
  {
    label: "Browser",
    role: "Client",
    note: "React and Next.js on the edge — server components where rendering belongs on the server.",
  },
  {
    label: "API",
    role: "Interface",
    note: "Route handlers, REST endpoints and SSE streams for long-running work.",
  },
  {
    label: "Services",
    role: "Domain logic",
    note: "Where invariants live: validation, business rules and state transitions.",
  },
  {
    label: "Data Layer",
    role: "Access",
    note: "Typed queries and migrations over Postgres, MongoDB and Redis.",
  },
  {
    label: "AI / Processing",
    role: "Compute",
    note: "LangGraph state machines, Spark micro-batches and model inference.",
  },
  {
    label: "Storage",
    role: "Persistence",
    note: "Relational stores, object staging on S3 and warehouse tables.",
  },
] as const;

/* ───────────────────────────────────────────────────────────────
   Data platform flow — source to analytics.
   ─────────────────────────────────────────────────────────────── */
export const DATA_FLOW = [
  { label: "Sources", role: "Origin", note: "Transactional systems, events and third-party APIs." },
  { label: "Kafka", role: "Ingestion", note: "Durable, replayable event log decoupling producers from consumers." },
  { label: "Spark", role: "Processing", note: "Structured Streaming micro-batches and distributed batch jobs." },
  { label: "Airflow", role: "Orchestration", note: "DAG scheduling with task-level retries and failure visibility." },
  { label: "S3", role: "Staging", note: "Immutable landing zone that makes reprocessing routine." },
  { label: "Snowflake / Redshift", role: "Warehouse", note: "Columnar MPP storage for analytical workloads." },
  { label: "dbt", role: "Transformation", note: "Version-controlled SQL models with tested lineage." },
  { label: "Analytics", role: "Consumption", note: "Query-ready marts serving dashboards and reporting." },
] as const;
