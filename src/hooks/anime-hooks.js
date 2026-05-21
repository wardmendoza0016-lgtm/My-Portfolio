// ─────────────────────────────────────────────────────────────────
// anime-hooks.js  —  Drop-in React hooks for every animation type
// npm install animejs
// ─────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState, useCallback } from 'react';
import anime from 'animejs/lib/anime.es.js';


// ════════════════════════════════════════════════════════════════
// 1. PRELOADER
//    Usage:
//      const { done } = usePreloader('ALEX JOHNSON');
//      if (!done) return <Preloader />;
// ════════════════════════════════════════════════════════════════
export function usePreloader(name = 'LOADING') {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Animate letters in
    anime({
      targets: '.pre-letter',
      opacity: [0, 1],
      translateY: [50, 0],
      delay: anime.stagger(55),
      duration: 700,
      easing: 'easeOutExpo',
    });

    // Progress counter
    const prog = { val: 0 };
    anime({
      targets: prog,
      val: 100,
      duration: 2200,
      easing: 'easeInOutSine',
      update() {
        const v = Math.round(prog.val);
        const bar = document.getElementById('pre-bar');
        const ctr = document.getElementById('pre-counter');
        if (bar) bar.style.width = v + '%';
        if (ctr) ctr.textContent = String(v).padStart(3, '0');
      },
      complete() {
        // Scatter letters out
        anime({
          targets: '.pre-letter',
          opacity: 0,
          translateY: -20,
          delay: anime.stagger(25),
          duration: 350,
          easing: 'easeInExpo',
        });
        anime({
          targets: '#preloader',
          opacity: 0,
          duration: 600,
          delay: 380,
          easing: 'easeOutQuad',
          complete: () => setDone(true),
        });
      },
    });
  }, []);

  return { done };
}


// ════════════════════════════════════════════════════════════════
// 2. HERO ENTRANCE  (staggered sequence)
//    Usage:
//      const heroRef = useHeroEntrance();
//      <section ref={heroRef}>...</section>
// ════════════════════════════════════════════════════════════════
export function useHeroEntrance(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // Clip-reveal name lines
    anime({
      targets: el.querySelectorAll('.hero-name .clip span'),
      translateY: ['105%', '0%'],
      duration: 1100,
      delay: anime.stagger(140, { start: delay + 300 }),
      easing: 'easeOutExpo',
    });

    // Staggered fade-ins for supporting elements
    [
      { sel: '.hero-eyebrow',  d: delay + 200 },
      { sel: '.hero-role',     d: delay + 750 },
      { sel: '.hero-desc',     d: delay + 950 },
      { sel: '.hero-cta',      d: delay + 1100 },
    ].forEach(({ sel, d }) => {
      anime({
        targets: el.querySelectorAll(sel),
        opacity: [0, 1],
        translateY: [14, 0],
        duration: 700,
        delay: d,
        easing: 'easeOutExpo',
      });
    });
  }, [delay]);

  return ref;
}


// ════════════════════════════════════════════════════════════════
// 3. TYPEWRITER
//    Usage:
//      const { text, cursor } = useTypewriter(['Developer.', 'Designer.']);
//      <p>{text}<span className={cursor ? 'cursor show' : 'cursor'} /></p>
// ════════════════════════════════════════════════════════════════
export function useTypewriter(words = [], typingSpeed = 82, deletingSpeed = 38, pause = 2200) {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const state = useRef({ ri: 0, ci: 0, del: false });

  useEffect(() => {
    if (!words.length) return;
    let timeout;

    const tick = () => {
      const { ri, ci, del } = state.current;
      const word = words[ri];
      const next = del ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
      setText(next);

      if (!del && ci === word.length) {
        state.current.del = true;
        timeout = setTimeout(tick, pause);
        return;
      }

      if (del && ci === 0) {
        state.current.del = false;
        state.current.ri = (ri + 1) % words.length;
      }

      state.current.ci = del ? ci - 1 : ci + 1;
      timeout = setTimeout(tick, del ? deletingSpeed : typingSpeed);
    };

    timeout = setTimeout(tick, 600);

    // Blink cursor
    const blinkInterval = setInterval(() => setShowCursor(v => !v), 530);

    return () => {
      clearTimeout(timeout);
      clearInterval(blinkInterval);
    };
  }, [words, typingSpeed, deletingSpeed, pause]);

  return { text, showCursor };
}


// ════════════════════════════════════════════════════════════════
// 4. SCROLL-TRIGGERED REVEAL
//    Usage:
//      const ref = useScrollReveal({ translateY: [40, 0], delay: 100 });
//      <div ref={ref}>...</div>
// ════════════════════════════════════════════════════════════════
export function useScrollReveal(animeProps = {}, threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo',
        ...animeProps,
      });
      io.unobserve(el);
    }, { threshold });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

// Staggered reveal for a list of children
//    Usage:
//      const ref = useStaggerReveal({ delay: 80 });
//      <ul ref={ref}>{items.map(i => <li key={i}>...</li>)}</ul>
export function useStaggerReveal(staggerDelay = 80, threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      anime({
        targets: el.children,
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 600,
        delay: anime.stagger(staggerDelay),
        easing: 'easeOutExpo',
      });
      io.unobserve(el);
    }, { threshold });

    io.observe(el);
    return () => io.disconnect();
  }, [staggerDelay]);

  return ref;
}


// ════════════════════════════════════════════════════════════════
// 5. SKILL BAR (scroll-triggered width animation)
//    Usage:
//      const ref = useSkillBar(90);   // 90% fill
//      <div className="bar" ref={ref} />
// ════════════════════════════════════════════════════════════════
export function useSkillBar(percent = 80, threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      anime({
        targets: el,
        width: `${percent}%`,
        duration: 1100,
        delay: 150,
        easing: 'easeOutExpo',
      });
      io.unobserve(el);
    }, { threshold });

    io.observe(el);
    return () => io.disconnect();
  }, [percent]);

  return ref;
}


// ════════════════════════════════════════════════════════════════
// 6. MAGNETIC BUTTON (hover effect)
//    Usage:
//      const { bindMagnetic } = useMagnetic(0.3);
//      <button {...bindMagnetic()}>Click me</button>
// ════════════════════════════════════════════════════════════════
export function useMagnetic(strength = 0.3) {
  const bindMagnetic = useCallback((ref) => {
    const handleMove = (e) => {
      if (!ref?.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      anime({ targets: ref.current, translateX: x, translateY: y, duration: 250, easing: 'easeOutQuad' });
    };
    const handleLeave = () => {
      if (!ref?.current) return;
      anime({ targets: ref.current, translateX: 0, translateY: 0, duration: 700, easing: 'easeOutElastic(1, 0.5)' });
    };
    return { onMouseMove: handleMove, onMouseLeave: handleLeave };
  }, [strength]);

  return { bindMagnetic };
}

// Simpler hook: attach directly to any button ref
export function useMagneticRef(strength = 0.28) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      anime({ targets: el, translateX: x, translateY: y, duration: 250, easing: 'easeOutQuad' });
    };

    const leave = () => {
      anime({ targets: el, translateX: 0, translateY: 0, duration: 700, easing: 'easeOutElastic(1, 0.5)' });
    };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
    };
  }, [strength]);

  return ref;
}


// ════════════════════════════════════════════════════════════════
// 7. PROJECT CARD TIMELINE (on mount or trigger)
//    Usage:
//      const trigger = useCardGrid('.project-card');
//      // trigger() after data loads
// ════════════════════════════════════════════════════════════════
export function useCardGrid(selector = '.project-card', threshold = 0.1) {
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      anime({
        targets: selector,
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.97, 1],
        duration: 700,
        delay: anime.stagger(90),
        easing: 'easeOutExpo',
      });
      io.unobserve(entry.target);
    }, { threshold });

    const container = document.querySelector(selector)?.parentElement;
    if (container) io.observe(container);
    return () => io.disconnect();
  }, [selector]);
}


// ════════════════════════════════════════════════════════════════
// EXAMPLE USAGE IN A COMPONENT
// ════════════════════════════════════════════════════════════════
/*
import {
  usePreloader, useHeroEntrance, useTypewriter,
  useScrollReveal, useSkillBar, useMagneticRef, useCardGrid
} from './anime-hooks';

function Portfolio() {
  const { done } = usePreloader('ALEX JOHNSON');
  const heroRef   = useHeroEntrance(0);
  const { text }  = useTypewriter(['Full-Stack Dev.', 'UI Enthusiast.', 'Creator.']);
  const aboutRef  = useScrollReveal({ translateY: [40, 0] });
  const reactBar  = useSkillBar(95);
  const tsBar     = useSkillBar(90);
  const ctaRef    = useMagneticRef(0.28);
  useCardGrid('.project-card');

  if (!done) return <Preloader />;

  return (
    <>
      <section ref={heroRef}>
        <h1 className="hero-name">
          <span className="clip"><span>Alex</span></span>
          <span className="clip"><span>Johnson.</span></span>
        </h1>
        <p className="hero-role">{text}<span className="cursor" /></p>
        <button ref={ctaRef} className="btn btn-primary">View Work</button>
      </section>

      <section ref={aboutRef}>
        <div className="skill-bar"><div ref={reactBar} /></div>
        <div className="skill-bar"><div ref={tsBar} /></div>
      </section>

      <section>
        {projects.map(p => (
          <div key={p.id} className="project-card">{p.title}</div>
        ))}
      </section>
    </>
  );
}
*/
