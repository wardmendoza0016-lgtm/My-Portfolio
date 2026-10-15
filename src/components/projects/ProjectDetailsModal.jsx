import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Image as ImageIcon,
  Layers3,
  X,
} from 'lucide-react';

const isRealUrl = (url) => typeof url === 'string' && /^https?:\/\//i.test(url);

/**
 * Reusable, accessible project detail dialog.
 *
 * Expected project fields: title, subtitle, description, longDesc,
 * tech, features, icon, accent, stat, screenshots, githubUrl, liveUrl.
 *
 * Each screenshot: { src: '/projects/example/image.webp', alt: '...', caption: '...' }
 * Screenshots are optional: the dialog displays a designed fallback until added.
 */
export default function ProjectDetailsModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const headingId = useId();
  const descriptionId = useId();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const Icon = project.icon;
  const screenshots = project.screenshots ?? [];
  const hasScreenshots = screenshots.length > 0;
  const activeImage = hasScreenshots ? screenshots[activeImageIndex] : null;
  const hasGithub = isRealUrl(project.githubUrl);
  const hasDemo = isRealUrl(project.liveUrl);

  // The dialog appears only in the browser; no server-side portal required.
  // Keep focus in the modal, restore the previous focus on close, and lock scroll.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const focusOutside = !dialogRef.current.contains(document.activeElement);

      if (focusOutside || (event.shiftKey && document.activeElement === first)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = oldOverflow;
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [onClose]);

  const changeImage = (direction) => {
    setActiveImageIndex((previous) =>
      (previous + direction + screenshots.length) % screenshots.length,
    );
  };

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      {/* Separate backdrop element allows normal click-to-dismiss. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/85 backdrop-blur-md"
      />

      <motion.section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex max-h-[min(90dvh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] text-white shadow-2xl outline-none sm:rounded-3xl"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-20 h-[2px]"
          style={{ backgroundColor: project.accent }}
        />

        {/* A static top bar keeps the dismiss action visible during scrolling. */}
        <div className="z-10 flex flex-shrink-0 items-center justify-between border-b border-white/10 bg-[#111111] px-5 py-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
              style={{ color: project.accent, backgroundColor: project.accentMuted }}
            >
              <Icon size={20} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                Project case study
              </span>
              <span className="block truncate text-sm font-semibold text-white/80">
                {project.title}
              </span>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={`Close ${project.title} details`}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto overscroll-contain px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8">
          <div className="mb-7 flex flex-wrap items-start justify-between gap-5">
            <div className="min-w-0 max-w-2xl">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: project.accent }}>
                {project.subtitle}
              </span>
              <h2 id={headingId} className="text-3xl font-bold tracking-tight sm:text-5xl">
                {project.title}
              </h2>
              <p id={descriptionId} className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                {project.description}
              </p>
            </div>
            <div
              className="rounded-xl border px-4 py-3 text-right"
              style={{ borderColor: project.accentBorder, backgroundColor: project.accentMuted }}
            >
              <span className="block text-2xl font-bold" style={{ color: project.accent }}>
                {project.stat.value}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-white/55">
                {project.stat.label}
              </span>
            </div>
          </div>

          {/* Screenshot gallery: functional once screenshot paths are populated. */}
          <div className="relative mb-7 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
            {activeImage ? (
              <div className="relative aspect-video w-full">
                <img
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
                {screenshots.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => changeImage(-1)}
                      aria-label="Previous screenshot"
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/75 text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-white"
                    >
                      <ArrowLeft size={17} />
                    </button>
                    <button
                      type="button"
                      onClick={() => changeImage(1)}
                      aria-label="Next screenshot"
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/75 text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-white"
                    >
                      <ArrowRight size={17} />
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div
                className="flex aspect-video max-h-[340px] flex-col items-center justify-center gap-3 px-6 text-center"
                style={{ background: `radial-gradient(circle at 50% 25%, ${project.accentMuted}, transparent 65%)` }}
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border"
                  style={{ color: project.accent, borderColor: project.accentBorder, backgroundColor: project.accentMuted }}
                >
                  <Layers3 size={29} aria-hidden="true" />
                </div>
                <span className="text-lg font-bold text-white/80">{project.title}</span>
                <span className="flex items-center gap-2 text-xs text-white/35">
                  <ImageIcon size={14} aria-hidden="true" />
                  Project preview
                </span>
              </div>
            )}
          </div>

          {hasScreenshots && (
            <div className="mb-8">
              <p className="mb-3 text-xs text-gray-400">
                {activeImage.caption ?? `Screenshot ${activeImageIndex + 1} of ${screenshots.length}`}
              </p>
              {screenshots.length > 1 && (
                <div className="flex flex-wrap gap-2" aria-label="Select project screenshot">
                  {screenshots.map((screenshot, index) => (
                    <button
                      type="button"
                      key={`${screenshot.src}-${index}`}
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`View screenshot ${index + 1}: ${screenshot.alt}`}
                      aria-pressed={index === activeImageIndex}
                      className="overflow-hidden rounded-lg border-2 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      style={{ borderColor: index === activeImageIndex ? project.accent : 'transparent', opacity: index === activeImageIndex ? 1 : 0.6 }}
                    >
                      <img src={screenshot.src} alt="" loading="lazy" className="h-14 w-24 object-cover sm:h-16 sm:w-28" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mb-5 flex flex-wrap gap-2 border-b border-white/10 pb-4" aria-label="Project information sections">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'features', label: 'Key features' },
              { id: 'technical', label: 'Technical details' },
            ].map((tab) => (
              <button
                type="button"
                key={tab.id}
                aria-pressed={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="rounded-lg border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
                style={{
                  color: activeTab === tab.id ? project.accent : 'rgba(255,255,255,0.55)',
                  borderColor: activeTab === tab.id ? project.accentBorder : 'rgba(255,255,255,0.08)',
                  backgroundColor: activeTab === tab.id ? project.accentMuted : 'rgba(255,255,255,0.03)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="min-h-28" aria-live="polite">
            {activeTab === 'overview' && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-white">Project overview</h3>
                <p className="max-w-3xl text-sm leading-7 text-gray-400">{project.description}</p>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-400">{project.longDesc}</p>
              </div>
            )}
            {activeTab === 'features' && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-white">Key features</h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {(project.features ?? []).map((feature) => (
                    <li key={feature} className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4 text-sm leading-6 text-gray-300">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: project.accent }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'technical' && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-white">Implementation details</h3>
                <p className="max-w-3xl text-sm leading-7 text-gray-400">{project.longDesc}</p>
                <h4 className="mb-3 mt-6 text-xs font-bold uppercase tracking-[0.15em] text-white/50">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border px-3 py-2 text-xs font-semibold"
                      style={{ backgroundColor: project.accentMuted, borderColor: project.accentBorder, color: project.accent }}
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {(hasGithub || hasDemo) && (
            <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
              {hasGithub && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Github size={17} aria-hidden="true" />
                  View source code
                </a>
              )}
              {hasDemo && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-black transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={{ backgroundColor: project.accent }}
                >
                  <ExternalLink size={17} aria-hidden="true" />
                  Open live demo
                </a>
              )}
            </div>
          )}
        </div>
      </motion.section>
    </motion.div>,
    document.body,
  );
}
