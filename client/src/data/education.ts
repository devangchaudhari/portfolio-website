// ─── Education & Certifications ───────────────────────────────────────────────

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  honors?: string;
  cgpa?: string;
  startYear: number;
  endYear: number;
  highlights: string[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: string;
  color: string;
  awardDetails?: string;
}

export const education: Education[] = [
  {
    id: 'gh-raisoni',
    institution: 'G H Raisoni College of Engineering & Management',
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Engineering',
    honors: 'Honors in Data Science',
    cgpa: '9.04/10',
    startYear: 2021,
    endYear: 2025,
    highlights: [
      'Specialized in Data Science, Machine Learning, and Distributed Data Systems',
      'Strong foundation in algorithms, data structures, database design, and software engineering',
      'Smart India Hackathon Finalist (Oct 2023) — shortlisted from 10,000+ teams nationwide',
    ],
  },
];

export const achievements: Achievement[] = [
  {
    id: 'jade-steadfast',
    title: 'Jade Steadfast Award (Q4 FY26)',
    organization: 'Jade Global Software Pvt. Ltd. (Jade Kudos Club)',
    year: 'Q4 FY26',
    description:
      'Recognized for delivery quality, ownership, and client impact in enterprise integration and data automation platforms. Conferred by Pooja Bansal (EVP & Global Head of HR) and Karan Yaramada (CEO, Jade Global).',
    awardDetails: 'Quarterly Performance Recognition — Outstanding performance in enterprise data delivery',
    icon: 'Award',
    color: 'emerald',
  },
  {
    id: 'sih',
    title: 'Smart India Hackathon Finalist (Oct 2023)',
    organization: "Government of India's National Engineering Hackathon",
    year: 'Oct 2023',
    description:
      'Shortlisted from over 10,000+ competing engineering teams nationwide for high-impact software design and technical problem solving.',
    icon: 'Trophy',
    color: 'cyan',
  },
];
