import { Code, Award, Globe, Download, ArrowRight, Sparkles } from "lucide-react";
import { useAbout } from "@/hooks/use-about";

export const AboutSection = () => {
  const { totalProjects, totalCertificates } = useAbout();

  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="section-title">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Sparkles className="h-5 w-5 text-primary/60" />
            <p className="section-subtitle max-w-none">
              Transforming ideas into digital experiences
            </p>
            <Sparkles className="h-5 w-5 text-primary/60" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-12 md:mb-16 lg:mb-20">
          <div className="space-y-4 md:space-y-6">
            <div className="opacity-0 animate-fade-in">
              <p className="text-base md:text-lg lg:text-xl text-primary/80 font-light mb-2">
                Hello, I&apos;m
              </p>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-4 md:mb-6">
                Keith Ardee Lazo
              </h3>
            </div>
            <div className="opacity-0 animate-fade-in-delay-1">
              <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed font-light mb-6 md:mb-8">
                A Computer Network and Telecommunications Engineering student at PHINMA - University of Pangasinan,
                currently in my 3rd year (2023-2027). I am passionate about Front-End development and focus on
                creating engaging digital experiences. I always strive to provide the best solutions in every project,
                combining technical expertise with thoughtful design to build applications that are both functional and elegant.
              </p>
            </div>
            <div className="opacity-0 animate-fade-in-delay-2 flex flex-wrap gap-4">
              <a
                href="/assets/CV_Lazo,%20Keith%20Ardee.pdf"
                download="CV_Lazo, Keith Ardee.pdf"
                className="elegant-button inline-flex items-center gap-2"
                aria-label="Download CV"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <a
                href="#projects"
                className="elegant-button-outline inline-flex items-center gap-2"
                aria-label="View projects"
              >
                <ArrowRight className="h-4 w-4" />
                View Projects
              </a>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end opacity-0 animate-fade-in-delay-1 mt-8 lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-3xl animate-pulse" />
              <img
                src="/assets/FormalPic.jpg"
                alt="Keith Ardee Lazo - Software Developer"
                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-primary/30 shadow-2xl z-10"
                loading="eager"
                width="320"
                height="320"
                fetchpriority="high"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full border-2 border-primary/20 flex items-center justify-center z-20">
                <Code className="h-12 w-12 text-primary/60" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16 lg:mt-20">
          <div className="elegant-card-hover text-center opacity-0 animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-sm bg-primary/10">
                <Code className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h4 className="text-4xl md:text-5xl font-bold text-primary mb-2 font-serif">{totalProjects}</h4>
            <p className="text-sm uppercase tracking-wider text-foreground/60 mb-1">Total Projects</p>
            <p className="text-xs text-foreground/50 font-light">Innovative web solutions crafted</p>
          </div>
          <div className="elegant-card-hover text-center opacity-0 animate-fade-in-delay-1">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-sm bg-primary/10">
                <Award className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h4 className="text-4xl md:text-5xl font-bold text-primary mb-2 font-serif">{totalCertificates}</h4>
            <p className="text-sm uppercase tracking-wider text-foreground/60 mb-1">Certificates</p>
            <p className="text-xs text-foreground/50 font-light">Professional skills validated</p>
          </div>
          <div className="elegant-card-hover text-center opacity-0 animate-fade-in-delay-2">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-sm bg-primary/10">
                <Globe className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h4 className="text-4xl md:text-5xl font-bold text-primary mb-2 font-serif">3</h4>
            <p className="text-sm uppercase tracking-wider text-foreground/60 mb-1">Years of Experience</p>
            <p className="text-xs text-foreground/50 font-light">Continuous learning journey</p>
          </div>
        </div>
      </div>
    </section>
  );
};
