export type SkillStatus = 'completed' | 'in-progress' | 'locked';

export interface Skill {
  id: string;
  name: string;
  description: string;
  status: SkillStatus;
  estimatedHours: number;
  marketDemand: number; // 0-100
  category: string;
  resources: string[];
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  salaryRange: string;
  demandTrend: 'up' | 'stable' | 'down';
  matchScore: number; // Percentage match with user
  skills: Skill[];
}

export interface UserProfile {
  name: string;
  email: string;
  // Education Details
  college: string;
  course: string; // e.g. B.Tech, BCA
  year: string;
  
  // Career Details
  targetCareerId: string;
  currentRole: string; // e.g. Student
  
  // Gamification
  streak: number;
  badges: string[];
  xp: number;
  level: string; // Explorer -> Specialist -> Industry Ready
}

export interface JobTrendData {
  month: string;
  demand: number;
  salary: number;
}