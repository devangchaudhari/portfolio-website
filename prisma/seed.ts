import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding portfolio database...');

  // Seed Experiences
  await prisma.experience.deleteMany({});
  await prisma.experience.create({
    data: {
      company: 'Jade Global Software Pvt. Ltd.',
      companyUrl: 'https://jadeglobal.com',
      role: 'Associate Software Developer / Associate Developer',
      type: 'full-time',
      startDate: 'August 2025',
      endDate: 'Present',
      location: 'Pune, India',
      summary:
        'Building and maintaining Python services, REST API integrations, and automation solutions for enterprise data exchange systems processing thousands of daily transactions.',
      highlights: [
        'Build and maintain Python services, REST API integrations, and automation for enterprise data exchange.',
        'Support production systems processing thousands of daily transactions across enterprise clients.',
        'Develop authenticated integrations using OAuth 2.0 and external enterprise APIs.',
        'Automate financial reporting and data processing workflows.',
        'Optimize Snowflake SQL queries and dbt models (30% reduction in query execution time).',
        'Support Azure DevOps CI/CD pipelines, code reviews, and deployment automation (35% reduction in deployment failures).',
      ],
      tech: ['Python', 'FastAPI', 'Snowflake', 'dbt', 'SQL', 'OAuth 2.0', 'Azure DevOps', 'SFTP'],
      displayOrder: 1,
    },
  });

  await prisma.experience.create({
    data: {
      company: 'Jade Global Software Pvt. Ltd.',
      companyUrl: 'https://jadeglobal.com',
      role: 'Software Developer Intern',
      type: 'internship',
      startDate: 'August 2024',
      endDate: 'July 2025',
      location: 'Pune, India',
      summary:
        'Built full-stack Inventory Management System, developed Python REST APIs, and implemented JWT authentication and role-based access control.',
      highlights: [
        'Developed Python REST APIs using FastAPI for enterprise services.',
        'Implemented JWT authentication and role-based access control (RBAC).',
        'Built full-stack Inventory Management System with React, Python, and MySQL.',
      ],
      tech: ['Python', 'FastAPI', 'React', 'Vite', 'MySQL', 'JWT', 'RBAC', 'TypeScript'],
      displayOrder: 2,
    },
  });

  // Seed Projects
  await prisma.project.deleteMany({});
  await prisma.project.create({
    data: {
      slug: 'enterprise-data-integration',
      title: 'Enterprise Data Integration & Workflow Automation Platform',
      shortDescription:
        'End-to-end system enabling enterprise applications to reliably exchange data via APIs, Python processing, SQL transformations, and secure SFTP workflows.',
      problem:
        'Enterprise clients required reliable, secure, and auditable data exchange between disparate ERP, financial, and third-party systems.',
      solution:
        'Built a multi-stage data integration platform handling authentication, ingestion, validation, transformation, and delivery.',
      contribution:
        'Designed and implemented ingestion and transformation pipeline, Snowflake dbt models, and automated validation tests.',
      category: 'Data Engineering',
      techStack: ['Python', 'FastAPI', 'Snowflake', 'dbt', 'SQL', 'OAuth 2.0', 'SFTP', 'Azure DevOps'],
      highlights: [
        'Multi-stage pipeline: ingestion → validation → transformation → delivery',
        'OAuth 2.0 authenticated API integrations with external enterprise systems',
        'dbt models for Snowflake SQL transformations with lineage tracking',
      ],
      results: [
        '30% reduction in Snowflake query execution time',
        '40% reduction in monthly reporting turnaround',
        '35% reduction in deployment failures',
      ],
      demoType: 'architecture',
      featured: true,
      displayOrder: 1,
    },
  });

  console.log('Seeding completed successfully.');
}

main()
  .catch(e => {
    console.error('Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
