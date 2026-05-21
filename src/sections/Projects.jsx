import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink, Github, Shield, MapPin,
  Activity, Workflow, ArrowUpRight, Star,
} from 'lucide-react';
import anime from 'animejs';

// ─── Data ────────────────────────────────────────────────────────────────────
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
    tech: ['React', 'Supabase', 'Gamification', 'Edu-Tech'],
    icon: Shield,
    accent: '#6b8e23',
    accentMuted: 'rgba(107,142,35,0.08)',
    accentBorder: 'rgba(107,142,35,0.35)',
    featured: true,
    stat: { value: '12', label: 'modules' },
    githubUrl: '#',
    liveUrl: '#',
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
    tech: ['Flutter', 'Dart', 'Maps API', 'Mobile'],
    icon: MapPin,
    accent: '#3b82f6',
    accentMuted: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.30)',
    featured: false,
    stat: { value: '40+', label: 'buildings' },
    githubUrl: '#',
    liveUrl: '#',
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
    tech: ['React', 'Supabase', 'Recharts', 'Full-Stack'],
    icon: Activity,
    accent: '#f59e0b',
    accentMuted: 'rgba(245,158,11,0.08)',
    accentBorder: 'rgba(245,158,11,0.30)',
    featured: false,
    stat: { value: '∞', label: 'logs' },
    githubUrl: '#',
    liveUrl: '#',
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
    tech: ['n8n', 'Webhooks', 'Automation', 'E-commerce'],
    icon: Workflow,
    accent: '#a855f7',
    accentMuted: 'rgba(168,85,247,0.08)',
    accentBorder: 'rgba(168,85,247,0.30)',
    featured: false,
    stat: { value: '6h', label: 'saved/wk' },
    githubUrl: '#',
    liveUrl: '#',
  },
];

// ─── Gamified Glitch Text Component ──────────────────────────────────────────
function GlitchText({ text, visible, delay = 0 }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+<>_';

  useEffect(() => {
    if (!visible) return;

    const animObj = { progress: 0 };
    
    anime({
      targets: animObj,
      progress: 100,
      duration: 1200,
      delay: delay,
      easing: 'linear',
      update: (anim) => {
        // Calculate how many characters should be "locked in" to their true value
        const lockIndex = Math.floor((anim.progress / 100) * text.length);

        const scrambled = text.split('').map((char, index) => {
          if (index < lockIndex) return text[index];
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');

        setDisplayText(scrambled);
      }
    });
  }, [visible, text, delay]);

  return <span>{displayText}</span>;
}

// ─── Featured Card ───────────────────────────────────────────────────────────
function FeaturedCard({ project, visible, onLinkClick }) {
  const [hovered, setHovered] = useState(false);
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: '#111111',
        border: `1px solid ${hovered ? project.accentBorder : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.4s ease',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
        style={{ background: project.accent, opacity: hovered ? 1 : 0.4 }}
      />

      {/* Gamified Hover Slash Background inside the card */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(105deg, transparent 30%, ${project.accentMuted} 31%, ${project.accentMuted} 69%, transparent 70%)`,
          transform: hovered ? 'translateX(0%) scale(1.5)' : 'translateX(-100%) scale(1.5)',
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${project.accent}18 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative z-10 p-8 flex flex-col h-full min-h-[420px]">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300"
              style={{
                background: project.accentMuted,
                border: `1px solid ${project.accentBorder}`,
                transform: hovered ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <Icon size={20} style={{ color: project.accent }} />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: project.accent }}>
                Featured
              </span>
              <div className="flex items-center gap-1.5">
                <Star size={10} style={{ color: project.accent, fill: project.accent }} />
                <span className="text-[10px] text-white/30 tracking-wider">thesis project</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={project.githubUrl}
              onClick={(e) => onLinkClick(e, project.githubUrl, project.accent)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            >
              <Github size={14} />
            </a>
            <a
              href={project.liveUrl}
              onClick={(e) => onLinkClick(e, project.liveUrl, project.accent)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => { e.currentTarget.style.color = project.accent; e.currentTarget.style.background = project.accentMuted; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="self-start mb-5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase"
          style={{ background: project.accentMuted, color: project.accent, border: `1px solid ${project.accentBorder}` }}>
          {project.stat.value} {project.stat.label}
        </div>

        {/* Apply GlitchText to Title */}
        <h3 className="text-4xl font-bold text-white mb-3 tracking-tight leading-none">
          <GlitchText text={project.title} visible={visible} delay={300} />
        </h3>
        
        <p className="text-sm text-white/30 tracking-[0.1em] uppercase mb-5">
          {project.subtitle}
        </p>
        <p className="text-gray-400 leading-relaxed font-light mb-6 flex-grow">
          {project.description}
        </p>

        <div className="overflow-hidden transition-all duration-500 ease-out"
          style={{ maxHeight: hovered ? '80px' : '0px', opacity: hovered ? 1 : 0 }}>
          <p className="text-xs text-white/30 leading-relaxed mb-5 font-mono">
            {project.longDesc}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t) => (
            <span key={t} className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-md transition-colors duration-300"
              style={{
                color: hovered ? project.accent : 'rgba(255,255,255,0.35)',
                background: hovered ? project.accentMuted : 'rgba(255,255,255,0.04)',
                border: `1px solid ${hovered ? project.accentBorder : 'rgba(255,255,255,0.08)'}`,
              }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Small Card ──────────────────────────────────────────────────────────────
function SmallCard({ project, index, visible, onLinkClick }) {
  const [hovered, setHovered] = useState(false);
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => onLinkClick(e, project.liveUrl, project.accent)}
      className="relative rounded-xl overflow-hidden cursor-pointer flex-1 group"
      style={{
        background: '#111111',
        border: `1px solid ${hovered ? project.accentBorder : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.35s ease',
        minHeight: '0',
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[2px] transition-opacity duration-400"
        style={{ background: project.accent, opacity: hovered ? 1 : 0.3 }} />

      <div className="relative z-10 p-5 flex items-center gap-4 h-full">
        <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered ? project.accentMuted : 'rgba(255,255,255,0.04)',
            border: `1px solid ${hovered ? project.accentBorder : 'rgba(255,255,255,0.07)'}`,
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}>
          <Icon size={17} style={{ color: hovered ? project.accent : 'rgba(255,255,255,0.35)' }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="font-bold text-sm truncate transition-colors duration-300"
              style={{ color: hovered ? '#fff' : 'rgba(255,255,255,0.8)' }}>
              {/* Apply GlitchText to Title */}
              <GlitchText text={project.title} visible={visible} delay={400 + (index * 100)} />
            </h4>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: project.accentMuted, color: project.accent, border: `1px solid ${project.accentBorder}`, opacity: hovered ? 1 : 0.7 }}>
              {project.stat.value} {project.stat.label}
            </span>
          </div>
          <p className="text-[11px] text-white/30 mb-2 truncate">{project.subtitle}</p>
          <p className="text-xs text-gray-500 leading-snug font-light line-clamp-2 transition-colors duration-300"
            style={{ color: hovered ? 'rgba(255,255,255,0.45)' : '' }}>
            {project.description}
          </p>
        </div>

        <ArrowUpRight size={16} className="flex-shrink-0 transition-all duration-300"
          style={{
            color: hovered ? project.accent : 'rgba(255,255,255,0.12)',
            transform: hovered ? 'translate(2px,-2px)' : 'translate(0,0)',
          }} />
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const slashRef    = useRef(null);
  const [visible, setVisible]   = useState(false);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [slashColor, setSlashColor] = useState('#111');

  const featured = projects.find(p => p.featured);
  const rest     = projects.filter(p => !p.featured);

  // Trigger entrance animations
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);

      anime({
        targets: headerRef.current?.querySelectorAll('.anim-item'),
        opacity:    [0, 1],
        translateY: [20, 0],
        delay:      anime.stagger(80),
        duration:   700,
        easing:     'easeOutExpo',
      });

      io.unobserve(el);
    }, { threshold: 0.1 });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Gamified click handler for links
  const handleLinkClick = (e, url, color) => {
    e.preventDefault();
    setSlashColor(color);

    // 1. Sweep slash across the screen
    anime({
      targets: slashRef.current,
      translateX: ['-100%', '0%'],
      duration: 500,
      easing: 'easeInOutQuart',
      complete: () => {
        // 2. Execute navigation once mask covers screen 
        // (Using location.href bypasses popup blockers that catch delayed window.open)
        window.location.href = url; 

        // 3. Optional: Sweep it out after a delay (in case they stay on the same page during testing)
        setTimeout(() => {
          anime({
            targets: slashRef.current,
            translateX: ['0%', '100%'],
            duration: 500,
            easing: 'easeInOutQuart'
          });
        }, 800);
      }
    });
  };

  return (
    <>
      {/* ── Gamified Page Transition Mask ── */}
      <div 
        ref={slashRef}
        className="fixed top-0 left-[-50%] w-[200%] h-full z-[9999] pointer-events-none"
        style={{ 
          background: slashColor,
          transform: 'translateX(-100%) skewX(-30deg)',
          transformOrigin: 'top left'
        }}
      />

      <section id="projects" ref={sectionRef} className="py-28 bg-[#0a0a0a] px-6 lg:px-12 relative overflow-hidden">
        {/* Ambient background blobs */}
        <div className="absolute top-1/3 left-[10%] w-[35%] h-[35%] bg-[#6b8e23]/4 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute bottom-1/4 right-[5%] w-[25%] h-[25%] bg-[#3b82f6]/4 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* ── Section Header ── */}
          <div ref={headerRef} className="mb-16">
            <div className="anim-item flex items-center gap-3 mb-4 opacity-0">
              <div className="w-8 h-[2px] bg-[#6b8e23]" />
              <span className="text-[#6b8e23] text-sm font-bold tracking-[0.2em] uppercase">
                Selected Work
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="anim-item text-5xl md:text-7xl font-bold text-white tracking-tight leading-none opacity-0">
                Things I've<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
                  <GlitchText text="Shipped." visible={visible} delay={500} />
                </span>
              </h2>
              <p className="anim-item text-sm text-gray-500 max-w-xs leading-relaxed opacity-0">
                A mix of thesis work, client projects, and side builds — each solving a real problem.
              </p>
            </div>

            {/* Project count strip */}
            <div className="anim-item mt-10 flex items-center gap-0 opacity-0">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  className="group flex items-center gap-3 px-5 py-3 transition-all duration-300 border-t"
                  style={{
                    borderColor: hoverIdx === i ? p.accent : 'rgba(255,255,255,0.07)',
                    color: hoverIdx === i ? p.accent : 'rgba(255,255,255,0.25)',
                  }}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  <span className="font-mono text-[10px]">0{i + 1}</span>
                  <span className="text-[11px] tracking-wider uppercase font-medium hidden sm:block">
                    {p.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Bento Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-4 items-stretch">
            {/* Left: Featured */}
            <FeaturedCard project={featured} visible={visible} onLinkClick={handleLinkClick} />

            {/* Right: Stack of small cards */}
            <div className="flex flex-col gap-4">
              {rest.map((p, i) => (
                <SmallCard key={p.id} project={p} index={i} visible={visible} onLinkClick={handleLinkClick} />
              ))}
            </div>
          </div>

          {/* ── Footer row ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10 flex items-center justify-between"
          >
            <span className="text-[11px] text-white/15 font-mono tracking-wider">
              {projects.length} projects · more on github
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-[11px] text-white/30 hover:text-white transition-colors duration-300 font-mono tracking-wider uppercase"
            >
              View all
              <ArrowUpRight
                size={13}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}