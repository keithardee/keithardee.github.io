import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useExperiences } from "@/hooks/use-experiences";

export const ExperiencesSection = () => {
  const { experiences } = useExperiences();

  return (
    <section id="experience" className="section-padding relative bg-accent/5">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-20">
          <h2 className="section-title">
            Experience
          </h2>
          <p className="section-subtitle">
            Professional journey and academic foundation
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="elegant-card-hover opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20" aria-hidden="true">
                    <Briefcase className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 font-serif">
                      {exp.title}
                    </h3>
                    <p className="text-xl text-primary mb-3 font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <p className="text-foreground/80 leading-relaxed font-light">
                    {exp.description}
                  </p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2 pt-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-foreground/70">
                          <span className="text-primary mt-1.5">•</span>
                          <span className="font-light">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
