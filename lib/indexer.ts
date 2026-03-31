/**
 * Trustlance Data Indexer & Cache System
 * 
 * In a production Soroban environment, fetching raw ledger entries on every 
 * page load is suboptimal. This indexer provides a centralized way to 
 * manage project data and user activity.
 */

export interface Milestone {
  description: string;
  amount: number;
  is_funded: boolean;
  is_approved: boolean;
  is_disputed: boolean;
}

export interface ProjectActivity {
  id: string;
  type: 'milestone_approved' | 'project_funded' | 'dispute_raised' | 'project_completed';
  timestamp: string;
  user: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  freelancer: string;
  total_budget: number;
  milestones: Milestone[];
  status: 'Active' | 'In Progress' | 'Dispute' | 'Completed';
  progress: number;
}

// Simulated Persistent Data Store
const _projects_cache: Project[] = [
  {
    id: '1',
    title: 'Website Redesign',
    client: 'Alice',
    freelancer: 'James Carter',
    total_budget: 1500,
    milestones: [],
    status: 'Active',
    progress: 50
  },
  {
    id: '2',
    title: 'Mobile App Development',
    client: 'David',
    freelancer: 'Sarah Lee',
    total_budget: 4500,
    milestones: [],
    status: 'In Progress',
    progress: 33
  }
];

/**
 * Get all projects (cached)
 */
export function getActiveProjects(): Project[] {
  // Logic to potentially fetch from local storage or remote indexer service
  return _projects_cache;
}

/**
 * Get system metrics for dashboard
 */
export function getSystemMetrics() {
  return {
    totalProjects: 42,
    totalFundsLocked: 24500,
    verifiedUsers: 34,
    uptime: '99.99%',
    lastSync: new Date().toISOString()
  };
}

/**
 * Add an event to the indexer
 */
export function trackActivity(activity: ProjectActivity) {
  // In a real app, this would push to a specialized DB or local storage
  console.log(`[Indexer] Tracked: ${activity.type} by ${activity.user}`);
}
