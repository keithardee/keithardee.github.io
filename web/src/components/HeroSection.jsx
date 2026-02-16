import { ArrowRight, Mail, Github, Linkedin, Instagram, Code, Smartphone, Cloud, Settings } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Museum-like background: warm gray, black, obsidian + orange. Soft lighting, depth. */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,hsl(var(--primary)_/_0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_100%,hsl(var(--accent)_/_0.4),transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-accent/20 to-transparent pointer-events-none" />
      {/* Soft shadow layer for depth */}
      <div className="absolute inset-0 shadow-[inset_0_1px_0_0_hsl(var(--border)_/_0.3)] pointer-events-none" />

      <div className="container max-w-7xl mx-auto z-10 relative py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: typography-led, calm hierarchy */}
          <div className="space-y-10 text-left">
            <div className="opacity-0 animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/40 border border-border text-xs md:text-sm text-foreground/80 font-medium uppercase tracking-wider">
                Ready to innovate
              </span>
            </div>

            <div className="space-y-5 opacity-0 animate-fade-in-delay-1">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight font-serif">
                <span className="block text-foreground">Software</span>
                <span className="block text-primary mt-1">Developer</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 font-light max-w-md">
                IT Student | PHINMA - University of Pangasinan
              </p>
            </div>

            <p className="opacity-0 animate-fade-in-delay-2 text-base md:text-lg text-foreground/80 leading-relaxed font-light max-w-xl">
              Creating innovative, functional, and user-friendly digital solutions with intention and craft.
            </p>

            <div className="opacity-0 animate-fade-in-delay-3 flex flex-wrap gap-3">
              {["React", "JavaScript", "Node.js", "Tailwind"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-md bg-accent/30 border border-border text-sm font-medium text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="opacity-0 animate-fade-in-delay-4 flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                className="elegant-button inline-flex items-center gap-2"
                aria-label="View my projects"
              >
                View Work
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="elegant-button-outline inline-flex items-center gap-2"
                aria-label="Get in touch"
              >
                Get In Touch
                <Mail className="h-4 w-4" />
              </a>
            </div>

            <div className="opacity-0 animate-fade-in-delay-4 flex items-center gap-4 pt-2">
              <a
                href="https://github.com/keithardee"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-md bg-accent/30 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all duration-300 group"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/keith-ardee-lazo-3057bb29b/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-md bg-accent/30 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/rdkeytsqnv/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-md bg-accent/30 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Right: gentle parallax / float — varied palette (teal, amber, soft blue, orange) */}
          <div className="relative hidden lg:block opacity-0 animate-fade-in-delay-3">
            <div className="relative w-full h-[500px] flex items-center justify-center">
              <div className="relative z-10 animate-float">
                <div className="w-64 h-40 rounded-lg border border-border bg-gradient-to-br from-[#1e3a3a] to-[#152a2a] shadow-xl shadow-black/30 flex items-center justify-center backdrop-blur-sm" style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4), 0 0 0 1px hsl(var(--border))" }}>
                  <Code className="h-16 w-16 text-[#5eead4]/80" />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-[#334155] rounded-full shadow-md" />
              </div>

              <div className="absolute top-20 right-10 animate-float opacity-90" style={{ animationDelay: "1s" }}>
                <Smartphone className="h-12 w-12 text-[#fbbf24]/90" />
              </div>
              <div className="absolute bottom-20 left-10 animate-float opacity-90" style={{ animationDelay: "1.5s" }}>
                <Cloud className="h-10 w-10 text-[#94a3b8]/90" />
              </div>
              <div className="absolute top-1/2 right-5 animate-float opacity-90" style={{ animationDelay: "2s" }}>
                <Settings className="h-8 w-8 text-primary/80" />
              </div>
              <div className="absolute bottom-32 right-20 animate-float opacity-90" style={{ animationDelay: "0.5s" }}>
                <Code className="h-6 w-6 text-[#38bdf8]/80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
