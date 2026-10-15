import { useEffect, useRef, useState } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { Blocks, Code2, Cpu, Wrench, X } from 'lucide-react';

// Preserve the skill inventory and accent colors from your original Skills.jsx.
const skillCategories = [
  {
    id: 'programming',
    title: 'Programming',
    icon: Code2,
    skills: ['JavaScript', 'C#', 'HTML', 'CSS', 'SQL', 'DAX'],
    accent: '#3b82f6',
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    icon: Blocks,
    skills: ['React', 'Bootstrap', 'Node.js', 'Tailwind', 'Next.js'],
    accent: '#10b981',
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: Wrench,
    skills: [
      'VS Code', 'Unity', 'Git/GitHub', 'Canva', 'Microsoft 365',
      'Firebase', 'Cursor AI', 'n8n', 'BotCake',
    ],
    accent: '#f59e0b',
  },
  {
    id: 'other',
    title: 'Other Skills',
    icon: Cpu,
    skills: [
      'Hardware', 'Maintenance', 'Networking',
      'Generative AI', 'Prompt Engineering',
    ],
    accent: '#6b8e23',
  },
];

function ExpandingOrb({ category, isExpanded, onToggle, expandedWidth }) {
  const Icon = category.icon;
  const sandboxRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Mobile panels gain a little height so longer lists can be browsed.
  const expandedHeight = expandedWidth < 380 ? 440 : 380;
  const panelId = `skill-panel-${category.id}`;
  const titleId = `skill-heading-${category.id}`;
  const spring = reduceMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 135, damping: 23, mass: 0.85 };

  return (
    <motion.div
      layout="position"
      initial={false}
      animate={{
        width: isExpanded ? expandedWidth : 120,
        height: isExpanded ? expandedHeight : 120,
        borderRadius: isExpanded ? 28 : 60,
        backgroundColor: isExpanded ? '#0f0f0f' : '#111111',
      }}
      transition={spring}
      className="relative shrink-0 overflow-hidden border border-white/10 hover:border-white/25 focus-within:border-white/30"
      style={{
        boxShadow: isExpanded
          ? `0 0 48px ${category.accent}18`
          : '0 0 16px rgba(0,0,0,0.08)',
      }}
    >
      {/* A single, persistent button retains keyboard focus after expansion. */}
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${category.title} skills`}
        onClick={onToggle}
        className={[
          'absolute z-20 flex items-center justify-center outline-none',
          'focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]',
          isExpanded
            ? 'right-4 top-4 h-10 w-10 rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white'
            : 'inset-0 h-full w-full rounded-full text-white',
        ].join(' ')}
      >
        {isExpanded ? (
          <X aria-hidden="true" size={18} />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            <motion.span
              aria-hidden="true"
              className="absolute inset-4 rounded-full border border-dashed border-white/20"
              animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
              transition={reduceMotion
                ? { duration: 0 }
                : { duration: 15, repeat: Infinity, ease: 'linear' }}
            />
            <span
              className="relative z-10 rounded-full p-5 transition-transform duration-200 hover:scale-105"
              style={{ color: category.accent, backgroundColor: `${category.accent}12` }}
            >
              <Icon aria-hidden="true" size={32} />
            </span>
          </span>
        )}
      </button>

      {/* Remain mounted as an ID target for aria-controls; content is hidden when collapsed. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={titleId}
        hidden={!isExpanded}
        className="absolute inset-0"
      >
        {isExpanded && (
          <motion.div
            className="flex h-full w-full flex-col p-5 sm:p-7"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, delay: reduceMotion ? 0 : 0.12 }}
          >
            <div className="mb-5 flex shrink-0 items-center gap-3 pr-10">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10"
                style={{ color: category.accent, backgroundColor: `${category.accent}1f` }}
              >
                <Icon aria-hidden="true" size={23} />
              </div>
              <div className="min-w-0">
                <h3 id={titleId} className="text-lg font-bold leading-tight tracking-tight text-white sm:text-2xl">
                  {category.title}
                </h3>
                <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-gray-500">
                  Select another orb to switch
                </p>
              </div>
            </div>

            <div
              ref={sandboxRef}
              className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-xl border border-white/5 bg-white/[0.015] p-2"
            >
              <ul aria-label={`Skills in ${category.title}`} className="flex flex-wrap content-start items-start gap-2.5">
                {category.skills.map((skill, index) => (
                  <motion.li
                    key={skill}
                    drag={!reduceMotion}
                    dragConstraints={sandboxRef}
                    dragElastic={0.12}
                    dragMomentum={false}
                    dragSnapToOrigin
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 9 }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    transition={reduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 230, damping: 19, delay: 0.1 + index * 0.035 }}
                    whileDrag={reduceMotion ? undefined : { scale: 1.07, zIndex: 30 }}
                    className="relative select-none rounded-lg border border-white/10 bg-[#171717] px-3 py-2 text-xs font-medium text-white shadow-lg sm:text-sm"
                    style={{
                      touchAction: reduceMotion ? 'auto' : 'none',
                      boxShadow: `0 5px 16px rgba(0,0,0,0.25), inset 0 0 9px ${category.accent}12`,
                      cursor: reduceMotion ? 'default' : 'grab',
                    }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </div>

            <p className="mt-3 shrink-0 text-[10px] font-mono uppercase tracking-widest text-white/35">
              {category.skills.length} skills
              {!reduceMotion && <span aria-hidden="true"> · Drag tags to explore</span>}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeOrb, setActiveOrb] = useState(null);
  const [galleryWidth, setGalleryWidth] = useState(460);
  const galleryRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Read the actual gallery width, rather than using viewport guesses. This
  // keeps expanded orbs inside the available space on small mobile screens.
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return undefined;

    const measure = () => setGalleryWidth(gallery.getBoundingClientRect().width);
    measure();

    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(measure)
      : null;
    observer?.observe(gallery);
    window.addEventListener('resize', measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Escape closes the selected orb, including when focus is elsewhere.
  useEffect(() => {
    if (!activeOrb) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveOrb(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeOrb]);

  const expandedWidth = Math.min(460, Math.floor(galleryWidth));

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#030303] px-6 py-24 lg:px-12"
    >
      {/* Original ambient glows */}
      <div className="pointer-events-none absolute right-[-10%] top-1/4 h-[50%] w-[50%] rounded-full bg-[#6b8e23]/3 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-[-10%] h-[50%] w-[50%] rounded-full bg-[#3b82f6]/3 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          className="mb-14 flex flex-col items-center text-center md:mb-20"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-[#6b8e23]" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#6b8e23]">
              Capabilities
            </span>
            <div className="h-[2px] w-8 bg-[#6b8e23]" />
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl">
            Technical{' '}
            <span className="bg-gradient-to-r from-gray-200 to-gray-600 bg-clip-text text-transparent">
              Arsenal
            </span>
          </h2>
          <p className="max-w-xl text-sm font-light leading-relaxed text-gray-400 sm:text-base">
            Select a node to explore my technical skills.
            {reduceMotion
              ? ' Use its close icon to collapse the node.'
              : ' Drag the tags to interact, or use its close icon to collapse the node.'}
          </p>
        </motion.div>

        <LayoutGroup>
          <div
            ref={galleryRef}
            className="flex min-h-[400px] w-full flex-wrap items-center justify-center gap-5 md:gap-6"
          >
            {skillCategories.map((category) => (
              <ExpandingOrb
                key={category.id}
                category={category}
                isExpanded={activeOrb === category.id}
                onToggle={() => setActiveOrb((current) => current === category.id ? null : category.id)}
                expandedWidth={expandedWidth}
              />
            ))}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
