```
  ██████╗ ████████╗     ██████╗ ███████╗
 ██╔════╝ ╚══██╔══╝    ██╔═══██╗██╔════╝
 ██║  ███╗   ██║       ██║   ██║███████╗
 ██║   ██║   ██║       ██║   ██║╚════██║
 ╚██████╔╝   ██║       ╚██████╔╝███████║
  ╚═════╝    ╚═╝        ╚═════╝ ╚══════╝
  =================== VERSION 3.0 ===================
```

# 🖥️ GT_OS v3.0 — Cybernetic Developer Portfolio Mainframe

Welcome to the terminal node of **GT_OS v3.0**, a highly interactive, retro-futuristic desktop simulation operating system. This environment serves as the secure portfolio hub of **Gaurav Tiwari**, specializing in **Data Engineering, Distributed Systems, and AI Pipeline Architectures**. 

Built to mimic vintage CRT command terminals and futuristic cyber-grids, this terminal is fully executable in any modern web browser.

---

## ⚡ [0x00] SYSTEM SPECIFICATIONS & STATUS

| Mainframe Parameter | Spec / Current Allocation | Status |
| :--- | :--- | :--- |
| **System Kernel** | Next.js 16.1.6 (Turbopack Engine) | `ONLINE [STABLE]` |
| **Runtime Core** | React 19.2.3 / Node.js 20+ | `ACTIVE` |
| **Style Modules** | Tailwind CSS / HSL Dynamic Variable Mapping | `OPTIMIZED` |
| **Neural Subsystem** | Custom Contextual AI Assistant (`/api/ai`) | `READY` |
| **Telemetry Node** | Real-time GitHub Analytics Streamer | `ONLINE` |
| **CRT Emulator** | Scanline Overlays + Flicker Noise Synthesizer | `FOCUSED` |
| **Threat Index** | Zero Compilation Exceptions | `SECURE` |

---

## 🦾 [0x01] CHASSIS ARCHITECTURE & DESIGN CONCEPTS

GT_OS behaves like a windowing desktop environment but runs fully on edge runtimes. The UI and backend are structured into modular cyber-modules:

```
                  ┌─────────────────────────────────────┐
                  │          USER AGENT BROWSER         │
                  └──────────────────┬──────────────────┘
                                     │ (HTTP/WebSocket)
                                     ▼
                  ┌─────────────────────────────────────┐
                  │            GT_OS CORE               │
                  │   CRT Filters & Theme Provider      │
                  └──────┬───────────────────────┬──────┘
                         │                       │
      ┌──────────────────▼──┐                 ┌──▼──────────────────┐
      │   WINDOW MANAGER    │                 │   INTERACTIVE CLI   │
      │ (Draggable Portals) │                 │     (GT_Shell)      │
      └─────────────────────┘                 └─────────────────────┘
                 │                                       │
                 └───────────┬───────────────┬───────────┘
                             │ (API Requests)│
                             ▼               ▼
                  ┌─────────────────────────────────────┐
                  │         NEXT.JS EDGE RUNTIME        │
                  └──────────┬───────────────────┬──────┘
                             │                   │
                             ▼                   ▼
                  ┌─────────────────────┐ ┌─────────────┬───────┐
                  │     AI ENGINE       │ │ GITHUB DATA │ RESEND│
                  │  (Contextual Agent) │ │ (Live stats)│ (Mail)│
                  └─────────────────────┘ └─────────────┴───────┘
```

### Key Subsystems:
* **The Window Controller (`WindowManager.tsx`)**: Manages individual window states (open/close, minimize, fullscreen) and maintains active z-index stacking orders dynamically when windows are clicked.
* **The CRT Scanline Layer (`globals.css`)**: Applies CSS-based CRT radial shadow filters and custom `@keyframes` flickers to emulate legacy cathode-ray tube terminals.
* **The Dynamic Theme Injector (`ThemeProvider.tsx`)**: Modifies vanilla CSS variable definitions at runtime, allowing instant UI paint updates without breaking rendering cycles.
* **The Contextual AI Agent (`/api/ai`)**: A customized API router that handles conversational prompts about Gaurav's credentials, mapping queries against cached training contexts.

---

## 🐚 [0x02] DECRYPTED TERMINAL COMMANDS (GT_SHELL)

Access the standalone terminal at `/terminal` or launch the dashboard command line. Execute the following core commands directly into the prompt:

| Command | Args | Access Level | Description | Output Type |
| :--- | :--- | :--- | :--- | :--- |
| **`help`** | None | Guest | Display all decipherable system commands | ASCII grid |
| **`about`** | None | Guest | Print Gaurav's developer bio and coordinates | ASCII box |
| **`skills`** | None | Guest | List language proficiencies and tech stack levels | Progress Bar |
| **`experience`** | None | Guest | View educational background and active projects | Timeline chart |
| **`projects`** | None | Guest | Query all deployed and ongoing pipeline services | Indexed list |
| **`open`** | `[1-7]` | Guest | Retrieve deep architectural specs for a project | JSON/Writeup |
| **`theme`** | `[name]`| Guest | Modify OS chassis color scheme immediately | Hot-Reload |
| **`matrix`** | None | Guest | Toggle background vertical green character stream | Toggle overlay |
| **`ai`** | `[query]`| Guest | Dispatch conversational prompt to neural processor | Live prompt |
| **`sudo`** | `hire gaurav` | **ADMIN [🔐]** | Elevate console to open contact channels | Special event |
| **`coffee`** | None | Guest | Brew a digital coffee to boost system execution | Easter Egg |
| **`clear`** | None | Guest | Clear visual terminal console log buffers | Operation |

---

## 🎨 [0x03] CHIPSETS & SCHEMES (THEME ENGINES)

The mainframe holds 8 preconfigured color schemes. You can change themes via the **Settings Window** or by typing `theme <id>` into the **GT_Shell**:

```
 █ Cyberpunk [id: cyberpunk] ------- default teal cyan neon accent
 █ Matrix [id: matrix] ------------ code rain emerald green accent
 █ Tokyo Night [id: tokyo-night] --- storm-sky indigo and orange glow
 █ Nord [id: nord] ---------------- frosty blue and arctic slate clean
 █ Synthwave [id: synthwave] ------ neon fuchsia and retro violet accent
 █ Terminal Green [id: terminal] -- 1980s computer terminal monochrome
 █ AI Purple [id: ai-purple] ------ cognitive intelligence neural violet
 █ Recruiter [id: recruiter] ------ professional high-contrast light mode
```

Themes are managed programmatically in [themes.ts](file:///d:/pORTFOLIO GT/src/data/themes.ts) and map directly to standard semantic tags (`--gt-primary`, `--gt-background`, etc.).

---

## 💻 [0x04] SYSTEM SETUP & SECURE INITIATION

Follow these protocols to initialize and deploy the portfolio locally:

### 1. Ingress & Clone
Pull the codebase from the primary branch:
```bash
git clone https://github.com/gauravtiwarrii/portfolio-gt.git
cd portfolio-gt
```

### 2. Dependency Manifest
Load the required packages and dependencies into the chassis node:
```bash
npm install
```

### 3. Establish Local Node (Development)
Launch the development server running on the Turbopack engine:
```bash
npm run dev
```
Wait for compilation... The terminal node will bind to:
```
📡 http://localhost:3000
```

### 4. Inject Environment Credentials (Optional)
Generate a `.env.local` file in the root directory to authorize remote APIs:
```env
# Mail gateway authorization
RESEND_API_KEY=re_your_api_key

# GitHub authorization token
GITHUB_PAT=ghp_your_pat
```

---

## 📁 [0x05] LOGICAL REPOSITORY OUTLINE

```
├── .next/                  # Cached Turbopack files
├── public/                 # Embedded fonts and media assets
└── src/
    ├── app/                # Mainframe Application Routes
    │   ├── api/            # Server Route Handlers (AI, GitHub, Contact Console)
    │   ├── about/          # Cybernetic Biography
    │   ├── contact/        # secure mail interface
    │   ├── projects/       # Dynamic project index & challenge breakdowns
    │   └── terminal/       # Standalone full-screen terminal CLI
    ├── components/         # Modular portal building blocks
    │   ├── effects/        # visual overlays (Matrix digital rain, spotlight)
    │   ├── modes/          # Clean recruiter overlay triggers
    │   ├── os/             # OS Core (WindowManager, Draggable Window, AIAssistant)
    │   ├── providers/      # Global Context Providers (Theme variables)
    │   └── sections/       # Tabbed UI grids (GitHub charts, Skill galaxies)
    └── data/               # Config & static datasets
        ├── projects.ts     # In-depth architectural write-ups & code blocks
        ├── skills.ts       # Skills mapping details
        ├── themes.ts       # Color scheme configuration maps
        └── terminal-commands.ts # CLI script parsing logic
```

---

## 🔬 [0x06] COMPILATION & STABILITY AUDITS

To compile the codebase for production and perform build verification checks, run:

```bash
# Compile and build the Next.js static and dynamic assets
npm run build

# Start the compiled production server
npm run start
```

These scripts verify structural type checks (`tsc --noEmit`), execute automated lints, and bundle highly optimized static assets.

---

## 📡 [0x07] ENCRYPTED TELEMETRY CHANNELS

If you need to contact the admin or request system authorizations, send a transmission:
* **Terminal Controller**: Gaurav Tiwari
* **Secure Mail Gateway**: [igauravtiwari1096@gmail.com](mailto:igauravtiwari1096@gmail.com)
* **LinkedIn Hub**: [/in/gauravtiwarrii](https://linkedin.com/in/gauravtiwarrii)
* **GitHub Mainframe**: [@gauravtiwarrii](https://github.com/gauravtiwarrii)
