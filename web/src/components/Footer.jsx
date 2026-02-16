import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-4 border-t border-border/50 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-sm text-foreground/60 font-light">
              &copy; {currentYear} Keith Ardee Lazo. All rights reserved.
            </p>
            <p className="text-xs text-foreground/40 mt-2 font-light">
              Software Developer | PHINMA - University of Pangasinan Graduate
            </p>
          </div>

          <a
            href="#hero"
            className="p-3 rounded-sm bg-accent/30 hover:bg-primary/10 border border-border hover:border-primary/30 text-foreground/70 hover:text-primary transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </footer>
  );
};
