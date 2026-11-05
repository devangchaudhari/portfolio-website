import { Router, Request, Response } from 'express';

export const dataRouter = Router();

const PROFILE_DATA = {
  name: 'Devang Chaudhari',
  title: 'Software Engineer',
  tagline: 'Software Engineer | Software Developer | Python Developer | Backend Systems | Data Engineering | AI Automation',
  location: 'Pune, India',
  email: 'devangchaudhari2003@gmail.com',
  phone: '+91 9405193251',
  summary:
    'Software Engineer with 2.5+ years of experience building and operating Python services, REST API integrations, connectors, and automation for enterprise data exchange and data pipelines. Strong working SQL (Snowflake, dbt, MySQL), source control, CI/CD, code review, and secure coding (OAuth 2.0, JWT, RBAC).',
  education: {
    institution: 'G H Raisoni College of Engineering & Management',
    degree: 'B.Tech in Computer Engineering – Honors in Data Science',
    cgpa: '9.04/10',
    years: '2021 – 2025',
  },
  awards: [
    { title: 'Jade Steadfast Award', period: 'Q4 FY26', description: 'Recognized for delivery quality, ownership, and client impact by Jade Global.' },
    { title: 'Smart India Hackathon Finalist', period: 'Oct 2023', description: 'Shortlisted from 10,000+ teams nationally in national engineering competition.' },
  ],
};

const EXPERIENCES = [
  {
    company: 'Jade Global Software Pvt. Ltd.',
    role: 'Associate Software Developer',
    type: 'Full-Time',
    period: 'Aug 2025 – Present',
    location: 'Pune, India',
    metrics: [
      { label: '30%', metric: 'Snowflake query execution time reduction' },
      { label: '40%', metric: 'Monthly reporting turnaround reduction' },
      { label: '35%', metric: 'Deployment failures reduction' },
    ],
    tech: [
      'Python', 'REST APIs', 'OAuth 2.0', 'Snowflake', 'dbt', 'SQL',
      'Azure DevOps', 'SFTP', 'Automated Testing', 'FastAPI', 'API Connectors',
      'Extract APIs', 'Pydantic', 'Git', 'CI/CD', 'L2/L3 Support', 'Root-Cause Analysis',
      'JSON', 'XML', 'Postman',
    ],
  },
  {
    company: 'Jade Global Software Pvt. Ltd.',
    role: 'Software Developer Intern',
    type: 'Internship',
    period: 'Aug 2024 – Jul 2025',
    location: 'Pune, India',
    highlights: [
      'Designed modular Python REST APIs with JWT authentication and role-based access control (RBAC)',
      'Developed an Inventory Management System using React.js, Python Flask, and MySQL with approval workflows',
      'Assisted with SAP Expense REST API integrations, Python and SQL data validation, and troubleshooting',
      'Supported configuration, issue analysis, and deployment activities',
    ],
    tech: [
      'Python', 'FastAPI', 'Flask', 'React', 'Vite', 'MySQL',
      'JWT', 'RBAC', 'REST APIs', 'TypeScript', 'Tailwind CSS',
      'React Data Grid', 'ApexCharts', 'SAP Expense REST API', 'Postman', 'SQL',
    ],
  },
];

const PROJECTS = [
  {
    slug: 'enterprise-data-integration',
    title: 'Enterprise Data Integration and Workflow Automation Platform',
    category: 'Data Engineering',
    period: 'Aug 2025 – Present',
    techStack: ['Python', 'SQL', 'Snowflake', 'dbt', 'Azure Logic Apps', 'REST APIs', 'SFTP', 'Azure DevOps'],
    metrics: ['30% query time reduction', '40% reporting turnaround reduction', '35% fewer deployment failures'],
  },
  {
    slug: 'inventory-management-system',
    title: 'End-to-End Inventory Management System',
    category: 'Full-Stack',
    period: 'Mar 2025 – Apr 2025',
    techStack: ['React.js', 'FastAPI', 'Python', 'MySQL', 'Tailwind CSS', 'React Data Grid', 'ApexCharts', 'JWT', 'RBAC'],
  },
  {
    slug: 'jobautopilot',
    title: 'JobAutoPilot – AI-Powered Job Application Automation Platform',
    category: 'AI / Full-Stack',
    period: 'Personal Project',
    techStack: ['React.js', 'Node.js', 'Express.js', 'SQLite', 'REST APIs', 'LLM APIs', 'Apify', 'Nodemailer'],
  },
  {
    slug: 'auditiq',
    title: 'AuditIQ — AI Expense Risk Intelligence',
    category: 'AI / FinTech',
    techStack: ['React', 'TypeScript', 'Python', 'FastAPI', 'Gemini API', 'Tailwind CSS', 'SAP Expense APIs'],
  },
];

dataRouter.get('/profile', (_req: Request, res: Response) => {
  res.json({ success: true, data: PROFILE_DATA });
});

dataRouter.get('/experience', (_req: Request, res: Response) => {
  res.json({ success: true, data: EXPERIENCES });
});

dataRouter.get('/projects', (_req: Request, res: Response) => {
  res.json({ success: true, data: PROJECTS });
});

dataRouter.get('/projects/:slug', (req: Request, res: Response) => {
  const project = PROJECTS.find(p => p.slug === req.params.slug);
  if (!project) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }
  return res.json({ success: true, data: project });
});
