import { useState, useMemo } from "react";
import useSkills from "@/hooks/use-skills";
import { projects, certificates } from "@/data/portfolio";

const TABS = [
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "techstack", label: "Tech Stack" },
];

export function usePortfolioSection() {
  const [activeTab, setActiveTab] = useState("projects");
  const { techStack } = useSkills();

  const techStackFlat = useMemo(() => {
    return Object.values(techStack).flat();
  }, [techStack]);

  const getTabProps = (tabId) => ({
    isActive: activeTab === tabId,
    onClick: () => setActiveTab(tabId),
  });

  return {
    activeTab,
    setActiveTab,
    getTabProps,
    tabs: TABS,
    projects,
    certificates,
    techStackFlat,
  };
}
