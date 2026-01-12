import React from "react";
import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaNodeJs, FaGithub, FaFigma, FaTools } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiVercel } from "react-icons/si";

export function useSkills() {
   // Avoid embedding JSX in this module to keep it plain JS for build tools.
   const techStack = React.useMemo(() => ({
      frontend: [
         { name: "React", Icon: FaReact, iconClass: "text-[#61DAFB]" },
         { name: "Next.js", Icon: SiNextdotjs, iconClass: "text-primary" },
         { name: "JavaScript", Icon: FaJsSquare, iconClass: "text-[#F7DF1E]" },
         { name: "Tailwind CSS", Icon: SiTailwindcss, iconClass: "text-[#38B2AC]" },
         { name: "HTML5", Icon: FaHtml5, iconClass: "text-[#E34F26]" },
         { name: "CSS3", Icon: FaCss3Alt, iconClass: "text-[#1572B6]" },
      ],
      backend: [
         { name: "Python", Icon: "img", src: "/assets/icons8-python-48.png", iconClass: "w-10 h-10 object-contain" },
         { name: "Node.js", Icon: FaNodeJs, iconClass: "text-[#339933]" }
      ],
      database: [
         { name: "MongoDB", Icon: SiMongodb, iconClass: "text-[#47A248]" },
         { name: "PostgreSQL", Icon: SiPostgresql, iconClass: "text-[#336791]" },
      ],
      tools: [
         { name: "Git & GitHub", Icon: FaGithub, iconClass: "text-primary" },
         { name: "Vercel", Icon: SiVercel, iconClass: "text-primary" },
         { name: "Figma", Icon: FaFigma, iconClass: "text-[#F24E1E]" },
         { name: "Tools Lain", Icon: FaTools, iconClass: "text-primary" },
      ],
   }), []);

   const categories = React.useMemo(() => Object.keys(techStack), [techStack]);

   function getTechs(category) {
      return techStack[category] || [];
   }

   return { techStack, categories, getTechs };
}

export default useSkills;
