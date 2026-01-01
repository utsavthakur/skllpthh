import { CareerPath, JobTrendData, UserProfile } from './types';
import { CAREER_TEMPLATES } from './data/knowledgeBase';
import { ALL_CAREERS } from './data/allCareers';

export const MOCK_USER: UserProfile = {
  name: "Arjun Kumar",
  email: "arjun@example.com",
  college: "IIT Delhi",
  course: "B.Tech Computer Science",
  year: "3rd Year",
  targetCareerId: "frontend-dev",
  currentRole: "Student",
  streak: 12,
  badges: ["Fast Learner", "Consistent", "Week 1 Finisher"],
  xp: 1450,
  level: "Explorer"
};

export const MOCK_TRENDS: JobTrendData[] = [
  { month: 'Jan', demand: 65, salary: 60 },
  { month: 'Feb', demand: 68, salary: 62 },
  { month: 'Mar', demand: 75, salary: 65 },
  { month: 'Apr', demand: 72, salary: 64 },
  { month: 'May', demand: 80, salary: 68 },
  { month: 'Jun', demand: 85, salary: 70 },
];

export const MOCK_MARKET_SKILLS = [
  { name: "React.js", growth: "+120%", type: "hot" },
  { name: "Python (AI/ML)", growth: "+95%", type: "hot" },
  { name: "AWS Cloud", growth: "+80%", type: "stable" },
  { name: "TypeScript", growth: "+65%", type: "stable" },
  { name: "UX Design", growth: "+45%", type: "stable" }
];

export const MOCK_TOP_ROLES = [
  { role: "Full Stack Developer", salary: "₹8L - ₹24L", openings: "12k+" },
  { role: "Data Scientist", salary: "₹10L - ₹30L", openings: "8k+" },
  { role: "Product Manager", salary: "₹15L - ₹40L", openings: "5k+" },
  { role: "DevOps Engineer", salary: "₹12L - ₹35L", openings: "6k+" }
];

// Combine built-in templates AND imported 572+ roles
const allRoles = { ...CAREER_TEMPLATES };

// Add imported detailed roles
Object.keys(ALL_CAREERS).forEach(roleName => {
  const id = roleName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (!allRoles[id]) {
    allRoles[id] = {
      title: roleName,
      description: `Career path for ${roleName}.`,
      requiredSkills: [] // Handled dynamically by Brain
    };
  }
});

export const CAREER_PATHS: Record<string, CareerPath> = Object.fromEntries(
  Object.entries(allRoles).map(([id, t]) => [
    id,
    {
      id,
      title: (t as any).title,
      description: (t as any).description,
      salaryRange: "₹6L - ₹18L",
      demandTrend: 'up' as const,
      matchScore: 85,
      skills: []
    }
  ])
);

// Default export for fallback
export const MOCK_CAREER = CAREER_PATHS['frontend-dev'];