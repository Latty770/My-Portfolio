import { useEffect, useState } from 'react';
import { getPortfolio } from './api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const fallback = {
  profile: {
    name: 'Reagan Munene',
    fullName: 'Reagan Munene Mwiti',
    title: 'Full-Stack Engineer, Product Manager & Founder',
    tagline: 'I build software people actually run their businesses on.',
    location: 'Kenya',
    phone: '+254 794 355 647',
    email: 'reaganmunene483@gmail.com',
    github: 'https://github.com/Latty770',
    linkedin: 'https://www.linkedin.com/in/reagan-munene',
    company: 'ZERION TECH SYSTEMS',
    companyRole: 'Proprietor · Full-Stack Software Engineer · Product Manager',
    companyUrl: 'https://zerion-website-frontend.vercel.app/',
    about: [
      'Fourth-year Business Information Technology student at Kabarak University, and founder of ZERION TECH SYSTEMS.',
      'I work end to end across React, React Native, Node.js, Express, NestJS, and Supabase — with recent work at Signvrse Ltd and shipping Zerion products into daily use.',
    ],
  },
  skills: [],
  experience: [],
  education: [],
  projects: [],
};

export default function App() {
  const [portfolio, setPortfolio] = useState(fallback);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    getPortfolio()
      .then(setPortfolio)
      .catch(() => setPortfolio(fallback));
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('.timeline-item, .project-row, .shot-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [portfolio]);

  return (
    <>
      <Navbar scrolled={scrolled} profile={portfolio.profile} />
      <main>
        <Hero profile={portfolio.profile} />
        <About profile={portfolio.profile} />
        <Experience experience={portfolio.experience} />
        <Projects projects={portfolio.projects} companyUrl={portfolio.profile?.companyUrl} />
        <Skills skills={portfolio.skills} />
        <Contact profile={portfolio.profile} />
      </main>
      <Footer profile={portfolio.profile} />
    </>
  );
}
