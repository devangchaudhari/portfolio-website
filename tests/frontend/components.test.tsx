import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Hero } from '../../client/src/components/sections/Hero';
import { Experience } from '../../client/src/components/sections/Experience';
import { Skills } from '../../client/src/components/sections/Skills';

describe('Frontend Sections Unit Tests', () => {
  it('renders Hero headline, name, and positioning correctly', () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );

    expect(screen.getByText(/Devang Chaudhari/i)).toBeInTheDocument();
    expect(screen.getByText(/I build reliable software/i)).toBeInTheDocument();
    expect(screen.getByText(/Pune, India/i)).toBeInTheDocument();
  });

  it('renders Experience entries with verified Jade Global achievements', () => {
    render(<Experience />);

    expect(screen.getByText(/Jade Global Software Pvt. Ltd./i)).toBeInTheDocument();
    expect(screen.getByText(/Associate Software Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/30%/i)).toBeInTheDocument();
    expect(screen.getByText(/40%/i)).toBeInTheDocument();
  });

  it('renders Skills categories without misleading percentage bars', () => {
    render(<Skills />);

    expect(screen.getByText(/Backend & APIs/i)).toBeInTheDocument();
    expect(screen.getByText(/Data Engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/Python/i)).toBeInTheDocument();
    expect(screen.getByText(/Snowflake/i)).toBeInTheDocument();
  });
});
