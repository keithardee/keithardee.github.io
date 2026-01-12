import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import useThemeToggle from "@/hooks/use-theme-toggle";

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, toastHidden } = useThemeToggle();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed right-4 z-50 p-2 rounded-full transition-colors duration-300",
        "focus:outline-none"
      )}
      style={
        toastHidden
          ? {
              // when toast(s) present, hide toggle below the viewport (off-screen)
              position: "fixed",
              right: "calc(1rem + env(safe-area-inset-right, 0px))",
              top: `${window.innerHeight + 48}px`,
            }
          : {
              position: "fixed",
              top: "calc(1rem + env(safe-area-inset-top, 0px))",
              right: "calc(1rem + env(safe-area-inset-right, 0px))",
            }
      }
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900" />
      )}
    </button>
  );
};

export default ThemeToggle;
