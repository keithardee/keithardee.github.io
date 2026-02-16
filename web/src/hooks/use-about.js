import { projects, certificates } from "@/data/portfolio";

export function useAbout() {
  return {
    totalProjects: projects.length,
    totalCertificates: certificates.length,
  };
}

export default useAbout;
