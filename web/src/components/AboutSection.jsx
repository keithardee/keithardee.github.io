import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src="/assets/image1.jpg"
                alt="Profile"
                className="w-44 h-44 md:w-48 md:h-48 rounded-lg object-cover flex-shrink-0"
              />

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold">
                  Passionate Web Developer & IT Student
                </h3>

                <p className="text-muted-foreground mt-3">
                  I&apos;m a Bachelor of Science in Information Technology student specializing in front-end development. I build responsive, accessible, and user-friendly interfaces and modern web applications that solve real user problems.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                  <a href="#contact" className="cosmic-button">
                    Get In Touch
                  </a>

                  <a
                    href="/assets/CV_Lazo,%20Keith%20Ardee.pdf"
                    download="CV_Lazo, Keith Ardee.pdf"
                    className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Web Development</h4>
                  <p className="text-muted-foreground">
                    Creating responsive websites and web applications with
                    modern frameworks.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">UI/UX Design</h4>
                  <p className="text-muted-foreground">
                    Designing intuitive user interfaces and seamless user
                    experiences.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">Project Management</h4>
                  <p className="text-muted-foreground">
                    Leading projects from conception to completion with agile
                    methodologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
