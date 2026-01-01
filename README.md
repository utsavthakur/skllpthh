# SkillPath AI 🚀

SkillPath AI is a modern React application designed to help users discover career paths, track their skill progress, and stay updated with market trends. It features a massive, procedurally generated database of over **40,000+ career options** to provide a realistic simulation of career discovery.

## ✨ Features

- **Massive Career Database**: Explore over **40,000+ career paths** generated procedurally across diverse fields like Tech, Business, Arts, Science, Healthcare, and Law.
- **Optimized Search**: Built with **React Infinite Scroll** and **Concurrent Mode (useTransition)** to filter 40k+ items significantly faster without UI lag.
- **User Authentication**: Complete Sign Up/Login flow with detailed profile creation.
- **Interactive Dashboard**: visualizes progress, streak, badges, and current learning path.
- **Market Trends**: data visualizations using `Recharts` to show job demand and salary trends.
- **Responsive Design**: Beautiful, mobile-friendly UI built with Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN) & Lucide React (Icons)
- **Charts**: [Recharts](https://recharts.org/) for data visualization.

## 📂 Project Structure

```
skillpath-ai/
├── components/          # React Components
│   ├── Auth.tsx        # Login/Signup flow with Infinite Scroll Search
│   ├── Dashboard.tsx   # Main user dashboard
│   ├── Landing.tsx     # Landing page
│   ├── Layout.tsx      # App layout wrapper
│   ├── MarketTrends.tsx # Salary & Demand charts
│   └── Profile.tsx     # User profile view
├── constants.ts        # Procedural Generation Logic & Mock Data
├── types.ts            # TypeScript interfaces
├── App.tsx             # Main Application Logic & Routing
├── index.tsx           # Entry point
├── index.html          # HTML template (Tailwind CDN)
└── vite.config.ts      # Vite configuration
```

## 🧠 Data Generation

This project does not rely on a static database. Instead, it uses a custom **procedural generation engine** in `constants.ts` to create data on the fly:

- **Combinatorial Generation**: Combines `Levels` (Junior, Senior, VP...) × `Domains` (AI, Marketing, Archaeology...) × `Roles` (Developer, Scientist, Strategist...) to create unique titles.
- **Smart Skill Mapping**: Automatically assigns relevant skill sets based on the domain keywords (e.g., "Biology" careers get "Lab Techniques", "Frontend" careers get "React").
- **Dynamic Salary Ranges**: randomization within realistic bounds based on the role level.

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 📝 Usage Guide

1.  On the **Landing Page**, click "Get Steered" to sign up.
2.  Fill in your details (Name, College, etc.).
3.  **Search your Dream Career**: Type into the search box. The massive list filters instantly thanks to React's `useTransition`. Scroll down to load more results.
4.  Once signed in, explore the **Dashboard** to see your roadmap.
5.  Check **Market Trends** for insights on hot jobs.

---
*Built as a high-performance demo of modern React capabilities.*

''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
"SkillBrain": A Custom Intelligence Engine
The user wants to avoid external APIs (Gemini) and build a custom AI-like system. We will create SkillBrain, a local intelligence engine that mimics AI behavior using Graph Theory and Weighted Logic.

Core Concept
Instead of a "Black Box" LLM, we will build a Knowledge Graph:

Nodes: Skills (React, Python, Communication).
Edges: Relationships (Dependency, Synergy, Career Relevance).
Weights: Difficulty, Time to Master, Market Value.
Proposed Architecture
1. The "Brain" (Logic Layer)
[NEW] 
services/skillBrain.ts
We will implement a SkillEngine class that:

Maintains an in-memory graph of all known skills.
Implements a Pathfinding Algorithm (like A* or Weighted BFS) to find the optimal path from "Beginner" to "Target Career".
Calculates a "Success Probability" based on the user's current stats.
2. The "Training Data" (Knowledge Base)
[NEW] 
data/knowledgeBase.ts
This will be our "Model". We will structure the data to be "fully trained" with:

Comprehensive Skill Definitions: 500+ skills with metadata.
Resource Linking: Hardcoded, high-quality links (YouTube, Docs) for every skill.
Rules: e.g., "Must learn HTML before React".
3. Integration
[MODIFY] 
components/Dashboard.tsx
Replace static mock data with calls to SkillBrain.generatePath(userProfile).
Display a "Brain Activity" visualization (optional) to show the engine "thinking".
Plan of Action
Define the Structure: Create the interfaces for our Knowledge Graph.
"Train" the Data: Populate knowledgeBase.ts with an initial set of high-quality data for Frontend and Data Science (to start).
Build the Algorithm: Implement the traversal logic in skillBrain.ts.
Connect: Hook it up to the UI.
Why this is "Like Gemini"
It accepts a query (User Profile).
It "thinks" (processes the graph).
It outputs a generated answer (Unique Roadmap).
BUT: It runs 100% locally, is fully controllable, and we "own" the intelligence.