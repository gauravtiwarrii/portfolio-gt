"use client";


import { Mail, Linkedin, Github, Download, FileText, Briefcase, GraduationCap, Award, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

const categories = {
  "Data Engineering": ["Apache Kafka", "Apache Spark", "PySpark", "Apache Airflow", "Snowflake", "Hadoop"],
  "Cloud & DevOps": ["AWS", "Google Cloud", "Docker", "Git"],
  "Databases": ["PostgreSQL", "MySQL", "MongoDB", "Redshift"],
  "Languages & Web": ["Python", "SQL", "TypeScript", "JavaScript", "Next.js", "Flask", "Streamlit"],
};

export default function RecruiterMode() {
  const handleScrollToContact = () => {
    const el = document.getElementById("recruiter-contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white text-zinc-900 min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Container */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-16">
        
        {/* Header Section */}
        <header className="border-b border-zinc-200 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
              Gaurav Tiwari
            </h1>
            <p className="text-lg md:text-xl text-blue-600 font-medium">
              Data Engineer & Backend Developer
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Mail size={15} /> igauravtiwari1096@gmail.com
              </span>
              <a
                href="https://linkedin.com/in/gauravtiwarrii"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
              >
                <Linkedin size={15} /> linkedin.com/in/gauravtiwarrii
              </a>
              <a
                href="https://github.com/gauravtiwarrii"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
              >
                <Github size={15} /> github.com/gauravtiwarrii
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              download="Gaurav_Tiwari_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm"
            >
              <Download size={14} /> Download Resume
            </a>
            <button
              onClick={handleScrollToContact}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-all"
            >
              <Mail size={14} /> Contact Direct
            </button>
          </div>
        </header>

        {/* Profile Summary */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <FileText size={18} className="text-blue-600" /> Executive Summary
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Data Engineer with a strong foundation in designing, automating, and optimizing real-time 
            and batch data pipelines. Proficient in cloud architecture (AWS), streaming frameworks 
            (Apache Kafka), big data processing (Apache Spark/PySpark), and modern data warehousing 
            (Snowflake, dbt). Passionate about building robust systems that convert raw data into 
            actionable insights.
          </p>
        </section>

        {/* Technical Core */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Briefcase size={18} className="text-blue-600" /> Core Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(categories).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <h3 className="font-semibold text-zinc-800 text-sm">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs bg-zinc-100 text-zinc-700 rounded-md border border-zinc-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Projects */}
        <section className="space-y-8">
          <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Briefcase size={18} className="text-blue-600" /> Featured Projects
          </h2>
          <div className="space-y-8">
            {projects.slice(0, 4).map((project) => (
              <div
                key={project.slug}
                className="group border border-zinc-200 p-6 rounded-xl hover:border-zinc-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-500">{project.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-all"
                      title="GitHub Repository"
                    >
                      <Github size={16} />
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-zinc-600 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] uppercase font-semibold bg-blue-50 text-blue-700 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <GraduationCap size={18} className="text-blue-600" /> Education
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-600 pl-4 space-y-1">
                <h3 className="font-bold text-zinc-900">B.Tech in Computer Science</h3>
                <p className="text-sm text-zinc-600">Lovely Professional University</p>
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>2023 - Present</span>
                  <span className="font-semibold text-blue-600">CGPA: 7.26</span>
                </div>
              </div>
              <div className="border-l-2 border-zinc-200 pl-4 space-y-1">
                <h3 className="font-bold text-zinc-900">Intermediate (PCM)</h3>
                <p className="text-sm text-zinc-600">Lions School</p>
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>2021 - 2022</span>
                  <span className="font-semibold">74.6%</span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Award size={18} className="text-blue-600" /> Credentials
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <div className="font-semibold text-zinc-950">GCP Professional Data Engineer</div>
                  <div className="text-xs text-zinc-500">Google Cloud</div>
                </div>
                <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">In Progress</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <div className="font-semibold text-zinc-950">OCI Data Science Professional</div>
                  <div className="text-xs text-zinc-500">Oracle Cloud Infrastructure</div>
                </div>
                <span className="text-xs text-zinc-500">2025</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <div className="font-semibold text-zinc-950">Cloud Computing (Elite Badge)</div>
                  <div className="text-xs text-zinc-500">NPTEL</div>
                </div>
                <span className="text-xs text-zinc-500">2025</span>
              </div>
            </div>
          </section>
        </div>

        {/* Contact form (clean styled) */}
        <section id="recruiter-contact" className="space-y-6 border-t border-zinc-200 pt-12">
          <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Mail size={18} className="text-blue-600" /> Get In Touch
          </h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              alert("Message sent successfully!");
            }}
            className="space-y-4 max-w-lg"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg border border-zinc-200 focus:outline-none focus:border-blue-600 text-sm transition-all"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 rounded-lg border border-zinc-200 focus:outline-none focus:border-blue-600 text-sm transition-all"
                required
              />
            </div>
            <textarea
              placeholder="Message details"
              rows={4}
              className="w-full p-3 rounded-lg border border-zinc-200 focus:outline-none focus:border-blue-600 text-sm transition-all resize-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-zinc-900 text-white hover:bg-zinc-800 transition-all shadow"
            >
              Send Message
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}
