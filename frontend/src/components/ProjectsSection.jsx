import { ExternalLink, Github, Code, Award, Settings } from "lucide-react";
import { usePortfolioSection } from "@/hooks/use-portfolio-section";

const TAB_ICONS = { projects: Code, certificates: Award, techstack: Settings };

export const ProjectsSection = () => {
  const {
    activeTab,
    getTabProps,
    tabs,
    projects: projectsData,
    certificates: certificatesData,
    techStackFlat,
  } = usePortfolioSection();

  return (
    <section id="projects" className="section-padding relative bg-accent/5">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Portfolio <span className="text-primary">Showcase</span>
          </h2>
          <p className="section-subtitle max-w-3xl">
            Explore my journey through projects, certifications, and technical expertise.
            Each section represents a milestone in my continuous learning path.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-2">
          {tabs.map((tab) => {
            const { isActive, onClick } = getTabProps(tab.id);
            const Icon = TAB_ICONS[tab.id];
            return (
              <button
                key={tab.id}
                type="button"
                onClick={onClick}
                aria-pressed={isActive}
                aria-label={`Show ${tab.label}`}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-accent/30 text-foreground/70 hover:bg-accent/50 border border-border"
                }`}
              >
                <Icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="min-h-[600px]">
          {activeTab === "projects" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project, index) => (
                <article
                  key={project.id}
                  className="elegant-card-hover group overflow-hidden opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 overflow-hidden mb-6 -mx-8 -mt-8">
                    <img
                      src={project.image}
                      alt={`${project.title} project screenshot`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="192"
                      fetchpriority={index < 3 ? "high" : "low"}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={`${project.id}-tag-${i}`}
                          className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-accent/30 text-foreground/70 rounded-sm border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold font-serif group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed font-light text-sm">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      {project.demoUrl && project.demoUrl !== "#" && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="uppercase tracking-wider text-xs">Live Demo</span>
                        </a>
                      )}
                      {project.githubUrl && project.hasGithub ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                        >
                          <Github className="h-4 w-4" />
                          <span className="uppercase tracking-wider text-xs">GitHub</span>
                        </a>
                      ) : (
                        <span className="flex items-center gap-2 text-sm text-foreground/40 italic">
                          <Github className="h-4 w-4" />
                          <span className="uppercase tracking-wider text-xs">Private</span>
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificatesData.map((cert, index) => (
                <article
                  key={cert.id}
                  className="elegant-card-hover group overflow-hidden opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 overflow-hidden mb-6 -mx-8 -mt-8 bg-accent/30">
                    <img
                      src={cert.image}
                      alt={`${cert.title} certificate from ${cert.issuer}`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="192"
                      fetchpriority={index < 3 ? "high" : "low"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        const fallback = e.target.nextElementSibling;
                        if (fallback) fallback.classList.remove("hidden");
                      }}
                    />
                    <div className="absolute inset-0 hidden flex items-center justify-center bg-accent/50" aria-hidden="true">
                      <Award className="h-16 w-16 text-primary/70" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-accent/30 text-foreground/70 rounded-sm border border-border">
                        {cert.issuer}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-accent/30 text-foreground/70 rounded-sm border border-border">
                        {cert.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-serif group-hover:text-primary transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed font-light text-sm">
                      {cert.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === "techstack" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 opacity-0 animate-fade-in">
              {techStackFlat.map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  className="elegant-card-hover group flex flex-col items-center justify-center gap-4 p-6 text-center"
                >
                  <div className="text-5xl transition-transform duration-300 group-hover:scale-110">
                    {tech.Icon === "img" ? (
                      <img
                        src={tech.src}
                        alt={tech.name}
                        className={tech.iconClass}
                        loading="lazy"
                      />
                    ) : (
                      <tech.Icon className={tech.iconClass} />
                    )}
                  </div>
                  <p className="text-sm text-foreground/70 font-medium uppercase tracking-wider">
                    {tech.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
