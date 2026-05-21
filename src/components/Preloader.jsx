import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function Preloader({ onComplete }) {
  const barRef     = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    // Letters stagger in
    anime({
      targets:    '.pre-char',
      opacity:    [0, 1],
      translateY: [30, 0],
      delay:      anime.stagger(55),
      duration:   600,
      easing:     'easeOutExpo',
    });

    // Progress bar + counter
    const prog = { val: 0 };
    anime({
      targets:  prog,
      val:      100,
      duration: 2200,
      easing:   'easeInOutSine',
      update() {
        const v = Math.round(prog.val);
        if (barRef.current)     barRef.current.style.width = v + '%';
        if (counterRef.current) counterRef.current.textContent = String(v).padStart(3, '0');
      },
      complete() {
        // Scatter letters out
        anime({
          targets:    '.pre-char',
          opacity:    0,
          translateY: -20,
          delay:      anime.stagger(28),
          duration:   300,
          easing:     'easeInExpo',
        });
        // Fade out the whole panel
        anime({
          targets:  '#preloader',
          opacity:  0,
          duration: 500,
          delay:    380,
          easing:   'easeOutQuad',
          complete: onComplete,
        });
      },
    });
  }, [onComplete]);

  const name = 'HELLO WELCOME!';

  return (
    <div
      id="preloader"
      className="fixed inset-0 z-[9999] bg-[#080808] flex flex-col items-center justify-center"
    >
      {/* Letters */}
      <div className="flex gap-[3px] mb-16 overflow-hidden">
        {name.split('').map((char, i) =>
          char === ' ' ? (
            <span key={i} className="w-4" />
          ) : (
            <span
              key={i}
              className="pre-char inline-block text-[clamp(1.6rem,5vw,3.5rem)] font-['DM_Mono',monospace] font-light tracking-[0.35em] text-white uppercase opacity-0"
            >
              {char}
            </span>
          )
        )}
      </div>

      {/* Progress bar track */}
      <div className="w-[260px] h-px bg-white/10 relative overflow-hidden">
        <div
          ref={barRef}
          className="absolute left-0 top-0 h-full bg-white transition-none"
          style={{ width: '0%' }}
        />
      </div>

      {/* Counter */}
      <div className="mt-4 flex items-center gap-3">
        <span
          ref={counterRef}
          className="font-['DM_Mono',monospace] text-[11px] tracking-[0.3em] text-white/40"
        >
          000
        </span>
        <span className="text-white/20 text-[11px] tracking-[0.3em] font-['DM_Mono',monospace]">/ 100</span>
      </div>
    </div>
  );
}