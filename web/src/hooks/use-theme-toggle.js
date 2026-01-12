import { useCallback, useEffect, useState } from "react";

export function useThemeToggle() {
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [toastHidden, setToastHidden] = useState(false);

   // initialize theme from localStorage
   useEffect(() => {
      try {
         const stored = localStorage.getItem("theme");
         if (stored === "dark") {
         setIsDarkMode(true);
         document.documentElement.classList.add("dark");
         } else {
         localStorage.setItem("theme", "light");
         setIsDarkMode(false);
         }
      } catch (e) {
         // ignore (SSR or private mode)
      }
   }, []);

   const toggleTheme = useCallback(() => {
      try {
         if (isDarkMode) {
         document.documentElement.classList.remove("dark");
         localStorage.setItem("theme", "light");
         setIsDarkMode(false);
         } else {
         document.documentElement.classList.add("dark");
         localStorage.setItem("theme", "dark");
         setIsDarkMode(true);
         }
      } catch (e) {
         // ignore
      }
   }, [isDarkMode]);

   // detect toasts in the toast viewport and hide toggle when any exist
   useEffect(() => {
      const viewport = typeof document !== "undefined" ? document.getElementById("toast-viewport") : null;
      if (!viewport) return;

      const compute = () => {
         const hasToasts = viewport.children && viewport.children.length > 0;
         setToastHidden(Boolean(hasToasts));
      };

      const mo = new MutationObserver(() => compute());
      mo.observe(viewport, { childList: true });
      compute();

      const onResize = () => compute();
      window.addEventListener("resize", onResize);

      return () => {
         mo.disconnect();
         window.removeEventListener("resize", onResize);
      };
   }, []);

   return { isDarkMode, toggleTheme, toastHidden };
}

export default useThemeToggle;
