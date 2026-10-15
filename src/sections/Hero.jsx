import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { ArrowRight, ChevronDown, Download, Sparkles } from 'lucide-react';

// This file assumes the PDF is at public/MENDOZA_Resume.pdf.
const RESUME_URL = '/MENDOZA_Resume.pdf';

const ROLES = [
  'Full-Stack Developer.',
  'Mobile App Developer.',
  'Data Analyst.',
  'Automation Developer.',
];

const STACK = ['React', 'C#', 'Flutter', 'Power BI'];
const EASE_OUT = [0.16, 1, 0.3, 1];

/**
 * Reveals content only after App tells Hero the Preloader is finished.
 * Framer Motion owns the DOM transforms, so React StrictMode cannot leave
 * behind uncancelled Anime.js entrance timelines.
 */
function Enter({ children, className = '', delay = 0, isReady, reduceMotion }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
      animate={{
        opacity: isReady ? 1 : 0,
        y: !isReady && !reduceMotion ? 22 : 0,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.8,
        delay: isReady && !reduceMotion ? delay : 0,
        ease: EASE_OUT,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Motion values prevent spawning a new animation on every mousemove. */
function MagneticLink({
  children,
  className = '',
  reduceMotion,
  strength = 0.17,
  ...linkProps
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 19, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 240, damping: 19, mass: 0.5 });

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  return (
    <motion.a
      {...linkProps}
      className={className}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </motion.a>
  );
}

/**
 * isReady should be false while the Preloader is visible, then true once its
 * onComplete handler finishes. Defaults to true for stand-alone use.
 */
export default function Hero({ isReady = true }) {
  const typeRef = useRef(null);
  const reduceMotion = Boolean(useReducedMotion());

  // The visible typewriter text is decorative. Screen readers receive a stable
  // description instead of hearing every character and deletion announced.
  useEffect(() => {
    const el = typeRef.current;
    if (!el) return undefined;

    if (!isReady) {
      el.textContent = '';
      return undefined;
    }

    if (reduceMotion) {
      el.textContent = ROLES[0];
      return undefined;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;
    el.textContent = '';

    const tick = () => {
      const role = ROLES[roleIndex];
      if (!deleting) {
        charIndex = Math.min(charIndex + 1, role.length);
        el.textContent = role.slice(0, charIndex);
        if (charIndex === role.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1950);
          return;
        }
      } else {
        charIndex = Math.max(charIndex - 1, 0);
        el.textContent = role.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
          timer = window.setTimeout(tick, 290);
          return;
        }
      }
      timer = window.setTimeout(tick, deleting ? 34 : 67);
    };

    timer = window.setTimeout(tick, 1100);
    return () => window.clearTimeout(timer);
  }, [isReady, reduceMotion]);

  const revealName = (delay) => ({
    initial: { y: reduceMotion ? '0%' : '110%', opacity: 0 },
    animate: {
      y: !reduceMotion && !isReady ? '110%' : '0%',
      opacity: isReady ? 1 : 0,
    },
    transition: {
      duration: reduceMotion ? 0 : 1.12,
      delay: isReady && !reduceMotion ? delay : 0,
      ease: EASE_OUT,
    },
  });

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 pb-28 pt-32 text-white selection:bg-[#6b8e23]/40 sm:pb-32 lg:px-12"
    >
      {/* Subtle grid, vignette, orbital rings, and green ambient light. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.17]"
          style={{
            backgroundImage:
              'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_4%,#0a0a0a_79%)]" />

        {/* Keep centering on a static wrapper so Motion rotation cannot override the CSS translation. */}
        <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative h-[460px] w-[460px] rounded-full border border-[#6b8e23]/[0.13] sm:h-[690px] sm:w-[690px]"
            animate={isReady && !reduceMotion ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 95, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute left-1/2 top-[-4px] h-2 w-2 rounded-full bg-[#a6c872] shadow-[0_0_24px_#a6c872]" />
          </motion.div>
        </div>
        <div className="absolute left-1/2 top-[44%] h-[315px] w-[315px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04] sm:h-[500px] sm:w-[500px]" />

        <motion.div
          className="absolute -left-[16%] top-[-18%] h-[60%] w-[60%] rounded-full bg-[#6b8e23]/[0.16] blur-[105px]"
          animate={isReady && !reduceMotion
            ? { x: [0, 32, 0], y: [0, 38, 0], opacity: [0.55, 0.85, 0.55] }
            : { x: 0, y: 0, opacity: 0.6 }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-[16%] -right-[16%] h-[55%] w-[55%] rounded-full bg-[#6b8e23]/[0.12] blur-[110px]"
          animate={isReady && !reduceMotion
            ? { x: [0, -42, 0], y: [0, -28, 0], opacity: [0.4, 0.8, 0.4] }
            : { x: 0, y: 0, opacity: 0.5 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <Enter delay={0.12} isReady={isReady} reduceMotion={reduceMotion} className="mb-7 sm:mb-9">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#6b8e23]/35 bg-[#6b8e23]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#b5d48a] backdrop-blur-sm sm:text-xs">
            <motion.span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-[#a4cd6c]"
              animate={isReady && !reduceMotion ? { opacity: [1, 0.45, 1], scale: [1, 1.25, 1] } : undefined}
              transition={{ repeat: Infinity, duration: 2.5 }}
            />
            Available for opportunities
          </span>
        </Enter>

        <h1
          id="hero-heading"
          className="mb-5 text-[clamp(3.8rem,11vw,8.5rem)] font-bold leading-[0.98] tracking-[-0.065em] sm:mb-7"
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span {...revealName(0.25)} className="block">
              Hi, I am
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.09em]">
            <motion.span
              {...revealName(0.39)}
              className="block bg-gradient-to-b from-white via-[#f7f7f7] to-[#929994] bg-clip-text text-transparent"
            >
              Edward<span className="text-[#a1c56e]">.</span>
            </motion.span>
          </span>
        </h1>

        <Enter delay={0.87} isReady={isReady} reduceMotion={reduceMotion} className="mb-5 sm:mb-6">
          <p className="text-base font-medium tracking-wide text-[#a3c76a] sm:text-xl md:text-2xl">
            <span className="sr-only">Full-Stack Developer, Mobile App Developer, Data Analyst, and Automation Developer.</span>
            <span aria-hidden="true" className="relative inline-grid min-h-8 place-items-center align-middle">
              {/* Invisible longest role prevents the typewriter from shifting layout. */}
              <span className="invisible whitespace-nowrap">Mobile App Developer.</span>
              <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
                <span ref={typeRef} />
                <span className="hero-type-cursor ml-1 inline-block h-[1em] w-[2px] bg-[#a3c76a]" />
              </span>
            </span>
          </p>
        </Enter>

        <Enter delay={1.02} isReady={isReady} reduceMotion={reduceMotion}>
          <p className="mx-auto mb-9 max-w-2xl text-[15px] font-light leading-[1.85] text-zinc-400 sm:mb-11 sm:text-lg md:text-xl">
            I build practical software — from{' '}
            <span className="font-medium text-zinc-100">web and mobile applications</span> to{' '}
            <span className="font-medium text-zinc-100">automation systems</span> and{' '}
            <span className="font-medium text-zinc-100">data dashboards</span> — with a focus on
            clarity, usability, and real-world problems.
          </p>
        </Enter>

        <Enter delay={1.16} isReady={isReady} reduceMotion={reduceMotion}>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <MagneticLink
              href="#projects"
              reduceMotion={reduceMotion}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.13em] text-[#111] shadow-[0_8px_35px_rgba(255,255,255,0.10)] transition-colors duration-300 hover:bg-[#eaece8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3c76a] sm:w-auto"
            >
              Explore projects
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </MagneticLink>

            <MagneticLink
              href={RESUME_URL}
              download="Edward_Mendoza_Resume.pdf"
              aria-label="Download résumé PDF"
              reduceMotion={reduceMotion}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-[#6b8e23] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.13em] text-white shadow-[0_8px_35px_rgba(107,142,35,0.22)] transition-colors duration-300 hover:bg-[#7da532] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3c76a] sm:w-auto"
            >
              <Download aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              Download résumé
            </MagneticLink>

            <MagneticLink
              href="#about"
              reduceMotion={reduceMotion}
              strength={0.12}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-white/15 bg-white/[0.035] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.13em] text-zinc-100 backdrop-blur-sm transition-colors duration-300 hover:border-[#a3c76a]/45 hover:bg-white/[0.075] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3c76a] sm:w-auto"
            >
              About me
            </MagneticLink>
          </div>
        </Enter>

        <Enter delay={1.34} isReady={isReady} reduceMotion={reduceMotion} className="mt-10 sm:mt-12">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] tracking-[0.14em] text-white/35 sm:gap-x-4">
            <span className="inline-flex items-center gap-1.5 text-[#b1cb8b]">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              BUILDING WITH
            </span>
            {STACK.map((tech) => (
              <span key={tech} className="rounded border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 uppercase text-white/50">
                {tech}
              </span>
            ))}
          </div>
        </Enter>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute bottom-9 left-8 hidden text-[10px] uppercase tracking-[0.2em] text-white/20 lg:block">
        01 / Introduction
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-9 right-8 hidden text-[10px] uppercase tracking-[0.2em] text-white/20 lg:block">
        Design · Develop · Deliver
      </div>

      <motion.a
        href="#projects"
        aria-label="Scroll to projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, delay: isReady && !reduceMotion ? 1.65 : 0 }}
        className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 rounded-md px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-[#a3c76a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a3c76a] sm:bottom-7"
      >
        Scroll to explore
        <motion.span
          aria-hidden="true"
          animate={isReady && !reduceMotion ? { y: [0, 7, 0] } : { y: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.a>

      <style>{`
        @keyframes hero-cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .hero-type-cursor { animation: hero-cursor-blink 0.8s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-type-cursor { animation: none; }
        }
      `}</style>
    </section>
  );
}
