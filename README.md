# Devang Chaudhari — Software Engineer Portfolio

> **Production-grade personal portfolio website for Devang Chaudhari**, Software Engineer based in Pune, India.  
> Specializing in **Backend Systems, Enterprise Integrations, Data Engineering, and AI Automation**.

![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38b2ac?logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.21-lightgrey?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2d3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)

---

## 1. Architectural Highlights

- **Frontend**: Single Page Application built with React 18, Vite, TypeScript, and Tailwind CSS. Featuring dark-first visual design, refined charcoal theme with subtle emerald/cyan glow, Framer Motion transitions, responsive mobile-first layout, and persistent theme switching.
- **Backend**: Scalable Node.js & Express REST API with TypeScript, Zod schema validation, Helmet security headers, CORS protection, Winston structured logging, and dual-layer rate limiting.
- **Data Persistence**: Production-ready PostgreSQL schema with Prisma ORM migrations and automated seed script.
- **Communication Engine**: Contact form with honeypot bot trap, client & server-side validation, Nodemailer email delivery (supporting SMTP / Resend), and fallback local simulation logger when external SMTP credentials are not configured.
- **Engineering Lab**: Three self-contained interactive demonstrations:
  1. *API Integration Explorer*: Live parameter tuning, mock response viewer, and OAuth 2.0 error handling.
  2. *Data Pipeline Visualizer*: Multi-stage transaction lifecycle (Ingestion → Validation → Transformation → Warehouse Load).
  3. *AI Job Matching Lab*: Keyword and LLM matching engine with tailored recruiter outreach generator.
- **Featured Systems**:
  - *Enterprise Data Integration Platform*: Interactive 7-stage architecture topology diagram.
  - *End-to-End Inventory Management System*: Live table filter, SKU search, role simulation, and stock adjustment modal.
  - *JobAutoPilot*: Application status pipeline tracker and customizable outreach generator.
  - *AuditIQ*: Fictional expense compliance auditor with duplicate detection heuristics and natural-language AI risk reasoning.

---

## 2. Directory Structure

```text
├── client/                     # Frontend React + Vite application
│   ├── public/                 # Static assets (favicons, PDF resume, sitemap, robots.txt)
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # Navbar, Footer
│   │   │   ├── sections/       # Hero, Experience, Skills, Projects, Lab, Impact, Education, About, Contact
│   │   │   │   └── demos/      # ApiExplorer, PipelineVisualizer, AiJobMatcher
│   │   │   └── demos/          # ArchitectureDiagram, InventoryDemo, JobAutoPilotDemo, AuditIQDemo
│   │   ├── data/               # Structured data sources (config, experience, skills, projects, education)
│   │   ├── hooks/              # useTheme, useInView, useActiveSection
│   │   ├── pages/              # HomePage, ProjectDetail, AllProjects, NotFound
│   │   ├── styles/             # Tailwind CSS & design system tokens
│   │   └── types/              # TypeScript definitions
│   └── vite.config.ts
├── server/                     # Backend Express REST API
│   ├── src/
│   │   ├── config/             # Zod environment validation, Winston logger
│   │   ├── middleware/         # Centralized error handler
│   │   ├── routes/             # Health, Contact, Data endpoints
│   │   ├── schemas/            # Zod validation schemas
│   │   ├── services/           # Nodemailer email service
│   │   └── index.ts            # Express server initialization
│   └── tsconfig.json
├── prisma/                     # Database schemas & seed scripts
│   ├── schema.prisma           # ContactMessage, Project, Experience models
│   └── seed.ts                 # Database seeder
├── tests/                      # Frontend and backend test suites
│   ├── frontend/               # Vitest component tests
│   └── backend/                # Supertest API endpoint tests
├── .github/workflows/ci.yml    # GitHub Actions automated build validation
├── docker-compose.yml          # Container configuration (PostgreSQL + Server + Client)
├── .env.example                # Sample environment variables
└── README.md
```

---

## 3. Local Development Quickstart

### Prerequisites

- **Node.js** v18+ (v20+ recommended)
- **npm** or **pnpm**
- *(Optional)* **Docker & Docker Compose** for running PostgreSQL container

### Step 1: Clone and Configure Environment

```bash
# Clone the repository
git clone <repository-url>
cd "Protfolio Website"

# Copy environment variables
cp .env.example .env
```

### Step 2: Install Dependencies

```bash
# Install root, client, and server dependencies
cd client && npm install
cd ../server && npm install
cd ..
```

### Step 3: Run the Development Servers

In terminal 1 (Backend API):
```bash
npm run dev:server
# Server will listen on http://localhost:4000
```

In terminal 2 (Frontend Client):
```bash
npm run dev:client
# Frontend will open at http://localhost:3000
```

Visit **http://localhost:3000** in your browser.

---

## 4. Database Setup & Prisma ORM

If you wish to use persistent PostgreSQL storage:

1. Start PostgreSQL with Docker:
   ```bash
   docker compose up -d postgres
   ```
2. Run Prisma migrations:
   ```bash
   npm run prisma:migrate
   ```
3. Seed the database:
   ```bash
   npm run prisma:seed
   ```

*Note: The frontend operates seamlessly even without a database running by consuming structured data from `client/src/data/` or backend fallback routes.*

---

## 5. Contact Form & Email Delivery

The backend contact form route (`POST /api/contact`) includes:
- **Spam Protection**: Invisible honeypot field (`website`) silently traps automated bots.
- **Rate Limiting**: Strictly limited to 6 submissions per hour per IP.
- **Configurable Delivery**:
  - When `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS` are provided in `.env`, emails are dispatched via your provider (e.g. Resend, SendGrid, Gmail SMTP).
  - When SMTP credentials are omitted, the service runs in **Safe Local Simulation Mode** (`simulated_local`), logging payloads safely to the Winston console without throwing unhandled exceptions.

---

## 6. Testing

Run backend endpoint tests:
```bash
npm run test:server
```

Run frontend UI component tests:
```bash
npm run test:client
```

---

## 7. Production Docker Deployment

Deploy the entire stack with a single command:

```bash
docker compose up -d --build
```

This starts:
1. `portfolio-postgres` on port `5432`
2. `portfolio-server` on port `4000`
3. `portfolio-client` (Nginx reverse-proxy) on port `3000`

---

## 8. Customizing Portfolio Content

All personal content is decoupled from UI presentation. To modify your portfolio, edit the following files:

| Item | File Path | Description |
| :--- | :--- | :--- |
| **Site Config** | `client/src/data/config.ts` | Name, title, social links, email, resume file path |
| **Experience** | `client/src/data/experience.ts` | Roles at Jade Global, metrics, tech stacks |
| **Skills** | `client/src/data/skills.ts` | Categorized technical competencies |
| **Projects** | `client/src/data/projects.ts` | Case studies, problem/solution statements, demo mappings |
| **Resume PDF** | `client/public/resume-devang-chaudhari.pdf` | The static file downloaded when clicking "Resume" |

---

## 9. License & Attribution

Designed and engineered by **Devang Chaudhari**.  
Licensed under the [MIT License](LICENSE).
