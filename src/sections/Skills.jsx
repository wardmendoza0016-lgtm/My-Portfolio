import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useDragControls,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowUpRight,
  Blocks,
  Code2,
  Cpu,
  GripVertical,
  MousePointerClick,
  Wrench,
  X,
} from 'lucide-react';

// Same categories, skills, and accent colors as the original section.
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

// Descriptions explain the technologies, not unverified levels of expertise.
// Only link a skill to a project when the existing Projects.jsx data supports it.
// Project links scroll to #projects; visitors can then open its case-study modal.
const skillProfiles = {
  JavaScript: {
    description: 'The language used to add interactivity and application logic to web interfaces.',
  },
  'C#': {
    description: 'A strongly typed language used for desktop applications, services, and object-oriented programming.',
  },
  HTML: {
    description: 'Provides semantic structure and content for accessible web pages.',
  },
  CSS: {
    description: 'Controls responsive layouts, presentation, and visual interactions.',
  },
  SQL: {
    description: 'Used to query, organize, and work with data stored in relational databases.',
  },
  DAX: {
    description: 'A calculation language used for measures and analysis in Power BI data models.',
  },
  React: {
    description: 'Builds reusable, state-driven user interfaces from components.',
    projects: [
      { title: 'Cybereum', slug: 'cybereum' },
      { title: 'Activity Tracker', slug: 'activity-tracker' },
    ],
  },
  Bootstrap: {
    description: 'A UI toolkit offering responsive layout utilities and ready-made components.',
  },
  'Node.js': {
    description: 'Runs JavaScript outside the browser, including server tooling and scripts.',
  },
  Tailwind: {
    description: 'A utility-first approach to rapidly composing consistent, responsive interfaces.',
  },
  'Next.js': {
    description: 'A React framework with features for routing, rendering, and application structure.',
  },
  'VS Code': {
    description: 'A code editor for writing, navigating, debugging, and maintaining projects.',
  },
  Unity: {
    description: 'A development platform for building real-time interactive applications and games.',
  },
  'Git/GitHub': {
    description: 'Version control and repository hosting for tracking code changes and collaboration.',
  },
  Canva: {
    description: 'A design tool for preparing graphics, layouts, and visual assets.',
  },
  'Microsoft 365': {
    description: 'Productivity and collaboration applications for documents, spreadsheets, and reporting.',
  },
  Firebase: {
    description: 'A platform offering managed services such as authentication, databases, and hosting.',
  },
  'Cursor AI': {
    description: 'An editor that supports AI-assisted coding, navigation, and refactoring.',
  },
  n8n: {
    description: 'Connects services and automates multi-step workflows using triggers and actions.',
    projects: [{ title: 'Business Automation Agent', slug: 'automation-agent' }],
  },
  BotCake: {
    description: 'A platform for automating conversational and customer-messaging workflows.',
  },
  Hardware: {
    description: 'Understanding computer components, configurations, and basic diagnostics.',
  },
  Maintenance: {
    description: 'Maintaining system reliability through troubleshooting and routine upkeep.',
  },
  Networking: {
    description: 'Understanding connected devices, network setup, and connectivity troubleshooting.',
  },
  'Generative AI': {
    description: 'Working with models that generate text, code, and other content from prompts.',
  },
  'Prompt Engineering': {
    description: 'Designing clear, iterative instructions to guide model outputs toward a goal.',
  },
};

// Separate drag grip from the skill selection button. Tapping a skill won't
// accidentally start a drag, and selecting skills remains keyboard accessible.
function SkillChip({ skill, index, accent, selected, onSelect, sandboxRef, reduceMotion }) {
  const dragControls = useDragControls();

  return (
    <motion.li
      drag={!reduceMotion}
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={sandboxRef}
      dragElastic={0.12}
      dragMomentum={false}
      dragSnapToOrigin
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6, y: 18 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={reduceMotion
        ? { duration: 0 }
        : { type: 'spring', stiffness: 210, damping: 18, delay: 0.12 + index * 0.055 }}
      whileDrag={reduceMotion ? undefined : { scale: 1.08, zIndex: 30 }}
      className="relative flex shrink-0 items-center rounded-lg border bg-[#171717] shadow-lg"
      style={{
        borderColor: selected ? `${accent}99` : 'rgba(255,255,255,0.1)',
        boxShadow: selected ? `0 0 16px ${accent}20` : '0 5px 16px rgba(0,0,0,0.25)',
      }}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className="rounded-l-lg px-3 py-2 text-left text-xs font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-sm"
        style={{ color: selected ? accent : '#f3f4f6' }}
      >
        {skill}
      </button>
      {!reduceMotion && (
        <span
          aria-hidden="true"
          title={`Drag ${skill}`}
          onPointerDown={(event) => dragControls.start(event)}
          className="flex cursor-grab touch-none items-center border-l border-white/10 px-1.5 py-2 text-white/30 active:cursor-grabbing"
        >
          <GripVertical size={13} />
        </span>
      )}
    </motion.li>
  );
}

function SkillDetails({ skill, accent, reduceMotion }) {
  const profile = skill ? skillProfiles[skill] : null;
  const related = profile?.projects ?? [];

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="mt-3 min-h-[154px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#151515] p-4"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={skill ?? 'choose-skill'}
          initial={reduceMotion ? false : { opacity: 0, y: 9 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          {profile ? (
            <>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
                <h4 className="text-sm font-semibold text-white">{skill}</h4>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-400 sm:text-sm">
                {profile.description}
              </p>
              {related.length > 0 && (
                <div className="mt-3">
                  <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-white/40">
                    Related portfolio projects
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {related.map((project) => (
                      <a
                        key={project.slug}
                        href="#projects"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white/80 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        aria-label={`Go to Projects section to explore ${project.title}`}
                      >
                        {project.title}
                        <ArrowUpRight aria-hidden="true" size={13} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex min-h-[120px] items-center gap-3">
              <MousePointerClick aria-hidden="true" size={22} style={{ color: accent }} />
              <div>
                <p className="text-sm font-semibold text-white">Explore a skill</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-400">
                  Select any skill tag above to view what it covers.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ExpandingOrb({ category, isExpanded, onToggle, expandedWidth }) {
  const Icon = category.icon;
  const sandboxRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Keep the original visible 120px circle -> panel spring morph.
  const expandedHeight = expandedWidth < 380 ? 585 : 520;
  const panelId = `skill-panel-${category.id}`;
  const titleId = `skill-heading-${category.id}`;
  const toggleId = `skill-toggle-${category.id}`;
  const morphSpring = reduceMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 110, damping: 18, mass: 1 };

  return (
    <motion.div
      layout="position"
      initial={false}
      animate={{
        width: isExpanded ? expandedWidth : 120,
        height: isExpanded ? expandedHeight : 120,
        borderRadius: isExpanded ? 30 : 60,
        backgroundColor: isExpanded ? '#0f0f0f' : '#111111',
        borderColor: isExpanded ? `${category.accent}55` : 'rgba(255,255,255,0.10)',
        boxShadow: isExpanded
          ? `0 0 50px ${category.accent}20`
          : `0 0 20px ${category.accent}00`,
      }}
      transition={{
        width: morphSpring,
        height: morphSpring,
        borderRadius: morphSpring,
        layout: morphSpring,
        backgroundColor: { duration: reduceMotion ? 0 : 0.3 },
        borderColor: { duration: reduceMotion ? 0 : 0.3 },
        boxShadow: { duration: reduceMotion ? 0 : 0.35 },
      }}
      className="group relative isolate shrink-0 overflow-hidden border hover:border-white/25 focus-within:border-white/40"
    >
      {/* Collapsed icon stays mounted so it visibly fades during the morph. */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: isExpanded ? 0 : 1, scale: isExpanded ? 0.68 : 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.28,
          delay: reduceMotion ? 0 : (isExpanded ? 0.04 : 0.12),
          ease: 'easeOut',
        }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          className="absolute inset-4 rounded-full border border-dashed border-white/20"
          animate={{ rotate: reduceMotion ? 0 : 360 }}
          transition={reduceMotion
            ? { duration: 0 }
            : { duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <div
          className="relative z-10 rounded-full p-5 transition-transform duration-300 group-hover:scale-110"
          style={{ color: category.accent, backgroundColor: `${category.accent}10` }}
        >
          <Icon size={32} />
        </div>
      </motion.div>

      {/* This button never unmounts; focus survives expand/collapse. */}
      <button
        id={toggleId}
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${category.title} skills`}
        className={[
          'absolute z-30 flex items-center justify-center outline-none',
          'focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]',
          isExpanded
            ? 'right-4 top-4 h-10 w-10 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
            : 'inset-0 h-full w-full rounded-full',
        ].join(' ')}
      >
        {isExpanded && (
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, delay: reduceMotion ? 0 : 0.24 }}
          >
            <X aria-hidden="true" size={18} />
          </motion.span>
        )}
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={titleId}
        aria-hidden={!isExpanded}
        className={`absolute inset-0 ${isExpanded ? '' : 'pointer-events-none'}`}
      >
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="orb-panel"
              className="flex h-full w-full flex-col p-5 sm:p-7"
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0, y: 8, scale: 0.98,
                transition: { duration: reduceMotion ? 0 : 0.16 },
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                delay: reduceMotion ? 0 : 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="mb-4 flex shrink-0 items-center gap-3 pr-10">
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
                    Select a tag to see details
                  </p>
                </div>
              </div>

              <div
                ref={sandboxRef}
                className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-xl border border-white/5 bg-white/[0.015] p-2"
              >
                <ul aria-label={`Skills in ${category.title}`} className="flex flex-wrap content-start items-start gap-2.5">
                  {category.skills.map((skill, index) => (
                    <SkillChip
                      key={skill}
                      skill={skill}
                      index={index}
                      accent={category.accent}
                      selected={selectedSkill === skill}
                      onSelect={() => setSelectedSkill(skill)}
                      sandboxRef={sandboxRef}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </ul>
              </div>

              <SkillDetails
                skill={selectedSkill}
                accent={category.accent}
                reduceMotion={reduceMotion}
              />

              <p className="mt-3 shrink-0 text-[10px] font-mono uppercase tracking-widest text-white/35">
                {category.skills.length} skills · Select a tag to explore
                {!reduceMotion && <span aria-hidden="true"> · Drag by the grip</span>}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeOrb, setActiveOrb] = useState(null);
  const [galleryWidth, setGalleryWidth] = useState(460);
  const galleryRef = useRef(null);
  const reduceMotion = useReducedMotion();

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

  useEffect(() => {
    if (!activeOrb) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        // Restore keyboard focus before the expanded panel's chips unmount.
        document.getElementById(`skill-toggle-${activeOrb}`)?.focus();
        setActiveOrb(null);
      }
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
            Select a node to explore my technical skills. Tap a skill tag for details.
            {!reduceMotion && ' Drag tags using their grips, or click to explore.'}
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
