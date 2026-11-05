// ─── Skills Data ─────────────────────────────────────────────────────────────

export interface SkillCategory {
  id: string;
  label: string;
  icon: string; // lucide icon name
  color: string; // tailwind color class
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: 'proficient' | 'familiar' | 'learning';
  highlight?: boolean; // shown prominently
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Programming Languages',
    icon: 'Terminal',
    color: 'emerald',
    skills: [
      { name: 'Python', level: 'proficient', highlight: true },
      { name: 'SQL', level: 'proficient', highlight: true },
      { name: 'TypeScript', level: 'proficient', highlight: true },
      { name: 'JavaScript', level: 'proficient', highlight: true },
      { name: 'Bash', level: 'proficient', highlight: true },
      { name: 'Java', level: 'familiar' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    icon: 'Server',
    color: 'cyan',
    skills: [
      { name: 'REST APIs', level: 'proficient', highlight: true },
      { name: 'FastAPI', level: 'proficient', highlight: true },
      { name: 'API connectors', level: 'proficient', highlight: true },
      { name: 'OAuth 2.0', level: 'proficient', highlight: true },
      { name: 'JWT & RBAC', level: 'proficient', highlight: true },
      { name: 'Flask', level: 'proficient' },
      { name: 'Node.js', level: 'proficient', highlight: true },
      { name: 'Express.js', level: 'proficient' },
      { name: 'Pydantic', level: 'proficient', highlight: true },
      { name: 'Asynchronous programming', level: 'proficient' },
      { name: 'Backend services', level: 'proficient' },
      { name: 'JSON & XML', level: 'proficient' },
      { name: 'SFTP', level: 'proficient', highlight: true },
      { name: 'Partner data exchange', level: 'proficient' },
      { name: 'Webhooks', level: 'proficient' },
      { name: 'Postman', level: 'proficient' },
      { name: 'SAP Concur APIs', level: 'proficient', highlight: true },
      { name: 'ServiceNow APIs', level: 'familiar' },
      { name: 'Third-party integrations', level: 'proficient' },
    ],
  },
  {
    id: 'data',
    label: 'Databases & Data Platforms',
    icon: 'Database',
    color: 'emerald',
    skills: [
      { name: 'Snowflake', level: 'proficient', highlight: true },
      { name: 'dbt', level: 'proficient', highlight: true },
      { name: 'SQL query optimization', level: 'proficient', highlight: true },
      { name: 'ETL Pipelines', level: 'proficient', highlight: true },
      { name: 'Data pipelines', level: 'proficient', highlight: true },
      { name: 'Data validation', level: 'proficient', highlight: true },
      { name: 'Data ingestion', level: 'proficient' },
      { name: 'MySQL', level: 'proficient', highlight: true },
      { name: 'PostgreSQL', level: 'proficient', highlight: true },
      { name: 'MongoDB', level: 'familiar' },
      { name: 'SQLite', level: 'proficient' },
      { name: 'Redis', level: 'familiar' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud Platforms & DevOps',
    icon: 'Cloud',
    color: 'cyan',
    skills: [
      { name: 'Azure DevOps', level: 'proficient', highlight: true },
      { name: 'GitHub Actions', level: 'proficient', highlight: true },
      { name: 'CI/CD pipelines', level: 'proficient', highlight: true },
      { name: 'Docker', level: 'proficient', highlight: true },
      { name: 'Azure Logic Apps', level: 'proficient', highlight: true },
      { name: 'AWS Lambda', level: 'familiar' },
      { name: 'Git & branching', level: 'proficient', highlight: true },
      { name: 'Deployment automation', level: 'proficient', highlight: true },
      { name: 'Containerization', level: 'proficient' },
      { name: 'SAP BTP', level: 'familiar' },
      { name: 'Cloud Foundry', level: 'familiar' },
      { name: 'Cloud deployment fundamentals', level: 'proficient' },
      { name: 'SFTP workflows', level: 'proficient' },
    ],
  },
  {
    id: 'ai',
    label: 'GenAI & Agentic AI',
    icon: 'Cpu',
    color: 'emerald',
    skills: [
      { name: 'Gemini API', level: 'proficient', highlight: true },
      { name: 'OpenAI API', level: 'proficient', highlight: true },
      { name: 'LangChain', level: 'proficient', highlight: true },
      { name: 'LangGraph', level: 'proficient', highlight: true },
      { name: 'RAG', level: 'proficient', highlight: true },
      { name: 'LLM Integration', level: 'proficient', highlight: true },
      { name: 'Prompt Engineering', level: 'proficient', highlight: true },
      { name: 'ChromaDB', level: 'familiar' },
      { name: 'Workflow Automation', level: 'proficient', highlight: true },
      { name: 'LLM application development', level: 'proficient' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend Development',
    icon: 'Monitor',
    color: 'cyan',
    skills: [
      { name: 'React.js', level: 'proficient', highlight: true },
      { name: 'TypeScript', level: 'proficient', highlight: true },
      { name: 'JavaScript', level: 'proficient' },
      { name: 'Vite', level: 'proficient', highlight: true },
      { name: 'Tailwind CSS', level: 'proficient', highlight: true },
      { name: 'HTML5 & CSS3', level: 'proficient' },
      { name: 'React Data Grid', level: 'proficient', highlight: true },
      { name: 'ApexCharts', level: 'proficient' },
    ],
  },
  {
    id: 'systems',
    label: 'Systems & Infrastructure',
    icon: 'Server',
    color: 'emerald',
    skills: [
      { name: 'Linux', level: 'proficient', highlight: true },
      { name: 'Shell scripting', level: 'proficient', highlight: true },
      { name: 'Operating systems', level: 'proficient' },
      { name: 'Networking fundamentals', level: 'proficient' },
      { name: 'Production troubleshooting', level: 'proficient', highlight: true },
    ],
  },
  {
    id: 'practices',
    label: 'Engineering Practices & Support',
    icon: 'GitMerge',
    color: 'cyan',
    skills: [
      { name: 'Automated testing', level: 'proficient', highlight: true },
      { name: 'Production support (L2/L3)', level: 'proficient', highlight: true },
      { name: 'Root-cause analysis', level: 'proficient', highlight: true },
      { name: 'Incident investigation', level: 'proficient', highlight: true },
      { name: 'Code review', level: 'proficient', highlight: true },
      { name: 'Secure coding', level: 'proficient' },
      { name: 'Documentation', level: 'proficient' },
      { name: 'Defect resolution', level: 'proficient' },
      { name: 'Source control', level: 'proficient' },
    ],
  },
];
