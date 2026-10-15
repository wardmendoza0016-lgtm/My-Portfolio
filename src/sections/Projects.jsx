import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Github,
  MapPin,
  Shield,
  Star,
  Workflow,
} from 'lucide-react';
import anime from 'animejs';
import ProjectDetailsModal from '../components/projects/ProjectDetailsModal';

// Keep project content here, in line with the current portfolio architecture.
// Screenshots are optional. Add files to public/projects/<slug>/ and use root-relative paths.
const projects = [
  {
    id: 1,
    slug: 'cybereum',
    title: 'Cybereum',
    subtitle: 'Capstone Thesis · 2024–2025',
    description:
      'A gamified K-12 cybersecurity education platform. Students earn badges, climb leaderboards, and master digital-safety concepts through interactive lessons — making security education something kids actually enjoy.',
    longDesc:
      'Built with React + Supabase. Features role-based auth, real-time leaderboards, teacher dashboards, and an XP system that tracks mastery across 12 learning modules.',
    features: [
      'Interactive cybersecurity learning modules',
      'Badges, XP rewards, and mastery tracking',
      'Real-time student leaderboards',
      'Role-based access and teacher dashboards',
    ],
    tech: ['React', 'Supabase', 'Gamification', 'Edu-Tech'],
    icon: Shield,
    accent: '#6b8e23',
    accentMuted: 'rgba(107,142,35,0.08)',
    accentBorder: 'rgba(107,142,35,0.35)',
    featured: true,
    stat: { value: '12', label: 'modules' },
    screenshots: [
                  {
                src: '/projects/cybereum/Home_Cybereum.jpg',
                alt: 'Cybereum Dashboard',
                caption: 'Home Dashboard',
              }
            ],
    githubUrl: null, // Replace with an actual repository URL when public.
    liveUrl: null, // Replace with an actual live demo URL when available.
  },
  {
    id: 2,
    slug: 'dlsud-go',
    title: 'DLSUD — GO',
    subtitle: 'Campus Navigation App',
    description:
      'Mobile wayfinding app for De La Salle University–Dasmariñas. Real-time indoor/outdoor navigation, event updates, and facility search — all in one pocket-sized campus companion.',
    longDesc:
      'Built with Flutter & Dart. Integrates Google Maps SDK with custom campus overlays, deep-linked QR entry points, and a live events feed.',
    features: [
      'Campus building and facility search',
      'Indoor and outdoor navigation',
      'Google Maps with custom campus overlays',
      'QR deep links and event updates',
    ],
    tech: ['Flutter', 'Dart', 'Maps API', 'Mobile'],
    icon: MapPin,
    accent: '#3b82f6',
    accentMuted: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.30)',
    featured: false,
    stat: { value: '40+', label: 'buildings' },
    screenshots: [],
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: 3,
    slug: 'activity-tracker',
    title: 'Activity Tracker',
    subtitle: 'Full-Stack Fitness App',
    description:
      'Log walks, track calories, and visualise macro breakdowns — all in one clean dashboard built on React and Supabase with real-time sync across devices.',
    longDesc:
      'Row-level security via Supabase Auth. Recharts for daily/weekly analytics. PWA-ready with offline caching for activity logs.',
    features: [
      'Activity and walking logs',
      'Calorie and macronutrient visualizations',
      'Daily and weekly analytics powered by Recharts',
      'Supabase authentication and row-level security',
      'PWA-ready offline caching for activity logs',
    ],
    tech: ['React', 'Supabase', 'Recharts', 'Full-Stack'],
    icon: Activity,
    accent: '#f59e0b',
    accentMuted: 'rgba(245,158,11,0.08)',
    accentBorder: 'rgba(245,158,11,0.30)',
    featured: false,
    stat: { value: '∞', label: 'logs' },
    screenshots: [],
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: 4,
    slug: 'automation-agent',
    title: 'Business Automation Agent',
    subtitle: 'n8n Workflow System',
    description:
      'Multi-step n8n workflow that automates e-commerce operations end-to-end — order routing, inventory alerts, customer notifications, and data sync between platforms.',
    longDesc:
      'Webhook-driven triggers with conditional branching, error-handling loops, and Slack/email notification nodes. Saves ~6 hrs of manual work per week.',
    features: [
      'Automated order routing and inventory alerts',
      'Customer notifications and cross-platform data sync',
      'Webhook triggers with conditional branching',
      'Error-handling workflows and Slack/email alerts',
    ],
    tech: ['n8n', 'Webhooks', 'Automation', 'E-commerce'],
    icon: Workflow,
    accent: '#a855f7',
    accentMuted: 'rgba(168,85,247,0.08)',
    accentBorder: 'rgba(168,85,247,0.30)',
    featured: false,
    stat: { value: '6h', label: 'saved/wk' },
    screenshots: [],
    githubUrl: null,
    liveUrl: null,
  },
];

const isRealUrl = (url) => typeof url === 'string' && /^https?:\/\//i.test(url);

function GlitchText({ text, visible, delay = 0 }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!visible) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+<>_';
    const value = { progress: 0 };
    anime({
      targets: value,
      progress: 100,
      duration: 1200,
      delay,
      easing: 'linear',
      update: (animation) => {
        const locked = Math.floor((animation.progress / 100) * text.length);
        setDisplayText(
          text.split('').map((character, index) => {
            if (index < locked || character === ' ') return character;
            return chars[Math.floor(Math.random() * chars.length)];
          }).join(''),
        );
      },
      complete: () => setDisplayText(text),
    });
    return () => anime.remove(value);
  }, [visible, text, delay]);

  return (
    <>
      <span aria-hidden="true">{displayText}</span>
      <span className="sr-only">{text}</span>
    </>
  );
}

function FeaturedCard({ project, visible, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const Icon = project.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl"
      style={{
        background: '#111111',
        border: `1px solid ${hovered ? project.accentBorder : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.4s ease',
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px] transition-opacity duration-500"
        style={{ background: project.accent, opacity: hovered ? 1 : 0.4 }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-all duration-700 group-hover:opacity-100"
        style={{
          background: `linear-gradient(105deg, transparent 30%, ${project.accentMuted} 31%, ${project.accentMuted} 69%, transparent 70%)`,
          transform: hovered ? 'translateX(0) scale(1.5)' : 'translateX(-100%) scale(1.5)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${project.accent}18 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative z-10 flex h-full min-h-[420px] flex-col p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300"
              style={{
                background: project.accentMuted,
                border: `1px solid ${project.accentBorder}`,
                transform: hovered ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <Icon size={20} style={{ color: project.accent }} aria-hidden="true" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: project.accent }}>
                Featured
              </span>
              <div className="flex items-center gap-1.5">
                <Star size={10} style={{ color: project.accent, fill: project.accent }} aria-hidden="true" />
                <span className="text-[10px] tracking-wider text-white/30">thesis project</span>
              </div>
            </div>
          </div>

          {isRealUrl(project.githubUrl) && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
            >
              <Github size={16} aria-hidden="true" />
            </a>
          )}
        </div>

        <div
          className="mb-5 self-start rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
          style={{ background: project.accentMuted, color: project.accent, border: `1px solid ${project.accentBorder}` }}
        >
          {project.stat.value} {project.stat.label}
        </div>
        <h3 className="mb-3 text-4xl font-bold leading-none tracking-tight text-white">
          <GlitchText text={project.title} visible={visible} delay={300} />
        </h3>
        <p className="mb-5 text-sm uppercase tracking-[0.1em] text-white/30">{project.subtitle}</p>
        <p className="mb-6 flex-grow font-light leading-relaxed text-gray-400">{project.description}</p>

        {/* Retain hover-preview, but don't make it the only way to access details. */}
        <div
          aria-hidden="true"
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{ maxHeight: hovered ? '105px' : '0px', opacity: hovered ? 1 : 0 }}
        >
          <p className="mb-5 font-mono text-xs leading-relaxed text-white/35">{project.longDesc}</p>
        </div>

        <div className="mb-7 flex flex-wrap gap-2">
          {project.tech.map((technology) => (
            <span
              key={technology}
              className="rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300"
              style={{
                color: hovered ? project.accent : 'rgba(255,255,255,0.35)',
                background: hovered ? project.accentMuted : 'rgba(255,255,255,0.04)',
                border: `1px solid ${hovered ? project.accentBorder : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {technology}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ borderColor: project.accentBorder, color: project.accent, background: project.accentMuted }}
          aria-label={`Explore ${project.title} case study`}
        >
          Explore case study <ArrowUpRight size={17} aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  );
}

function SmallCard({ project, index, visible, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const Icon = project.icon;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: 30 }}
      animate={visible ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      aria-label={`Explore ${project.title} project details`}
      className="group relative w-full flex-1 cursor-pointer overflow-hidden rounded-xl text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      style={{
        background: '#111111',
        border: `1px solid ${hovered ? project.accentBorder : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.35s ease',
      }}
    >
      <div
        className="absolute inset-y-0 left-0 w-[2px] transition-opacity duration-300"
        style={{ background: project.accent, opacity: hovered ? 1 : 0.3 }}
      />
      <span className="relative z-10 flex h-full items-center gap-4 p-5">
        <span
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300"
          style={{
            background: hovered ? project.accentMuted : 'rgba(255,255,255,0.04)',
            border: `1px solid ${hovered ? project.accentBorder : 'rgba(255,255,255,0.07)'}`,
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        >
          <Icon size={17} style={{ color: hovered ? project.accent : 'rgba(255,255,255,0.35)' }} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="mb-0.5 flex flex-wrap items-center gap-2">
            <span className="min-w-0 truncate text-sm font-bold text-white/80">
              <GlitchText text={project.title} visible={visible} delay={400 + index * 100} />
            </span>
            <span
              className="flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold"
              style={{ background: project.accentMuted, color: project.accent, border: `1px solid ${project.accentBorder}` }}
            >
              {project.stat.value} {project.stat.label}
            </span>
          </span>
          <span className="mb-2 block truncate text-[11px] text-white/30">{project.subtitle}</span>
          <span className="line-clamp-2 text-xs font-light leading-snug text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
            {project.description}
          </span>
        </span>
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: hovered ? project.accent : 'rgba(255,255,255,0.12)' }}
        />
      </span>
    </motion.button>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const featured = projects.find((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return undefined;

    const items = header.querySelectorAll('.anim-item');
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        items.forEach((item) => { item.style.opacity = '1'; });
      } else {
        anime({
          targets: items,
          opacity: [0, 1],
          translateY: [20, 0],
          delay: anime.stagger(80),
          duration: 700,
          easing: 'easeOutExpo',
        });
      }
      observer.unobserve(section);
    }, { threshold: 0.1 });

    observer.observe(section);
    return () => {
      observer.disconnect();
      anime.remove(items);
    };
  }, []);

  const openProject = (project) => setSelectedProject(project);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <section id="projects" ref={sectionRef} className="relative overflow-hidden bg-[#0a0a0a] px-6 py-28 lg:px-12">
        <div className="pointer-events-none absolute left-[10%] top-1/3 h-[35%] w-[35%] rounded-full bg-[#6b8e23]/[0.04] blur-[100px]" />
        <div className="pointer-events-none absolute bottom-1/4 right-[5%] h-[25%] w-[25%] rounded-full bg-[#3b82f6]/[0.04] blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div ref={headerRef} className="mb-16">
            <div className="anim-item mb-4 flex items-center gap-3 opacity-0">
              <div className="h-[2px] w-8 bg-[#6b8e23]" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#6b8e23]">Selected Work</span>
            </div>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="anim-item text-5xl font-bold leading-none tracking-tight text-white opacity-0 md:text-7xl">
                Things I've<br />
                <span className="bg-gradient-to-r from-white to-gray-600 bg-clip-text text-transparent">
                  <GlitchText text="Shipped." visible={visible} delay={500} />
                </span>
              </h2>
              <p className="anim-item max-w-xs text-sm leading-relaxed text-gray-500 opacity-0">
                A mix of thesis work, client projects, and side builds — each solving a real problem.
              </p>
            </div>

            <div className="anim-item mt-10 flex max-w-full items-center gap-0 overflow-x-auto opacity-0">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  aria-label={`Open ${project.title} details`}
                  onClick={() => openProject(project)}
                  className="group flex flex-shrink-0 items-center gap-3 border-t px-4 py-3 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-white sm:px-5"
                  style={{
                    borderColor: hoverIdx === index ? project.accent : 'rgba(255,255,255,0.07)',
                    color: hoverIdx === index ? project.accent : 'rgba(255,255,255,0.4)',
                  }}
                  onMouseEnter={() => setHoverIdx(index)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  <span className="font-mono text-[10px]">0{index + 1}</span>
                  <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-wider">{project.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1fr_420px]">
            {featured && (
              <FeaturedCard project={featured} visible={visible} onOpen={() => openProject(featured)} />
            )}
            <div className="flex flex-col gap-4">
              {rest.map((project, index) => (
                <SmallCard
                  key={project.id}
                  project={project}
                  index={index}
                  visible={visible}
                  onOpen={() => openProject(project)}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : undefined}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10 flex items-center justify-between"
          >
            <span className="font-mono text-[11px] tracking-wider text-white/30">
              {projects.length} projects · select a card to explore
            </span>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            key={selectedProject.slug}
            project={selectedProject}
            onClose={closeProject}
          />
        )}
      </AnimatePresence>
    </>
  );
}
