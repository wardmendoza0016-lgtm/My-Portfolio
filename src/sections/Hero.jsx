import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Download } from 'lucide-react';
import anime from 'animejs';

export default function Hero() {
  const sectionRef = useRef(null);
  const typeRef    = useRef(null);
  const btn1Ref    = useRef(null);
  const btn2Ref    = useRef(null);
  const btn3Ref    = useRef(null);

  // ── 1. Hero entrance (Anime.js staggered sequence) ───────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    anime({
      targets:    el.querySelector('.hero-badge'),
      opacity:    [0, 1],
      translateY: [12, 0],
      duration:   600,
      delay:      300,
      easing:     'easeOutExpo',
    });

    anime({
      targets:    '.name-clip-inner',
      translateY: ['105%', '0%'],
      duration:   1100,
      delay:      anime.stagger(130, { start: 400 }),
      easing:     'easeOutExpo',
    });

    [
      { sel: '.hero-role-line', delay: 850  },
      { sel: '.hero-desc',      delay: 1000 },
      { sel: '.hero-cta-row',   delay: 1150 },
    ].forEach(({ sel, delay }) => {
      anime({
        targets:    el.querySelector(sel),
        opacity:    [0, 1],
        translateY: [16, 0],
        duration:   700,
        delay,
        easing:     'easeOutExpo',
      });
    });
  }, []);

  // ── 2. Typewriter ─────────────────────────────────────────────
  useEffect(() => {
    const roles = [
      'Full-Stack Developer.',
      'Data Analyst.',
      'System Automator.',
      'UI/UX Enthusiast.',
    ];
    const el = typeRef.current;
    if (!el) return;

    let ri = 0, ci = 0, del = false, t;

    const tick = () => {
      const word = roles[ri];
      el.textContent = del ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
      del ? ci-- : ci++;
      if (!del && ci === word.length) { del = true; t = setTimeout(tick, 2200); return; }
      if (del && ci === 0)            { del = false; ri = (ri + 1) % roles.length; }
      t = setTimeout(tick, del ? 38 : 80);
    };

    const start = setTimeout(tick, 1100);
    return () => { clearTimeout(t); clearTimeout(start); };
  }, []);

  // ── 3. Magnetic buttons ───────────────────────────────────────
  useEffect(() => {
    const refs = [btn1Ref, btn2Ref, btn3Ref];
    const cleanup = [];

    refs.forEach(ref => {
      const el = ref.current;
      if (!el) return;

      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width  / 2) * 0.25;
        const y = (e.clientY - r.top  - r.height / 2) * 0.25;
        anime({ targets: el, translateX: x, translateY: y, duration: 250, easing: 'easeOutQuad' });
      };

      const leave = () => {
        anime({ targets: el, translateX: 0, translateY: 0, duration: 700, easing: 'easeOutElastic(1, 0.5)' });
      };

      el.addEventListener('mousemove',  move);
      el.addEventListener('mouseleave', leave);
      cleanup.push(() => {
        el.removeEventListener('mousemove',  move);
        el.removeEventListener('mouseleave', leave);
      });
    });

    return () => cleanup.forEach(fn => fn());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden selection:bg-[#6b8e23]/30"
    >

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_80%)]" />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 50, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#6b8e23]/20 blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, -60, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#6b8e23]/10 blur-[120px] pointer-events-none"
        />
      </div>

      {/* ── Text content ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full text-center">
        <div className="flex flex-col items-center">

          {/* Badge */}
          <div className="hero-badge mb-6 opacity-0">
            <span className="text-[#6b8e23] text-sm font-medium tracking-widest uppercase bg-[#6b8e23]/10 px-4 py-1.5 rounded-full border border-[#6b8e23]/20 backdrop-blur-sm">
              Available for work
            </span>
          </div>

          {/* Name — clip-reveal */}
          <h1 className="text-6xl md:text-9xl font-bold text-white mb-4 tracking-tighter leading-[1]">
            <span className="block" style={{ overflow: 'hidden' }}>
              <span className="name-clip-inner block" style={{ transform: 'translateY(105%)' }}>
                Hi, I am
              </span>
            </span>
            <span className="block" style={{ overflow: 'hidden' }}>
              <span
                className="name-clip-inner block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600"
                style={{ transform: 'translateY(105%)' }}
              >
                Edward.
              </span>
            </span>
          </h1>

          {/* Typewriter */}
          <p className="hero-role-line text-lg md:text-2xl text-[#6b8e23] mb-4 font-light tracking-wide opacity-0 min-h-[2rem]">
            <span ref={typeRef} />
            <span style={{
              display:       'inline-block',
              width:         '2px',
              height:        '1em',
              background:    '#6b8e23',
              marginLeft:    '3px',
              verticalAlign: 'middle',
              animation:     'cursor-blink 0.75s infinite',
            }} />
          </p>

          {/* Description */}
          <p className="hero-desc text-lg md:text-2xl text-gray-400 mb-12 max-w-2xl font-light leading-relaxed opacity-0">
            i build clean, scalable systems — from{' '}
            <span className="text-white font-normal">full-stack web apps</span> and{' '}
            <span className="text-white font-normal">mobile experiences</span> to automated
            data pipelines and analytics dashboards.
          </p>

          {/* CTAs */}
          <div className="hero-cta-row flex flex-wrap justify-center gap-4 md:gap-6 opacity-0">
            <a
              ref={btn1Ref}
              href="#projects"
              className="group relative px-8 py-4 bg-white text-black hover:bg-gray-200 transition-all duration-300 text-xs font-bold tracking-widest uppercase flex items-center gap-2 overflow-hidden rounded-sm"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              ref={btn2Ref}
              href="/MENDOZA_Resume.pdf"
              download="MENDOZA_Resume.pdf"
              className="group relative px-8 py-4 bg-[#6b8e23] text-white hover:bg-[#55711b] transition-all duration-300 text-xs font-bold tracking-widest uppercase flex items-center gap-2 rounded-sm shadow-lg shadow-[#6b8e23]/20"
            >
              <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Resume
            </a>

            <a
              ref={btn3Ref}
              href="#about"
              className="px-8 py-4 border border-white/10 text-white hover:bg-white/5 transition-all duration-300 text-xs font-bold tracking-widest uppercase backdrop-blur-sm rounded-sm"
            >
              Know More
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ChevronDown className="text-gray-400 w-5 h-5" />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}