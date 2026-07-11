"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import {
  ArrowUpRight,
  Terminal,
  Server,
  X,
  Github as GithubIcon,
  ExternalLink,
  Code2,
  Layers,
  BarChart3,
  Lightbulb,
} from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview", icon: Layers },
  { id: "architecture", label: "Architecture", icon: Server },
  { id: "tech", label: "Tech Stack", icon: Code2 },
  { id: "metrics", label: "Metrics", icon: BarChart3 },
  { id: "code", label: "Code", icon: Terminal },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

export default function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const openProject = projects.find((p) => p.slug === selectedProject);

  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden" id="projects">
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-sm font-bold" style={{ color: "var(--gt-primary)" }}>{"//  "}</span>
              <p className="font-mono text-sm font-bold tracking-wider uppercase" style={{ color: "var(--gt-muted-fg)" }}>
                deployed_services
              </p>
            </div>
            <h2
              className="font-heading font-bold tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--gt-fg)" }}
            >
              <span style={{ color: "color-mix(in srgb, var(--gt-primary) 40%, transparent)" }}>{"< "}</span>
              Projects
              <span style={{ color: "color-mix(in srgb, var(--gt-primary) 40%, transparent)" }}>{" />"}</span>
            </h2>
          </div>

          <div
            className="hidden md:flex items-center gap-3 px-4 py-2 rounded-lg"
            style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}
          >
            <Server size={16} style={{ color: "var(--gt-primary)" }} />
            <div className="text-xs font-mono" style={{ color: "var(--gt-muted-fg)" }}>
              <div>NODES: <span className="font-bold" style={{ color: "var(--gt-fg)" }}>{projects.length}</span></div>
              <div>STATUS: <span className="font-bold text-green-400">ALL_ONLINE</span></div>
            </div>
          </div>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group cursor-pointer"
              onClick={() => {
                setSelectedProject(project.slug);
                setActiveTab("overview");
              }}
            >
              <div
                className="h-full flex flex-col rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: "var(--gt-surface)",
                  border: "1px solid var(--gt-border)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "color-mix(in srgb, var(--gt-primary) 40%, transparent)";
                  e.currentTarget.style.boxShadow = `0 0 25px var(--gt-glow)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--gt-border)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
                }}
              >
                {/* Container Header */}
                <div
                  className="px-4 py-2.5 flex items-center justify-between"
                  style={{ borderBottom: "1px solid var(--gt-border)", background: "var(--gt-surface)" }}
                >
                  <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase" style={{ color: "var(--gt-muted-fg)" }}>
                    <Server size={12} style={{ color: "var(--gt-primary)" }} />
                    <span>container_{project.slug.slice(0, 12)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-green-400 px-2 py-0.5 rounded"
                    style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    {project.status?.toUpperCase() || "LIVE"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl sm:text-2xl font-heading font-bold leading-tight transition-colors" style={{ color: "var(--gt-fg)" }}>
                      {project.title}
                    </h3>
                    <div className="p-2 rounded transition-all shrink-0" style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}>
                      <ArrowUpRight size={16} style={{ color: "var(--gt-muted-fg)" }} />
                    </div>
                  </div>

                  <p className="text-sm mb-5 flex-1 leading-relaxed pl-4" style={{ color: "var(--gt-muted-fg)", borderLeft: "2px solid var(--gt-border)" }}>
                    {project.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="pt-4 flex flex-wrap items-center justify-between gap-3 mt-auto" style={{ borderTop: "1px solid var(--gt-border)" }}>
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase" style={{ color: "var(--gt-primary)" }}>
                      <Terminal size={12} />
                      {project.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded"
                          style={{
                            background: "var(--gt-surface)",
                            border: "1px solid var(--gt-border)",
                            color: "var(--gt-muted-fg)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[10px] italic" style={{ color: "var(--gt-muted-fg)" }}>
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal (OS Window) */}
      <AnimatePresence>
        {openProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300]"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-4 md:inset-8 lg:inset-16 z-[301] flex flex-col rounded-xl overflow-hidden"
              style={{ background: "var(--gt-bg)", border: "1px solid var(--gt-border)", boxShadow: "0 25px 80px rgba(0,0,0,0.8)" }}
            >
              {/* Title Bar */}
              <div className="flex items-center justify-between h-10 px-4 shrink-0" style={{ borderBottom: "1px solid var(--gt-border)", background: "var(--gt-surface)" }}>
                <div className="flex items-center gap-2">
                  <button onClick={() => setSelectedProject(null)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" aria-label="Close" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--gt-muted-fg)" }}>
                  {openProject.title}
                </span>
                <button onClick={() => setSelectedProject(null)} className="p-1 rounded transition-colors" style={{ color: "var(--gt-muted-fg)" }}>
                  <X size={14} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-0 px-4 shrink-0 overflow-x-auto" style={{ borderBottom: "1px solid var(--gt-border)", background: "var(--gt-surface)" }}>
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap"
                      style={{
                        color: activeTab === tab.id ? "var(--gt-primary)" : "var(--gt-muted-fg)",
                        borderBottom: activeTab === tab.id ? "2px solid var(--gt-primary)" : "2px solid transparent",
                        background: activeTab === tab.id ? "var(--gt-surface-hover)" : "transparent",
                      }}
                    >
                      <Icon size={12} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "overview" && (
                      <div className="space-y-6 max-w-3xl">
                        <h3 className="text-2xl font-heading font-bold" style={{ color: "var(--gt-fg)" }}>{openProject.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--gt-muted-fg)" }}>{openProject.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg" style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}>
                            <h4 className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--gt-primary)" }}>Challenge</h4>
                            <p className="text-sm" style={{ color: "var(--gt-muted-fg)" }}>{openProject.details.challenge}</p>
                          </div>
                          <div className="p-4 rounded-lg" style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}>
                            <h4 className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--gt-primary)" }}>Solution</h4>
                            <p className="text-sm" style={{ color: "var(--gt-muted-fg)" }}>{openProject.details.solution}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <a href={openProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition-all" style={{ border: "1px solid var(--gt-border)", color: "var(--gt-fg)", background: "var(--gt-surface)" }}>
                            <GithubIcon size={14} /> GitHub
                          </a>
                          {openProject.demo && (
                            <a href={openProject.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-widest" style={{ border: "1px solid var(--gt-border)", color: "var(--gt-primary)", background: "color-mix(in srgb, var(--gt-primary) 10%, transparent)" }}>
                              <ExternalLink size={14} /> Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === "architecture" && (
                      <div className="space-y-6 max-w-3xl">
                        <h3 className="text-xl font-heading font-bold" style={{ color: "var(--gt-fg)" }}>System Architecture</h3>
                        <div className="p-6 rounded-lg font-mono text-sm" style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)", color: "var(--gt-primary)" }}>
                          {openProject.details.architecture.description}
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--gt-muted-fg)" }}>Key Features</h4>
                          {openProject.details.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded" style={{ background: "var(--gt-surface)" }}>
                              <span style={{ color: "var(--gt-primary)" }}>▸</span>
                              <span className="text-sm" style={{ color: "var(--gt-fg)" }}>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "tech" && (
                      <div className="space-y-4 max-w-3xl">
                        <h3 className="text-xl font-heading font-bold" style={{ color: "var(--gt-fg)" }}>Tech Stack Justification</h3>
                        {openProject.details.techStackJustification.map((item, i) => (
                          <div key={i} className="p-4 rounded-lg" style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}>
                            <h4 className="text-sm font-bold mb-1" style={{ color: "var(--gt-primary)" }}>{item.tech}</h4>
                            <p className="text-sm" style={{ color: "var(--gt-muted-fg)" }}>{item.reason}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === "metrics" && (
                      <div className="space-y-4 max-w-3xl">
                        <h3 className="text-xl font-heading font-bold" style={{ color: "var(--gt-fg)" }}>Performance Metrics</h3>
                        {openProject.details.performance.map((metric, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 rounded-lg" style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}>
                            <span className="text-lg" style={{ color: "var(--gt-primary)" }}>📈</span>
                            <span className="text-sm font-medium" style={{ color: "var(--gt-fg)" }}>{metric}</span>
                          </div>
                        ))}
                        <h4 className="text-xs font-mono uppercase tracking-widest pt-4" style={{ color: "var(--gt-muted-fg)" }}>Engineering Practices</h4>
                        {openProject.details.engineeringPractices.map((practice, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded" style={{ background: "var(--gt-surface)" }}>
                            <span style={{ color: "var(--gt-accent)" }}>✓</span>
                            <span className="text-sm" style={{ color: "var(--gt-fg)" }}>{practice}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === "code" && openProject.codeSnippet && (
                      <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-heading font-bold" style={{ color: "var(--gt-fg)" }}>Code Sample</h3>
                          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "var(--gt-surface)", color: "var(--gt-primary)", border: "1px solid var(--gt-border)" }}>
                            {openProject.codeSnippet.fileName}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: "var(--gt-muted-fg)" }}>{openProject.codeSnippet.description}</p>
                        <pre className="p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed" style={{ background: "#0a0a0a", border: "1px solid var(--gt-border)", color: "var(--gt-fg)" }}>
                          <code>{openProject.codeSnippet.code}</code>
                        </pre>
                      </div>
                    )}

                    {activeTab === "insights" && (
                      <div className="space-y-6 max-w-3xl">
                        <h3 className="text-xl font-heading font-bold" style={{ color: "var(--gt-fg)" }}>Problem Statement</h3>
                        <p className="text-sm leading-relaxed p-4 rounded-lg" style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)", color: "var(--gt-fg)" }}>
                          {openProject.problem}
                        </p>
                        <h4 className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--gt-muted-fg)" }}>Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {openProject.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full" style={{ background: "color-mix(in srgb, var(--gt-primary) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--gt-primary) 30%, transparent)", color: "var(--gt-primary)" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
