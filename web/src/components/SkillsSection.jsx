import useSkills from "@/hooks/use-skills";

export const SkillsSection = () => {
  const { techStack } = useSkills();

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {Object.entries(techStack).map(([category, techs]) => (
            <div key={category}>
              <h3 className="text-xl font-bold text-primary capitalize mb-4 border-b-2 border-border pb-2">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {techs.map((tech, i) => (
                  <div key={i} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-card/5 border border-border transition-all duration-300 hover:bg-primary/10 hover:border-primary/30">
                    <div className="text-4xl">{tech.icon}</div>
                    <p className="text-sm text-muted-foreground">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
