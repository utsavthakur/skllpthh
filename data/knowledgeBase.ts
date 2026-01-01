
// This is the "Cortex" - the raw knowledge base of the SkillBrain
// It contains "Nodes" (Skills) and "Edges" (Prerequisites/Relationships)

export interface SkillNode {
    id: string;
    name: string;
    category: 'Language' | 'Framework' | 'Tool' | 'Concept' | 'Core' | 'Soft Skill' | 'Domain';
    difficulty: 1 | 2 | 3 | 4 | 5; // 1 = Easy, 5 = Hard
    marketValue: number; // 0-100 score
    prerequisites: string[]; // IDs of skills you MUST know first
    resources: {
        title: string;
        url: string;
        type: 'Video' | 'Article' | 'Course' | 'Documentation';
        isPremium?: boolean;
    }[];
}

export const SKILL_GRAPH: Record<string, SkillNode> = {
    // --- TECH: FOUNDATIONS ---
    'html': { id: 'html', name: 'HTML5 Semantic Structure', category: 'Language', difficulty: 1, marketValue: 80, prerequisites: [], resources: [{ title: 'MDN Web Docs: HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', type: 'Documentation' }] },
    'css': { id: 'css', name: 'CSS3 & Flexbox/Grid', category: 'Language', difficulty: 2, marketValue: 80, prerequisites: ['html'], resources: [{ title: 'CSS-Tricks Flexbox Guide', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', type: 'Article' }] },
    'js-basics': { id: 'js-basics', name: 'JavaScript Fundamentals', category: 'Language', difficulty: 3, marketValue: 95, prerequisites: ['html', 'css'], resources: [{ title: 'Namaste JavaScript', url: 'https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP', type: 'Video' }] },
    'git': { id: 'git', name: 'Git & Version Control', category: 'Tool', difficulty: 2, marketValue: 90, prerequisites: [], resources: [{ title: 'Git Crash Course', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', type: 'Video' }] },

    // --- TECH: ADVANCED ---
    'react': { id: 'react', name: 'React.js', category: 'Framework', difficulty: 3, marketValue: 98, prerequisites: ['js-basics'], resources: [{ title: 'React.dev', url: 'https://react.dev/', type: 'Documentation' }] },
    'typescript': { id: 'typescript', name: 'TypeScript', category: 'Language', difficulty: 3, marketValue: 92, prerequisites: ['js-basics'], resources: [{ title: 'Total TypeScript', url: 'https://www.totaltypescript.com/', type: 'Article' }] },
    'python': { id: 'python', name: 'Python Programming', category: 'Language', difficulty: 2, marketValue: 95, prerequisites: [], resources: [{ title: 'Real Python', url: 'https://realpython.com/', type: 'Article' }] },
    'sql': { id: 'sql', name: 'SQL Databases', category: 'Core', difficulty: 3, marketValue: 90, prerequisites: [], resources: [{ title: 'SQLZoo', url: 'https://sqlzoo.net/', type: 'Course' }] },

    // --- COMMERCE & FINANCE ---
    'accounting': { id: 'accounting', name: 'Financial Accounting', category: 'Domain', difficulty: 3, marketValue: 85, prerequisites: [], resources: [{ title: 'Accounting Stuff (YouTube)', url: 'https://www.youtube.com/c/AccountingStuff', type: 'Video' }] },
    'excel': { id: 'excel', name: 'Advanced Excel', category: 'Tool', difficulty: 2, marketValue: 90, prerequisites: [], resources: [{ title: 'Excel Is Fun', url: 'https://www.youtube.com/user/ExcelIsFun', type: 'Video' }] },
    'financial-modeling': { id: 'financial-modeling', name: 'Financial Modeling', category: 'Domain', difficulty: 4, marketValue: 95, prerequisites: ['accounting', 'excel'], resources: [{ title: 'CFI Financial Modeling', url: 'https://corporatefinanceinstitute.com/', type: 'Course' }] },

    // --- SCIENCE ---
    'research-methods': { id: 'research-methods', name: 'Scientific Research Methods', category: 'Core', difficulty: 3, marketValue: 80, prerequisites: [], resources: [{ title: 'Research Methodology Course', url: 'https://www.coursera.org/learn/research-methods', type: 'Course' }] },
    'lab-safety': { id: 'lab-safety', name: 'Lab Safety & Protocols', category: 'Core', difficulty: 2, marketValue: 100, prerequisites: [], resources: [{ title: 'Lab Safety Guidelines', url: 'https://www.cdc.gov/labs/safety-training.html', type: 'Documentation' }] },
    'data-analysis': { id: 'data-analysis', name: 'Data Analysis', category: 'Tool', difficulty: 3, marketValue: 92, prerequisites: [], resources: [{ title: 'Khan Academy Statistics', url: 'https://www.khanacademy.org/math/statistics-probability', type: 'Course' }] },

    // --- LAW ---
    'constitution': { id: 'constitution', name: 'Constitutional Law', category: 'Domain', difficulty: 4, marketValue: 90, prerequisites: [], resources: [{ title: 'Constitution of India (Legislative)', url: 'https://legislative.gov.in/constitution-of-india', type: 'Documentation' }] },
    'legal-drafting': { id: 'legal-drafting', name: 'Legal Drafting', category: 'Domain', difficulty: 4, marketValue: 95, prerequisites: ['constitution'], resources: [{ title: 'Legal Drafting Guide', url: 'https://www.kaanoon.com/', type: 'Article' }] },
    'contracts': { id: 'contracts', name: 'Contract Law', category: 'Domain', difficulty: 3, marketValue: 90, prerequisites: [], resources: [{ title: 'LawSikho Contracts', url: 'https://lawsikho.com/', type: 'Course' }] },

    // --- ARTS & CREATIVE ---
    'design-theory': { id: 'design-theory', name: 'Design Theory', category: 'Concept', difficulty: 2, marketValue: 80, prerequisites: [], resources: [{ title: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/', type: 'Article' }] },
    'adobe-suite': { id: 'adobe-suite', name: 'Adobe Creative Suite', category: 'Tool', difficulty: 3, marketValue: 90, prerequisites: ['design-theory'], resources: [{ title: 'Adobe Tutorials', url: 'https://helpx.adobe.com/learning.html', type: 'Documentation' }] },
    'portfolio': { id: 'portfolio', name: 'Portfolio Building', category: 'Soft Skill', difficulty: 2, marketValue: 100, prerequisites: [], resources: [{ title: 'Behance Best Practices', url: 'https://www.behance.net/', type: 'Article' }] },

    // --- MANAGEMENT ---
    'communication': { id: 'communication', name: 'Business Communication', category: 'Soft Skill', difficulty: 2, marketValue: 95, prerequisites: [], resources: [{ title: 'Ted Talks on Communication', url: 'https://www.ted.com/topics/communication', type: 'Video' }] },
    'leadership': { id: 'leadership', name: 'Leadership & Strategy', category: 'Soft Skill', difficulty: 4, marketValue: 98, prerequisites: ['communication'], resources: [{ title: 'HBR Leadership', url: 'https://hbr.org/topic/leadership', type: 'Article' }] },
    'project-mgmt': { id: 'project-mgmt', name: 'Project Management (Agile)', category: 'Domain', difficulty: 3, marketValue: 92, prerequisites: [], resources: [{ title: 'Atlassian Agile Guide', url: 'https://www.atlassian.com/agile', type: 'Documentation' }] }
};

// --- IMPORTED DATA MAPPING ---
// Mapped from user's "Career data.xlsx" - 64 Unique Roles
export const ROLE_DOMAIN_MAP: Record<string, string> = {
    "Physicist": "Science",
    "Chemist": "Science",
    "Biologist": "Science",
    "Statistician": "Science",
    "Environmental Scientist": "Science",
    "Data Scientist": "Science",
    "Research Scientist": "Science",
    "Lab Scientist": "Science",
    "Climate Scientist": "Science",

    "Software Engineer": "Engineering",
    "Civil Engineer": "Engineering",
    "Mechanical Engineer": "Engineering",
    "Electrical Engineer": "Engineering",
    "Electronics Engineer": "Engineering",
    "AI Engineer": "Engineering",
    "Robotics Engineer": "Engineering",
    "Automobile Engineer": "Engineering",
    "Aerospace Engineer": "Engineering",
    "Marine Engineer": "Engineering",
    "Petroleum Engineer": "Engineering",

    "Accountant": "Commerce",
    "Chartered Accountant": "Commerce",
    "Auditor": "Commerce",
    "Financial Analyst": "Commerce",
    "Investment Analyst": "Commerce",
    "Bank Officer": "Commerce",
    "Risk Analyst": "Commerce",
    "Insurance Officer": "Commerce",
    "Credit Analyst": "Commerce",
    "Treasury Analyst": "Commerce",

    "Business Manager": "Management",
    "Product Manager": "Management",
    "Project Manager": "Management",
    "Operations Manager": "Management",
    "Supply Chain Manager": "Management",
    "HR Manager": "Management",
    "Marketing Manager": "Management",
    "Strategy Consultant": "Management",
    "Operations Head": "Management",
    "General Manager": "Management",

    "Graphic Designer": "Arts",
    "Animator": "Arts",
    "Illustrator": "Arts",
    "Fine Artist": "Arts",
    "Film Maker": "Arts",
    "Music Composer": "Arts",
    "Sound Engineer": "Arts",
    "Theatre Artist": "Arts",
    "Creative Director": "Arts",

    "Political Scientist": "Humanities",
    "Sociologist": "Humanities",
    "Historian": "Humanities",
    "Public Policy Analyst": "Humanities",
    "Economist": "Humanities",
    "Development Studies Analyst": "Humanities",
    "Think Tank Researcher": "Humanities",

    "Advocate": "Law",
    "Corporate Lawyer": "Law",
    "Criminal Lawyer": "Law",
    "Judicial Officer": "Law",
    "Legal Advisor": "Law",
    "Public Prosecutor": "Law",
    "Law Officer": "Law",
    "School Teacher": "Management" // Using Mgmt/Comm skills for generic
};

// Default skills for each domain
export const DOMAIN_TEMPLATES: Record<string, string[]> = {
    "Science": ['research-methods', 'data-analysis', 'lab-safety'],
    "Engineering": ['git', 'python', 'project-mgmt'],
    "Commerce": ['excel', 'accounting', 'financial-modeling'],
    "Management": ['communication', 'project-mgmt', 'leadership'],
    "Arts": ['design-theory', 'adobe-suite', 'portfolio'],
    "Law": ['constitution', 'contracts', 'legal-drafting'],
    "Humanities": ['research-methods', 'communication', 'constitution']
};

export const CAREER_TEMPLATES: Record<string, { title: string, requiredSkills: string[], description: string }> = {
    'frontend-dev': {
        title: 'Frontend Developer',
        description: 'Specializes in the visual interface, user interaction, and client-side logic.',
        requiredSkills: ['html', 'css', 'git', 'js-basics', 'react', 'typescript']
    },
    'data-scientist': {
        title: 'Data Scientist',
        description: 'Extracts insights from data using statistical methods and machine learning.',
        requiredSkills: ['python', 'sql', 'data-analysis', 'research-methods']
    }
};
