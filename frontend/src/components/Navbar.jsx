import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useNavbar } from "@/hooks/use-navbar";

export const Navbar = () => {
  const { navItems, isScrolled, isMenuOpen, closeMenu, toggleMenu } = useNavbar();

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-500",
        isScrolled
          ? "py-4 bg-background/95 backdrop-blur-lg border-b border-border/50"
          : "py-6"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container flex items-center justify-between max-w-7xl mx-auto px-4 md:px-6">
        <a
          className="text-lg md:text-xl font-semibold text-foreground flex items-center transition-all duration-300 group"
          href="#hero"
          aria-label="Home"
        >
          <span className="font-serif group-hover:text-primary transition-colors duration-300 nav-brand-glow">
            Keith Ardee Portfolio
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm text-foreground/70 hover:text-primary transition-all duration-300 relative group uppercase tracking-wider font-medium"
              onClick={closeMenu}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-foreground z-50 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm transition-colors duration-300"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-background/98 backdrop-blur-lg z-40 flex flex-col items-center justify-center",
            "transition-all duration-500 md:hidden",
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <nav className="flex flex-col space-y-12 text-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-2xl text-foreground/80 hover:text-primary transition-all duration-300 font-serif uppercase tracking-wider"
                onClick={closeMenu}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
};
