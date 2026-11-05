import { lazy, Suspense } from 'react';
import { Hero } from '../components/sections/Hero';

// Lazy load below-fold sections
const Experience = lazy(() => import('../components/sections/Experience').then(m => ({ default: m.Experience })));
const Skills = lazy(() => import('../components/sections/Skills').then(m => ({ default: m.Skills })));
const Projects = lazy(() => import('../components/sections/Projects').then(m => ({ default: m.Projects })));
const EngineeringLab = lazy(() => import('../components/sections/EngineeringLab').then(m => ({ default: m.EngineeringLab })));
const Impact = lazy(() => import('../components/sections/Impact').then(m => ({ default: m.Impact })));
const Education = lazy(() => import('../components/sections/Education').then(m => ({ default: m.Education })));
const About = lazy(() => import('../components/sections/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('../components/sections/Contact').then(m => ({ default: m.Contact })));

function SectionLoader() {
  return (
    <div className="section-padding flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-emerald-500/40 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <EngineeringLab />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Impact />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Education />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </>
  );
}
