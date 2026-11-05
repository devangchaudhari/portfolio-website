// ─── Professional Experience Data ────────────────────────────────────────────

export interface ExperienceItem {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  type: 'full-time' | 'internship' | 'contract' | 'freelance';
  startDate: string;
  endDate: string | 'Present';
  location: string;
  summary: string;
  highlights: string[];
  metrics?: { label: string; value: string; description: string }[];
  tech: string[];
  logo?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: 'jade-global-sde',
    company: 'Jade Global Software Pvt. Ltd.',
    companyUrl: 'https://jadeglobal.com',
    role: 'Associate Software Developer',
    type: 'full-time',
    startDate: 'Aug 2025',
    endDate: 'Present',
    location: 'Pune, India',
    summary:
      'Building, testing, and operating Python services, REST API integrations, and automation for secure enterprise data exchange between business applications and downstream systems for a US-based retail client, supporting production systems processing thousands of daily transactions.',
    highlights: [
      'Build, test, and operate Python services, REST API integrations, and automation for secure enterprise data exchange between business applications and downstream systems for a US-based retail client, supporting production systems processing thousands of daily transactions.',
      'Develop REST API connectors using OAuth 2.0 and Extract APIs to exchange data with external platforms and automate downstream financial reporting workflows.',
      'Replaced manual reporting steps with Python and SQL workflows for data extraction, transformation, validation, reconciliation, and scheduled delivery, reducing monthly reporting turnaround time by 40%.',
      'Optimize Snowflake SQL queries and dbt models for data pipelines, reducing query execution time by 30%.',
      'Manage Azure DevOps CI/CD pipelines, Git branching, pull request code reviews, and deployment automation, contributing to a 35% reduction in deployment failures through improved release processes.',
      'Join production support: investigate application and integration failures, perform L2/L3 troubleshooting and root-cause analysis, fix defects, monitor workflows, and validate data consistency across systems.',
      'Collaborate with development and business teams to break down work, provide input on design, feasibility, and risk, and document solutions.',
      'Build and maintain SFTP-based file exchange workflows to securely receive and deliver data files between the client’s systems and external partners, including file validation and failure handling.',
      'Write automated tests for Python integration and data-validation logic to catch defects before release and improve deployment reliability.',
    ],
    metrics: [
      {
        label: '30%',
        value: 'Snowflake query time reduction',
        description: 'Achieved through Snowflake SQL query optimization, indexing strategies, and dbt model restructuring for data pipelines.',
      },
      {
        label: '40%',
        value: 'Monthly reporting turnaround reduction',
        description: 'Replaced manual operational steps with automated Python and SQL extraction, transformation, and reconciliation pipelines.',
      },
      {
        label: '35%',
        value: 'Deployment failure reduction',
        description: 'Managed Azure DevOps CI/CD pipelines, PR code reviews, and enhanced automated validation gates.',
      },
    ],
    tech: [
      'Python', 'REST APIs', 'OAuth 2.0', 'Snowflake', 'dbt', 'SQL',
      'Azure DevOps', 'SFTP', 'Automated Testing', 'FastAPI', 'API Connectors',
      'Extract APIs', 'Pydantic', 'Git', 'CI/CD', 'L2/L3 Support', 'Root-Cause Analysis',
      'JSON', 'XML', 'Postman',
    ],
  },
  {
    id: 'jade-global-intern',
    company: 'Jade Global Software Pvt. Ltd.',
    companyUrl: 'https://jadeglobal.com',
    role: 'Software Developer Intern',
    type: 'internship',
    startDate: 'Aug 2024',
    endDate: 'Jul 2025',
    location: 'Pune, India',
    summary:
      'Designed modular Python REST APIs with JWT authentication and role-based access control (RBAC). Developed an Inventory Management System using React.js, Python Flask, and MySQL with inventory tracking and approval workflows. Assisted with SAP Expense REST API integrations and production troubleshooting.',
    highlights: [
      'Designed modular Python REST APIs with JWT authentication and role-based access control (RBAC) for secure backend operations.',
      'Developed an Inventory Management System using React.js, Python Flask, and MySQL with inventory tracking and approval workflows for Admin, Manager, and User roles.',
      'Assisted with SAP Expense REST API integrations, Python and SQL data validation, and troubleshooting of enterprise integration issues.',
      'Supported configuration, issue analysis, and deployment activities, working with the development team to resolve defects and support delivery.',
      'Built responsive UI components with React.js, Vite, Tailwind CSS, and interactive dashboards.',
    ],
    tech: [
      'Python', 'FastAPI', 'Flask', 'React', 'Vite', 'MySQL',
      'JWT', 'RBAC', 'REST APIs', 'TypeScript', 'Tailwind CSS',
      'React Data Grid', 'ApexCharts', 'SAP Expense REST API', 'Postman', 'SQL',
    ],
  },
];
