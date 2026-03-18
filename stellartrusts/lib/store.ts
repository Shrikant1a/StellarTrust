export interface Milestone {
  id: string;
  description: string;
  amount: number;
  completed: boolean;
  approved: boolean;
}

export interface Project {
  id: string;
  creator: string;
  freelancer: string;
  arbitrator: string;
  title: string;
  description: string;
  totalAmount: number;
  milestones: Milestone[];
  status: "Draft" | "Funded" | "InProgress" | "Disputed" | "Completed";
  createdAt: number;
}

const STORAGE_KEY = "stellartrust_projects";

export const getProjects = (): Project[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProject = (project: Project) => {
  const projects = getProjects();
  projects.push(project);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const updateProject = (project: Project) => {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  if (index !== -1) {
    projects[index] = project;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
};
