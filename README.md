# 🖥️ GT_OS v3.0 — Retro-Futuristic Developer Portfolio Operating System

Welcome to **GT_OS v3.0**, a highly interactive, retro-futuristic operating system simulation built as a professional developer portfolio for **Gaurav Tiwari** (Data Engineer, AI Engineer, and Backend Developer). 

Inspired by classic CRT terminals, cyberpunk aesthetics, and command-line interfaces, this application simulates a custom desktop workspace complete with window management, a custom CLI terminal, an inline AI chatbot, real-time GitHub integration, and multiple visual themes.

---

## 🚀 Live Demo & Repository
* **GitHub Repository**: [portfolio-gt](https://github.com/gauravtiwarrii/portfolio-gt)
* **Owner**: [Gaurav Tiwari](https://github.com/gauravtiwarrii)

---

## ✨ Key Features

### 1. 🎞️ CRT Boot Sequence & Preloader
* A simulated operating system boot sequence initializing database engines, Apache Kafka streams, and AI pipelines.
* Retro-styled CRT scanline filters, flickering visuals, and corner bracket guides.
* Features keyboard interaction (`Enter`/`Escape`/`Space` to skip boot) and persistent session-storage states to prevent redundant preloads.

### 2. 🪟 Custom Window Manager
* A fully-functional simulated desktop environment with draggable, resizable, and focus-managed OS windows.
* Controls for minimizing, maximizing, positioning, and layering windows dynamically.
* Integrated windows for **Projects**, **Technical Skills Galaxy**, **Career Timeline**, **Certificates**, and **AI Assistant**.

### 3. 🤖 AI Chat Assistant (AIAssistant)
* A custom interactive AI chatbot window (`/api/ai`) loaded with context about Gaurav's engineering experience, skills, and background.
* Allows recruiters and users to query credentials, projects, or schedule interviews in real time.

### 4. 🐚 Interactive GT_Shell (Terminal Console)
* A fully interactive command-line interface (`/terminal` or command palette) that parses custom CLI commands.
* Supported commands:
  * `help` — Show available CLI commands
  * `about` / `whoami` — Detailed professional bio
  * `skills` — Technical skills summary with ASCII progress bars
  * `experience` / `education` — Career trajectory and academic history
  * `projects` — Lists deployed services and project indexes
  * `open [1-7]` — Show detailed engineering writeup for a project
  * `github` — GitHub dashboard metrics
  * `theme [name]` — Instantly hot-reload the UI theme
  * `matrix` — Toggle falling code rain background
  * `ai [question]` — Ask the AI assistant directly from the CLI
  * `sudo hire gaurav` — *🔐 Easter Egg:* Bypasses access and opens contact console with admin permissions!
  * `coffee` — *☕ Easter Egg:* Brews virtual caffeine, increasing performance metrics.
  * `clear` / `neofetch` / `uptime` / `ping` / `pwd` / `ls` / `date`

### 5. 🎨 Custom Theme System (8 Modes)
Features 8 hot-swappable color palettes based on classic developer setups:
* **Cyberpunk** (Default cyan-glow theme)
* **Matrix** (Monochrome digital rain green)
* **Tokyo Night Storm** (Sleek deep indigo/blue)
* **Nord** (Frost arctic slate)
* **Synthwave** (Retro-futuristic neon violet & pink)
* **Terminal Green** (Classic high-contrast green terminal)
* **AI Purple** (Neural network dark purple)
* **Recruiter** (Clean, professional light mode optimized for corporate reviews)

### 6. 📊 Engineering Project Hub
* Details comprehensive Data Engineering, Analytics, and Warehousing projects with structured write-ups:
  * **Challenges** faced (concurrency, data cleaning, processing scale).
  * **Architectural solutions** (diagrams, logic flow).
  * **Code Snippets** (PySpark streaming, incremental dbt models, ML feature pipelines, Star Schemas).
  * **Performance Metrics** & **Engineering Practices** (CI/CD, scheduling, testing).
  * **Service Health Metrics** showing real-time ping simulations.

---

## 🛠️ Technology Stack & Architecture

### Front-End & Core
* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) utilizing Turbopack compilation.
* **Core Logic**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/).
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) for quick layout adjustments + Vanilla CSS custom variables for real-time, runtime theme swapping.
* **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid transitions, window physics, and CRT fade-in actions.
* **Icons**: [Lucide React](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/).

### Back-End & APIs
* **Next.js Route Handlers**:
  * `/api/ai` — Custom vector-like AI agent query processing.
  * `/api/github` — Real-time fetcher for public repositories, languages, and star statistics.
  * `/api/contact` — Secure ingestion for client console contacts.
* **Orchestration / Mailing**: Integration with [Resend](https://resend.com/) for email dispatches.

---

## 📂 Repository Structure

```
├── .next/                  # Next.js build outputs (gitignored)
├── public/                 # Static assets (fonts, images, icons)
└── src/
    ├── app/                # Next.js App Router (pages and API endpoints)
    │   ├── api/            # API Route Handlers (AI, GitHub, Contact)
    │   ├── about/          # About view wrapper
    │   ├── contact/        # Contact console
    │   ├── projects/       # Dynamic project slug pages
    │   ├── terminal/       # Standalone full-screen terminal CLI
    │   ├── globals.css     # Global style rules and CRT effect styles
    │   └── layout.tsx      # Base layout and provider wrappers
    ├── components/         # React Components
    │   ├── effects/        # Retro effects (Matrix Rain, Mouse Spotlight)
    │   ├── modes/          # Clean recruiter mode overlay
    │   ├── os/             # OS Elements (Draggable OSWindow, WindowManager, Taskbar, AIAssistant)
    │   ├── providers/      # Theme and Context Providers
    │   ├── sections/       # Tab-based dashboard content (GitHub statistics, Project grid, Skill galaxies)
    │   └── BootScreen.tsx  # Dynamic loading and boot preloader
    ├── data/               # Config & Mock Datasets
    │   ├── projects.ts     # In-depth project architectural data and snippets
    │   ├── skills.ts       # Developer skills taxonomy
    │   ├── terminal-commands.ts # CLI parsing logic and outputs
    │   └── themes.ts       # 8 custom color palette specifications
    └── package.json        # Node dependency manifest
```

---

## 💻 Local Setup & Development

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.x or later) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gauravtiwarrii/portfolio-gt.git
   cd portfolio-gt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables (Optional):
   Create a `.env.local` file in the root folder:
   ```env
   # API credentials for Resend (if using contact forms)
   RESEND_API_KEY=re_your_api_key
   
   # GitHub Personal Access Token (if querying private repos/avoiding rate limit)
   GITHUB_PAT=ghp_your_pat
   ```

4. Run the local development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Production Build

To test production compilations and run optimized builds:
```bash
# Compile and build the Next.js static and dynamic assets
npm run build

# Start the compiled production server
npm run start
```

---

## 🎨 Theme Customization
Themes are governed by CSS custom properties. Adding or adjusting themes is as simple as adding a new object to the `themes` array in [themes.ts](file:///d:/pORTFOLIO GT/src/data/themes.ts):

```typescript
{
  id: "custom-theme",
  name: "My Theme",
  label: "Sub-label",
  colors: {
    background: "#hex",
    foreground: "#hex",
    primary: "#hex",
    secondary: "#hex",
    accent: "#hex",
    warning: "#hex",
    danger: "#hex",
    border: "rgba(r,g,b,alpha)",
    glow: "rgba(r,g,b,alpha)",
    surface: "rgba(r,g,b,alpha)",
    surfaceHover: "rgba(r,g,b,alpha)",
    muted: "#hex",
    mutedForeground: "#hex",
  }
}
```

The system will dynamically populate your new theme inside the command palette, CLI auto-completion, and options panel!

---

## 🤝 Contact & Connections
* **Developer**: Gaurav Tiwari
* **Email**: [igauravtiwari1096@gmail.com](mailto:igauravtiwari1096@gmail.com)
* **LinkedIn**: [/in/gauravtiwarrii](https://linkedin.com/in/gauravtiwarrii)
* **GitHub**: [@gauravtiwarrii](https://github.com/gauravtiwarrii)
