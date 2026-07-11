import { projects } from "@/data/projects";

export interface TerminalCommand {
  name: string;
  description: string;
  handler: () => string | React.ReactNode;
}

const HELP_TEXT = `
┌────────────────────────────────────────────────────┐
│  GT_OS v3.0 — Terminal Commands                    │
├────────────────┬───────────────────────────────────┤
│  help          │ Show available commands            │
│  about         │ Display bio                        │
│  skills        │ List technical expertise            │
│  experience    │ Show work experience               │
│  education     │ Academic background                 │
│  projects      │ View deployed projects              │
│  github        │ GitHub profile summary              │
│  resume        │ Open resume / CV                    │
│  contact       │ Open contact form                   │
│  clear         │ Clear terminal                      │
│  theme [name]  │ Switch theme                        │
│  matrix        │ Toggle matrix mode                  │
│  coffee        │ ☕ Essential command                 │
│  open [1-7]    │ Open project by ID                  │
│  ai [question] │ Ask the AI assistant                │
│  sudo hire     │ 🔐 Special access                   │
│    gaurav      │                                     │
│  rm -rf bugs   │ System maintenance                  │
└────────────────┴───────────────────────────────────┘`;

const ABOUT_TEXT = `
╔══════════════════════════════════════════════════════╗
║  GAURAV TIWARI                                       ║
║  Data Engineer | AI Engineer | Backend Developer     ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║  Engineering enterprise-scale data pipelines         ║
║  powered by Kafka, Spark, Snowflake, and AWS.        ║
║                                                      ║
║  Turning raw data into strategic assets at scale.    ║
║                                                      ║
║  📍 India                                            ║
║  📧 igauravtiwari1096@gmail.com                     ║
║  🔗 github.com/gauravtiwarrii                        ║
║  🔗 linkedin.com/in/gauravtiwarrii                   ║
╚══════════════════════════════════════════════════════╝`;

const SKILLS_TEXT = `
┌─ Languages ─────────────────────────────────────────┐
│  Python ████████████████████████████████████ Expert  │
│  SQL    ████████████████████████████████████ Expert  │
│  Bash   ██████████████████████             Inter.   │
├─ Data Engineering ──────────────────────────────────┤
│  ETL/ELT  ████████████████████████████████ Expert   │
│  Spark    ██████████████████████████████   Advanced  │
│  Kafka    ██████████████████████████████   Advanced  │
│  Airflow  ██████████████████████████████   Advanced  │
│  dbt      ██████████████████████          Inter.     │
├─ Cloud & Infrastructure ────────────────────────────┤
│  AWS      ██████████████████████████████   Advanced  │
│  Docker   ██████████████████████████████   Advanced  │
│  Git      ████████████████████████████████ Expert    │
├─ Databases ─────────────────────────────────────────┤
│  PostgreSQL █████████████████████████████  Expert    │
│  MySQL      ██████████████████████████     Advanced  │
│  MongoDB    ██████████████████████         Inter.    │
│  Snowflake  ██████████████████████████     Advanced  │
└─────────────────────────────────────────────────────┘`;

const EXPERIENCE_TEXT = `
┌─ Experience Timeline ───────────────────────────────┐
│                                                      │
│  🎓 B.Tech CSE @ LPU         Aug 2023 – Present    │
│     ├─ Data Structures & Algorithms                  │
│     ├─ Database Management Systems                   │
│     ├─ Cloud Computing                               │
│     └─ Machine Learning & Distributed Systems        │
│                                                      │
│  📊 Self-Directed Projects    2023 – Present        │
│     ├─ Real-Time Kafka Pipeline                      │
│     ├─ Flight Analytics Data Warehouse               │
│     ├─ Flight Delay Prediction ML System             │
│     ├─ PySpark Big Data Processing                   │
│     └─ Retail ETL Automation                         │
│                                                      │
│  Status: Actively seeking DE/AI opportunities       │
└─────────────────────────────────────────────────────┘`;

const EDUCATION_TEXT = `
┌─ Academic Records ──────────────────────────────────┐
│                                                      │
│  🎓 B.Tech — Computer Science & Engineering         │
│     Lovely Professional University                   │
│     Phagwara, Punjab | Aug 2023 – Present           │
│     CGPA: 7.26                                       │
│                                                      │
│  📚 Intermediate — PCM                               │
│     Lions School, Mirzapur | 2021-2022               │
│     74.6%                                            │
│                                                      │
│  📚 Matriculation                                    │
│     Lions School, Mirzapur | 2019-2020               │
│     64.2%                                            │
└─────────────────────────────────────────────────────┘`;

export function getProjectsList(): string {
  return projects
    .map(
      (p, i) =>
        `  [${i + 1}] ${p.title}\n      ${p.subtitle}\n      Status: ${p.status} | Category: ${p.category}`
    )
    .join("\n\n");
}

export function getCommandResponse(input: string): { output: string; action?: string } {
  const parts = input.trim().toLowerCase().split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1).join(" ");

  switch (cmd) {
    case "help":
      return { output: HELP_TEXT };

    case "about":
    case "whoami":
      return { output: ABOUT_TEXT };

    case "skills":
      return { output: SKILLS_TEXT };

    case "experience":
      return { output: EXPERIENCE_TEXT };

    case "education":
      return { output: EDUCATION_TEXT };

    case "projects":
      return { output: `\n  Deployed Services\n  ─────────────────\n\n${getProjectsList()}\n\n  Type 'open [1-${projects.length}]' to view details.` };

    case "github":
      return {
        output: `
  GitHub Profile: @gauravtiwarrii
  ──────────────────────────────
  🔗 https://github.com/gauravtiwarrii
  📊 Repositories: 15+
  ⭐ Stars: 12+
  💻 Primary: Python, SQL, TypeScript

  Visit #github section for full dashboard.`,
      };

    case "resume":
      return { output: "  📄 Opening resume...", action: "open-resume" };

    case "contact":
      return { output: "  📡 Opening Communication Console...", action: "scroll-contact" };

    case "clear":
      return { output: "", action: "clear" };

    case "theme":
      if (!args) {
        return { output: "  Usage: theme [name]\n  Available: cyberpunk, matrix, tokyo-night, nord, synthwave, terminal-green, ai-purple" };
      }
      return { output: `  🎨 Switching theme to: ${args}`, action: `theme-${args}` };

    case "matrix":
      return { output: "  🟢 Matrix mode toggled.", action: "theme-matrix" };

    case "coffee":
      return { output: "  ☕ Brewing premium dark roast...\n  ☕ Performance Increased by 200%.\n  ☕ Bug resistance +50." };

    case "sudo":
      if (args === "hire gaurav") {
        return {
          output: `
  ╔══════════════════════════════════════════╗
  ║  🔐 PERMISSION GRANTED                  ║
  ║                                          ║
  ║  Access Level: ADMIN                     ║
  ║  Action: hire_gaurav()                   ║
  ║  Status: APPROVED ✓                     ║
  ║                                          ║
  ║  Opening Contact Console...              ║
  ╚══════════════════════════════════════════╝`,
          action: "scroll-contact",
        };
      }
      return { output: "  ⚠ sudo: permission denied. Try 'sudo hire gaurav'" };

    case "open":
      const num = parseInt(args);
      if (isNaN(num) || num < 1 || num > projects.length) {
        return { output: `  Usage: open [1-${projects.length}]` };
      }
      const project = projects[num - 1];
      return {
        output: `
  Opening: ${project.title}
  ────────────────────────
  ${project.description}

  Tech: ${project.tags.join(", ")}
  GitHub: ${project.github}
  Category: ${project.category} | Status: ${project.status}`,
      };

    case "rm":
      if (args === "-rf bugs") {
        return {
          output: `
  rm: cannot remove 'bugs': Operation not permitted
  ⚠ Error: Bugs have administrator privileges.
  ⚠ Try: git blame | grep -v "not me"`,
        };
      }
      return { output: `  rm: ${args || "?"}: No such file or directory` };

    case "ls":
      return { output: "  about.ts  skills.json  projects/  resume.pdf  .env.secret" };

    case "pwd":
      return { output: "  /home/gaurav/portfolio" };

    case "echo":
      return { output: `  ${args || ""}` };

    case "date":
      return { output: `  ${new Date().toString()}` };

    case "uptime":
      return { output: "  GT_OS has been running since the Big Bang." };

    case "ping":
      return { output: "  PONG! 🏓 Latency: 0.42ms — Optimal." };

    case "neofetch":
      return {
        output: `
         ████████╗       gaurav@gt-os
         ╚══██╔══╝       ──────────────
            ██║          OS: GT_OS v3.0
            ██║          Host: Vercel Edge
            ██║          Kernel: Next.js 16
            ╚═╝          Shell: TypeScript
                         Theme: Cyberpunk
                         Terminal: GT_Shell`,
      };

    default:
      return { output: `  Command not found: ${cmd}\n  Type 'help' for available commands.` };
  }
}
