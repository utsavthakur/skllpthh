
import { CAREER_TEMPLATES, SKILL_GRAPH, SkillNode, ROLE_DOMAIN_MAP, DOMAIN_TEMPLATES } from '../data/knowledgeBase';
import { ALL_CAREERS } from '../data/allCareers';
import { CareerPath, Skill, UserProfile } from '../types';

/**
 * SkillBrain: The Local Intelligence Engine
 * 
 * This engine dynamically constructs career paths by traversing the Knowledge Graph.
 * It simulates an "AI" by understanding prerequisites and difficulty.
 */
export class SkillBrain {

    /**
     * Generates a fully personalized career path based on the Knowledge Graph
     */
    static generatePath(careerId: string, _userProfile?: UserProfile): CareerPath {
        console.log(`🧠 SkillBrain thinking about: ${careerId}...`);

        // 1. Identify the Target
        let templateId = careerId;
        let template = CAREER_TEMPLATES[careerId];

        // Check if it's one of the imported roles
        if (!template) {
            // Try to find by title matching the ID (simplified check)
            // ID: "intern-physicist", KEY: "Intern Physicist"
            const roleName = Object.keys(ALL_CAREERS).find(r => r.toLowerCase().replace(/[^a-z0-9]+/g, '-') === careerId);

            if (roleName) {
                const domain = ALL_CAREERS[roleName];
                const domainSkills = DOMAIN_TEMPLATES[domain] || DOMAIN_TEMPLATES['Science']; // Fallback

                template = {
                    title: roleName,
                    description: `Career path for ${roleName} in the ${domain} field.`,
                    requiredSkills: domainSkills
                };
                console.log(`🧠 SkillBrain: Inferred path for ${roleName} using ${domain} domain.`);
            } else {
                // Fallback to generic
                template = CAREER_TEMPLATES['frontend-dev'];
            }
        }

        // 2. Resolve Dependency Graph
        const resolvedSkillIds = this.resolveDependencies(template.requiredSkills);

        // 3. Hydrate Skills
        // Convert IDs into full Skill objects with real data
        const skills: Skill[] = resolvedSkillIds.map((skillId, index) => {
            const node = SKILL_GRAPH[skillId];
            if (!node) return null;

            return {
                id: node.id,
                name: node.name,
                description: `Master ${node.name} to advance your career.`,
                category: node.category,
                estimatedHours: node.difficulty * 10 + 10, // heuristic
                marketDemand: node.marketValue,
                // Status Logic: First 2 are 'completed' (simulated), next 1 'in-progress', rest 'locked'
                status: index < 2 ? 'completed' : index === 2 ? 'in-progress' : 'locked',
                resources: node.resources.map(r => `${r.type}: ${r.title} (${r.url})`)
            };
        }).filter(s => s !== null) as Skill[];

        // 4. Construct Final Path
        return {
            id: careerId,
            title: template.title,
            description: template.description || `Your personalized roadmap to becoming a ${template.title}.`,
            salaryRange: this.calculateSalary(skills),
            demandTrend: 'up', // We could calculate this based on avg skill demand
            matchScore: 95, // High match because we built it for them
            skills: skills
        };
    }

    /**
     * Sorts skills so prerequisites appear before the dependent skill.
     */
    private static resolveDependencies(targetSkillIds: string[]): string[] {
        const visited = new Set<string>();
        const result: string[] = [];

        const visit = (id: string) => {
            if (visited.has(id)) return;

            const node = SKILL_GRAPH[id];
            if (!node) {
                console.warn(`SkillBrain: Missing node for ${id}`);
                return;
            }

            // Visit prereqs first
            node.prerequisites.forEach(prereqId => visit(prereqId));

            visited.add(id);
            // Only add to result if it's one of the targets (or a requisite for one)
            // For this version, we include ALL prereqs to make the path complete
            result.push(id);
        };

        targetSkillIds.forEach(id => visit(id));
        return result;
    }

    /**
     * Estimates salary based on skill value and difficulty
     */
    private static calculateSalary(skills: Skill[]): string {
        const totalValue = skills.reduce((sum, s) => sum + s.marketDemand, 0);
        const avgValue = totalValue / skills.length;

        // Heuristic: Higher skill value = Higher Base salary
        const baseLPA = Math.floor(avgValue / 10);
        const maxLPA = Math.floor(baseLPA * 2.5);

        return `₹${baseLPA}L - ₹${maxLPA}L`;
    }
}
