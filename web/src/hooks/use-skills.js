import React from "react";
import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaNodeJs, FaGithub, FaFigma, FaTools } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiVercel } from "react-icons/si";

export function useSkills() {
   const techStack = React.useMemo(() => ({
      frontend: [
         { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
         { name: "Next.js", icon: <SiNextdotjs className="text-primary" /> },
         { name: "JavaScript", icon: <FaJsSquare className="text-[#F7DF1E]" /> },
         { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38B2AC]" /> },
         { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
         { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
      ],
      backend: [
         { name: "Python", icon: <img src="/assets/icons8-python-48.png" alt="Python" className="w-10 h-10 object-contain" /> },
         { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> }
      ],
      database: [
         { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
         { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
      ],
      tools: [
         { name: "Git & GitHub", icon: <FaGithub className="text-primary" /> },
         { name: "Vercel", icon: <SiVercel className="text-primary" /> },
         { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
         { name: "Tools Lain", icon: <FaTools className="text-primary" /> },
      ],
   }), []);

   const categories = React.useMemo(() => Object.keys(techStack), [techStack]);

   function getTechs(category) {
      return techStack[category] || [];
   }

   return { techStack, categories, getTechs };
}

export default useSkills;
